import prisma from '../prisma/client';

export class XPEngine {
  /**
   * Calculates level based on total XP.
   * Level 1: 0 - 99 XP
   * Level 2: 100 - 249 XP
   * Level 3: 250 - 499 XP
   * Level N: XP threshold = 50 * N^2
   */
  static calculateLevel(totalXP: number): { level: number; currentLevelXP: number; nextLevelXP: number } {
    let level = 1;
    while (totalXP >= 50 * (level + 1) * (level + 1)) {
      level++;
    }
    const currentLevelXP = 50 * level * level;
    const nextLevelXP = 50 * (level + 1) * (level + 1);
    return { level, currentLevelXP, nextLevelXP };
  }

  /**
   * Atomically awards XP to user and handles level ups & streaks.
   */
  static async awardXP(userId: string, amount: number, reason: string, referenceId?: string) {
    if (amount <= 0) return null;

    return await prisma.$transaction(async (tx) => {
      // 1. Create XP transaction record
      const transaction = await tx.xPTransaction.create({
        data: {
          userId,
          amount,
          reason,
          referenceId,
        },
      });

      // 2. Fetch or create UserProgress
      let progress = await tx.userProgress.findUnique({ where: { userId } });
      if (!progress) {
        progress = await tx.userProgress.create({
          data: { userId, currentStage: 1, totalXP: 0, level: 1 },
        });
      }

      const newTotalXP = progress.totalXP + amount;
      const { level } = this.calculateLevel(newTotalXP);

      const updatedProgress = await tx.userProgress.update({
        where: { userId },
        data: {
          totalXP: newTotalXP,
          level,
        },
      });

      // 3. Update active streak
      await this.updateStreak(tx, userId);

      return { transaction, updatedProgress, levelUp: level > progress.level };
    });
  }

  /**
   * Updates user streak based on activity date.
   */
  static async updateStreak(tx: any, userId: string) {
    const todayStr = new Date().toISOString().split('T')[0];
    const streak = await tx.userStreak.findUnique({ where: { userId } });

    if (!streak) {
      return await tx.userStreak.create({
        data: {
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastActiveDate: todayStr,
        },
      });
    }

    if (streak.lastActiveDate === todayStr) {
      return streak; // Already active today
    }

    const lastActive = streak.lastActiveDate ? new Date(streak.lastActiveDate) : null;
    const today = new Date(todayStr);

    let newCurrentStreak = 1;
    if (lastActive) {
      const diffTime = Math.abs(today.getTime() - lastActive.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newCurrentStreak = streak.currentStreak + 1;
      }
    }

    const newLongestStreak = Math.max(newCurrentStreak, streak.longestStreak);

    return await tx.userStreak.update({
      where: { userId },
      data: {
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: todayStr,
      },
    });
  }
}
