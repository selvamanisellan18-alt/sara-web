import React, { useState } from 'react';
import { Heart, Music, VolumeX, Sparkles, Menu, X, Image as ImageIcon } from 'lucide-react';
import { audioService } from '../utils/audioSynthesizer';

export default function Navigation({ onOpenPhotoModal, isBgmPlaying, onToggleBgm }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Our Story", href: "#hero" },
    { label: "Our Journey", href: "#timeline" },
    { label: "My Voice", href: "#voice" },
    { label: "Love Letter", href: "#letter" },
    { label: "Virtual Gift", href: "#gift" },
    { label: "Surprises", href: "#surprises" },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
      <div className="glass-panel rounded-full px-5 py-3 flex items-center justify-between border border-rose-500/25 shadow-2xl backdrop-blur-xl">
        {/* Brand / Names */}
        <a 
          href="#hero" 
          className="flex items-center space-x-2 text-rose-200 hover:text-white transition group"
        >
          <div className="relative flex items-center justify-center">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-heartbeat" />
            <div className="absolute inset-0 bg-rose-500/40 blur-sm rounded-full animate-pulse" />
          </div>
          <span className="font-serif text-lg md:text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-champagne-300 to-rose-300">
            Selva & Sara
          </span>
          <span className="hidden sm:inline-block text-[11px] font-sans px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            Forever Us
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="hover:text-rose-300 transition-colors duration-200 relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-amber-400 group-hover:w-full transition-all duration-300 rounded-full" />
            </button>
          ))}
        </div>

        {/* Actions: Photo Upload & Audio Player Toggle */}
        <div className="flex items-center space-x-2.5">
          {/* Ambient BGM Button with equalizer bars */}
          <button
            onClick={onToggleBgm}
            title={isBgmPlaying ? "Mute Ambient Romantic Melody" : "Play Ambient Romantic Melody"}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-2 transition-all duration-300 border ${
              isBgmPlaying 
                ? 'bg-rose-600/30 text-rose-200 border-rose-500/50 box-glow-rose' 
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-rose-400/30'
            }`}
          >
            {isBgmPlaying ? (
              <>
                <div className="flex items-end space-x-0.5 h-3">
                  <span className="w-0.5 bg-rose-400 rounded-full h-3 animate-pulse" />
                  <span className="w-0.5 bg-rose-400 rounded-full h-2 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 bg-rose-400 rounded-full h-3.5 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="hidden sm:inline">Music Playing</span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Play Melody</span>
              </>
            )}
          </button>

          {/* Change Photo Trigger */}
          <button
            onClick={onOpenPhotoModal}
            title="Change Girlfriend Photo"
            className="p-2 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 transition"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-2xl p-4 border border-rose-500/20 shadow-2xl flex flex-col space-y-3 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-rose-500/20 hover:text-rose-200 text-sm font-medium transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
