import prisma from '../prisma/client';

export class RecommendationEngine {
  /**
   * Generates rule-based recommendations for user's next learning steps.
   */
  static async getRecommendations(userId: string) {
    const progress = await prisma.userProgress.findUnique({ where: { userId } });
    const currentStageNumber = progress?.currentStage || 1;

    // Find next uncompleted lesson in current stage
    const currentStage = await prisma.learningStage.findUnique({
      where: { number: currentStageNumber },
      include: { lessons: { orderBy: { order: 'asc' } } },
    });

    const completedLessonIds = (
      await prisma.lessonProgress.findMany({
        where: { userId, isCompleted: true },
        select: { lessonId: true },
      })
    ).map(l => l.lessonId);

    const nextLesson = currentStage?.lessons.find(l => !completedLessonIds.includes(l.id));

    const recommendations = [];

    if (nextLesson) {
      recommendations.push({
        type: 'LESSON',
        title: `Continue: ${nextLesson.title}`,
        description: nextLesson.description,
        actionUrl: `/learn/lesson/${nextLesson.id}`,
        stageNumber: currentStageNumber,
        badgeText: 'Recommended Next',
      });
    }

    if (currentStageNumber === 2 || currentStageNumber === 3) {
      recommendations.push({
        type: 'WRITING_PRACTICE',
        title: 'Writing Studio Practice',
        description: 'Draw and practice writing Tamil letters on canvas',
        actionUrl: '/practice/writing',
        badgeText: 'Skill Practice',
      });
    }

    if (currentStageNumber >= 4) {
      recommendations.push({
        type: 'WORD_BUILDER',
        title: 'Interactive Word Builder',
        description: 'Assemble Tamil letters to form meaningful vocabulary words',
        actionUrl: '/practice/word-builder',
        badgeText: 'Vocabulary Building',
      });
    }

    if (currentStageNumber >= 6) {
      recommendations.push({
        type: 'READING',
        title: 'Tamil Literature & Thirukkural',
        description: 'Explore daily Thirukkural and reading passages',
        actionUrl: '/thirukkural',
        badgeText: 'Reading Mastery',
      });
    }

    return recommendations;
  }
}
