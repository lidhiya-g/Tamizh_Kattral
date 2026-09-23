export interface TamilLetterMeta {
  id: string;
  character: string;
  transliteration: string;
  type: 'VOWEL' | 'CONSONANT' | 'AYUTHA';
  exampleWord: string;
  exampleMeaning: string;
  audioText: string;
  order: number;
}

export const TAMIL_VOWELS: TamilLetterMeta[] = [
  { id: 'v1', character: 'அ', transliteration: 'a', type: 'VOWEL', exampleWord: 'அம்மா', exampleMeaning: 'Mother', audioText: 'அ', order: 1 },
  { id: 'v2', character: 'ஆ', transliteration: 'aa', type: 'VOWEL', exampleWord: 'ஆடு', exampleMeaning: 'Goat', audioText: 'ஆ', order: 2 },
  { id: 'v3', character: 'இ', transliteration: 'i', type: 'VOWEL', exampleWord: 'இலை', exampleMeaning: 'Leaf', audioText: 'இ', order: 3 },
  { id: 'v4', character: 'ஈ', transliteration: 'ee', type: 'VOWEL', exampleWord: 'ஈ', exampleMeaning: 'Fly', audioText: 'ஈ', order: 4 },
  { id: 'v5', character: 'உ', transliteration: 'u', type: 'VOWEL', exampleWord: 'உரல்', exampleMeaning: 'Mortar', audioText: 'உ', order: 5 },
  { id: 'v6', character: 'ஊ', transliteration: 'oo', type: 'VOWEL', exampleWord: 'ஊஞ்சல்', exampleMeaning: 'Swing', audioText: 'ஊ', order: 6 },
  { id: 'v7', character: 'எ', transliteration: 'e', type: 'VOWEL', exampleWord: 'எலி', exampleMeaning: 'Rat', audioText: 'எ', order: 7 },
  { id: 'v8', character: 'ஏ', transliteration: 'ae', type: 'VOWEL', exampleWord: 'ஏணி', exampleMeaning: 'Ladder', audioText: 'ஏ', order: 8 },
  { id: 'v9', character: 'ஐ', transliteration: 'ai', type: 'VOWEL', exampleWord: 'ஐந்து', exampleMeaning: 'Five', audioText: 'ஐ', order: 9 },
  { id: 'v10', character: 'ஒ', transliteration: 'o', type: 'VOWEL', exampleWord: 'ஒட்டகம்', exampleMeaning: 'Camel', audioText: 'ஒ', order: 10 },
  { id: 'v11', character: 'ஓ', transliteration: 'oh', type: 'VOWEL', exampleWord: 'ஓடம்', exampleMeaning: 'Boat', audioText: 'ஓ', order: 11 },
  { id: 'v12', character: 'ஔ', transliteration: 'au', type: 'VOWEL', exampleWord: 'ஔவையார்', exampleMeaning: 'Avvaiyar', audioText: 'ஔ', order: 12 },
];

export const TAMIL_CONSONANTS: TamilLetterMeta[] = [
  { id: 'c1', character: 'க்', transliteration: 'k', type: 'CONSONANT', exampleWord: 'கண்', exampleMeaning: 'Eye', audioText: 'இக்', order: 13 },
  { id: 'c2', character: 'ங்', transliteration: 'ng', type: 'CONSONANT', exampleWord: 'சிங்கம்', exampleMeaning: 'Lion', audioText: 'இங்', order: 14 },
  { id: 'c3', character: 'ச்', transliteration: 'ch', type: 'CONSONANT', exampleWord: 'சக்கரம்', exampleMeaning: 'Wheel', audioText: 'இச்', order: 15 },
  { id: 'c4', character: 'ஞ்', transliteration: 'nj', type: 'CONSONANT', exampleWord: 'ஞாயிறு', exampleMeaning: 'Sun', audioText: 'இஞ்', order: 16 },
  { id: 'c5', character: 'ட்', transliteration: 't', type: 'CONSONANT', exampleWord: 'படம்', exampleMeaning: 'Picture', audioText: 'இட்', order: 17 },
  { id: 'c6', character: 'ண்', transliteration: 'N', type: 'CONSONANT', exampleWord: 'மண்', exampleMeaning: 'Soil', audioText: 'இண்', order: 18 },
  { id: 'c7', character: 'த்', transliteration: 'th', type: 'CONSONANT', exampleWord: 'தாமரை', exampleMeaning: 'Lotus', audioText: 'இத்', order: 19 },
  { id: 'c8', character: 'ந்', transliteration: 'n', type: 'CONSONANT', exampleWord: 'நாய்', exampleMeaning: 'Dog', audioText: 'இந்', order: 20 },
  { id: 'c9', character: 'ப்', transliteration: 'p', type: 'CONSONANT', exampleWord: 'பால்', exampleMeaning: 'Milk', audioText: 'இப்', order: 21 },
  { id: 'c10', character: 'ம்', transliteration: 'm', type: 'CONSONANT', exampleWord: 'மரம்', exampleMeaning: 'Tree', audioText: 'இம்', order: 22 },
  { id: 'c11', character: 'ய்', transliteration: 'y', type: 'CONSONANT', exampleWord: 'பாயசம்', exampleMeaning: 'Kheer', audioText: 'இய்', order: 23 },
  { id: 'c12', character: 'ர்', transliteration: 'r', type: 'CONSONANT', exampleWord: 'நீர்', exampleMeaning: 'Water', audioText: 'இர்', order: 24 },
  { id: 'c13', character: 'ல்', transliteration: 'l', type: 'CONSONANT', exampleWord: 'மலர்', exampleMeaning: 'Flower', audioText: 'இல்', order: 25 },
  { id: 'c14', character: 'வ்', transliteration: 'v', type: 'CONSONANT', exampleWord: 'வானம்', exampleMeaning: 'Sky', audioText: 'இவ்', order: 26 },
  { id: 'c15', character: 'ழ்', transliteration: 'zh', type: 'CONSONANT', exampleWord: 'தமிழ்', exampleMeaning: 'Tamil', audioText: 'இழ்', order: 27 },
  { id: 'c16', character: 'ள்', transliteration: 'L', type: 'CONSONANT', exampleWord: 'கிளி', exampleMeaning: 'Parrot', audioText: 'இள்', order: 28 },
  { id: 'c17', character: 'ற்', transliteration: 'R', type: 'CONSONANT', exampleWord: 'காற்று', exampleMeaning: 'Wind', audioText: 'இற்', order: 29 },
  { id: 'c18', character: 'ன்', transliteration: 'n', type: 'CONSONANT', exampleWord: 'அன்பு', exampleMeaning: 'Love', audioText: 'இன்', order: 30 },
];

export const ALL_TAMIL_LETTERS: TamilLetterMeta[] = [...TAMIL_VOWELS, ...TAMIL_CONSONANTS];
