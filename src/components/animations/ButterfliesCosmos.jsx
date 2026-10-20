import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { triggerHeartConfetti } from '../../utils/confetti';

/**
 * Enchanting Fluttering Butterflies, Stardust Trails, Corner Flourishes, and Glowing Borders
 * Cinema-Grade romantic animations for Selva & Sara
 */
export default function ButterfliesCosmos() {
  const [butterflies, setButterflies] = useState([]);

  useEffect(() => {
    // Generate 6 graceful butterflies with gentle curved flight paths
    const initialButterflies = [
      {
        id: 1,
        color: '#F472B6', // Warm rose
        accent: '#E11D48',
        size: 28,
        startX: 8,
        startY: 22,
        duration: 18,
        delay: 0,
      },
      {
        id: 2,
        color: '#FBBF24', // Amber gold
        accent: '#D97706',
        size: 24,
        startX: 88,
        startY: 32,
        duration: 22,
        delay: 2,
      },
      {
        id: 3,
        color: '#FB7185', // Rose petal
        accent: '#BE123C',
        size: 26,
        startX: 5,
        startY: 65,
        duration: 20,
        delay: 4,
      },
      {
        id: 4,
        color: '#FDA4AF', // Soft blush
        accent: '#F43F5E',
        size: 22,
        startX: 91,
        startY: 15,
        duration: 24,
        delay: 1,
      },
      {
        id: 5,
        color: '#E879F9', // Fairy orchid
        accent: '#A855F7',
        size: 25,
        startX: 14,
        startY: 82,
        duration: 21,
        delay: 3,
      },
      {
        id: 6,
        color: '#FDE047', // Champagne
        accent: '#EA580C',
        size: 21,
        startX: 82,
        startY: 75,
        duration: 25,
        delay: 5,
      },
    ];
    setButterflies(initialButterflies);
  }, []);

  const handleButterflyClick = (e) => {
    e.stopPropagation();
    triggerHeartConfetti();
    audioService.playChime('sweet');
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      
      {/* Aesthetic Blinking Outer Frame (Top, Bottom, Left, Right) */}
      <div className="absolute inset-0 pointer-events-none border-[3px] sm:border-[5px] border-rose-300/40 animate-border-blink rounded-none" />

      {/* 4 Glowing Corner Flourishes */}
      {/* Top Left Corner */}
      <div className="absolute top-2 left-2 text-rose-500/80 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)] flex items-center space-x-1">
        <Heart className="w-5 h-5 fill-rose-500/30 text-rose-500 animate-heartbeat" />
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      </div>

      {/* Top Right Corner */}
      <div className="absolute top-2 right-2 text-rose-500/80 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)] flex items-center space-x-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <Heart className="w-5 h-5 fill-rose-500/30 text-rose-500 animate-heartbeat" />
      </div>

      {/* Bottom Left Corner */}
      <div className="absolute bottom-2 left-2 text-rose-500/80 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)] flex items-center space-x-1">
        <Heart className="w-5 h-5 fill-rose-500/30 text-rose-500 animate-heartbeat" />
        <span className="text-[10px] font-caveat font-bold text-rose-600">Forever Us</span>
      </div>

      {/* Bottom Right Corner */}
      <div className="absolute bottom-2 right-2 text-rose-500/80 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)] flex items-center space-x-1">
        <span className="text-[10px] font-caveat font-bold text-rose-600">Sara ❤️</span>
        <Heart className="w-5 h-5 fill-rose-500/30 text-rose-500 animate-heartbeat" />
      </div>

      {/* Floating Fairy Vines & Hearts on Left Border */}
      <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-14 flex flex-col justify-around items-center opacity-85">
        {Array.from({ length: 7 }).map((_, idx) => (
          <motion.div
            key={`left-heart-${idx}`}
            animate={{
              y: [0, -45, 0],
              opacity: [0.4, 0.95, 0.4],
              scale: [0.85, 1.25, 0.85],
              rotate: [0, idx % 2 === 0 ? 18 : -18, 0],
            }}
            transition={{
              duration: 3.6 + idx * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.4,
            }}
            className="text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)] cursor-pointer pointer-events-auto"
            onClick={handleButterflyClick}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Floating Fairy Vines & Hearts on Right Border */}
      <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-14 flex flex-col justify-around items-center opacity-85">
        {Array.from({ length: 7 }).map((_, idx) => (
          <motion.div
            key={`right-heart-${idx}`}
            animate={{
              y: [0, -45, 0],
              opacity: [0.4, 0.95, 0.4],
              scale: [0.85, 1.25, 0.85],
              rotate: [0, idx % 2 === 0 ? -18 : 18, 0],
            }}
            transition={{
              duration: 4.0 + idx * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.35 + 0.3,
            }}
            className="text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)] cursor-pointer pointer-events-auto"
            onClick={handleButterflyClick}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Realistic Fluttering 3D Butterflies with Stardust Trails */}
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.startX}%`,
            top: `${b.startY}%`,
          }}
          animate={{
            x: [0, 95, 20, 130, -45, 0],
            y: [0, -115, -45, -180, -85, 0],
            rotate: [0, 20, -14, 25, -10, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
        >
          {/* Stardust Trail Behind Butterfly */}
          <div className="absolute -left-3 -top-2 flex space-x-1 pointer-events-none opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
            <span className="w-1 h-1 rounded-full bg-pink-400 animate-pulse" />
          </div>

          {/* Butterfly Body with 3D flapping wings */}
          <div
            onClick={handleButterflyClick}
            className="relative cursor-pointer pointer-events-auto group"
            style={{ width: b.size, height: b.size }}
          >
            {/* Subtle Radiant Aura */}
            <div
              className="absolute -inset-2 rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-300"
              style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)` }}
            />

            <svg
              viewBox="0 0 100 100"
              width={b.size}
              height={b.size}
              className="relative z-10 drop-shadow-[0_2px_8px_rgba(225,29,72,0.45)] group-hover:scale-125 transition-transform"
            >
              <defs>
                <linearGradient id={`butterGrad-${b.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor={b.color} />
                  <stop offset="100%" stopColor={b.accent} />
                </linearGradient>
              </defs>

              {/* Left Wing 3D Flap */}
              <motion.g
                animate={{
                  scaleX: [1, 0.12, 1],
                  skewY: [0, -15, 0],
                }}
                transition={{
                  duration: 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "50% 50%" }}
              >
                <path
                  d="M50 48 C35 18 10 24 15 50 C18 64 40 60 50 50 Z"
                  fill={`url(#butterGrad-${b.id})`}
                  opacity="0.92"
                />
                <path
                  d="M50 50 C38 56 24 74 35 82 C46 86 48 66 50 52 Z"
                  fill={`url(#butterGrad-${b.id})`}
                  opacity="0.85"
                />
              </motion.g>

              {/* Right Wing 3D Flap */}
              <motion.g
                animate={{
                  scaleX: [1, 0.12, 1],
                  skewY: [0, 15, 0],
                }}
                transition={{
                  duration: 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "50% 50%" }}
              >
                <path
                  d="M50 48 C65 18 90 24 85 50 C82 64 60 60 50 50 Z"
                  fill={`url(#butterGrad-${b.id})`}
                  opacity="0.92"
                />
                <path
                  d="M50 50 C62 56 76 74 65 82 C54 86 52 66 50 52 Z"
                  fill={`url(#butterGrad-${b.id})`}
                  opacity="0.85"
                />
              </motion.g>

              {/* Butterfly Slender Body & Antennae */}
              <ellipse cx="50" cy="50" rx="2.5" ry="12" fill="#4A2C2A" opacity="0.85" />
              <path d="M48 40 Q44 30 38 28 M52 40 Q56 30 62 28" stroke="#4A2C2A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </motion.div>
      ))}

    </div>
  );
}
