import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Eye, Camera } from 'lucide-react';
import { triggerHeartConfetti, triggerRomanticExplosion } from '../../utils/confetti';
import { audioService } from '../../utils/audioSynthesizer';

export default function PhotoReveal({ photoUrl, onOpenPhotoModal }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleRevealClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      triggerRomanticExplosion();
      triggerHeartConfetti();
      audioService.playChime('gift');
    }
  };

  return (
    <section id="photo-reveal" className="relative py-12 sm:py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Soft Romantic Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Queen Of My Heart • Thenmozhi</span>
        </div>

        <h2 className="font-caveat text-5xl sm:text-7xl font-bold text-[#4a2c2a] drop-shadow-sm mb-1">
          My Beautiful Thenmozhi 🌸
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#785350] max-w-md mx-auto mb-6">
          The radiant smile that brought warmth, peace, and true happiness to my life.
        </p>

        {/* 3D Tilt & Glowing Soft Frame */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleRevealClick}
          className="relative cursor-pointer group my-2"
        >
          {/* Animated Glowing Soft Aura */}
          <div className="absolute -inset-3 bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 rounded-[2.5rem] blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 animate-pulse-glow" />

          {/* Perspective Container */}
          <motion.div
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="relative w-64 h-88 sm:w-80 sm:h-[26rem] max-w-[85vw] rounded-[2.2rem] p-[3px] bg-gradient-to-tr from-rose-400 via-pink-200 to-amber-300 shadow-2xl backdrop-blur-xl animate-border-blink"
          >
            <div className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden bg-rose-50 flex items-center justify-center">
              
              {/* Blurred ambient backdrop so uncropped photo looks seamless */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-lg opacity-40 scale-110"
                style={{ backgroundImage: `url(${photoUrl})` }}
              />

              {/* Elegantly Framed Portrait Photo */}
              <img
                src={photoUrl}
                alt="Thenmozhi (Sara)"
                className={`relative z-10 w-full h-full object-cover object-top rounded-[1.9rem] transition-all duration-1000 ${
                  isRevealed
                    ? 'filter-none scale-100'
                    : 'filter blur-2xl grayscale scale-105 opacity-30'
                }`}
              />

              {/* Reveal Curtain / Veil */}
              <AnimatePresence>
                {!isRevealed && (
                  <motion.div
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 z-20 bg-gradient-to-b from-rose-100/90 via-pink-50/90 to-rose-100/95 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-white border border-rose-300 flex items-center justify-center mb-3 text-rose-500 shadow-md group-hover:scale-110 transition duration-300">
                      <Eye className="w-8 h-8 animate-pulse text-rose-500" />
                    </div>
                    <h3 className="font-caveat text-3xl font-bold text-[#4a2c2a] mb-1">
                      Tap to Reveal Thenmozhi
                    </h3>
                    <p className="text-xs text-[#785350] max-w-[190px] font-medium">
                      The soul that captured my heart
                    </p>
                    <div className="mt-4 px-4 py-1.5 rounded-full bg-rose-500 text-white text-xs font-semibold shadow-md group-hover:bg-rose-600 transition">
                      Touch Here 🌹
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Label After Reveal */}
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-4 text-center"
                >
                  <p className="font-caveat text-3xl font-bold text-white tracking-wide drop-shadow-md">
                    Thenmozhi (Sara) ✨
                  </p>
                  <p className="text-[11px] text-rose-200 font-medium">
                    My constant in an ever-changing world
                  </p>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>

        {/* Personalized Message after Reveal */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-6 max-w-xl p-6 rounded-3xl glass-panel-rose border-2 border-rose-300 shadow-lg text-center"
            >
              <p className="font-caveat text-3xl sm:text-4xl text-[#4a2c2a] font-bold leading-relaxed">
                “Out of everyone in this world, my heart still chooses you.”
              </p>
              <div className="flex items-center justify-center space-x-2 mt-2 text-xs text-rose-600 font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Seven Years • Selva & Sara</span>
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* End of photo reveal card */}
      </div>
    </section>
  );
}
