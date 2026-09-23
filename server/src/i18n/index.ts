import { en } from './en';
import { ta } from './ta';
import { hi } from './hi';
import { ml } from './ml';
import { te } from './te';
import { kn } from './kn';
import { bn } from './bn';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
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

export const DEFAULT_LANGUAGE = 'en';

export const translations = {
  en,
  ta,
  hi,
  ml,
  te,
  kn,
  bn,
  es,
  fr,
  de,
};

export type LanguageCode = keyof typeof translations;

export function getTranslation(
  lang: LanguageCode,
  keyPath: string,
  params?: Record<string, string | number>
): string {
  const dictionary = translations[lang] || translations.en;
  const keys = keyPath.split('.');
  let current: any = dictionary;

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      // Fallback to English if missing in target dictionary
      let fallback: any = translations.en;
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return keyPath;
        }
      }
      current = fallback;
      break;
    }
  }

  if (typeof current !== 'string') {
    return keyPath;
  }

  if (params) {
    return Object.entries(params).reduce((str, [paramKey, value]) => {
      return str.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), String(value));
    }, current);
  }

  return current;
}
