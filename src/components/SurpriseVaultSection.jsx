import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, CloudRain, Flame, Volume2, Moon, Award, Smile, BookOpen, Infinity } from 'lucide-react';
import { surpriseNotes } from '../data/surpriseNotes';
import { triggerHeartConfetti } from '../utils/confetti';
import { audioService } from '../utils/audioSynthesizer';

const iconMap = {
  Sparkles: Sparkles,
  HeartHandshake: Heart,
  CloudRain: CloudRain,
  ShieldHeart: Heart,
  Flame: Flame,
  Volume2: Volume2,
  Moon: Moon,
  Award: Award,
  Smile: Smile,
  BookOpen: BookOpen,
  Infinity: Infinity,
};

export default function SurpriseVaultSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = ["All", "Reason", "Adoration", "Memory", "Promise"];

  const filteredNotes = selectedFilter === "All" 
    ? surpriseNotes 
    : surpriseNotes.filter(n => n.category === selectedFilter);

  const currentNote = filteredNotes[currentIndex % filteredNotes.length] || surpriseNotes[0];
  const IconComponent = iconMap[currentNote.icon] || Heart;

  const handleNextSurprise = () => {
    setIsAnimating(true);
    triggerHeartConfetti();
    audioService.playChime('heart');
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredNotes.length);
      setIsAnimating(false);
    }, 200);
  };

  const handleToggleFavorite = (id) => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(prev => prev.filter(item => item !== id));
    } else {
      setFavoriteIds(prev => [...prev, id]);
      triggerHeartConfetti();
      audioService.playChime('sweet');
    }
  };

  return (
    <section id="surprises" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      
      <div className="w-full max-w-4xl mx-auto z-10 relative">
        
        {/* Soft Romantic Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Hidden Sweet Whispers</span>
          </div>
          <h2 className="font-caveat text-5xl sm:text-7xl font-bold text-[#4a2c2a] drop-shadow-sm">
            Surprise Vault of Love
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#785350] max-w-md mx-auto mt-2">
            Click the surprise button anytime you want a reminder of why you are cherished.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedFilter(cat);
                setCurrentIndex(0);
                audioService.playChime('sweet');
              }}
              className={`px-3.5 py-1 rounded-full font-caveat text-lg sm:text-xl font-bold transition-all border ${
                selectedFilter === cat
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-300/60 scale-105'
                  : 'bg-white/90 hover:bg-white text-[#4a2c2a] border-rose-200'
              }`}
            >
              {cat === "All" ? "All Surprises" : cat}
            </button>
          ))}
        </div>

        {/* Surprise Card Showcase with 3D feel */}
        <div className="flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNote.id}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-lg glass-panel-rose rounded-3xl p-7 sm:p-10 border-2 border-rose-300 shadow-xl relative overflow-hidden animate-border-blink"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-300">
                  {currentNote.category} • {currentNote.mood}
                </span>

                <button
                  onClick={() => handleToggleFavorite(currentNote.id)}
                  title="Save as favorite"
                  className={`p-2 rounded-full border transition ${
                    favoriteIds.includes(currentNote.id)
                      ? 'bg-rose-500 text-white border-rose-400'
                      : 'bg-white text-rose-400 border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favoriteIds.includes(currentNote.id) ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-caveat text-3xl sm:text-4xl font-bold text-[#4a2c2a]">
                  {currentNote.title}
                </h3>
              </div>

              {/* Note Content */}
              <p className="text-[#4a2c2a] text-sm sm:text-base leading-relaxed my-4 font-sans font-normal">
                "{currentNote.text}"
              </p>

              {/* Card Footer */}
              <div className="mt-6 pt-3.5 border-t border-rose-200 flex items-center justify-between text-xs text-[#785350] font-medium">
                <span>Message #{currentNote.id} of {filteredNotes.length}</span>
                <span className="text-rose-600 font-caveat text-lg font-bold">Crafted with tenderness</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Big Surprise Trigger Button */}
          <div className="mt-8 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextSurprise}
              className="relative group px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-caveat text-2xl sm:text-3xl font-bold shadow-xl shadow-rose-300/60 border border-amber-200 flex items-center space-x-2.5 transition-all"
            >
              <div className="relative flex items-center space-x-2 z-10">
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>Tap for Another Surprise 🎁</span>
                <RefreshCw className={`w-4 h-4 text-white/90 ${isAnimating ? 'animate-spin' : ''}`} />
              </div>
            </motion.button>
            <p className="text-xs text-[#785350] mt-3 font-medium">
              Press to reveal more heartfelt reasons & secret notes
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
