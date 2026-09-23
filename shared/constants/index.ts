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

export enum QuizQuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  LETTER_RECOGNITION = 'LETTER_RECOGNITION',
  WORD_MEANING = 'WORD_MEANING',
  MATCHING = 'MATCHING',
  SENTENCE_ORDER = 'SENTENCE_ORDER',
  READING_COMPREHENSION = 'READING_COMPREHENSION',
}

export enum XPReason {
  LESSON_COMPLETE = 'LESSON_COMPLETE',
  WRITING_PRACTICE = 'WRITING_PRACTICE',
  QUIZ_COMPLETE = 'QUIZ_COMPLETE',
  READING_COMPLETE = 'READING_COMPLETE',
  STAGE_COMPLETE = 'STAGE_COMPLETE',
  ACHIEVEMENT = 'ACHIEVEMENT',
}

export const STAGES_LIST = [
  { id: 1, number: 1, title: 'Tamil Basics', slug: 'tamil-basics', description: 'Introduction to Tamil language, origin, and phonetics', icon: 'BookOpen' },
  { id: 2, number: 2, title: 'Tamil Letters', slug: 'tamil-letters', description: 'Master 12 Vowels, 18 Consonants, and Grantha letters', icon: 'Type' },
  { id: 3, number: 3, title: 'Writing Practice', slug: 'writing-practice', description: 'Interactive stroke-by-stroke canvas writing practice', icon: 'PenTool' },
  { id: 4, number: 4, title: 'Words', slug: 'words', description: 'Word builder: construct everyday vocabulary from letters', icon: 'Layers' },
  { id: 5, number: 5, title: 'Sentences', slug: 'sentences', description: 'Sentence builder: token reordering and grammar structure', icon: 'MessageSquare' },
  { id: 6, number: 6, title: 'Reading', slug: 'reading', description: 'Interactive reading passages with word popups and audio', icon: 'FileText' },
  { id: 7, number: 7, title: 'Understanding Tamil Texts', slug: 'understanding-texts', description: 'Comprehension passages and vocabulary analysis', icon: 'Brain' },
  { id: 8, number: 8, title: 'Reading Tamil Books', slug: 'reading-books', description: 'Digital reader for authentic Tamil literature & classics', icon: 'Library' },
];

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
];
