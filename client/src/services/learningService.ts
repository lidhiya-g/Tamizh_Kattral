import { apiClient } from './apiClient';
import { ALL_TAMIL_LETTERS } from '../data/tamilLetters';
import { StageStatus } from '../types';

const FALLBACK_STAGES = [
  {
    id: 'stg-1',
    number: 1,
    title: 'Stage 1 — Primary Vowels (உயிரெழுத்துக்கள்)',
    description: 'Learn the 12 primary Tamil vowels from அ to ஔ with stroke direction guides and audio sounds.',
    icon: 'Type',
    status: StageStatus.COMPLETED
  },
  {
    id: 'stg-2',
    number: 2,
    title: 'Stage 2 — Primary Consonants (மெய்யெழுத்துக்கள்)',
    description: 'Master the 18 pure consonant letters with dot marks (புள்ளி வைத்த எழுத்துக்கள்).',
    icon: 'PenTool',
    status: StageStatus.AVAILABLE
  },
  {
    id: 'stg-3',
    number: 3,
    title: 'Stage 3 — Compound Letters (உயிர்மெய்யெழுத்துக்கள்)',
    description: 'Explore the 216 combined vowel-consonant letters and their phonetic patterns.',
    icon: 'Layers',
    status: StageStatus.AVAILABLE
  },
  {
    id: 'stg-4',
    number: 4,
    title: 'Stage 4 — Ayutha Ezhuthu (ஃ)',
    description: 'Understand the unique Tamil special character ஃ and its usage.',
    icon: 'Brain',
    status: StageStatus.AVAILABLE
  },
  {
    id: 'stg-5',
    number: 5,
    title: 'Stage 5 — Word Builder (சொல் உருவாக்கம்)',
    description: 'Construct vocabulary words by morphologically combining letters.',
    icon: 'MessageSquare',
    status: StageStatus.AVAILABLE
  },
  {
    id: 'stg-6',
    number: 6,
    title: 'Stage 6 — Sentence Builder (வாக்கிய அமைப்பாளர்)',
    description: 'Assemble grammatically accurate Tamil sentences from token cards.',
    icon: 'FileText',
    status: StageStatus.AVAILABLE
  },
  {
    id: 'stg-7',
    number: 7,
    title: 'Stage 7 — Reading Passages (வாசிப்புப் பகுதிகள்)',
    description: 'Practice interactive continuous reading with dictionary definitions.',
    icon: 'BookOpen',
    status: StageStatus.AVAILABLE
  },
  {
    id: 'stg-8',
    number: 8,
    title: 'Stage 8 — Classical Literature Hub (திருக்குறள் & நூல்கள்)',
    description: 'Read authentic Thirukkural couplets and digital Tamil books.',
    icon: 'Library',
    status: StageStatus.AVAILABLE
  }
];

const FALLBACK_READING_PASSAGES = [
  {
    id: 'rp-1',
    title: 'தமிழ் மொழியின் சிறப்புகள் (Glory of Tamil Language)',
    tamilText: 'தமிழ் மிகவும் பழமையான மற்றும் இனிமையான மொழி. உலகளவில் பல இலட்சம் மக்களால் பேசப்படும் இம் மொழி மிகச் சிறந்த இலக்கிய வளம் கொண்டது. சங்க இலக்கியங்கள் முதல் தற்கால பாரதியார் கவிதைகள் வரை தமிழின் பெருமை நிலைத்து நிற்கிறது.',
    transliteration: 'Tamizh migavum pazhamaiyaana matrum inimaiyaana mozhi. Ulagalavil pala ilatcham makkalaal pesappadum im mozhi migach chirandha ilakkiya valam kondadhu.',
    translation: 'Tamil is a very ancient and sweet language. Spoken by millions of people worldwide, this language possesses rich literary heritage ranging from Sangam literature to modern poetry.',
    vocabulary: [
      { word: 'பழமையான', meaning: 'Ancient', pronunciation: 'Pazhamaiyaana' },
      { word: 'இனிமையான', meaning: 'Sweet / Pleasant', pronunciation: 'Inimaiyaana' },
      { word: 'மொழி', meaning: 'Language', pronunciation: 'Mozhi' },
      { word: 'இலக்கிய', meaning: 'Literary', pronunciation: 'Ilakkiya' }
    ]
  },
  {
    id: 'rp-2',
    title: 'இயற்கையும் தமிழும் (Nature and Tamil)',
    tamilText: 'தமிழர்கள் இயற்கையோடு இயைந்து வாழ்ந்தவர்கள். குறிஞ்சி, முல்லை, மருதம், நெய்தல், பாலை என நிலங்களை ஐந்து திணைகளாகப் பிரித்து வாழ்ந்தனர்.',
    transliteration: 'Tamizharghal iyarkaiyodu iyaindhu vaazhndhavargal. Kurinji, Mullai, Marudham, Neidhal, Paalai ena nilangalai aindhu thinhaigalaaga pirithu vaazhndhanar.',
    translation: 'Tamil people lived in harmony with nature. They categorized lands into five landscapes: Kurinji (Mountains), Mullai (Forests), Marudham (Agricultural fields), Neidhal (Seashore), and Paalai (Deserts).',
    vocabulary: [
      { word: 'இயற்கை', meaning: 'Nature', pronunciation: 'Iyarkai' },
      { word: 'திணை', meaning: 'Landscape / Region', pronunciation: 'Thinhai' },
      { word: 'நிலம்', meaning: 'Land', pronunciation: 'Nilam' }
    ]
  }
];

