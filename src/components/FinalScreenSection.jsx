import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, ShieldCheck } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { audioService } from '../utils/audioSynthesizer';

export default function FinalScreenSection({ boyfriendName = "Selva", girlfriendName = "Sara", onRestartExperience }) {
  const [reactionSent, setReactionSent] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  useEffect(() => {
    const savedFeeling = localStorage.getItem('sara_reaction_feeling');
    if (savedFeeling) {
      setSelectedFeeling(savedFeeling);
      setReactionSent(true);
    }
  }, []);

  const feelings = [
    { label: "Warm Hug", icon: "🫂" },
    { label: "Touched My Heart", icon: "🥺" },
    { label: "Pure Gratitude", icon: "🌸" },
    { label: "Loved This", icon: "💖" },
  ];

  const handleSendReaction = (feeling) => {
    setSelectedFeeling(feeling.label);
    setReactionSent(true);
    triggerHeartConfetti();
    audioService.playChime('heart');
    try {
      localStorage.setItem('sara_reaction_feeling', feeling.label);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <section id="final" className="relative py-16 sm:py-24 px-4 overflow-hidden text-center">
      
      <div className="w-full max-w-3xl mx-auto z-10 relative">
        
        {/* Soft Romantic Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-semibold mb-6">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>My Greatest Blessing • Forever & Always</span>
        </div>

        {/* Pulsing Sacred Heart */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 shadow-xl shadow-rose-300/40 mb-5"
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-inner">
            <Heart className="w-9 h-9 text-rose-500 fill-rose-500 animate-heartbeat" />
          </div>
        </motion.div>

        {/* Sincere Heading with Caveat Typography */}
        <h2 className="font-caveat text-5xl sm:text-7xl font-bold text-[#4a2c2a] mb-5 drop-shadow-sm leading-tight">
          Forever Grateful For You, Thenmozhi (Sara)
        </h2>

        {/* Sincere Message Card */}
        <div className="glass-panel-rose rounded-3xl p-8 sm:p-12 border-2 border-rose-300 shadow-xl space-y-5 text-left animate-border-blink relative overflow-hidden">
          
          <div className="flex items-center space-x-2 text-xs font-semibold text-rose-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>A Message of Sincere Devotion</span>
          </div>

          <p className="text-[#4a2c2a] text-lg sm:text-2xl font-caveat font-bold leading-relaxed">
            “Seven years of memories, countless feelings, and one person who will always be special to me. I cannot change the past, but I can learn from it, understand you better, and treat your feelings with the respect they deserve. I love you.”
          </p>

          <p className="text-[#4a2c2a] text-sm leading-relaxed font-sans">
            I built this little digital sanctuary not to ask for anything, and not to pressure your feelings. I created it simply to honor every smile, every quiet moment, and every chapter we have shared. Your peace and happiness will always matter to me.
          </p>

          <div className="pt-4 border-t border-rose-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="font-sans text-xs text-[#785350] font-medium block">
                With unconditional love & respect,
              </span>
              <span className="font-caveat text-3xl font-bold text-rose-700">
                — {boyfriendName}
              </span>
            </div>

            <div className="text-xs text-[#785350] font-sans font-medium">
              2019 • Forever • Always Your Anchor
            </div>
          </div>
        </div>

        {/* Gentle Reaction / Whisper (Pressure-Free) */}
        <div className="mt-10">
          <p className="text-xs sm:text-sm text-[#785350] mb-4 font-medium">
            Send a gentle whisper back if this made you smile (completely optional):
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {feelings.map((f) => {
              const isChosen = selectedFeeling === f.label;
              return (
                <button
                  key={f.label}
                  onClick={() => handleSendReaction(f)}
                  className={`px-4 py-2 rounded-full font-caveat text-xl font-bold transition-all duration-300 flex items-center space-x-2 border ${
                    isChosen
                      ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-300/60 scale-105'
                      : 'bg-white hover:bg-rose-50 text-[#4a2c2a] border-rose-200'
                  }`}
                >
                  <span className="text-lg">{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          {reactionSent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 p-3.5 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 text-xs sm:text-sm inline-flex items-center space-x-2 font-medium"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Your warmth is felt. Thank you for being the heart of my life, Sara. ❤️</span>
            </motion.div>
          )}
        </div>

        {/* Action Controls: Read Love Letter & Restart Experience */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById('letter');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-md text-xs sm:text-sm font-semibold flex items-center space-x-2 transition"
          >
            <Heart className="w-4 h-4 fill-white text-white animate-heartbeat" />
            <span>Read Love Letter Again 💌</span>
          </button>

          <button
            onClick={onRestartExperience}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-rose-50 text-[#4a2c2a] border border-rose-200 text-xs sm:text-sm font-semibold flex items-center space-x-2 transition shadow-sm"
          >
            <RotateCcw className="w-4 h-4 text-[#785350]" />
            <span>Restart Experience</span>
          </button>
        </div>

        {/* Bottom Gentle Footer */}
        <div className="mt-14 pt-6 border-t border-rose-200 text-xs text-[#785350] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Dedicated with all my heart to Thenmozhi (Sara) ❤️
          </p>
          <div className="flex items-center space-x-1 text-rose-600 font-semibold font-caveat text-base">
            <span>Crafted with boundless devotion by Selva</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          </div>
        </div>

      </div>
    </section>
  );
}
