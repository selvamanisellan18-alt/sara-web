import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Calendar, Star, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { timelineMilestones } from '../data/timelineData';
import { audioService } from '../utils/audioSynthesizer';
import { triggerHeartConfetti } from '../utils/confetti';

export default function TimelineSection() {
  const [activeYear, setActiveYear] = useState(1);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const scrollContainerRef = useRef(null);

  const activeMilestone =
    timelineMilestones.find((m) => m.yearNumber === activeYear) || timelineMilestones[0];

  const handleSelectYear = (year) => {
    setActiveYear(year);
    audioService.playChime('sweet');
    triggerHeartConfetti();
  };

  const handlePrev = () => {
    const prevYear = activeYear === 1 ? 7 : activeYear - 1;
    handleSelectYear(prevYear);
  };

  const handleNext = () => {
    const nextYear = activeYear === 7 ? 1 : activeYear + 1;
    handleSelectYear(nextYear);
  };

  // Continuous auto-rotation timer ("suthanum")
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setActiveYear((prev) => (prev === 7 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Infinite marquee cards list (duplicated for smooth continuous loop)
  const marqueeCards = [...timelineMilestones, ...timelineMilestones];

  return (
    <section id="timeline" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        
        {/* Soft Romantic Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-semibold mb-3 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-heartbeat" />
            <span>Our Love Journey • Chapters of Us</span>
          </div>

          <h2 className="font-caveat text-5xl sm:text-7xl font-bold text-[#4a2c2a] drop-shadow-sm">
            Seven Chapters of Loving You
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#785350] max-w-lg mx-auto mt-2 leading-relaxed">
            Every single year has been a masterclass in learning, adoring, and cherishing who you are. Here is our story, chapter by chapter.
          </p>

          {/* Chapter indicator */}
          <div className="flex items-center justify-center mt-3 text-xs text-[#785350]">
            <span className="font-caveat text-xl sm:text-2xl font-bold text-rose-700">
              Chapter {activeYear} of 7 • {activeMilestone.yearRange}
            </span>
          </div>
        </div>

        {/* 
          ROTATING CAROUSEL WITH SIDE FADE EFFECT (User's Exact CSS Mask)
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        */}
        <div className="relative my-6 group">
          {/* Edge Fade Mask Container */}
          <div
            className="w-full overflow-hidden py-4 edge-fade-mask"
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
          >
            {/* Animated Marquee Flex Strip that rotates smoothly */}
            <motion.div
              animate={{
                x: [0, -1120],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 28,
                  ease: "linear",
                },
              }}
              className="flex space-x-4 w-max px-4"
            >
              {marqueeCards.map((m, idx) => {
                const isSelected = m.yearNumber === activeYear;
                return (
                  <div
                    key={`card-${idx}-${m.yearNumber}`}
                    onClick={() => handleSelectYear(m.yearNumber)}
                    className={`flex-shrink-0 cursor-pointer flex flex-col items-center justify-center p-3 text-center transition-all duration-300 relative rounded-[22px] ${
                      isSelected
                        ? 'bg-gradient-to-b from-rose-50 via-white to-pink-50 border-2 border-rose-500 shadow-xl shadow-rose-300/50 -translate-y-2 scale-105 ring-2 ring-rose-400/40'
                        : 'bg-white hover:bg-rose-50/70 border border-rose-200 shadow-sm hover:shadow-lg hover:shadow-rose-200/50 hover:-translate-y-2'
                    }`}
                    style={{
                      width: '142px',
                      height: '135px',
                    }}
                  >
                    {/* Active Glowing Dot Badge */}
                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    )}

                    {/* Romantic Emoji Icon */}
                    <div className="text-2xl sm:text-3xl mb-1 transform group-hover:scale-110 transition-transform">
                      {m.icon || '❤️'}
                    </div>

                    {/* Year Label in Caveat Font */}
                    <span className="font-caveat text-2xl font-bold text-[#4a2c2a] leading-tight">
                      {m.yearLabel}
                    </span>

                    {/* Clean Year Range */}
                    <span className="text-[11px] font-medium text-[#785350] mt-0.5 leading-tight">
                      {m.yearRange}
                    </span>

                    {/* Sub title / tag */}
                    <span
                      className={`text-[10px] font-semibold mt-1 px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {m.shortTag || m.tag}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-rose-300 text-rose-700 hover:bg-rose-50 shadow-md flex items-center justify-center transition active:scale-90"
            aria-label="Previous Chapter"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-rose-300 text-rose-700 hover:bg-rose-50 shadow-md flex items-center justify-center transition active:scale-90"
            aria-label="Next Chapter"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 7 Quick Bullet Indicators for Mobile */}
        <div className="flex items-center justify-center space-x-2 my-4">
          {timelineMilestones.map((m) => (
            <button
              key={m.yearNumber}
              onClick={() => handleSelectYear(m.yearNumber)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeYear === m.yearNumber
                  ? 'w-7 bg-rose-600 shadow-sm'
                  : 'w-2 bg-rose-200 hover:bg-rose-300'
              }`}
              title={`Go to Year ${m.yearNumber}`}
            />
          ))}
        </div>

        {/* Milestone Showcase Card with Framer Motion Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.yearNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="glass-panel-rose rounded-3xl p-6 sm:p-10 border-2 border-rose-300 shadow-xl relative overflow-hidden animate-border-blink mt-6"
          >
            {/* Top Badge & Year Details */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center space-x-3">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-caveat font-bold text-3xl flex items-center justify-center shadow-md">
                  {activeMilestone.yearNumber}
                </span>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-rose-600 block">
                    Chapter {activeMilestone.yearNumber} • {activeMilestone.yearRange}
                  </span>
                  <h3 className="font-caveat text-3xl sm:text-4xl font-bold text-[#4a2c2a]">
                    {activeMilestone.title}
                  </h3>
                </div>
              </div>

              <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-300 flex items-center space-x-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>{activeMilestone.tag}</span>
              </span>
            </div>

            {/* Content Grid: Memory Reflection + Visual */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Text Description */}
              <div className="lg:col-span-7 space-y-4">
                <p className="font-caveat text-2xl sm:text-3xl text-rose-700 font-bold leading-relaxed">
                  "{activeMilestone.subtitle}"
                </p>

                <p className="font-sans text-sm sm:text-base text-[#4a2c2a] leading-relaxed">
                  {activeMilestone.description}
                </p>

                {/* Golden Highlight Card */}
                <div className="p-4 rounded-2xl bg-rose-50/90 border border-amber-300/80 flex items-start space-x-3 shadow-sm">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-0.5">
                      Unforgettable Highlight
                    </span>
                    <p className="text-xs sm:text-sm text-[#4a2c2a] font-medium">
                      {activeMilestone.highlight}
                    </p>
                  </div>
                </div>

                {/* Romantic Quote */}
                <div className="border-l-3 border-rose-500 pl-4 py-1">
                  <p className="font-caveat text-xl sm:text-2xl text-rose-800 font-semibold">
                    {activeMilestone.quote}
                  </p>
                </div>
              </div>

              {/* Milestone Photo Card */}
              <div className="lg:col-span-5">
                <div className="relative group rounded-2xl overflow-hidden border-2 border-rose-300 shadow-xl aspect-[3/4] max-h-[380px] bg-rose-50 flex items-center justify-center">
                  {/* Blurred backdrop */}
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-md opacity-40 scale-110"
                    style={{ backgroundImage: `url(${activeMilestone.image})` }}
                  />

                  <img
                    src={activeMilestone.image}
                    alt={activeMilestone.title}
                    className="relative z-10 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-rose-300" />
                      <span>Chapter {activeMilestone.yearNumber} ({activeMilestone.yearRange})</span>
                    </span>
                    <span className="font-caveat text-lg text-amber-200 font-bold">
                      Sara ❤️
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
