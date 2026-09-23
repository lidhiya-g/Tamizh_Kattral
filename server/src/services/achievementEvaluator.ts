import prisma from '../prisma/client';

export class AchievementEvaluator {
  /**
   * Checks system achievements against user stats and awards newly unlocked achievements.
   */
  static async evaluateAndAward(userId: string) {
    const achievements = await prisma.achievement.findMany();
    const existingUnlocks = await prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true },
    });
    const unlockedIds = new Set(existingUnlocks.map(a => a.achievementId));

    const progress = await prisma.userProgress.findUnique({ where: { userId } });
    const streak = await prisma.userStreak.findUnique({ where: { userId } });
    const completedLessonsCount = await prisma.lessonProgress.count({ where: { userId, isCompleted: true } });
    const completedQuizzesCount = await prisma.quizAttempt.count({ where: { userId, passed: true } });

    const newlyUnlocked = [];

    for (const ach of achievements) {
      if (unlockedIds.has(ach.id)) continue;

      let satisfied = false;
      switch (ach.requirementType) {
        case 'XP':
          if ((progress?.totalXP || 0) >= ach.requirementValue) satisfied = true;
          break;
        case 'LESSONS':
          if (completedLessonsCount >= ach.requirementValue) satisfied = true;
          break;
        case 'QUIZ':
          if (completedQuizzesCount >= ach.requirementValue) satisfied = true;
          break;
        case 'STREAK':
          if ((streak?.currentStreak || 0) >= ach.requirementValue) satisfied = true;
          break;
        case 'STAGE':
          if ((progress?.completedStages || 0) >= ach.requirementValue) satisfied = true;
          break;
      }

      if (satisfied) {
        await prisma.userAchievement.create({
          data: {
            userId,
            achievementId: ach.id,
          },
        });
        newlyUnlocked.push(ach);
      }
    }

    return newlyUnlocked;
  }
}
