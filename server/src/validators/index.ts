import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN']).optional().default('STUDENT'),
  learningGoal: z.string().optional(),
  dailyTargetMinutes: z.number().int().min(5).max(120).optional().default(15),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  learningGoal: z.string().optional(),
  dailyTargetMinutes: z.number().int().min(5).max(120).optional(),
});

export const quizSubmitSchema = z.object({
  answers: z.record(z.string(), z.string()), // questionId -> selected answer
  timeTaken: z.number().int().min(0).optional().default(0),
});

export const bookmarkSchema = z.object({
  itemType: z.enum(['LESSON', 'WORD', 'BOOK', 'READING', 'THIRUKKURAL']),
  itemId: z.string(),
  title: z.string(),
  snippet: z.string().optional(),
});

export const settingsSchema = z.object({
  language: z.string().optional(),
  theme: z.enum(['light', 'dark', 'system']).optional(),
  soundEnabled: z.boolean().optional(),
  speechRate: z.number().min(0.5).max(2.0).optional(),
  notifications: z.boolean().optional(),
});
