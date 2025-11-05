import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const Footer: React.FC = () => {
    const { t } = useLocalization();
    return (
        <footer className="text-center py-8 mt-12 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
                {t('footer.builtWith')}
            </p>
            <div className="mt-4">
                <a 
                    href="https://github.com/caualeal-dev" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                    {t('footer.sourceCode')}
                </a>
            </div>
        </footer>
    );
};

export default Footer;