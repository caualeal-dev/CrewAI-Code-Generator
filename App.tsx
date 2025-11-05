import React, { useState, useCallback } from 'react';
import type { Agent, Task, LLMConfig, ApiKeys, GenerationResult, CreationMode, CrewTemplate } from './types';
import { generateCrewCode } from './services/geminiService';
import { useLocalization } from './hooks/useLocalization';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeScreen from './components/WelcomeScreen';
import ModeSelection from './components/ModeSelection';
import AgentConfig from './components/AgentConfig';
import LoadingScreen from './components/LoadingScreen';
import ResultDisplay from './components/ResultDisplay';

type AppState = 'welcome' | 'mode_selection' | 'config' | 'loading' | 'result';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('welcome');
    const [creationMode, setCreationMode] = useState<CreationMode | 'template'>('manual');
    const [selectedTemplate, setSelectedTemplate] = useState<CrewTemplate | undefined>(undefined);
    const [result, setResult] = useState<GenerationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { language } = useLocalization();

    const handleGetStarted = () => {
        setAppState('mode_selection');
    };

    const handleModeSelect = (mode: CreationMode) => {
        setCreationMode(mode);
        setSelectedTemplate(undefined);
        setAppState('config');
    };

    const handleTemplateSelect = (template: CrewTemplate) => {
        setCreationMode('template');
        setSelectedTemplate(template);
        setAppState('config');
    };

    const handleGenerate = useCallback(async (params: { agents: Agent[], tasks: Task[], llmConfig: LLMConfig, apiKeys: ApiKeys, field?: string }) => {
        setAppState('loading');
        setError(null);
        try {
            const generationParams = {
                ...params,
                mode: creationMode,
                language: language
            };
            const generatedResult = await generateCrewCode(generationParams);
            setResult(generatedResult);
            setAppState('result');
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setAppState('config'); // Go back to config on error
        }
    }, [creationMode, language]);

    const handleStartOver = () => {
        setResult(null);
        setError(null);
        setSelectedTemplate(undefined);
        setAppState('welcome');
    };

    const renderContent = () => {
        switch (appState) {
            case 'welcome':
                return <WelcomeScreen onGetStarted={handleGetStarted} />;
            case 'mode_selection':
                return <ModeSelection onModeSelect={handleModeSelect} onTemplateSelect={handleTemplateSelect} />;
            case 'config':
                return <AgentConfig mode={creationMode} template={selectedTemplate} onGenerate={handleGenerate} onStartOver={handleStartOver} />;
            case 'loading':
                return <LoadingScreen />;
            case 'result':
                return result ? <ResultDisplay result={result} onStartOver={handleStartOver} /> : null;
            default:
                return <WelcomeScreen onGetStarted={handleGetStarted} />;
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <Header onGoHome={appState !== 'welcome' ? handleStartOver : undefined} />
                <div className="mt-12">
                    {error && (
                        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-8 text-center">
                            <p><strong>Error:</strong> {error}</p>
                        </div>
                    )}
                    {renderContent()}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;