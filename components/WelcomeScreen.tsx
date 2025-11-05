import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <div className="text-primary-400 mb-3">{icon}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  const { t } = useLocalization();

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 md:p-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary-500 py-2">
          {t('welcomeScreen.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          {t('welcomeScreen.description')}
        </p>
      </div>
      <div className="mb-12">
        <button
            onClick={onGetStarted}
            className="bg-primary-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-primary-700 transition-transform transform hover:scale-105 shadow-lg shadow-primary-500/20"
        >
            {t('welcomeScreen.getStarted')}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>}
            title={t('welcomeScreen.features.visualBuilder.title')}
            description={t('welcomeScreen.features.visualBuilder.description')}
        />
        <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>} 
            title={t('welcomeScreen.features.codeGeneration.title')}
            description={t('welcomeScreen.features.codeGeneration.description')}
        />
        <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
            title={t('welcomeScreen.features.templates.title')}
            description={t('welcomeScreen.features.templates.description')}
        />
      </div>

    </div>
  );
};

export default WelcomeScreen;