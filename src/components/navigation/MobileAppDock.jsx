import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, ScrollText, Gift, Sparkles } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';

export default function MobileAppDock() {
  const [activeSection, setActiveSection] = useState('hero');

  const dockItems = [
    { id: 'hero', label: 'Story', icon: Heart, href: '#photo-reveal' },
    { id: 'timeline', label: 'Timeline', icon: Calendar, href: '#timeline' },
    { id: 'letter', label: 'Letter', icon: ScrollText, href: '#letter' },
    { id: 'gift', label: 'Gift', icon: Gift, href: '#gift' },
    { id: 'childhood-surprise', label: 'Keepsake', icon: Sparkles, href: '#childhood-surprise' },
    { id: 'surprises', label: 'Surprise', icon: Heart, href: '#surprises' },
  ];

  const handleItemClick = (href, id) => {
    setActiveSection(id);
    audioService.playChime('sweet');
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none md:hidden">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative rounded-full px-3 py-2 flex items-center justify-between space-x-1 border-2 border-rose-300 shadow-2xl backdrop-blur-2xl pointer-events-auto max-w-sm w-full bg-white/95"
      >
        {/* Subtle breathing glow under dock */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 rounded-full blur-md opacity-40 -z-10 animate-pulse" />

        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.86 }}
              whileHover={{ scale: 1.08 }}
              onClick={() => handleItemClick(item.href, item.id)}
              className={`relative flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-rose-100 text-rose-700 font-bold shadow-sm'
                  : 'text-[#785350] hover:text-rose-600'
              }`}
            >
              <Icon
                className={`w-4 h-4 mb-0.5 transition-transform duration-300 ${
                  isActive ? 'text-rose-600 fill-rose-500/40 scale-110 animate-heartbeat' : ''
                }`}
              />
              <span className="text-[10px] leading-tight font-medium">{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId="activeDockDot"
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-rose-600"
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