const FALLBACK_BOOKS = [
  {
    id: 'book-1',
    title: 'ஆத்திசூடி (Aathichudi)',
    author: 'ஔவையார் (Avvaiyar)',
    category: 'CLASSICAL',
    coverImage: '',
    pages: [
      'அறம் செய்ய விரும்பு.\nஆறுவது சினம்.\nஇயல்வது கரவேல்.\nஈவது விலக்கேல்.\nஉடையது விளம்பேல்.',
      'ஊக்கம் கைவிடேல்.\nஎண் எழுத்து இகழேல்.\nஏற்பது இகழ்ச்சி.\nஐயமிட்டு உண்.\nஒப்புரவு ஒழுகு.',
      'ஓதுவது ஒழியேல்.\nஔவியம் பேசேல்.\nஅஃகம் சுருக்கேல்.'
    ]
  },
  {
    id: 'book-2',
    title: 'கொன்றை வேந்தன் (Kondrai Vendhan)',
    author: 'ஔவையார் (Avvaiyar)',
    category: 'CLASSICAL',
    coverImage: '',
    pages: [
      'அன்னையும் பிதாவும் முன்னறி தெய்வம்.\nஆலயம் தொழுவது சாலவும் நன்று.\nஇல்லறம் அல்லது நல்லறம் அன்று.',
      'ஈயார் தேட்டைத் தீயார் கொள்வர்.\nஉண்டி சுருக்குதல் பெண்டிர்க்கழகு.\nஊருடன் பகைக்கின் வேருடன் கெடும்.'
    ]
  }
];

const FALLBACK_KURALS = [
  {
    number: 1,
    tamilText: 'அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு.',
    meaning: 'As the vowel "A" is the first of all letters, so God is the primary source of the universe.',
    simpleExplanation: 'எழுத்துக்களுக்கெல்லாம் "அ" எப்படி முதன்மையோ, அதுபோல உலக உயிர்களுக்கெல்லாம் இறைவனே முதன்மையானவன்.',
    chapter: 'கடவுள் வாழ்த்து (Invocations)',
    audioText: 'அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு.'
  },
  {
    number: 2,
    tamilText: 'கற்றதனால் ஆய பயனென்கொல் வாலறிவன்\nநற்றாள் தொழாஅர் எனின்.',
    meaning: 'What is the use of learning if one does not worship the holy feet of God who has pure knowledge?',
    simpleExplanation: 'தூய அறிவடிவாக விளங்கும் இறைவனின் திருவடிகளை வணங்காவிட்டால், ஒருவர் கற்ற கல்வியால் எந்தப் பயனும் இல்லை.',
    chapter: 'கடவுள் வாழ்த்து (Invocations)',
    audioText: 'கற்றதனால் ஆய பயனென்கொல் வாலறிவன் நற்றாள் தொழாஅர் எனின்.'
  }
];

