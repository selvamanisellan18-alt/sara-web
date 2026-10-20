import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import RelationshipTimer from '../common/RelationshipTimer';
import { triggerHeartConfetti, triggerRomanticExplosion } from '../../utils/confetti';
import { audioService } from '../../utils/audioSynthesizer';

export default function LoveAnimation() {
  const letters = "I LOVE YOU".split("");

  const subMessages = [
    { text: "Seven Years.", delay: 1.0 },
    { text: "Still You.", delay: 1.5 },
    { text: "Always You.", delay: 2.0 }
  ];

  return (
    <section id="love-animation" className="relative py-16 sm:py-24 px-4 overflow-hidden text-center">
      
      <div className="w-full max-w-4xl mx-auto z-10 relative">
        
        {/* Soft Romantic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-semibold mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>From The Depths Of My Soul</span>
        </motion.div>

        {/* Letter-by-Letter Animated "I LOVE YOU" with Interactive Spring Physics */}
        <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-2 mb-4">
          {letters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 35, scale: 0.6 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.25, y: -10, color: '#E11D48' }}
              whileTap={{ scale: 0.88 }}
              onMouseEnter={() => {
                if (char !== " ") audioService.playChime('sweet');
              }}
              onClick={() => {
                if (char !== " ") {
                  audioService.playChime('heart');
                  triggerHeartConfetti();
                }
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
                type: 'spring',
                stiffness: 140
              }}
              className={`font-caveat text-6xl sm:text-8xl md:text-9xl font-bold select-none drop-shadow-sm cursor-pointer transition-colors ${
                char === " " ? "w-3 sm:w-6" : "text-rose-600 hover:text-rose-700"
              }`}
            >
              {char}
            </motion.span>
          ))}

          {/* Heart icon at the end (Clickable for Confetti Burst!) */}
          <motion.button
            type="button"
            onClick={() => {
              triggerRomanticExplosion();
              audioService.playChime('heart');
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
            whileTap={{ scale: 0.85 }}
            viewport={{ once: true }}
            transition={{ delay: letters.length * 0.07 + 0.2, type: 'spring' }}
            className="inline-block ml-2 align-middle cursor-pointer focus:outline-none"
            aria-label="Send Love Heart Burst"
          >
            <Heart className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 text-rose-500 fill-rose-500 animate-heartbeat drop-shadow-md" />
          </motion.button>
        </div>

        {/* Staggered Additional Sincere Messages */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 my-6">
          {subMessages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: msg.delay }}
              className="flex items-center space-x-2"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="font-caveat text-3xl sm:text-4xl text-[#4a2c2a] font-bold">
                {msg.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Live Relationship Stopwatch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="mt-6"
        >
          <RelationshipTimer />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="text-[#785350] text-xs sm:text-sm font-medium mt-4 max-w-md mx-auto"
        >
          2,557 days of laughter, lessons, and choosing you every single morning.
        </motion.p>

      </div>
    </section>
  );
}
