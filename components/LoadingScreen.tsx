import React, { useState, useEffect } from 'react';
import { useLocalization } from '../hooks/useLocalization';

const LoadingScreen: React.FC = () => {
  const { t } = useLocalization();
  const loadingMessages = t('loadingScreen.messages', { returnObjects: true }) as string[];
  
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 rounded-lg">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary-500"></div>
      <h2 className="mt-6 text-2xl font-semibold text-white">{t('loadingScreen.title')}</h2>
      <p className="mt-2 text-gray-300 transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingScreen;