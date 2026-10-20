import React, { useState } from 'react';
import { Heart, Music, Image as ImageIcon, Menu, X, Lock } from 'lucide-react';

export default function FloatingNav({ onOpenPhotoModal, isMusicPlaying, onToggleMusic, onRestartWelcome, onLockWebsite, soundscapeMode = 'piano', onCycleSoundscape }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Photo Reveal", href: "#photo-reveal" },
    { label: "I Love You", href: "#love-animation" },
    { label: "Our Journey", href: "#timeline" },
    { label: "Gallery", href: "#gallery" },
    { label: "Love Letter", href: "#letter" },
    { label: "Virtual Gift", href: "#gift" },
    { label: "Secret Keepsake", href: "#childhood-surprise" },
    { label: "Surprises", href: "#surprises" },
    { label: "Final Screen", href: "#final" },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl">
      <div className="glass-panel rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border border-rose-500/30 shadow-2xl backdrop-blur-xl">
        
        {/* Brand / Title */}
        <button
          onClick={onRestartWelcome}
          className="flex items-center space-x-2 text-rose-200 hover:text-white transition group"
          title="Back to Welcome Screen"
        >
          <div className="relative flex items-center justify-center">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-heartbeat drop-shadow-[0_0_12px_rgba(225,29,72,0.9)]" />
          </div>
          <span className="font-serif text-base sm:text-lg font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-champagne-300 to-rose-300">
            Forever Us
          </span>
          <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 hidden sm:inline-block">
            Sara ❤️
          </span>
        </button>

        {/* Desktop Quick Shortcuts */}
        <div className="hidden lg:flex items-center space-x-5 text-xs font-semibold text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-rose-300 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-amber-400 group-hover:w-full transition-all duration-300 rounded-full" />
            </button>
          ))}
        </div>

        {/* Right Actions: Music Toggle & Photo Settings */}
        <div className="flex items-center space-x-2">
          {/* Song Controller */}
          <button
            onClick={() => onToggleMusic(!isMusicPlaying)}
            title={isMusicPlaying ? "Pause Vaarayo Vaarayo" : "Play Vaarayo Vaarayo"}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-2 transition-all duration-300 border ${
              isMusicPlaying
                ? 'bg-rose-600/30 text-rose-200 border-rose-500/50 box-glow-rose'
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-rose-400/30'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <div className="flex items-end space-x-0.5 h-3">
                  <span className="w-0.5 bg-rose-400 rounded-full h-3 animate-pulse" />
                  <span className="w-0.5 bg-rose-400 rounded-full h-2 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 bg-rose-400 rounded-full h-3.5 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="hidden sm:inline">Vaarayo Vaarayo 🎵</span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Vaarayo Vaarayo 🎶</span>
              </>
            )}
          </button>

          {/* Soundscape Switcher */}
          {isMusicPlaying && (
            <button
              onClick={onCycleSoundscape}
              title="Switch Soundscape Style"
              className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 hover:bg-amber-500/30 transition hidden sm:inline-flex items-center space-x-1"
            >
              <span>{soundscapeMode === 'piano' ? '🎹 Piano' : '🔔 Music Box'}</span>
            </button>
          )}

          {/* Change Photo Button */}
          <button
            onClick={onOpenPhotoModal}
            title="Customize Girlfriend Photo"
            className="p-2 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 transition"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Re-lock Website Button */}
          <button
            onClick={onLockWebsite}
            title="Lock Website (Require Passcode: sara)"
            className="p-2 rounded-full bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 transition"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/5 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-panel rounded-2xl p-4 border border-rose-500/25 shadow-2xl flex flex-col space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-rose-500/20 hover:text-rose-200 text-xs font-semibold transition"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
