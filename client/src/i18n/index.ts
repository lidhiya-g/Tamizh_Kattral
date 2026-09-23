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

const dictionaries: Record<string, typeof en> = {
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

export const getTranslation = (lang: string, keyPath: string, params?: Record<string, any>): string => {
  const dict = dictionaries[lang] || dictionaries.en;
  const keys = keyPath.split('.');

  let result: any = dict;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // Fallback to English dictionary
      let fallback: any = dictionaries.en;
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = fallback[fk];
        } else {
          if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
            console.warn(`[i18n] Missing translation key: ${keyPath}`);
          }
          return keyPath;
        }
      }
      result = fallback;
      break;
    }
  }

  if (typeof result !== 'string') return keyPath;

  if (params) {
    Object.keys(params).forEach(pKey => {
      result = result.replace(new RegExp(`{{${pKey}}}`, 'g'), String(params[pKey]));
    });
  }

  return result;
};
