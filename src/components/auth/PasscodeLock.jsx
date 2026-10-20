import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Lock, Unlock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { triggerHeartConfetti, triggerRomanticExplosion } from '../../utils/confetti';
import { audioService } from '../../utils/audioSynthesizer';

/**
 * Cinema-Grade Romantic Login & Credential Portal
 * Secret Passcode: sara (Case-insensitive)
 * Compact, proportional design (NOT oversized / zoomed in)
 * Explicit confirmation on unlock
 */
export default function PasscodeLock({ onAuthenticated }) {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Auto focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    if (isUnlocked || isConfirming) return;
    const val = e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase().slice(0, 4);
    setPasscode(val);
    setErrorMsg('');

    if (val.length > 0) {
      audioService.playChime('sweet');
    }

    // Do NOT auto-validate: User must explicitly confirm by clicking the button!
  };

  const handleConfirmUnlock = (text) => {
    if (text.length < 4) {
      setErrorMsg('Please enter all 4 letters of the passcode ❤️');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (text.toLowerCase() === 'sara') {
      setIsConfirming(true);
      setIsUnlocked(true);
      setErrorMsg('');
      triggerRomanticExplosion();
      triggerHeartConfetti();
      audioService.playChime('gift');

      setTimeout(() => {
        onAuthenticated();
      }, 1000);
    } else {
      setShake(true);
      setErrorMsg('Incorrect passcode. Please try again with love ❤️');
      audioService.playChime('sweet');

      setTimeout(() => {
        setShake(false);
        setPasscode('');
        if (inputRef.current) inputRef.current.value = '';
      }, 700);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirmUnlock(passcode);
  };

  const handleCardClick = () => {
    if (inputRef.current && !isUnlocked && !isConfirming) {
      inputRef.current.focus();
    }
  };

  // Convert passcode string to 4 slot chars
  const slots = [0, 1, 2, 3].map((i) => passcode[i] || '');
  const isReadyToConfirm = passcode.length === 4;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-start sm:justify-center p-3 py-6 sm:py-10 bg-gradient-to-b from-[#fdf1f0] via-[#fff5f6] to-[#ffffff] overflow-y-auto overflow-x-hidden select-none"
    >
      {/* Soft Ambient Rose & Peach Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-[380px] h-[380px] bg-rose-300/30 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-pink-200/40 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"
        style={{ animationDelay: '2.5s' }}
      />

      {/* Floating Background Heart Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`bg-heart-${i}`}
            className="absolute text-rose-400"
            style={{
              top: `${(i * 15 + 8) % 100}%`,
              left: `${(i * 22 + 5) % 100}%`,
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, i % 2 === 0 ? 12 : -12, 0],
              opacity: [0.25, 0.75, 0.25],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: 4.5 + (i % 3) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i % 4) * 0.9,
            }}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-400" />
          </motion.div>
        ))}
      </div>

      {/* Main Luxury Glassmorphic Credential Card - Perfectly Compact & Proportioned */}
      <motion.div
        onClick={handleCardClick}
        animate={shake ? { x: [-10, 10, -7, 7, -3, 3, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[340px] sm:max-w-[365px] relative z-10 glass-panel-rose rounded-3xl p-5 sm:p-7 pt-5 sm:pt-6 border-2 border-rose-300 shadow-[0_15px_40px_rgba(225,29,72,0.14)] text-center backdrop-blur-2xl cursor-pointer animate-border-blink my-auto"
      >
        {/* ========================================================
            MASS LUXURY 3D HEART & LOCKET (Compact & Symmetrical)
            ======================================================== */}
        <div className="relative flex justify-center mb-3 pt-1">
          <motion.div
            animate={
              isUnlocked
                ? { scale: [1, 1.2, 1.1], rotate: [0, -6, 6, 0] }
                : { y: [0, -3, 0] }
            }
            transition={{
              duration: isUnlocked ? 0.6 : 3.5,
              repeat: isUnlocked ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className="relative select-none"
          >
            {/* Outward Expanding Glowing Concentric Ripple Waves */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-rose-500/70 animate-ripple-wave-1 pointer-events-none" />
            <div className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-rose-400/60 animate-ripple-wave-2 pointer-events-none" />
            <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-amber-300/60 animate-ripple-wave-3 pointer-events-none" />

            {/* Rotating Celestial Orbit Ring with Twinkling Blinking Sparkles */}
            <div className="absolute -inset-4 sm:-inset-5 rounded-full border border-dashed border-rose-300/60 animate-orbit-rotate pointer-events-none">
              {/* Blinking Sparkle 1: Top (12 o'clock) */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 animate-blink-twinkle-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-300 drop-shadow-[0_0_8px_#f59e0b]" />
              </div>

              {/* Blinking Sparkle 2: Right (3 o'clock) */}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 animate-blink-twinkle-2">
                <Sparkles className="w-3 h-3 text-rose-500 fill-rose-400 drop-shadow-[0_0_8px_#fb7185]" />
              </div>

              {/* Blinking Sparkle 3: Bottom (6 o'clock) */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 animate-blink-twinkle-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-300 drop-shadow-[0_0_8px_#f59e0b]" />
              </div>

              {/* Blinking Sparkle 4: Left (9 o'clock) */}
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 animate-blink-twinkle-4">
                <Sparkles className="w-3 h-3 text-pink-500 fill-pink-400 drop-shadow-[0_0_8px_#ec4899]" />
              </div>
            </div>

            {/* Counter-rotating Orbit Ring with Satellite Mini Heart */}
            <div className="absolute -inset-2.5 rounded-full border border-rose-200/40 animate-orbit-reverse pointer-events-none">
              <div className="absolute top-0 right-1/4 animate-blink-twinkle-5">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 shadow-[0_0_8px_#f59e0b]" />
              </div>
              <div className="absolute bottom-0 left-1/4 animate-blink-twinkle-2">
                <Heart className="w-2 h-2 text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_#f43f5e]" />
              </div>
            </div>

            {/* Glowing Ambient Radial Aura */}
            <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-rose-500/30 via-pink-400/25 to-amber-300/30 blur-md animate-pulse pointer-events-none" />

            {/* Little Crown Decor with Golden Glow */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse">
              <svg width="18" height="13" viewBox="0 0 24 16" fill="currentColor">
                <path d="M2 14L4 4L9 9L12 2L15 9L20 4L22 14H2Z" />
              </svg>
            </div>

            {/* Main 3D Medallion Disc - Refined Compact Size */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-rose-600 via-rose-400 to-amber-300 p-1 shadow-xl shadow-rose-400/40">
              {/* Inner Pearlescent Glass Disc */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-white via-[#fff1f2] to-[#ffe4e6] flex flex-col items-center justify-center relative overflow-hidden shadow-inner border border-white/80">
                
                {/* Glass Specular Reflection on Upper Disc */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none rounded-t-full" />

                {isUnlocked ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center text-rose-600 z-10"
                  >
                    <Unlock className="w-8 h-8 drop-shadow-[0_0_12px_rgba(225,29,72,0.7)] animate-pulse" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-rose-600 mt-0.5">
                      Open Sara ❤️
                    </span>
                  </motion.div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center justify-center animate-heartbeat-mass">
                    {/* 3D Sculpted Glowing Beating Heart */}
                    <svg
                      viewBox="0 0 100 90"
                      className="w-10 h-10 sm:w-11 sm:h-11"
                    >
                      <defs>
                        <linearGradient id="lockHeartGrad3D" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ff4365" />
                          <stop offset="40%" stopColor="#e11d48" />
                          <stop offset="80%" stopColor="#be123c" />
                          <stop offset="100%" stopColor="#881337" />
                        </linearGradient>
                        <radialGradient id="lockHeartShine" cx="30%" cy="25%" r="40%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>
                        <filter id="lockHeartGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#e11d48" floodOpacity="0.6" />
                        </filter>
                      </defs>

                      {/* 3D Heart Base */}
                      <path
                        d="M 50,85 C 48,83 10,55 5,32 C 1,15 14,3 29,3 C 38,3 46,9 50,16 C 54,9 62,3 71,3 C 86,3 99,15 95,32 C 90,55 52,83 50,85 Z"
                        fill="url(#lockHeartGrad3D)"
                        filter="url(#lockHeartGlow)"
                      />

                      {/* Gloss 3D Highlight Arc on Top Left Lobe */}
                      <path
                        d="M 28,7 C 18,7 10,15 11,25 C 11.5,31 15,42 28,52 C 22,42 19,30 20,23 C 21,15 28,11 34,11 C 38,11 43,14 46,18 C 42,12 36,7 28,7 Z"
                        fill="url(#lockHeartShine)"
                        opacity="0.95"
                      />

                      {/* Sparkle Glints */}
                      <circle cx="50" cy="38" r="1.5" fill="#fef08a" />
                      <circle cx="34" cy="23" r="1.2" fill="#ffffff" />
                      <circle cx="68" cy="25" r="1" fill="#fef08a" opacity="0.85" />
                    </svg>

                    {/* Cute Golden Lock Accent on Bottom Right of Heart */}
                    <div className="absolute -bottom-1 -right-1 bg-amber-400 text-rose-950 p-0.5 rounded-full shadow-md border border-amber-200">
                      <Lock className="w-2.5 h-2.5 text-amber-950" />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </div>

        {/* Clean & Sweet Romantic Heading */}
        <h1 className="font-caveat text-3xl sm:text-4xl text-[#4a2c2a] font-bold drop-shadow-sm mb-3">
          For You, Sara ❤️
        </h1>

        {/* Hidden Form & Transparent Mobile-Friendly Input */}
        <form onSubmit={handleSubmit} className="relative mb-3">
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            maxLength={4}
            value={passcode}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="absolute inset-0 opacity-0 cursor-pointer z-20 w-full h-full text-transparent bg-transparent"
            aria-label="Secret Passcode Input"
          />

          {/* 4 Elegant Visual Passcode Slots - Compact & Balanced */}
          <div className="flex justify-center items-center space-x-2 sm:space-x-2.5">
            {slots.map((char, index) => {
              const isFilled = char !== '';
              const isActive = passcode.length === index && isFocused;
              return (
                <motion.div
                  key={`slot-${index}`}
                  animate={isFilled ? { scale: [0.94, 1.06, 1] } : {}}
                  transition={{ duration: 0.18 }}
                  className={`rounded-xl flex items-center justify-center transition-all duration-300 relative shadow-sm ${
                    isFilled
                      ? 'bg-rose-100 border-2 border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                      : isActive
                      ? 'bg-white border-2 border-rose-400 animate-pulse shadow-md'
                      : 'bg-white/90 border border-rose-200'
                  }`}
                  style={{ width: '2.8rem', height: '3.4rem' }}
                >
                  {isFilled ? (
                    <span className="font-caveat text-2xl sm:text-3xl font-bold text-[#4a2c2a] lowercase">
                      {char}
                    </span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-rose-300" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </form>

        {/* Error Message Alert */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="p-2 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-[11px] mb-3 flex items-center justify-center space-x-1.5"
            >
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Hint Pill when 4 characters are entered */}
        <AnimatePresence>
          {isReadyToConfirm && !isUnlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-2.5 px-3 py-1 rounded-full bg-rose-100/90 border border-rose-300 text-rose-700 text-[11px] font-semibold flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Passcode entered! Click below to confirm ✨</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explicit Confirmation Submit Button */}
        <motion.button
          type="button"
          onClick={() => handleConfirmUnlock(passcode)}
          disabled={isUnlocked || isConfirming}
          whileHover={{ scale: isReadyToConfirm ? 1.02 : 1 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-2.5 sm:py-3 rounded-2xl font-caveat text-2xl font-bold shadow-md transition-all flex items-center justify-center space-x-2 ${
            isUnlocked
              ? 'bg-gradient-to-r from-emerald-500 to-rose-500 text-white shadow-emerald-200'
              : isReadyToConfirm
              ? 'bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white shadow-rose-300/60 border border-amber-200 animate-pulse'
              : 'bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400 text-white/90 shadow-rose-200 hover:brightness-105'
          }`}
        >
          {isUnlocked ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Confirmed! Welcome Sara ❤️</span>
            </>
          ) : isReadyToConfirm ? (
            <>
              <span>Confirm & Unlock Portal</span>
              <ArrowRight className="w-4 h-4 text-amber-200 ml-1" />
            </>
          ) : (
            <>
              <span>Unlock Portal</span>
              <ArrowRight className="w-4 h-4 text-white/80 ml-1" />
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
