import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTranslation } from '../i18n';
import { SUPPORTED_LANGUAGES } from '../../../shared/constants';

interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => void;
  t: (key: string, params?: Record<string, any>) => string;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => {
    const saved = localStorage.getItem('tamizh_cholai_interface_language') || localStorage.getItem('tamizh_cholai_lang');
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      return saved;
    }
    return 'en';
  });

  const setLanguage = useCallback((code: string) => {
    if (SUPPORTED_LANGUAGES.some(l => l.code === code)) {
      setLanguageState(code);
      localStorage.setItem('tamizh_cholai_interface_language', code);
      localStorage.setItem('tamizh_cholai_lang', code);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tamizh_cholai_interface_language', language);
    localStorage.setItem('tamizh_cholai_lang', language);
  }, [language]);

  const t = useCallback(
    (key: string, params?: Record<string, any>) => {
      return getTranslation(language, key, params);
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
