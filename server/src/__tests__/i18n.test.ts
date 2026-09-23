import { translations, getTranslation, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, SupportedLanguage } from '../i18n';
import { en } from '../i18n/en';
import { ta } from '../i18n/ta';
import { hi } from '../i18n/hi';

describe('Global Multi-Language i18n System Tests', () => {
  const languageCodes = ['en', 'ta', 'hi', 'ml', 'te', 'kn', 'bn', 'es', 'fr', 'de'];

  it('1. Should define all 10 supported language metadata entries', () => {
    expect(SUPPORTED_LANGUAGES).toHaveLength(10);
    const codes = SUPPORTED_LANGUAGES.map((l: SupportedLanguage) => l.code);
    expect(codes).toEqual(languageCodes);
    expect(DEFAULT_LANGUAGE).toBe('en');
  });

  it('2. Should contain all 10 translation dictionaries in translations registry', () => {
    languageCodes.forEach(code => {
      expect(translations[code as keyof typeof translations]).toBeDefined();
      expect(translations[code as keyof typeof translations].appName).toBeTruthy();
    });
  });

  it('3. Should resolve top-level and nested key paths correctly for English', () => {
    expect(getTranslation('en', 'appName')).toBe('Tamizh Cholai');
    expect(getTranslation('en', 'nav.home')).toBe('Home');
    expect(getTranslation('en', 'dashboard.welcome')).toBe('Welcome back');
    expect(getTranslation('en', 'writing.goodJob')).toBe('Good! ✓');
    expect(getTranslation('en', 'settings.language')).toBe('Interface Language');
  });

  it('4. Should resolve top-level and nested key paths correctly for Tamil', () => {
    expect(getTranslation('ta', 'appName')).toBe('தமிழ்ச்சோலை');
    expect(getTranslation('ta', 'nav.home')).toBe('முகப்பு');
    expect(getTranslation('ta', 'writing.goodJob')).toBe('நன்று! ✓');
    expect(getTranslation('ta', 'settings.language')).toBe('இடைமுக மொழி');
  });

  it('5. Should resolve top-level and nested key paths correctly for Hindi', () => {
    expect(getTranslation('hi', 'appName')).toBe('तमिल चोलाइ');
    expect(getTranslation('hi', 'nav.home')).toBe('मुख्य पृष्ठ');
    expect(getTranslation('hi', 'writing.goodJob')).toBe('बढ़िया! ✓');
  });

  it('6. Should interpolate parameterized template variables correctly', () => {
    const interpolated = getTranslation('en', 'settings.speechRateHint', { rate: '1.2' });
    expect(interpolated).toBe('Adjust pronunciation speed (1.2x speed).');

    const xpEarned = getTranslation('en', 'common.xpEarned', { amount: '10' });
    expect(xpEarned).toBe('+10 XP');
  });

  it('7. Should fall back to English if requested key is missing or language invalid', () => {
    // Non-existent language code fallback to English
    expect(getTranslation('invalid_lang' as any, 'nav.home')).toBe('Home');
    
    // Non-existent key path fallback to raw key
    expect(getTranslation('en', 'nonexistent.key.path' as any)).toBe('nonexistent.key.path');
  });

  it('8. Should enforce structural parity across all 10 dictionaries', () => {
    const enKeys = Object.keys(en.nav);
    languageCodes.forEach(code => {
      const dict = translations[code as keyof typeof translations];
      expect(Object.keys(dict.nav)).toEqual(enKeys);
    });
  });
});
