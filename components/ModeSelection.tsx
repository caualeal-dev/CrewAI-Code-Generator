import React from 'react';
import type { CreationMode, CrewTemplate } from '../types';
import { CREW_TEMPLATES } from '../constants';
import { useLocalization } from '../hooks/useLocalization';

interface ModeSelectionProps {
  onModeSelect: (mode: CreationMode) => void;
  onTemplateSelect: (template: CrewTemplate) => void;
}

const ICONS: { [key: string]: React.ReactNode } = {
    'tech-blog-crew': <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    'market-analysis-crew': <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    'trip-planner-crew': <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
    'financial-analyst-crew': <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
};

const MainCard: React.FC<{ title: string; description: string; onClick: () => void; icon: React.ReactNode; }> = ({ title, description, onClick, icon }) => (
  <button
    onClick={onClick}
    className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-left w-full h-full flex flex-col hover:bg-gray-700 hover:border-primary-500 transition-all duration-300"
  >
    <div className="flex items-center gap-4 mb-3">
      <div className="bg-gray-900 p-2 rounded-full border border-gray-600">{icon}</div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-gray-400 flex-grow">{description}</p>
  </button>
);

const TemplateCard: React.FC<{ title: string; description: string; onClick: () => void; icon: React.ReactNode; }> = ({ title, description, onClick, icon }) => (
    <button
        onClick={onClick}
        className="flex-shrink-0 w-72 bg-gray-800 border border-gray-700 rounded-lg p-6 text-left flex flex-col hover:bg-gray-700 hover:border-primary-500 transition-all duration-300 transform hover:-translate-y-1 group"
    >
        <div className="flex items-center gap-4 mb-3">
            <div className="bg-gray-900 p-3 rounded-full border border-gray-600 group-hover:scale-110 transition-transform">{icon}</div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="text-gray-400 flex-grow text-sm">{description}</p>
    </button>
);


const ModeSelection: React.FC<ModeSelectionProps> = ({ onModeSelect, onTemplateSelect }) => {
  const { t } = useLocalization();
  
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-center">{t('modeSelection.title')}</h2>
        <p className="text-gray-400 mb-8 text-center max-w-2xl">{t('modeSelection.description')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
          <MainCard
            title={t('modeSelection.manual.title')}
            description={t('modeSelection.manual.description')}
            onClick={() => onModeSelect('manual')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          />
          <MainCard
            title={t('modeSelection.suggest.title')}
            description={t('modeSelection.suggest.description')}
            onClick={() => onModeSelect('suggest')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
          />
           <MainCard
            title={t('modeSelection.single.title')}
            description={t('modeSelection.single.description')}
            onClick={() => onModeSelect('single')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
          />
        </div>
      </div>
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-2 text-center">{t('modeSelection.templates.title')}</h2>
        <p className="text-gray-400 mb-8 text-center max-w-2xl mx-auto">{t('modeSelection.templates.description')}</p>
        <div className="relative">
            <div className="flex space-x-6 pb-4 overflow-x-auto">
                {CREW_TEMPLATES.map(template => (
                    <TemplateCard 
                        key={template.id}
                        title={t(template.nameKey)}
                        description={t(template.descriptionKey)}
                        onClick={() => onTemplateSelect(template)}
                        icon={ICONS[template.id]}
                    />
                ))}
            </div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-900 pointer-events-none"></div>
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-gray-900 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;