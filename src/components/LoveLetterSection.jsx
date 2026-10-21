import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, FastForward, Feather } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { triggerLetterOpenSparkles } from '../utils/confetti';
import { audioService } from '../utils/audioSynthesizer';

export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(16); // ms per char (smooth & engaging)

  const letter = siteConfig.loveLetterTamil || siteConfig.loveLetter;
  const fullText = [
    letter.greeting,
    ...letter.paragraphs,
    letter.closing,
    letter.signature
  ].filter(Boolean).join("\n\n");

  const typingIndexRef = useRef(0);
  const typingTimerRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    if (isOpen && !isTypingComplete) {
      typingIndexRef.current = 0;
      setDisplayText("");

      const typeChar = () => {
        if (typingIndexRef.current < fullText.length) {
          setDisplayText(fullText.slice(0, typingIndexRef.current + 1));
          typingIndexRef.current++;
          typingTimerRef.current = setTimeout(typeChar, typingSpeed);
        } else {
          setIsTypingComplete(true);
        }
      };

      typingTimerRef.current = setTimeout(typeChar, 350);

      return () => clearTimeout(typingTimerRef.current);
    }
  }, [isOpen, typingSpeed]);

  const handleOpenLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
      triggerLetterOpenSparkles();
      audioService.playChime('gift');
    }
  };

  const handleSkipTyping = () => {
    clearTimeout(typingTimerRef.current);
    setDisplayText(fullText);
    setIsTypingComplete(true);
  };

  const handleResetLetter = () => {
    clearTimeout(typingTimerRef.current);
    setIsTypingComplete(false);
    setDisplayText("");
    typingIndexRef.current = 0;
    setIsOpen(false);
  };

  return (
    <section id="letter" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      
      <div className="w-full max-w-3xl mx-auto z-10 relative">
        
        {/* Soft Romantic Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-semibold mb-3">
            <Feather className="w-3.5 h-3.5 text-rose-500" />
            <span>Handwritten From My Soul</span>
          </div>
          
          <h2 className="font-caveat text-4xl sm:text-6xl font-bold text-[#4a2c2a] drop-shadow-sm">
            A Love Letter for Thenmozhi
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#785350] max-w-md mx-auto mt-2">
            Written straight from Selvamani's heart to Sara.
          </p>
        </div>

        {/* Envelope & Letter Container */}
        <div className="flex flex-col items-center">
          
          {/* Wax Sealed Envelope in Soft Blush Pink with Gold Ribbon */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                onClick={handleOpenLetter}
                className="w-full max-w-md cursor-pointer group"
              >
                <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-rose-50 via-white to-pink-50 border-2 border-rose-300 shadow-[0_20px_50px_rgba(225,29,72,0.18)] flex flex-col items-center text-center overflow-hidden animate-border-blink group-hover:scale-[1.02] transition-transform duration-300">
                  
                  {/* Luxury Gold/Rose Ribbon Band Across Envelope */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 bg-gradient-to-r from-amber-200/50 via-rose-300/40 to-amber-200/50 border-y border-amber-300/40 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 bg-gradient-to-b from-amber-200/50 via-rose-300/40 to-amber-200/50 border-x border-amber-300/40 pointer-events-none" />

                  {/* Envelope Flap Lines */}
                  <div className="absolute top-0 inset-x-0 h-28 border-b border-rose-200/90 bg-rose-100/50 [clip-path:polygon(0_0,100%_0,50%_100%)] pointer-events-none" />

                  {/* 3D Wax Seal with Blinking Sparkles */}
                  <div className="relative my-7 z-10">
                    {/* Blinking Twinkle Stars Around Wax Seal */}
                    <div className="absolute -top-3 -right-3 animate-blink-twinkle-1 pointer-events-none">
                      <Sparkles className="w-5 h-5 text-amber-400 fill-amber-300 drop-shadow-[0_0_8px_#f59e0b]" />
                    </div>
                    <div className="absolute -bottom-2 -left-3 animate-blink-twinkle-3 pointer-events-none">
                      <Sparkles className="w-4 h-4 text-rose-500 fill-rose-400 drop-shadow-[0_0_8px_#fb7185]" />
                    </div>

                    {/* Seal Ripple Halo */}
                    <div className="absolute -inset-2.5 rounded-full bg-rose-400/25 blur-md animate-pulse" />

                    <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-700 via-rose-500 to-amber-500 shadow-2xl shadow-rose-500/50 flex items-center justify-center border-2 border-amber-200 group-hover:rotate-6 group-hover:scale-110 transition duration-300">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border border-amber-200/60 flex flex-col items-center justify-center text-amber-100 shadow-inner bg-rose-600/30">
                        <Heart className="w-7 h-7 fill-amber-200 text-amber-200 mb-0.5 animate-heartbeat-mass" />
                        <span className="text-[10px] font-serif font-black tracking-widest uppercase text-amber-100 drop-shadow-sm">
                          S & T
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-caveat text-3xl sm:text-4xl font-bold text-[#4a2c2a] mb-1 drop-shadow-xs">
                    For Thenmozhi's Eyes Only 🌹
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-700/80 mb-6 font-medium">
                    A heartfelt letter from Selvamani • Tap the wax seal to open
                  </p>

                  <div className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs sm:text-sm font-semibold group-hover:from-rose-600 group-hover:to-rose-700 shadow-lg shadow-rose-300/60 transition flex items-center space-x-2 border border-rose-300/60">
                    <Sparkles className="w-4 h-4 text-amber-200 animate-spin-very-slow" />
                    <span>Break Seal & Read Letter 💌</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Opened Letter with Caveat & Tamil Handwritten Font */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-2xl"
            >
              {/* Typewriter Controls Toolbar */}
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-300 shadow-xs">
                  <Feather className="w-3.5 h-3.5 text-rose-500" />
                  <span>{isTypingComplete ? "Letter revealed ✨" : "Writing from heart..."}</span>
                </span>

                <div className="flex items-center space-x-2">
                  {!isTypingComplete && (
                    <button
                      onClick={handleSkipTyping}
                      className="px-3 py-1 rounded-lg bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 text-xs font-semibold flex items-center space-x-1 transition shadow-sm"
                    >
                      <FastForward className="w-3.5 h-3.5 text-rose-600" />
                      <span>Instant Reveal</span>
                    </button>
                  )}
                  <button
                    onClick={handleResetLetter}
                    className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 hover:bg-rose-50 text-[#4a2c2a] text-xs font-medium flex items-center space-x-1 transition shadow-sm"
                    title="Fold and re-seal letter"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                    <span>Fold Letter</span>
                  </button>
                </div>
              </div>

              {/* The Vintage Luxury Letter Sheet with User's Exact Caveat Styles */}
              <div className="parchment-aesthetic rounded-3xl p-6 sm:p-12 shadow-[0_25px_60px_rgba(225,29,72,0.15)] border-2 border-rose-200/90 text-[#4a2c2a] relative overflow-hidden">
                
                {/* 4 Ornate Victorian Filigree Corner Accents */}
                <div className="absolute top-3 left-3 text-rose-300/70 select-none pointer-events-none text-xl sm:text-2xl">
                  ❦
                </div>
                <div className="absolute top-3 right-3 text-rose-300/70 select-none pointer-events-none text-xl sm:text-2xl">
                  ❧
                </div>
                <div className="absolute bottom-3 left-3 text-rose-300/70 select-none pointer-events-none text-xl sm:text-2xl">
                  ❧
                </div>
                <div className="absolute bottom-3 right-3 text-rose-300/70 select-none pointer-events-none text-xl sm:text-2xl">
                  ❦
                </div>

                {/* User's Exact Requested Caveat Banner */}
                <div className="love-letter-text pb-4 mb-4 border-b border-rose-200/80">
                  To <br />
                  the love of my life <br />
                  <span className="small-text">wherever you are tonight</span>
                </div>

                {/* Romantic Golden Filigree Divider */}
                <div className="flex items-center justify-between pb-3 mb-4 text-xs font-serif text-rose-900/70 italic border-b border-dashed border-rose-200">
                  <span className="font-serif text-xs text-rose-800 font-semibold">
                    From: Selvamani • To: Thenmozhi (Sara)
                  </span>
                  <span>{letter.date}</span>
                </div>

                {/* Letter Body in Pure Handwritten Tamil Script */}
                <div className="font-tamil-letter text-lg sm:text-xl md:text-2xl text-[#3e2321] leading-[1.9] sm:leading-[2.1] space-y-4 whitespace-pre-line min-h-[300px]">
                  {displayText}
                  {!isTypingComplete && (
                    <span className="inline-block w-2 h-6 bg-rose-600 animate-pulse ml-1 align-middle rounded-full" />
                  )}
                </div>

                {/* Bottom Wax Seal Stamp & Dedication */}
                <div className="mt-8 pt-5 border-t border-rose-200 flex items-center justify-between flex-wrap gap-3">
                  <div className="text-xs sm:text-sm text-rose-800/80 font-tamil-letter italic font-medium">
                    எப்போதும் என் இதயத்தில் நிலைத்திருப்பவள் நீ ❤️
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-amber-500 text-amber-100 flex flex-col items-center justify-center font-serif text-xs font-bold border-2 border-amber-300 shadow-lg">
                      <Heart className="w-3.5 h-3.5 fill-amber-200 text-amber-200 mb-0.5" />
                      <span className="text-[10px] tracking-widest uppercase">S & T</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
