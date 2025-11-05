import React, { useState } from 'react';
import type { GenerationResult } from '../types';
import CodeBlock from './CodeBlock';
import { useLocalization } from '../hooks/useLocalization';

declare var JSZip: any;

interface ResultDisplayProps {
  result: GenerationResult;
  onStartOver: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onStartOver }) => {
  const [activeTab, setActiveTab] = useState<string>(result.files[0]?.file_path || '');
  const { t } = useLocalization();
  
  const getFileIcon = (filePath: string) => {
    const className = "h-4 w-4 inline-block mr-2 text-gray-400";
    if (filePath.endsWith('.py')) return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
    if (filePath.endsWith('.txt')) return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
    if (filePath.endsWith('.env')) return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
    return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
  };

  const handleDownloadZip = () => {
    const zip = new JSZip();
    result.files.forEach(file => {
        zip.file(file.file_path, file.content);
    });
    zip.generateAsync({ type: 'blob' }).then((content: any) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = "crewai_project.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center p-6 bg-gray-800 border border-gray-700 rounded-lg">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">{t('resultDisplay.title')}</h2>
        <p className="mt-2 text-gray-300">{result.introduction}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{t('resultDisplay.projectStructure')}</h3>
                <pre className="bg-gray-900 p-4 rounded-md text-gray-300 text-sm whitespace-pre-wrap"><code>{result.file_structure}</code></pre>
            </div>
             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{t('resultDisplay.nextSteps')}</h3>
                <pre className="bg-gray-900 p-4 rounded-md text-gray-300 text-sm whitespace-pre-wrap"><code>{result.next_steps}</code></pre>
            </div>
        </div>
        
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-700 bg-gray-900/50 overflow-x-auto">
            {result.files.map(file => (
              <button
                key={file.file_path}
                onClick={() => setActiveTab(file.file_path)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                  activeTab === file.file_path
                    ? 'text-white border-b-2 border-primary-500 bg-gray-800'
                    : 'text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                {getFileIcon(file.file_path)}{file.file_path.split('/').pop()}
              </button>
            ))}
          </div>

          <div className="p-0">
            {result.files.map(file =>
              activeTab === file.file_path && (
                <div key={file.file_path} className="animate-fade-in-fast">
                    <CodeBlock code={file.content} language={file.file_path.split('.').pop() || 'python'} fileName={file.file_path} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12 flex justify-center items-center gap-4">
        <button
          onClick={onStartOver}
          className="bg-gray-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {t('resultDisplay.startOverButton')}
        </button>
        <button
          onClick={handleDownloadZip}
          className="bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          {t('resultDisplay.downloadButton')}
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;