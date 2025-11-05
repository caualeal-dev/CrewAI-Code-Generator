import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onGoHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome }) => {
  const { t } = useLocalization();

  return (
    <header className="text-center relative">
       {onGoHome && (
          <div className="absolute top-0 left-0">
            <button
              onClick={onGoHome}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-gray-300 hover:bg-gray-700 transition-colors"
              aria-label={t('header.goHome')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="hidden sm:inline">{t('header.goHome')}</span>
            </button>
          </div>
        )}
      <div className="absolute top-0 right-0">
        <LanguageSwitcher />
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary-500 py-2">
        {t('header.title')}
      </h1>
      <p className="mt-4 text-lg text-gray-300 max-w-4xl mx-auto">
        {t('header.subtitle')}
      </p>
    </header>
  );
};

export default Header;