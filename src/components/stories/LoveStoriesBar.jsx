import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { audioService } from '../../utils/audioSynthesizer';
import { triggerHeartConfetti } from '../../utils/confetti';

const storiesData = [
  {
    id: 1,
    title: "Little Angel",
    tagline: "Before Our Stars Aligned",
    image: "/images/sara_real/sara_childhood.jpg",
    caption: "The purest innocent smile. Little did the world know that this sweet girl would one day grow up and become the queen of my heart.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    title: "Her Smile",
    tagline: "My Favorite View",
    image: "/images/sara_real/sara_portrait.jpg",
    caption: "The playful twinkle in your eyes and your unfiltered smile. Even on the stormiest days, looking at this picture brings warmth to my soul.",
    gradient: "from-rose-600 to-amber-500",
  },
  {
    id: 3,
    title: "Pink Lehenga",
    tagline: "Pure Royal Grace",
    image: "/images/sara_real/sara_grace.jpg",
    caption: "Standing in that pink traditional lehenga with unmatched grace. You carry yourself with such dignity that makes me endlessly proud.",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: 4,
    title: "Garden Bloom",
    tagline: "Everyday Sunshine",
    image: "/images/sara_real/sara_candid.jpg",
    caption: "No filters, no pretenses—just you beside the flowers with your long braided hair. True beauty is effortless, and you define it.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 5,
    title: "Gentle Soul",
    tagline: "Unconditional Kindness",
    image: "/images/sara_real/sara_sweet.jpg",
    caption: "The tender warmth in your eyes when holding a little child. Your compassion is a rare gift to this world, Sara.",
    gradient: "from-amber-500 to-rose-500",
  },
];

export default function LoveStoriesBar() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);

  // Auto-progress stories like Instagram
  useEffect(() => {
    if (activeStoryIndex === null) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const duration = 5000; // 5 seconds per story
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Go to next story or close
          if (activeStoryIndex < storiesData.length - 1) {
            setActiveStoryIndex((curr) => curr + 1);
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeStoryIndex]);

  const handleOpenStory = (index) => {
    setActiveStoryIndex(index);
    audioService.playChime('sweet');
    triggerHeartConfetti();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (activeStoryIndex > 0) {
      setActiveStoryIndex((prev) => prev - 1);
      audioService.playChime('sweet');
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (activeStoryIndex < storiesData.length - 1) {
      setActiveStoryIndex((prev) => prev + 1);
      audioService.playChime('sweet');
    } else {
      setActiveStoryIndex(null);
    }
  };

  const currentStory = activeStoryIndex !== null ? storiesData[activeStoryIndex] : null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 my-6">
      
      {/* Header Label */}
      <div className="flex items-center justify-between mb-3 px-2">
        <span className="text-xs uppercase tracking-wider font-bold text-rose-700 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Moments of You • Sara's Stories</span>
        </span>
        <span className="text-xs text-[#785350] font-caveat text-base">
          Tap to view stories 🌹
        </span>
      </div>

      {/* Horizontal Scrolling Story Avatars (Instagram / App Style) */}
      <div className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto pb-3 pt-1 no-scrollbar">
        {storiesData.map((story, idx) => (
          <button
            key={story.id}
            onClick={() => handleOpenStory(idx)}
            className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
          >
            {/* Gradient Ring with rotating shimmer */}
            <div className={`p-0.5 rounded-full bg-gradient-to-tr ${story.gradient} group-hover:scale-105 active:scale-95 transition-transform duration-300 shadow-md shadow-rose-300/40`}>
              <div className="p-0.5 rounded-full bg-white">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-center group-hover:brightness-105"
                />
              </div>
            </div>

            <span className="font-caveat text-sm sm:text-base font-bold text-[#4a2c2a] group-hover:text-rose-600 mt-1 max-w-[85px] sm:max-w-[95px] text-center leading-tight">
              {story.title}
            </span>
          </button>
        ))}
      </div>

      {/* Fullscreen Mobile-App Story Viewer */}
      <AnimatePresence>
        {activeStoryIndex !== null && currentStory && (
          <div
            onClick={() => setActiveStoryIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-2xl"
          >
            {/* Story Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-md sm:rounded-3xl overflow-hidden glass-panel border border-rose-500/40 shadow-2xl flex flex-col justify-between bg-midnight-950"
            >
              {/* Top Progress Bars */}
              <div className="absolute top-3 inset-x-3 z-30 flex items-center space-x-1.5">
                {storiesData.map((s, idx) => (
                  <div key={s.id} className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-75"
                      style={{
                        width:
                          idx < activeStoryIndex
                            ? '100%'
                            : idx === activeStoryIndex
                            ? `${progress}%`
                            : '0%',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Top Bar with Avatar & Close Button */}
              <div className="absolute top-7 inset-x-4 z-30 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={currentStory.image}
                    alt={currentStory.title}
                    className="w-9 h-9 rounded-full object-cover border-2 border-rose-400"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {currentStory.title}
                    </h4>
                    <span className="text-[10px] text-rose-300/90 font-medium">
                      {currentStory.tagline}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStoryIndex(null)}
                  className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
                  aria-label="Close Story"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Full-Length Story Photo */}
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <img
                  src={currentStory.image}
                  alt={currentStory.title}
                  className="w-full h-full object-contain sm:object-cover max-h-[80vh]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-midnight-950/60 pointer-events-none" />
              </div>

              {/* Tap Left / Right Hotspots for navigation */}
              <div
                onClick={handlePrev}
                className="absolute inset-y-20 left-0 w-1/3 z-20 cursor-pointer"
                aria-label="Previous story"
              />
              <div
                onClick={handleNext}
                className="absolute inset-y-20 right-0 w-2/3 z-20 cursor-pointer"
                aria-label="Next story"
              />

              {/* Left / Right Nav Arrows for Desktop */}
              {activeStoryIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {activeStoryIndex < storiesData.length - 1 && (
                <button
                  onClick={handleNext}
                  className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              {/* Bottom Caption & Heart Reaction */}
              <div className="relative z-30 p-5 bg-gradient-to-t from-midnight-950 to-transparent">
                <p className="font-serif italic text-sm sm:text-base text-rose-100 leading-relaxed drop-shadow-md">
                  "{currentStory.caption}"
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-amber-300 font-semibold flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Story {activeStoryIndex + 1} of {storiesData.length}</span>
                  </span>

                  <button
                    onClick={() => {
                      triggerHeartConfetti();
                      audioService.playChime('heart');
                    }}
                    className="p-2 rounded-full bg-rose-500/30 text-rose-300 hover:text-white hover:bg-rose-500 transition active:scale-125"
                    aria-label="Send Heart"
                  >
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-heartbeat" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
