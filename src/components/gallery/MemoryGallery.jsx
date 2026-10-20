import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RotateCw, Maximize2, Feather } from 'lucide-react';
import { galleryPhotos } from '../../data/gallery';
import ImageLightbox from './ImageLightbox';
import { audioService } from '../../utils/audioSynthesizer';
import { triggerHeartConfetti } from '../../utils/confetti';

export default function MemoryGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [flippedCards, setFlippedCards] = useState({});

  const categories = ["All", "Little Angel", "Sara's Light", "Elegance", "Candid Moments", "Kindness"];

  const filteredPhotos = activeCategory === "All"
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === activeCategory);

  const toggleFlip = (id, e) => {
    e.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    audioService.playChime('sweet');
  };

  const handleOpenLightbox = (index, e) => {
    e.stopPropagation();
    setSelectedPhotoIndex(index);
    audioService.playChime('gift');
    triggerHeartConfetti();
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      
      <div className="w-full max-w-6xl mx-auto z-10 relative">
        
        {/* Soft Romantic Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-semibold mb-3 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-heartbeat" />
            <span>Treasured Memories • For Thenmozhi</span>
          </div>

          <h2 className="font-caveat text-5xl sm:text-7xl font-bold text-[#4a2c2a] drop-shadow-sm">
            Moments Frozen In Time
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#785350] max-w-md mx-auto mt-2 leading-relaxed">
            Every snapshot holds a story. <strong className="text-rose-600 font-semibold">Tap or hover</strong> on any photo to vertically flip it in 3D and read the special Tamil love kavidhai written for Thenmozhi.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                audioService.playChime('sweet');
              }}
              className={`px-4 py-1.5 rounded-full font-caveat text-lg sm:text-xl font-bold transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-300/60 scale-105'
                  : 'bg-white/90 hover:bg-white text-[#4a2c2a] border-rose-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 
          3D VERTICAL FLIP CARD GRID (User's Exact Specification)
          Flips vertically via rotateX(180deg) on hover & on touch/click
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredPhotos.map((photo, idx) => {
            const isFlipped = !!flippedCards[photo.id];
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`flip-card w-full h-[400px] sm:h-[430px] select-none ${isFlipped ? 'is-flipped' : ''}`}
                onClick={(e) => toggleFlip(photo.id, e)}
              >
                {/* 3D Inner Wrapper */}
                <div className="flip-card-inner">
                  
                  {/* FRONT FACE: Clean, uncropped photo of Thenmozhi (Sara) */}
                  <div className="flip-card-front glass-panel-rose border-2 border-rose-300 shadow-xl overflow-hidden relative flex flex-col justify-between bg-white animate-border-blink">
                    
                    {/* Ambient blurred backdrop so uncropped photo looks luxurious */}
                    <div
                      className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-110 pointer-events-none"
                      style={{ backgroundImage: `url(${photo.src})` }}
                    />

                    {/* Full uncropped foreground photo */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-2 pb-24">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="max-h-full max-w-full object-contain rounded-2xl drop-shadow-sm transition-transform duration-500"
                      />
                    </div>

                    {/* Gradient Overlay for Bottom Caption */}
                    <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-4 sm:p-5 text-white text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded-full border border-amber-300/30">
                          {photo.category}
                        </span>
                        
                        {/* 3D Flip Prompt Pill */}
                        <span className="text-[10px] font-semibold text-rose-200 bg-rose-600/80 px-2 py-0.5 rounded-full flex items-center space-x-1 animate-pulse">
                          <RotateCw className="w-2.5 h-2.5" />
                          <span>Tap to Flip 💫</span>
                        </span>
                      </div>

                      <h4 className="font-caveat text-2xl sm:text-3xl font-bold text-white leading-tight">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-rose-100 font-sans mt-0.5 line-clamp-1">
                        {photo.caption}
                      </p>
                    </div>

                    {/* Floating Top Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerHeartConfetti();
                        audioService.playChime('sweet');
                      }}
                      className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/90 backdrop-blur-md text-rose-500 shadow-md hover:scale-110 active:scale-90 transition"
                      title="Send Love Heart"
                    >
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    </button>
                  </div>

                  {/* BACK FACE: Deep Heartfelt Tamil Love Kavidhai for Thenmozhi */}
                  <div className="flip-card-back glass-panel-rose border-2 border-rose-400 bg-gradient-to-b from-[#fff5f6] via-[#ffffff] to-[#ffe4e6] p-5 sm:p-6 flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden">
                    
                    {/* Top Decorative Border Flourish */}
                    <div className="w-full flex items-center justify-between border-b border-rose-200 pb-2">
                      <div className="flex items-center space-x-1.5 text-xs text-rose-700 font-bold">
                        <span className="text-base">{photo.icon}</span>
                        <span>{photo.tagline || photo.category}</span>
                      </div>
                      <span className="text-[10px] font-sans text-[#785350]">
                        {photo.date}
                      </span>
                    </div>

                    {/* Central Tamil Poem Area */}
                    <div className="w-full my-auto flex flex-col items-center">
                      <span className="text-xs uppercase tracking-widest font-bold text-rose-600 flex items-center space-x-1 mb-1">
                        <Feather className="w-3.5 h-3.5 text-rose-500" />
                        <span>Poem for Sara</span>
                      </span>

                      <h3 className="font-caveat text-3xl sm:text-4xl font-bold text-rose-700 mb-2">
                        {photo.tamilTitle}
                      </h3>

                      {/* The Poetic Tamil Kavidhai */}
                      <div className="w-full p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-rose-200/80 shadow-sm text-center">
                        <p className="font-tamil-letter text-base sm:text-lg text-[#4a2c2a] leading-relaxed whitespace-pre-line font-medium">
                          {photo.kavidhai}
                        </p>
                      </div>

                      {/* Sincere Dedication */}
                      <div className="mt-2 text-xs font-caveat text-xl text-rose-800 font-bold">
                        — Always yours with love, Selvamani ❤️
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="w-full pt-3 border-t border-rose-200 flex items-center justify-between text-xs">
                      <button
                        onClick={(e) => handleOpenLightbox(idx, e)}
                        className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-700 font-medium hover:bg-rose-50 transition flex items-center space-x-1 shadow-xs"
                      >
                        <Maximize2 className="w-3 h-3 text-rose-500" />
                        <span>View Photo</span>
                      </button>

                      <button
                        onClick={(e) => toggleFlip(photo.id, e)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition flex items-center space-x-1 shadow-xs"
                      >
                        <RotateCw className="w-3 h-3 text-white" />
                        <span>Flip Back ↩</span>
                      </button>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedPhotoIndex !== null && (
          <ImageLightbox
            photo={filteredPhotos[selectedPhotoIndex]}
            isOpen={selectedPhotoIndex !== null}
            onClose={() => setSelectedPhotoIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
            currentIndex={selectedPhotoIndex}
            totalPhotos={filteredPhotos.length}
          />
        )}

      </div>
    </section>
  );
}
