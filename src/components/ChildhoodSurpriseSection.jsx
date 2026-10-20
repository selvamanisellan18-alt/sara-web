import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Lock, Unlock, Maximize2, RotateCcw, X } from 'lucide-react';
import { triggerGiftBurst, triggerHeartConfetti, triggerRomanticExplosion } from '../utils/confetti';
import { audioService } from '../utils/audioSynthesizer';

export default function ChildhoodSurpriseSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleUnlockSurprise = () => {
    setIsRevealed(true);
    triggerRomanticExplosion();
    triggerGiftBurst();
    triggerHeartConfetti();
    audioService.playChime('gift');
  };

  const handleShowerLove = () => {
    triggerHeartConfetti();
    audioService.playChime('heart');
  };

  const handleRelock = () => {
    setIsRevealed(false);
    audioService.playChime('sweet');
  };

  return (
    <section id="childhood-surprise" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      
      <div className="w-full max-w-4xl mx-auto z-10 relative">
        
        {/* Soft Romantic Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 border border-amber-300/80 text-rose-800 text-xs sm:text-sm font-bold mb-3 shadow-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>EXCLUSIVE SECRET SURPRISE • FOR THENMOZHI ONLY 🌸</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          </div>
          
          <h2 className="font-caveat text-5xl sm:text-7xl font-bold text-[#4a2c2a] drop-shadow-sm">
            A Secret Keepsake From The Past
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#785350] max-w-lg mx-auto mt-2 leading-relaxed">
            There is one irreplaceable treasure I hold closer to my heart than anything else... A memory from before our stars aligned.
          </p>
        </div>

        {/* ========================================================
            LOCKED STATE: 3D Royal Keepsake Box
            ======================================================== */}
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="locked-chest"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center my-4"
            >
              <div
                onClick={handleUnlockSurprise}
                className="w-full max-w-md cursor-pointer group relative flex flex-col items-center select-none"
              >
                {/* Outward Expanding Glowing Concentric Rings */}
                <div className="absolute -inset-6 rounded-full border-2 border-rose-400/40 animate-ripple-wave-1 pointer-events-none" />
                <div className="absolute -inset-6 rounded-full border-2 border-amber-300/50 animate-ripple-wave-2 pointer-events-none" />

                {/* Glowing Ambient Radial Aura */}
                <div className="absolute -inset-6 bg-gradient-to-r from-rose-400/40 via-amber-300/30 to-pink-400/40 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

                {/* 3D Ornate Keepsake Chest Card */}
                <div className="relative w-full rounded-3xl p-8 sm:p-11 bg-gradient-to-br from-white via-rose-50 to-amber-50/60 border-2 border-amber-300 shadow-[0_20px_50px_rgba(244,63,94,0.18)] flex flex-col items-center text-center overflow-hidden animate-border-blink group-hover:scale-[1.02] transition-transform duration-300">
                  
                  {/* Decorative Corner Filigrees */}
                  <div className="absolute top-3 left-3 text-amber-500/60 text-xl font-serif select-none pointer-events-none">❦</div>
                  <div className="absolute top-3 right-3 text-amber-500/60 text-xl font-serif select-none pointer-events-none">❧</div>
                  <div className="absolute bottom-3 left-3 text-amber-500/60 text-xl font-serif select-none pointer-events-none">❧</div>
                  <div className="absolute bottom-3 right-3 text-amber-500/60 text-xl font-serif select-none pointer-events-none">❦</div>

                  {/* Ribbon Accents Across Card */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 bg-gradient-to-r from-amber-200/40 via-rose-300/30 to-amber-200/40 border-y border-amber-300/30 pointer-events-none" />

                  {/* 3D Glowing Lock Medallion */}
                  <div className="relative my-6 z-10">
                    {/* Blinking Orbiting Sparkles */}
                    <div className="absolute -top-3 -right-3 animate-blink-twinkle-1 pointer-events-none">
                      <Sparkles className="w-5 h-5 text-amber-500 fill-amber-300 drop-shadow-[0_0_8px_#f59e0b]" />
                    </div>
                    <div className="absolute -bottom-2 -left-3 animate-blink-twinkle-3 pointer-events-none">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-400 drop-shadow-[0_0_8px_#fb7185]" />
                    </div>

                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-1 shadow-2xl shadow-amber-400/50 group-hover:rotate-6 group-hover:scale-105 transition duration-300">
                      <div className="w-full h-full rounded-full bg-gradient-to-b from-rose-600 via-rose-500 to-rose-700 flex flex-col items-center justify-center text-amber-100 shadow-inner border border-amber-200/60">
                        <Lock className="w-8 h-8 text-amber-200 drop-shadow-md mb-1 animate-heartbeat" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-amber-200">
                          SECRET
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-caveat text-3xl sm:text-4xl font-bold text-[#4a2c2a] mb-2 drop-shadow-xs">
                    Little Angel Sara's Time Capsule 🌸
                  </h3>
                  <p className="text-xs sm:text-sm text-[#785350] mb-6 max-w-xs leading-relaxed font-medium">
                    A rare, innocent childhood photo of Thenmozhi that Selvamani holds sacred in his heart.
                  </p>

                  {/* CTA Button */}
                  <div className="relative group px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white font-caveat text-2xl font-bold tracking-wide shadow-xl shadow-rose-300/60 border border-amber-200 flex items-center space-x-2 transition-transform duration-300 group-hover:scale-105">
                    <Sparkles className="w-4 h-4 text-amber-200 animate-spin-very-slow" />
                    <span>Tap to Unlock Surprise 🎁</span>
                    <Heart className="w-4 h-4 text-amber-200 fill-amber-200 animate-heartbeat" />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (

            /* ========================================================
               REVEALED STATE: Full Mass Childhood Photo Showcase
               ======================================================== */
            <motion.div
              key="revealed-chest"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="w-full"
            >
              <div className="glass-panel-rose rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-[0_25px_60px_rgba(244,63,94,0.2)] relative overflow-hidden animate-border-blink bg-gradient-to-br from-[#ffffff] via-[#fff5f6] to-[#fffdf5]">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-rose-200">
                  <div className="flex items-center space-x-2">
                    <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold border border-rose-300 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span>Year 2000s • The Innocent Angel 🌸</span>
                    </span>
                    <span className="text-xs font-serif italic text-amber-700 font-semibold hidden sm:inline">
                      Before Our Stars Aligned
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="px-3 py-1 rounded-lg bg-white border border-rose-300 text-rose-700 text-xs font-semibold hover:bg-rose-50 transition flex items-center space-x-1 shadow-sm"
                      title="View Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-rose-600" />
                      <span className="hidden sm:inline">Zoom Photo</span>
                    </button>

                    <button
                      onClick={handleRelock}
                      className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-[#785350] text-xs font-medium hover:bg-rose-50 transition flex items-center space-x-1 shadow-sm"
                      title="Re-lock Keepsake Box"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                      <span className="hidden sm:inline">Re-lock</span>
                    </button>
                  </div>
                </div>

                {/* Main Content Grid: Image + Heartfelt Poem */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Childhood Photo in Royal Vintage Floral Frame */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    <div 
                      onClick={() => {
                        handleShowerLove();
                        setIsFullscreen(true);
                      }}
                      className="relative group cursor-pointer w-full max-w-sm rounded-3xl p-3 bg-gradient-to-tr from-amber-300 via-rose-300 to-amber-200 shadow-2xl shadow-rose-300/50 hover:scale-[1.02] transition-transform duration-500"
                    >
                      {/* Inner Glass Matting */}
                      <div className="relative rounded-2xl overflow-hidden bg-white p-2 border border-white/80 shadow-inner">
                        
                        {/* The Childhood Photo */}
                        <img
                          src="/images/sara_real/sara_childhood.jpg"
                          alt="Little Angel Thenmozhi (Sara)"
                          className="w-full h-auto aspect-square object-contain rounded-xl transition duration-700 group-hover:scale-105"
                        />

                        {/* Floating Heart Sticker on Hover */}
                        <div className="absolute bottom-4 right-4 bg-white/95 rounded-full p-2 shadow-lg border border-rose-200 opacity-90 group-hover:scale-110 transition">
                          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-heartbeat" />
                        </div>
                      </div>

                      {/* Photo Caption Badge Underneath */}
                      <div className="mt-3 text-center">
                        <span className="inline-block px-3 py-0.5 rounded-full bg-white/95 border border-amber-300 text-rose-800 text-[11px] font-bold tracking-wide shadow-xs">
                          🌸 Little Thenmozhi (Sara) • Pure Innocence
                        </span>
                      </div>
                    </div>

                    {/* Interactive Button Below Photo */}
                    <button
                      onClick={handleShowerLove}
                      className="mt-4 px-4 py-1.5 rounded-full bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-700 text-xs font-bold transition flex items-center space-x-1.5 shadow-sm active:scale-95"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-heartbeat" />
                      <span>Tap to Shower Love on Little Sara 💖</span>
                    </button>
                  </div>

                  {/* Right Column: Heartfelt Tamil Poem & Words from Selvamani */}
                  <div className="lg:col-span-7 space-y-5 text-left">
                    
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block mb-1">
                        First Sight Before Destiny • முதல் பார்வைக்கு முன்பே
                      </span>
                      <h3 className="font-caveat text-4xl sm:text-5xl font-bold text-[#4a2c2a] leading-tight">
                        என் உலகத்தின் தொடக்கம் ✨
                      </h3>
                    </div>

                    {/* The Pure Poetic Tamil Stanza */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border-2 border-rose-200/80 shadow-sm relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-rose-300/40 select-none text-3xl font-serif">❦</div>
                      
                      <p className="font-tamil-letter text-xl sm:text-2xl text-[#3e2321] leading-relaxed whitespace-pre-line font-medium">
{`இந்த உலகத்துக்கு நீ அப்போ
ஒரு அழகான குழந்தை தான்...
ஆனா என் மனசுக்குத் தெரியும் அன்பே,
என் மொத்த உலகமுமே
அன்னைக்கே இந்தச் சின்ன விழிகளுக்குள்ளதான்
ஒளிஞ்சு கிடந்திருக்கு! ✨`}
                      </p>
                    </div>

                    {/* Selva's Personal Heartfelt English Reflection */}
                    <p className="text-sm sm:text-base text-[#4a2c2a] leading-relaxed font-sans font-normal">
                      Looking at this innocent picture of you, my heart overflows with tenderness. Long before we ever met, the universe was carefully shaping the gentlest, sweetest soul to one day become the queen of my world. Protecting this smile and honoring your heart will forever be my life's greatest joy.
                    </p>

                    {/* Dedication Stamp */}
                    <div className="pt-4 border-t border-rose-200 flex items-center justify-between flex-wrap gap-2 text-xs text-[#785350]">
                      <span className="font-caveat text-xl font-bold text-rose-700">
                        Forever in awe of you, Sara ❤️
                      </span>
                      <span className="font-serif italic font-semibold text-rose-800">
                        — With endless love, Selvamani
                      </span>
                    </div>

                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ========================================================
          FULLSCREEN LIGHTBOX MODAL FOR CLOSE-UP VIEW
          ======================================================== */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-rose-300 flex flex-col items-center animate-scaleUp"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden border border-rose-200 shadow-md max-h-[70vh] flex items-center justify-center bg-rose-50">
                <img
                  src="/images/sara_real/sara_childhood.jpg"
                  alt="Little Angel Sara Childhood"
                  className="w-full h-auto object-contain max-h-[65vh]"
                />
              </div>

              <div className="mt-4 text-center">
                <h4 className="font-caveat text-3xl font-bold text-[#4a2c2a]">
                  Little Angel Thenmozhi 🌸
                </h4>
                <p className="text-xs text-[#785350] mt-1 font-tamil-letter text-base">
                  இந்த உலகத்தின் மிக அழகான தொடக்கம் ✨
                </p>
                <button
                  onClick={handleShowerLove}
                  className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-caveat text-xl font-bold flex items-center space-x-2 mx-auto shadow-md"
                >
                  <Heart className="w-4 h-4 fill-white text-white animate-heartbeat" />
                  <span>Shower Love 💖</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
