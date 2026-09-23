import { getWritingGuideForCharacter, TAMIL_WRITING_GUIDES } from '../utils/tamilWritingGuides';

describe('Tamil Writing Guides Data Completeness Guard', () => {
  const REQUIRED_TAMIL_LETTERS = [
    // 12 Uyir Vowels
    'அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ',
    // 18 Mei Consonants
    'க்', 'ங்', 'ச்', 'ஞ்', 'ட்', 'ண்', 'த்', 'ந்', 'ப்', 'ம்', 'ய்', 'ர்', 'ல்', 'வ்', 'ழ்', 'ள்', 'ற்', 'ன்',
    // Aytham
    'ஃ',
  ];

  it('should have a verified handwriting direction guide for ALL 31 foundational Tamil letters', () => {
    REQUIRED_TAMIL_LETTERS.forEach(char => {
      const guide = getWritingGuideForCharacter(char);
      expect(guide).toBeDefined();
      expect(guide.character).toBe(char);
      expect(guide.hasGuide).toBe(true);
      expect(guide.verificationStatus).toBe('verified');
      expect(guide.startPoints.length).toBeGreaterThanOrEqual(1);
      expect(guide.arrows.length).toBeGreaterThanOrEqual(1);
      expect(guide.requiredRegions.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('should not contain any unverified guide data or missing coordinates', () => {
    Object.keys(TAMIL_WRITING_GUIDES).forEach(char => {
      const g = TAMIL_WRITING_GUIDES[char];
      expect(g.startPoints.every(sp => typeof sp.x === 'number' && typeof sp.y === 'number')).toBe(true);
      expect(g.arrows.every(arr => typeof arr.x === 'number' && typeof arr.y === 'number' && Boolean(arr.direction))).toBe(true);
      expect(g.requiredRegions.every(reg => typeof reg.x === 'number' && typeof reg.width === 'number')).toBe(true);
    });
  });
});
