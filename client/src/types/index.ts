export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export enum StageStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Profile {
  id: string;
  userId: string;
  avatar?: string;
  bio?: string;
  learningGoal?: string;
  dailyTargetMinutes?: number;
  currentStage: number;
}

export interface LearningStage {
  id: string;
  number: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  isPublished: boolean;
  status?: StageStatus;
  progressPercent?: number;
  lessonsCount?: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  stageId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  difficulty: string;
  estimatedMinutes: number;
  xpReward: number;
  order: number;
  isCompleted?: boolean;
}

export interface Letter {
  id: string;
  character: string;
  transliteration: string;
  pronunciation: string;
  type: 'VOWEL' | 'CONSONANT' | 'GRANTHA' | 'AYUTHA';
  exampleWord: string;
  exampleMeaning: string;
  audioText: string;
  order: number;
}

export interface Word {
  id: string;
  tamil: string;
  transliteration: string;
  meaning: string;
  category: string;
  difficulty: string;
  audioText: string;
  exampleSentence?: string;
  components?: string[];
}

export interface Sentence {
  id: string;
  tamil: string;
  transliteration: string;
  translation: string;
  difficulty: string;
  audioText: string;
  order: number;
  tokens?: string[];
}

export interface ReadingPassage {
  id: string;
  title: string;
  tamilText: string;
  transliteration: string;
  translation: string;
  difficulty: string;
  estimatedMinutes: number;
  source: string;
  vocabulary?: { word: string; meaning: string; pronunciation: string }[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  difficulty: string;
  category: string;
  estimatedMinutes: number;
  source: string;
  currentPage?: number;
  pages?: string[];
}

export interface Thirukkural {
  id: string;
  number: number;
  tamilText: string;
  meaning: string;
  simpleExplanation: string;
  chapter: string;
  audioText: string;
  source: string;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  type: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  passingScore: number;
  xpReward: number;
  questions?: QuizQuestion[];
}

export interface UserProgressData {
  currentStage: number;
  completedLessons: number;
  totalLessonsCount: number;
  completedStages: number;
  totalXP: number;
  level: number;
  currentLevelXP: number;
  nextLevelXP: number;
  unlockedBadgesCount: number;
  streak?: {
    currentStreak: number;
    longestStreak: number;
  };
  recommendations?: any[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirementType: string;
  requirementValue: number;
  isUnlocked?: boolean;
}
