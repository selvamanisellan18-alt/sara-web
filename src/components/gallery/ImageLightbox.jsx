import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Heart } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';

export default function ImageLightbox({ photo, onClose, onPrev, onNext, currentIndex, totalCount }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation: Prev */}
      <button
        onClick={() => {
          onPrev();
          audioService.playChime('sweet');
        }}
        className="absolute left-3 sm:left-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition hover:scale-110 active:scale-95"
        aria-label="Previous Photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Navigation: Next */}
      <button
        onClick={() => {
          onNext();
          audioService.playChime('sweet');
        }}
        className="absolute right-3 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition hover:scale-110 active:scale-95"
        aria-label="Next Photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Lightbox Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-4xl max-h-[90vh] flex flex-col items-center glass-panel rounded-3xl p-4 sm:p-6 border border-rose-500/30 overflow-hidden"
      >
        <div className="relative w-full max-h-[62vh] rounded-2xl overflow-hidden bg-midnight-950 flex items-center justify-center">
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[60vh] rounded-xl"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="w-full mt-4 text-left">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 flex items-center space-x-1">
                <Tag className="w-3 h-3" />
                <span>{photo.category}</span>
              </span>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>{photo.date}</span>
              </span>
            </div>

            <span className="text-xs text-slate-400 font-medium">
              {currentIndex + 1} of {totalCount}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
            {photo.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-serif italic">
            "{photo.caption}"
          </p>
        </div>
      </motion.div>
    </div>
  );
}
