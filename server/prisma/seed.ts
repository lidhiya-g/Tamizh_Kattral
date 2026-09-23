import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('[Seeding] Starting Tamizh Cholai database seeding...');

  // 1. Clean existing records (Optional safety)
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.xPTransaction.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.stageProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.learningStage.deleteMany();
  await prisma.letter.deleteMany();
  await prisma.word.deleteMany();
  await prisma.sentence.deleteMany();
  await prisma.readingPassage.deleteMany();
  await prisma.bookProgress.deleteMany();
  await prisma.book.deleteMany();
  await prisma.thirukkural.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.userStreak.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.user.deleteMany();

  // 2. Seed Learning Stages (1 - 8)
  const stagesData = [
    { number: 1, title: 'Tamil Basics', slug: 'tamil-basics', description: 'Introduction to Tamil language, script history, and phonetics', icon: 'BookOpen', order: 1 },
    { number: 2, title: 'Tamil Letters', slug: 'tamil-letters', description: 'Master 12 Vowels (உயிரெழுத்துக்கள்) and 18 Consonants (மெய்யெழுத்துக்கள்)', icon: 'Type', order: 2 },
    { number: 3, title: 'Writing Practice', slug: 'writing-practice', description: 'Interactive stroke-by-stroke HTML canvas writing studio', icon: 'PenTool', order: 3 },
    { number: 4, title: 'Words', slug: 'words', description: 'Word builder: construct everyday vocabulary from Tamil letters', icon: 'Layers', order: 4 },
    { number: 5, title: 'Sentences', slug: 'sentences', description: 'Sentence builder: token reordering and grammatical structures', icon: 'MessageSquare', order: 5 },
    { number: 6, title: 'Reading', slug: 'reading', description: 'Interactive reading passages with word popups and native audio', icon: 'FileText', order: 6 },
    { number: 7, title: 'Understanding Tamil Texts', slug: 'understanding-texts', description: 'Comprehension passages and vocabulary analysis', icon: 'Brain', order: 7 },
    { number: 8, title: 'Reading Tamil Books', slug: 'reading-books', description: 'Digital book reader for authentic Tamil literature and classics', icon: 'Library', order: 8 },
  ];

  const createdStages: Record<number, any> = {};
  for (const s of stagesData) {
    const created = await prisma.learningStage.create({ data: s });
    createdStages[s.number] = created;
  }

  // 3. Seed Lessons for Stage 1 & Stage 2
  const lesson1 = await prisma.lesson.create({
    data: {
      stageId: createdStages[1].id,
      title: 'Welcome to Tamil (தமிழ்)',
      slug: 'welcome-to-tamil',
      description: 'Discover the ancient heritage and structure of the Tamil language.',
      content: 'Tamil is one of the longest-surviving classical languages in the world, spoken by over 80 million people. Its script consists of 12 Vowels (Uyir eluthu), 18 Consonants (Mei eluthu), 1 Ayutha eluthu (ஃ), and 216 Compound letters (Uyirmei eluthu).',
      difficulty: 'BEGINNER',
      estimatedMinutes: 5,
      xpReward: 50,
      order: 1,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      stageId: createdStages[2].id,
      title: 'The 12 Vowels (உயிரெழுத்துக்கள்)',
      slug: 'the-12-vowels',
      description: 'Learn to recognize and pronounce the 12 primary Tamil vowels.',
      content: 'Vowels in Tamil are called உயிரெழுத்துக்கள் (Uyir eluthu), which means "life letters". They are divided into short vowels (Kuril) and long vowels (Nedil).',
      difficulty: 'BEGINNER',
      estimatedMinutes: 10,
      xpReward: 60,
      order: 1,
    },
  });

  // 4. Seed Tamil Letters (Vowels & Consonants)
  const vowels = [
    { character: 'அ', transliteration: 'a', pronunciation: 'short a as in america', type: 'VOWEL', exampleWord: 'அம்மா', exampleMeaning: 'Mother', audioText: 'அ', order: 1 },
    { character: 'ஆ', transliteration: 'aa', pronunciation: 'long aa as in father', type: 'VOWEL', exampleWord: 'ஆடு', exampleMeaning: 'Goat', audioText: 'ஆ', order: 2 },
    { character: 'இ', transliteration: 'i', pronunciation: 'short i as in pin', type: 'VOWEL', exampleWord: 'இலை', exampleMeaning: 'Leaf', audioText: 'இ', order: 3 },
    { character: 'ஈ', transliteration: 'ee', pronunciation: 'long ee as in feet', type: 'VOWEL', exampleWord: 'ஈ', exampleMeaning: 'Fly', audioText: 'ஈ', order: 4 },
    { character: 'உ', transliteration: 'u', pronunciation: 'short u as in put', type: 'VOWEL', exampleWord: 'உரல்', exampleMeaning: 'Mortar', audioText: 'உ', order: 5 },
    { character: 'ஊ', transliteration: 'oo', pronunciation: 'long oo as in moon', type: 'VOWEL', exampleWord: 'ஊஞ்சல்', exampleMeaning: 'Swing', audioText: 'ஊ', order: 6 },
    { character: 'எ', transliteration: 'e', pronunciation: 'short e as in red', type: 'VOWEL', exampleWord: 'எலி', exampleMeaning: 'Mouse', audioText: 'எ', order: 7 },
    { character: 'ஏ', transliteration: 'ae', pronunciation: 'long ae as in play', type: 'VOWEL', exampleWord: 'ஏணி', exampleMeaning: 'Ladder', audioText: 'ஏ', order: 8 },
    { character: 'ஐ', transliteration: 'ai', pronunciation: 'diphthong ai as in eye', type: 'VOWEL', exampleWord: 'ஐந்து', exampleMeaning: 'Five', audioText: 'ஐ', order: 9 },
    { character: 'ஒ', transliteration: 'o', pronunciation: 'short o as in pot', type: 'VOWEL', exampleWord: 'ஒட்டகம்', exampleMeaning: 'Camel', audioText: 'ஒ', order: 10 },
    { character: 'ஓ', transliteration: 'oh', pronunciation: 'long oh as in boat', type: 'VOWEL', exampleWord: 'ஓடம்', exampleMeaning: 'Boat', audioText: 'ஓ', order: 11 },
    { character: 'ஔ', transliteration: 'au', pronunciation: 'diphthong au as in cow', type: 'VOWEL', exampleWord: 'ஔவையார்', exampleMeaning: 'Avvaiyar (Poetess)', audioText: 'ஔ', order: 12 },
    { character: 'ஃ', transliteration: 'ak', pronunciation: 'ayutha eluthu guttural sound', type: 'AYUTHA', exampleWord: 'எஃகு', exampleMeaning: 'Steel', audioText: 'அஃஃ', order: 13 },
  ];

  const consonants = [
    { character: 'க்', transliteration: 'k', pronunciation: 'k sound with dot', type: 'CONSONANT', exampleWord: 'கண்', exampleMeaning: 'Eye', audioText: 'இக்', order: 14 },
    { character: 'ங்', transliteration: 'ng', pronunciation: 'nasal ng sound', type: 'CONSONANT', exampleWord: 'சிங்கம்', exampleMeaning: 'Lion', audioText: 'இங்', order: 15 },
    { character: 'ச்', transliteration: 'ch', pronunciation: 'ch sound', type: 'CONSONANT', exampleWord: 'சக்கரம்', exampleMeaning: 'Wheel', audioText: 'இச்', order: 16 },
    { character: 'ஞ்', transliteration: 'nj', pronunciation: 'palatal nasal sound', type: 'CONSONANT', exampleWord: 'ஞாயிறு', exampleMeaning: 'Sun', audioText: 'இஞ்', order: 17 },
    { character: 'ட்', transliteration: 't', pronunciation: 'retroflex t sound', type: 'CONSONANT', exampleWord: 'படம்', exampleMeaning: 'Picture', audioText: 'இட்', order: 18 },
    { character: 'ண்', transliteration: 'N', pronunciation: 'retroflex n sound', type: 'CONSONANT', exampleWord: 'மண்', exampleMeaning: 'Soil', audioText: 'இண்', order: 19 },
    { character: 'த்', transliteration: 'th', pronunciation: 'dental th sound', type: 'CONSONANT', exampleWord: 'தாமரை', exampleMeaning: 'Lotus', audioText: 'இத்', order: 20 },
    { character: 'ந்', transliteration: 'n', pronunciation: 'dental n sound', type: 'CONSONANT', exampleWord: 'நாய்', exampleMeaning: 'Dog', audioText: 'இந்', order: 21 },
    { character: 'ப்', transliteration: 'p', pronunciation: 'p sound', type: 'CONSONANT', exampleWord: 'பால்', exampleMeaning: 'Milk', audioText: 'இப்', order: 22 },
    { character: 'ம்', transliteration: 'm', pronunciation: 'm sound', type: 'CONSONANT', exampleWord: 'மரம்', exampleMeaning: 'Tree', audioText: 'இம்', order: 23 },
    { character: 'ய்', transliteration: 'y', pronunciation: 'y sound', type: 'CONSONANT', exampleWord: 'பாயசம்', exampleMeaning: 'Kheer', audioText: 'இய்', order: 24 },
    { character: 'ர்', transliteration: 'r', pronunciation: 'soft r sound', type: 'CONSONANT', exampleWord: 'நீர்', exampleMeaning: 'Water', audioText: 'இர்', order: 25 },
    { character: 'ல்', transliteration: 'l', pronunciation: 'soft l sound', type: 'CONSONANT', exampleWord: 'மலர்', exampleMeaning: 'Flower', audioText: 'இல்', order: 26 },
    { character: 'வ்', transliteration: 'v', pronunciation: 'v sound', type: 'CONSONANT', exampleWord: 'வானம்', exampleMeaning: 'Sky', audioText: 'இவ்', order: 27 },
    { character: 'ழ்', transliteration: 'zh', pronunciation: 'retroflex zh sound (unique to Tamil)', type: 'CONSONANT', exampleWord: 'தமிழ்', exampleMeaning: 'Tamil', audioText: 'இழ்', order: 28 },
    { character: 'ள்', transliteration: 'L', pronunciation: 'retroflex L sound', type: 'CONSONANT', exampleWord: 'கிளி', exampleMeaning: 'Parrot', audioText: 'இள்', order: 29 },
    { character: 'ற்', transliteration: 'R', pronunciation: 'trill R sound', type: 'CONSONANT', exampleWord: 'காற்று', exampleMeaning: 'Wind', audioText: 'இற்', order: 30 },
    { character: 'ன்', transliteration: 'n', pronunciation: 'alveolar n sound', type: 'CONSONANT', exampleWord: 'அன்பு', exampleMeaning: 'Love', audioText: 'இன்', order: 31 },
  ];

  for (const letter of [...vowels, ...consonants]) {
    await prisma.letter.create({ data: letter });
  }

  // 5. Seed Vocabulary Words
  const wordsData = [
    { tamil: 'அம்மா', transliteration: 'Amma', meaning: 'Mother', category: 'Family', difficulty: 'BEGINNER', audioText: 'அம்மா', exampleSentence: 'அம்மா அன்பானவர்.' },
    { tamil: 'மரம்', transliteration: 'Maram', meaning: 'Tree', category: 'Nature', difficulty: 'BEGINNER', audioText: 'மரம்', exampleSentence: 'இது ஒரு பெரிய மரம்.' },
    { tamil: 'நீர்', transliteration: 'Neer', meaning: 'Water', category: 'Everyday Life', difficulty: 'BEGINNER', audioText: 'நீர்', exampleSentence: 'நீர் உடலுக்கு நல்லது.' },
    { tamil: 'பால்', transliteration: 'Paal', meaning: 'Milk', category: 'Food', difficulty: 'BEGINNER', audioText: 'பால்', exampleSentence: 'நான் பால் குடிக்கிறேன்.' },
    { tamil: 'மலர்', transliteration: 'Malar', meaning: 'Flower', category: 'Nature', difficulty: 'BEGINNER', audioText: 'மலர்', exampleSentence: 'மலர் அழகாக இருக்கிறது.' },
    { tamil: 'நிலா', transliteration: 'Nilaa', meaning: 'Moon', category: 'Nature', difficulty: 'BEGINNER', audioText: 'நிலா', exampleSentence: 'இரவில் நிலா பிரகாசிக்கிறது.' },
    { tamil: 'காற்று', transliteration: 'Kaatru', meaning: 'Wind', category: 'Nature', difficulty: 'INTERMEDIATE', audioText: 'காற்று', exampleSentence: 'குளிர்ந்த காற்று வீசுகிறது.' },
    { tamil: 'வீடு', transliteration: 'Veedu', meaning: 'House', category: 'Objects', difficulty: 'BEGINNER', audioText: 'வீடு', exampleSentence: 'என் வீடு சுந்தரமானது.' },
  ];

  for (const w of wordsData) {
    await prisma.word.create({ data: w });
  }

  // 6. Seed Sentences
  const sentencesData = [
    { tamil: 'இது ஒரு மரம்.', transliteration: 'Idhu oru maram.', translation: 'This is a tree.', difficulty: 'BEGINNER', lessonId: lesson1.id, audioText: 'இது ஒரு மரம்.', order: 1 },
    { tamil: 'என் பெயர் ரவி.', transliteration: 'En peyar Ravi.', translation: 'My name is Ravi.', difficulty: 'BEGINNER', lessonId: lesson1.id, audioText: 'என் பெயர் ரவி.', order: 2 },
    { tamil: 'நான் தமிழ் கற்கிறேன்.', transliteration: 'Naan Tamizh karkiren.', translation: 'I am learning Tamil.', difficulty: 'BEGINNER', lessonId: lesson1.id, audioText: 'நான் தமிழ் கற்கிறேன்.', order: 3 },
    { tamil: 'தமிழ் இனிதான மொழி.', transliteration: 'Tamizh inidhaana mozhi.', translation: 'Tamil is a sweet language.', difficulty: 'INTERMEDIATE', lessonId: lesson1.id, audioText: 'தமிழ் இனிதான மொழி.', order: 4 },
  ];

  for (const s of sentencesData) {
    await prisma.sentence.create({ data: s });
  }

  // 7. Seed Thirukkural Entries
  const kuralsData = [
    {
      number: 1,
      tamilText: 'அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு.',
      meaning: 'As the vowel "A" is the first of all letters, so God is the primary source of the universe.',
      simpleExplanation: 'எழுத்துக்களுக்கெல்லாம் "அ" எப்படி முதன்மையோ, அதுபோல உலக உயிர்களுக்கெல்லாம் இறைவனே முதன்மையானவன்.',
      chapter: 'கடவுள் வாழ்த்து (Invocations)',
      audioText: 'அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு.',
    },
    {
      number: 2,
      tamilText: 'கற்றதனா லாய பயனென்கொல் வாலறிவன்\nநற்றாள் தொழாஅர் எனின்.',
      meaning: 'What is the value of education if one does not worship the holy feet of Supreme Wisdom?',
      simpleExplanation: 'தூய அறிவுடைய இறைவனின் திருவடிகளை வணங்காவிட்டால், ஒருவன் கற்ற கல்வியால் எந்தப் பயனும் இல்லை.',
      chapter: 'கடவுள் வாழ்த்து (Invocations)',
      audioText: 'கற்றதனா லாய பயனென்கொல் வாலறிவன் நற்றாள் தொழாஅர் எனின்.',
    },
  ];

  for (const k of kuralsData) {
    await prisma.thirukkural.create({ data: k });
  }

  // 8. Seed Reading Passages
  await prisma.readingPassage.create({
    data: {
      title: 'தமிழ் மொழியின் சிறப்பு (The Glory of Tamil)',
      tamilText: 'தமிழ் உலகின் மிக பழமையான செம்மொழிகளில் ஒன்றாகும். சங்க இலக்கியங்கள் தமிழரின் வாழ்வியலையும் பண்பாட்டையும் அழகாக சித்தரிக்கின்றன.',
      transliteration: 'Tamizh ulagin miga pazhamaiyaana semmozhigalil ondraagum. Sanga ilakkiyangal Tamizharin vaazhviyalaiyum paNpaattaiyum azhagaaga sitharikkindrana.',
      translation: 'Tamil is one of the world\'s oldest classical languages. Sangam literature beautifully portrays Tamil culture and lifestyle.',
      difficulty: 'BEGINNER',
      estimatedMinutes: 5,
      source: 'Classical Tamil Anthology',
      vocabularyJson: JSON.stringify([
        { word: 'பழமையான', meaning: 'Ancient', pronunciation: 'pazhamaiyaana' },
        { word: 'செம்மொழி', meaning: 'Classical Language', pronunciation: 'semmozhi' },
        { word: 'பண்பாடு', meaning: 'Culture', pronunciation: 'panpaadu' },
      ]),
    },
  });

  // 9. Seed Tamil Literature Books
  await prisma.book.create({
    data: {
      title: 'ஆத்திசூடி (Aathichudi)',
      author: 'ஔவையார் (Avvaiyar)',
      description: 'Single-line maxims for moral conduct composed by the revered Tamil poetess Avvaiyar.',
      difficulty: 'BEGINNER',
      category: 'Beginner Reading',
      estimatedMinutes: 15,
      source: 'Classical Tamil Poetry',
      pagesJson: JSON.stringify([
        'அறம் செய்ய விரும்பு (Desire to do good deeds).\nஆறுவது சினம் (Calm down your anger).\nஇயல்வது கரவேல் (Help others to your best ability).',
        'ஈவது விலக்கேல் (Do not obstruct charity).\nஉடையது விளம்பேல் (Do not boast about your wealth).\nஊக்கம் கைவிடேல் (Never lose enthusiasm).',
      ]),
    },
  });

  // 10. Seed Quizzes & Questions
  const quiz1 = await prisma.quiz.create({
    data: {
      lessonId: lesson2.id,
      title: 'Tamil Vowels Master Quiz',
      description: 'Test your ability to recognize and translate the 12 Tamil vowels.',
      passingScore: 70,
      xpReward: 40,
    },
  });

  await prisma.quizQuestion.createMany({
    data: [
      {
        quizId: quiz1.id,
        type: 'LETTER_RECOGNITION',
        question: 'Which letter corresponds to the English vowel sound "a" as in "America"?',
        optionsJson: JSON.stringify(['அ', 'ஆ', 'இ', 'ஈ']),
        correctAnswer: 'அ',
        explanation: 'அ represents the short "a" sound.',
        order: 1,
      },
      {
        quizId: quiz1.id,
        type: 'WORD_MEANING',
        question: 'What is the Tamil word for "Mother"?',
        optionsJson: JSON.stringify(['மரம்', 'அம்மா', 'நிலா', 'நீர்']),
        correctAnswer: 'அம்மா',
        explanation: 'அம்மா (Amma) translates to Mother.',
        order: 2,
      },
      {
        quizId: quiz1.id,
        type: 'SENTENCE_ORDER',
        question: 'Arrange the sentence correctly: "I learn Tamil"',
        optionsJson: JSON.stringify(['நான் தமிழ் கற்கிறேன்.', 'தமிழ் கற்கிறேன் நான்.', 'கற்கிறேன் நான் தமிழ்.']),
        correctAnswer: 'நான் தமிழ் கற்கிறேன்.',
        explanation: 'Tamil follows Subject + Object + Verb sentence structure.',
        order: 3,
      },
    ],
  });

  // 11. Seed System Achievements / Badges (8 Core Badges)
  const achievements = [
    { name: 'First Steps', description: 'Complete your very first Tamil lesson', icon: 'Footprints', requirementType: 'LESSONS', requirementValue: 1 },
    { name: 'Letter Explorer', description: 'Master all 12 Vowels and 18 Consonants', icon: 'Type', requirementType: 'XP', requirementValue: 100 },
    { name: 'Writing Star', description: 'Complete 5 interactive writing canvas sessions', icon: 'PenTool', requirementType: 'XP', requirementValue: 200 },
    { name: 'Word Builder', description: 'Construct 10 vocabulary words in Word Builder', icon: 'Layers', requirementType: 'XP', requirementValue: 300 },
    { name: 'Sentence Creator', description: 'Complete all sentence builder exercises', icon: 'MessageSquare', requirementType: 'LESSONS', requirementValue: 3 },
    { name: 'Reading Explorer', description: 'Read your first full Tamil passage', icon: 'FileText', requirementType: 'XP', requirementValue: 500 },
    { name: 'Tamil Text Master', description: 'Pass 5 comprehension quizzes with >80% score', icon: 'Award', requirementType: 'QUIZ', requirementValue: 5 },
    { name: 'Tamil Champion', description: 'Reach Level 10 and unlock Stage 8 Tamil Books', icon: 'Trophy', requirementType: 'STAGE', requirementValue: 8 },
  ];

  for (const ach of achievements) {
    await prisma.achievement.create({ data: ach });
  }

  // 12. Seed Demo Accounts
  const studentPassword = await bcrypt.hash('StudentPass123!', 10);
  const teacherPassword = await bcrypt.hash('TeacherPass123!', 10);
  const adminPassword = await bcrypt.hash('AdminPass123!', 10);

  // Student
  await prisma.user.create({
    data: {
      name: 'Demo Student',
      email: 'student@tamizhcholai.edu',
      passwordHash: studentPassword,
      role: 'STUDENT',
      profile: {
        create: {
          learningGoal: 'Read Tamil literature independently',
          dailyTargetMinutes: 20,
          currentStage: 2,
        },
      },
      userProgress: {
        create: {
          currentStage: 2,
          completedLessons: 1,
          completedStages: 1,
          totalXP: 150,
          level: 2,
        },
      },
      streak: {
        create: {
          currentStreak: 3,
          longestStreak: 5,
          lastActiveDate: new Date().toISOString().split('T')[0],
        },
      },
      settings: { create: { language: 'en', theme: 'system' } },
    },
  });

  // Teacher
  await prisma.user.create({
    data: {
      name: 'Demo Teacher',
      email: 'teacher@tamizhcholai.edu',
      passwordHash: teacherPassword,
      role: 'TEACHER',
      profile: { create: { bio: 'Tamil Educator & Scholar' } },
      settings: { create: { language: 'en', theme: 'system' } },
    },
  });

  // Admin
  await prisma.user.create({
    data: {
      name: 'Demo Admin',
      email: 'admin@tamizhcholai.edu',
      passwordHash: adminPassword,
      role: 'ADMIN',
      profile: { create: { bio: 'System Administrator' } },
      settings: { create: { language: 'en', theme: 'system' } },
    },
  });

  console.log('[Seeding] Successfully seeded Tamizh Cholai dataset!');
  console.log('Demo Credentials:');
  console.log(' - Student: student@tamizhcholai.edu / StudentPass123!');
  console.log(' - Teacher: teacher@tamizhcholai.edu / TeacherPass123!');
  console.log(' - Admin: admin@tamizhcholai.edu / AdminPass123!');
}

main()
  .catch(e => {
    console.error('[Seeding Error]', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
