import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface ApiKeyInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeyInstructionsModal: React.FC<ApiKeyInstructionsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLocalization();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">{t('apiKeyModal.title')}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-primary-400 mb-2">OpenAI API Key</h3>
            <p className="text-gray-300 mb-3">
              {t('apiKeyModal.openai.description')}
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li>{t('apiKeyModal.openai.step1')} <a href="https://platform.openai.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAI Platform</a>.</li>
              <li>{t('apiKeyModal.openai.step2')}</li>
              <li>{t('apiKeyModal.openai.step3')}</li>
              <li>{t('apiKeyModal.openai.step4')}</li>
            </ol>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-primary-400 mb-2">{t('apiKeyModal.google.title')}</h3>
            <p className="text-gray-300 mb-3">
              {t('apiKeyModal.google.description')}
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li>{t('apiKeyModal.google.step1')} <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google AI Studio</a>.</li>
              <li>{t('apiKeyModal.google.step2')}</li>
              <li>{t('apiKeyModal.google.step3')}</li>
              <li>{t('apiKeyModal.google.step4')}</li>
            </ol>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-primary-400 mb-2">{t('apiKeyModal.serper.title')}</h3>
            <p className="text-gray-300 mb-3">
              {t('apiKeyModal.serper.description')}
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li>{t('apiKeyModal.serper.step1')} <a href="https://serper.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Serper.dev</a>.</li>
              <li>{t('apiKeyModal.serper.step2')}</li>
              <li>{t('apiKeyModal.serper.step3')}</li>
              <li>{t('apiKeyModal.serper.step4')}</li>
            </ol>
          </div>
        </div>
        <div className="p-4 bg-gray-900/50 text-right border-t border-gray-700">
            <button
                onClick={onClose}
                className="bg-primary-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors"
            >
                {t('apiKeyModal.closeButton')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInstructionsModal;