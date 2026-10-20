import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Eye, Volume2, ScrollText, Calendar, ArrowDown } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { audioService } from '../utils/audioSynthesizer';

export default function HeroSection({ girlfriendPhoto, onOpenVoice, onOpenLetter }) {
  const [isPhotoRevealed, setIsPhotoRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleReveal = () => {
    if (!isPhotoRevealed) {
      setIsPhotoRevealed(true);
      triggerHeartConfetti();
      audioService.playChime('gift');
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-20 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Top Romantic Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>Deepest Feelings • For My Thenmozhi (Sara)</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        </motion.div>

        {/* Girlfriend Photo Reveal Interactive 3D Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative my-4 group cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleReveal}
        >
          {/* Glowing Aura Behind Card */}
          <div className="absolute -inset-2 bg-gradient-to-r from-rose-600 via-amber-400 to-pink-600 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-85 transition-opacity duration-700 animate-pulse-glow" />

          {/* Interactive Tilt Container */}
          <motion.div
            ref={cardRef}
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-[2.2rem] p-2 bg-gradient-to-b from-rose-400/30 via-slate-900/80 to-purple-950/90 border-2 border-rose-400/40 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            {/* Shimmer Border Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none group-hover:opacity-100 transition duration-700" />

            <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative bg-midnight-900 flex items-center justify-center">
              
              {/* Photo Itself */}
              <img
                src={girlfriendPhoto}
                alt="Sara"
                className={`w-full h-full object-cover object-center transition-all duration-1000 ${
                  isPhotoRevealed 
                    ? 'filter-none scale-100' 
                    : 'filter blur-2xl grayscale scale-110 opacity-30'
                }`}
              />

              {/* Reveal Overlay Curtain (When not revealed yet) */}
              <AnimatePresence>
                {!isPhotoRevealed && (
                  <motion.div
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-b from-midnight-950/80 via-rose-950/85 to-midnight-950/95 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mb-4 text-rose-300 shadow-inner group-hover:scale-110 transition duration-300">
                      <Eye className="w-8 h-8 animate-pulse text-amber-300" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-rose-100 mb-1">
                      Touch to Reveal
                    </h3>
                    <p className="text-xs text-rose-300/80 max-w-[180px]">
                      The most beautiful soul in my universe
                    </p>
                    <div className="mt-4 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 text-[11px] font-semibold border border-rose-400/30 group-hover:bg-rose-500/50 transition">
                      Tap Here
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtle caption after reveal */}
              {isPhotoRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-midnight-950 via-midnight-950/80 to-transparent p-4 text-center"
                >
                  <p className="font-serif text-lg font-bold text-white tracking-wide">
                    Sara ✨
                  </p>
                  <p className="text-[11px] text-rose-300 font-medium">
                    My heart's eternal home
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Reveal Prompt / Status */}
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
          {isPhotoRevealed ? (
            <span className="text-rose-300 flex items-center justify-center space-x-1">
              <span>My world has never looked brighter</span>
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 inline" />
            </span>
          ) : (
            "✨ Click or tap the card above to reveal Sara's photo"
          )}
        </p>

        {/* Large Animated "I LOVE YOU" Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 mb-4"
        >
          <div className="relative inline-block">
            {/* Glowing Text Aura */}
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-glow-rose">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-rose-500 to-amber-300">
                I LOVE YOU
              </span>
            </h1>
            <div className="absolute -top-3 -right-6 md:-right-10">
              <Heart className="w-8 h-8 md:w-12 md:h-12 text-rose-500 fill-rose-500 animate-heartbeat drop-shadow-[0_0_15px_rgba(225,29,72,0.8)]" />
            </div>
          </div>

          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-rose-200/90 mt-3 font-light tracking-wide max-w-2xl mx-auto">
            "Seven years of you. And I'd still choose you in every lifetime."
          </p>
        </motion.div>

        {/* 7 Years Stats Counter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-8 w-full max-w-3xl"
        >
          {[
            { label: "Years Together", value: "7", sub: "Unshakable Love" },
            { label: "Days Cherished", value: "2,557+", sub: "Pure Magic" },
            { label: "Hours of Smiles", value: "61,368+", sub: "Endless Laughter" },
            { label: "Reasons to Love You", value: "Infinite", sub: "And Counting" },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-rose-500/20 hover:border-rose-400/50 transition-all duration-300 text-center group hover:-translate-y-1"
            >
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] text-rose-300/70 font-light mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Direct Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2"
        >

          <a
            href="#letter"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-rose-200 hover:text-white border border-rose-500/30 hover:border-rose-400/60 font-semibold text-sm sm:text-base flex items-center space-x-2 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300"
            onClick={() => audioService.playChime('sweet')}
          >
            <ScrollText className="w-4 h-4 text-rose-400" />
            <span>Read My Love Letter</span>
          </a>

          <a
            href="#timeline"
            className="px-5 py-3 rounded-full bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-rose-200 border border-slate-700/60 text-sm font-medium flex items-center space-x-1.5 transition"
          >
            <span>Our Love Journey</span>
            <ArrowDown className="w-4 h-4 text-slate-400 animate-bounce" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
