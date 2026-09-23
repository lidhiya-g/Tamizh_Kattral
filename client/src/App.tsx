import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AudioProvider } from './context/AudioContext';

import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { TeacherLayout } from './layouts/TeacherLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingPage } from './pages/OnboardingPage';

import { DashboardPage } from './pages/DashboardPage';
import { LearningPathPage } from './pages/LearningPathPage';
import { StageDetailPage } from './pages/StageDetailPage';
import { LessonPage } from './pages/LessonPage';
import { LetterExplorerPage } from './pages/LetterExplorerPage';
import { WritingStudioPage } from './pages/WritingStudioPage';
import { WordBuilderPage } from './pages/WordBuilderPage';
import { SentenceBuilderPage } from './pages/SentenceBuilderPage';
import { ReadingPassagesPage } from './pages/ReadingPassagesPage';
import { BookReaderPage } from './pages/BookReaderPage';
import { ThirukkuralPage } from './pages/ThirukkuralPage';
import { QuizPage } from './pages/QuizPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AudioProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Hero Landing & Onboarding */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />

                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* Student App Portal */}
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/learn" element={<LearningPathPage />} />
                  <Route path="/learn/stage/:id" element={<StageDetailPage />} />
                  <Route path="/learn/lesson/:id" element={<LessonPage />} />
                  <Route path="/letters" element={<LetterExplorerPage />} />
                  <Route path="/practice/writing" element={<WritingStudioPage />} />
                  <Route path="/practice/word-builder" element={<WordBuilderPage />} />
                  <Route path="/practice/sentence-builder" element={<SentenceBuilderPage />} />
                  <Route path="/reading" element={<ReadingPassagesPage />} />
                  <Route path="/books" element={<BookReaderPage />} />
                  <Route path="/thirukkural" element={<ThirukkuralPage />} />
                  <Route path="/quiz/:id" element={<QuizPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>

                {/* Teacher Ecosystem Portal */}
                <Route element={<TeacherLayout />}>
                  <Route path="/teacher" element={<TeacherDashboardPage />} />
                </Route>

                {/* Admin Management Console */}
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/admin/users" element={<AdminDashboardPage />} />
                </Route>

                {/* Fallback Catch-all Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </AudioProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
