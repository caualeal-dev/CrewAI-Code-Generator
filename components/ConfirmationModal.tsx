import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
}) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-dialog-title"
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="p-6 text-center">
            <h2 id="confirmation-dialog-title" className="text-xl font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-300 mb-6">{message}</p>
        </div>
        <div className="p-4 bg-gray-900/50 flex justify-end items-center gap-4 border-t border-gray-700 rounded-b-lg">
            <button
                onClick={onClose}
                className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors"
            >
                {cancelButtonText}
            </button>
            <button
                onClick={onConfirm}
                className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
            >
                {confirmButtonText}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