export const learningService = {
  async getStages() {
    try {
      const response = await apiClient.get('/stages');
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return FALLBACK_STAGES;
    } catch (err) {
      return FALLBACK_STAGES;
    }
  },

  async getStageById(id: string) {
    try {
      const response = await apiClient.get(`/stages/${id}`);
      if (response.data.data) return response.data.data;
    } catch (err) {
      // Fallback
    }
    const matched = FALLBACK_STAGES.find(s => s.id === id) || FALLBACK_STAGES[0];
    return {
      ...matched,
      lessons: [
        { id: `l-${id}-1`, title: 'Lesson 1 — Script Fundamentals', status: 'AVAILABLE' },
        { id: `l-${id}-2`, title: 'Lesson 2 — Stroke Geometry & Practice', status: 'AVAILABLE' }
      ]
    };
  },

  async getLessonById(id: string) {
    try {
      const response = await apiClient.get(`/lessons/${id}`);
      if (response.data.data) return response.data.data;
    } catch (err) {
      // Fallback
    }
    return {
      id,
      title: 'Tamil Script & Pronunciation Practice',
      content: 'Learn Tamil character shapes, stroke direction, and sounds.',
      exercises: [
        { id: 'ex-1', type: 'RECOGNITION', question: 'Which letter represents the sound "a"?', options: ['அ', 'ஆ', 'இ', 'ஈ'], answer: 'அ' }
      ]
    };
  },

  async completeLesson(id: string) {
    try {
      const response = await apiClient.post(`/lessons/${id}/complete`);
      return response.data.data;
    } catch (err) {
      return { success: true, xpEarned: 10 };
    }
  },

  async getLetters(type?: string) {
    try {
      const response = await apiClient.get('/letters', { params: { type } });
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return ALL_TAMIL_LETTERS;
    } catch (err) {
      return ALL_TAMIL_LETTERS;
    }
  },

  async getWords(category?: string) {
    try {
      const response = await apiClient.get('/words', { params: { category } });
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return [
        { id: 'w1', word: 'அம்மா', meaning: 'Mother', transliteration: 'Amma' },
        { id: 'w2', word: 'ஆடு', meaning: 'Goat', transliteration: 'Aadu' }
      ];
    } catch (err) {
      return [
        { id: 'w1', word: 'அம்மா', meaning: 'Mother', transliteration: 'Amma' },
        { id: 'w2', word: 'ஆடு', meaning: 'Goat', transliteration: 'Aadu' }
      ];
    }
  },

  async getSentences() {
    try {
      const response = await apiClient.get('/sentences');
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return [
        { id: 's1', tamilText: 'நான் தமிழ் கற்கிறேன்.', meaning: 'I am learning Tamil.' }
      ];
    } catch (err) {
      return [
        { id: 's1', tamilText: 'நான் தமிழ் கற்கிறேன்.', meaning: 'I am learning Tamil.' }
      ];
    }
  },

  async getReadingPassages() {
    try {
      const response = await apiClient.get('/reading');
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return FALLBACK_READING_PASSAGES;
    } catch (err) {
      return FALLBACK_READING_PASSAGES;
    }
  },

  async getBooks() {
    try {
      const response = await apiClient.get('/books');
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return FALLBACK_BOOKS;
    } catch (err) {
      return FALLBACK_BOOKS;
    }
  },

  async saveBookProgress(id: string, page: number) {
    try {
      const response = await apiClient.post(`/books/${id}/progress`, { page });
      return response.data.data;
    } catch (err) {
      return { success: true, page };
    }
  },

  async getKurals(chapter?: string) {
    try {
      const response = await apiClient.get('/thirukkural', { params: { chapter } });
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return FALLBACK_KURALS;
    } catch (err) {
      return FALLBACK_KURALS;
    }
  },

  async getDailyKural() {
    try {
      const response = await apiClient.get('/thirukkural/daily');
      if (response.data?.data) {
        return response.data.data;
      }
      return FALLBACK_KURALS[0];
    } catch (err) {
      return FALLBACK_KURALS[0];
    }
  },

  async search(query: string) {
    try {
      const response = await apiClient.get('/search', { params: { q: query } });
      return response.data.data;
    } catch (err) {
      return [];
    }
  },
};
