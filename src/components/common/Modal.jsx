import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Reusable Accessible Modal Dialog Component
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  showCloseButton = true,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-transparent cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className={`relative w-full ${maxWidth} glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl z-10`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 id="modal-title" className="font-serif text-xl sm:text-2xl font-bold text-white">
              {title}
            </h3>
          )}

          {showCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="text-slate-200">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
