import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Music, LogOut } from 'lucide-react';
import { triggerHeartConfetti, triggerRomanticExplosion } from '../../utils/confetti';
import { audioService } from '../../utils/audioSynthesizer';

export default function WelcomeScreen({ onOpenHeart, onToggleMusic, isMusicPlaying, onLockWebsite }) {
  const handleOpenClick = () => {
    triggerRomanticExplosion();
    triggerHeartConfetti();
    audioService.playChime('heart');
    // Start ambient romantic melody upon user gesture
    if (!isMusicPlaying) {
      audioService.startRomanticBGM();
      onToggleMusic(true);
    }
    onOpenHeart();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden px-4 py-8 sm:py-14 bg-gradient-to-b from-[#fdf1f0] via-[#fff5f6] to-[#ffffff] flex flex-col items-center"
    >
      {/* Top Right Logout Button on Welcome Screen */}
      {onLockWebsite && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={onLockWebsite}
            className="px-3.5 py-1.5 rounded-full bg-white/95 border border-rose-300 shadow-md text-rose-700 hover:bg-rose-50 hover:text-rose-900 transition-all flex items-center space-x-1.5 backdrop-blur-md active:scale-95 text-xs font-bold"
            title="Logout / Lock Portal"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Soft Ambient Rose Glow */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-rose-200/35 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center my-auto pt-8 sm:pt-12 pb-10">
        
        {/* ========================================================
            MASS LUXURY 3D HEART WITH BLINKING SPARKLES & RIPPLES
            ======================================================== */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mb-8 select-none cursor-pointer group"
          onClick={() => {
            triggerHeartConfetti();
            audioService.playChime('sweet');
          }}
          title="Tap for love sparkles!"
        >
          {/* Outward Expanding Glowing Concentric Ripple Waves */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-rose-500/70 animate-ripple-wave-1 pointer-events-none" />
          <div className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-rose-400/60 animate-ripple-wave-2 pointer-events-none" />
          <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-amber-300/60 animate-ripple-wave-3 pointer-events-none" />

          {/* Rotating Celestial Orbit Ring with Twinkling Blinking Sparkles */}
          <div className="absolute -inset-5 sm:-inset-7 rounded-full border border-dashed border-rose-300/60 animate-orbit-rotate pointer-events-none">
            {/* Blinking Sparkle 1: Top (12 o'clock) */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 animate-blink-twinkle-1">
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-300 drop-shadow-[0_0_8px_#f59e0b]" />
            </div>

            {/* Blinking Sparkle 2: Right (3 o'clock) */}
            <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 animate-blink-twinkle-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-400 drop-shadow-[0_0_8px_#fb7185]" />
            </div>

            {/* Blinking Sparkle 3: Bottom (6 o'clock) */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 animate-blink-twinkle-3">
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-300 drop-shadow-[0_0_8px_#f59e0b]" />
            </div>

            {/* Blinking Sparkle 4: Left (9 o'clock) */}
            <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 animate-blink-twinkle-4">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-pink-400 drop-shadow-[0_0_8px_#ec4899]" />
            </div>
          </div>

          {/* Counter-rotating Orbit Ring with Satellite Mini Hearts */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-rose-200/40 animate-orbit-reverse pointer-events-none">
            <div className="absolute top-0 right-1/4 animate-blink-twinkle-5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 shadow-[0_0_10px_#f59e0b]" />
            </div>
            <div className="absolute bottom-1 left-1/4 animate-blink-twinkle-2">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_#f43f5e]" />
            </div>
          </div>

          {/* Glowing Ambient Radial Aura */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-rose-500/30 via-pink-400/25 to-amber-300/30 blur-lg animate-pulse pointer-events-none" />

          {/* Main 3D Medallion Disc */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-rose-600 via-rose-400 to-amber-300 p-1 shadow-2xl shadow-rose-400/50 group-hover:scale-105 active:scale-95 transition-transform duration-300">
            {/* Inner Pearlescent Glass Disc */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-white via-[#fff1f2] to-[#ffe4e6] flex items-center justify-center relative overflow-hidden shadow-inner border border-white/80">
              
              {/* Glass Specular Reflection on Upper Disc */}
              <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none rounded-t-full" />

              {/* 3D Sculpted Glowing Beating Heart */}
              <div className="relative z-10 animate-heartbeat-mass">
                <svg
                  viewBox="0 0 100 90"
                  className="w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300"
                >
                  <defs>
                    <linearGradient id="massHeartGrad3D" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff4365" />
                      <stop offset="40%" stopColor="#e11d48" />
                      <stop offset="80%" stopColor="#be123c" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>
                    <radialGradient id="massHeartShine" cx="30%" cy="25%" r="40%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                      <stop offset="60%" stopColor="#ffffff" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                    <filter id="massHeartGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#e11d48" floodOpacity="0.6" />
                    </filter>
                  </defs>

                  {/* 3D Heart Base */}
                  <path
                    d="M 50,85 C 48,83 10,55 5,32 C 1,15 14,3 29,3 C 38,3 46,9 50,16 C 54,9 62,3 71,3 C 86,3 99,15 95,32 C 90,55 52,83 50,85 Z"
                    fill="url(#massHeartGrad3D)"
                    filter="url(#massHeartGlow)"
                  />

                  {/* Gloss 3D Highlight Arc on Top Left Lobe */}
                  <path
                    d="M 28,7 C 18,7 10,15 11,25 C 11.5,31 15,42 28,52 C 22,42 19,30 20,23 C 21,15 28,11 34,11 C 38,11 43,14 46,18 C 42,12 36,7 28,7 Z"
                    fill="url(#massHeartShine)"
                    opacity="0.95"
                  />

                  {/* Sparkle Glints on the Heart */}
                  <circle cx="50" cy="38" r="1.6" fill="#fef08a" />
                  <circle cx="34" cy="23" r="1.3" fill="#ffffff" />
                  <circle cx="68" cy="25" r="1.1" fill="#fef08a" opacity="0.85" />
                </svg>
              </div>

            </div>
          </div>

          {/* Interactive Floating Badge Under Heart */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-20">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/95 border border-rose-300 text-rose-600 text-[10px] font-bold tracking-wider shadow-md whitespace-nowrap animate-pulse">
              <span>✨ TAP HEART</span>
            </span>
          </div>
        </motion.div>

        {/* Project Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs sm:text-sm font-semibold mb-5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Deepest Feelings • For My Thenmozhi ❤️</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        </motion.div>

        {/* Beautiful Welcome Message with Caveat Handwritten Font */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-caveat text-5xl sm:text-7xl font-bold tracking-tight text-[#4a2c2a] mb-3 leading-tight drop-shadow-sm"
        >
          A Little Corner of
          <span className="block text-rose-600 mt-1">
            My Heart For You
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="font-sans text-xs sm:text-sm text-[#785350] max-w-sm mb-7 leading-relaxed font-normal"
        >
          Words can never truly capture everything my heart holds for you... this little space is crafted just for you, Thenmozhi.
        </motion.p>

        {/* Interactive "Open My Heart ❤️" Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenClick}
            className="relative group px-9 py-4 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-caveat text-2xl sm:text-3xl font-bold tracking-wide shadow-xl shadow-rose-300/60 border border-amber-200 flex items-center space-x-3 transition-all duration-300"
          >
            {/* Glowing Aura */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 to-amber-300 opacity-60 blur-md group-hover:opacity-90 transition duration-500" />

            <div className="relative flex items-center space-x-2.5 z-10">
              <span>Open My Heart</span>
              <Heart className="w-5 h-5 text-amber-200 fill-amber-200 animate-heartbeat" />
            </div>
          </motion.button>

          <p className="text-xs text-[#785350] mt-4 flex items-center space-x-1.5 font-medium">
            <Music className="w-3.5 h-3.5 text-rose-500" />
            <span>Vaarayo Vaarayo song begins on tap 🎵</span>
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
