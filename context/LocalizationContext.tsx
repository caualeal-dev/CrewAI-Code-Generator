import React, { createContext, useState, useCallback, useMemo, ReactNode, useEffect } from 'react';
import type { Language } from '../types';
import { en } from '../locales/en';
import { pt } from '../locales/pt';
import get from 'lodash.get';

const translations = { en, pt };

interface LocalizationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  // FIX: Widened the index signature of `options` to allow boolean values, resolving a type conflict with the `returnObjects` property.
  t: (key: string, options?: { [key: string]: string | number | boolean }) => any;
}

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && ['en', 'pt'].includes(savedLang)) {
            return savedLang;
        }
        const browserLang = navigator.language.split('-')[0];
        return browserLang === 'pt' ? 'pt' : 'en';
    }
    return 'en'; // Default language for server-side rendering or non-browser environments
};


export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  // FIX: Widened the index signature of `options` to allow boolean values, resolving a type conflict with the `returnObjects` property.
  const t = useCallback((key: string, options?: { [key: string]: string | number | boolean }) => {
    const translation = get(translations[language], key);

    if (options?.returnObjects && typeof translation === 'object') {
        return translation;
    }

    if (typeof translation !== 'string') {
        console.warn(`Translation key '${key}' not found for language '${language}'.`);
        return key;
    }

    return translation.replace(/\{(\w+)\}/g, (_, varName) => {
        return options && options[varName] != null ? String(options[varName]) : '';
    });
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};