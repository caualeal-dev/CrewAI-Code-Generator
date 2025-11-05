import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface CodeBlockProps {
  code: string;
  language: string;
  fileName: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, fileName }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLocalization();

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-900 rounded-b-lg relative group">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700/50 rounded-t-lg">
        <span className="text-gray-400 text-xs font-mono">{fileName}</span>
        <button
          onClick={handleCopy}
          className="bg-gray-800 text-gray-300 px-3 py-1 text-xs rounded-md hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? t('codeBlock.copied') : t('codeBlock.copy')}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;