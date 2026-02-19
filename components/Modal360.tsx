'use client';

import { useEffect } from 'react';
import { Viewer360 } from '@/components/Viewer360';

interface Modal360Props {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
}

export function Modal360({ isOpen, onClose, imageSrc, alt }: Modal360Props) {
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[60] flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white backdrop-blur-sm"
        aria-label="Cerrar modal"
      >
        <span className="material-icons text-2xl">close</span>
      </button>

      {/* Keyboard hint */}
      <div className="absolute top-6 left-6 text-white text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
        Presiona <kbd className="bg-white/20 px-2 py-1 rounded ml-1">ESC</kbd> para cerrar
      </div>

      {/* Modal content */}
      <div className="w-full h-full max-w-7xl max-h-[95vh] flex flex-col">
        <div className="flex-1 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
          <Viewer360 imageSrc={imageSrc} alt={alt} loading="eager" />
        </div>
      </div>
    </div>
  );
}
