import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import BackgroundCosmos from './components/BackgroundCosmos';
import ButterfliesCosmos from './components/animations/ButterfliesCosmos';
import RomanticTouchTrail from './components/animations/RomanticTouchTrail';
import LoveStoriesBar from './components/stories/LoveStoriesBar';
import MobileAppDock from './components/navigation/MobileAppDock';
import PasscodeLock from './components/auth/PasscodeLock';
import WelcomeScreen from './components/welcome/WelcomeScreen';
import ScrollProgress from './components/common/ScrollProgress';
import PhotoReveal from './components/photo-reveal/PhotoReveal';
import LoveAnimation from './components/love-animation/LoveAnimation';
import TimelineSection from './components/TimelineSection';
import MemoryGallery from './components/gallery/MemoryGallery';
import LoveLetterSection from './components/LoveLetterSection';
import VirtualGiftSection from './components/VirtualGiftSection';
import ChildhoodSurpriseSection from './components/ChildhoodSurpriseSection';
import SurpriseVaultSection from './components/SurpriseVaultSection';
import FinalScreenSection from './components/FinalScreenSection';
import PhotoUploadModal from './components/PhotoUploadModal';
import { siteConfig } from './data/siteConfig';
import { audioService } from './utils/audioSynthesizer';

// Helper to detect if the page load is an in-tab refresh / reload
const isReloadNavigation = () => {
  try {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries && navEntries.length > 0) {
      return navEntries[0].type === 'reload';
    }
    if (window.performance && window.performance.navigation) {
      return window.performance.navigation.type === 1; // TYPE_RELOAD
    }
  } catch (e) {
    console.warn(e);
  }
  return false;
};

// Check reload once when the application script initializes
const isPageReload = isReloadNavigation();

// Proactively clear legacy permanent localStorage keys so returning visitors are never auto-logged in
try {
  localStorage.removeItem('forever_us_authenticated');
  localStorage.removeItem('forever_us_has_opened_heart');
} catch (e) {
  console.warn(e);
}

// If this is a fresh visit or returning from outside the link (not a reload),
// reset session state and remove any lingering hash so it starts at the login page
if (!isPageReload) {
  try {
    sessionStorage.removeItem('forever_us_authenticated');
    sessionStorage.removeItem('forever_us_has_opened_heart');
    sessionStorage.removeItem('selva_sara_scroll_pos');
    sessionStorage.removeItem('selva_sara_active_section');
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }
  } catch (e) {
    console.warn(e);
  }
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Only restore authentication on a page reload in the same active session
    if (!isPageReload) return false;
    try {
      return sessionStorage.getItem('forever_us_authenticated') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [hasOpenedHeart, setHasOpenedHeart] = useState(() => {
    // Only restore heart open state on a page reload in the same active session
    if (!isPageReload) return false;
    try {
      return sessionStorage.getItem('forever_us_has_opened_heart') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [girlfriendPhoto, setGirlfriendPhoto] = useState(() => {
    try {
      const saved = localStorage.getItem('selva_sara_custom_photo');
      if (saved && !saved.includes('sara_portrait_1792472437449')) {
        return saved;
      }
    } catch (e) {
      console.warn(e);
    }
    return '/images/sara_real/sara_hero.jpg';
  });
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [soundscapeMode, setSoundscapeMode] = useState('piano');

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem('forever_us_authenticated', 'true');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleOpenHeart = () => {
    setHasOpenedHeart(true);
    try {
      sessionStorage.setItem('forever_us_has_opened_heart', 'true');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCycleSoundscape = () => {
    const nextMode = soundscapeMode === 'piano' ? 'musicbox' : 'piano';
    setSoundscapeMode(nextMode);
    audioService.setSoundscape(nextMode);
    audioService.playChime('sweet');
  };

  const handleUpdatePhoto = (newPhotoUrl) => {
    setGirlfriendPhoto(newPhotoUrl);
    try {
      localStorage.setItem('selva_sara_custom_photo', newPhotoUrl);
    } catch (err) {
      console.warn("Storage quota reached for photo", err);
    }
  };

  const handleToggleMusic = (shouldPlay) => {
    if (shouldPlay) {
      audioService.startRomanticBGM();
      setIsMusicPlaying(true);
    } else {
      audioService.stopRomanticBGM();
      setIsMusicPlaying(false);
    }
  };

  const handleRestartExperience = () => {
    setHasOpenedHeart(false);
    try {
      sessionStorage.removeItem('forever_us_has_opened_heart');
      sessionStorage.removeItem('selva_sara_scroll_pos');
      sessionStorage.removeItem('selva_sara_active_section');
      if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      }
    } catch (e) {
      console.warn(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLockWebsite = () => {
    try {
      localStorage.removeItem('forever_us_authenticated');
      localStorage.removeItem('forever_us_has_opened_heart');
      sessionStorage.removeItem('forever_us_authenticated');
      sessionStorage.removeItem('forever_us_has_opened_heart');
      sessionStorage.removeItem('selva_sara_scroll_pos');
      sessionStorage.removeItem('selva_sara_active_section');
      if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      }
    } catch (e) {
      console.warn(e);
    }
    setIsAuthenticated(false);
    setHasOpenedHeart(false);
    audioService.stopRomanticBGM();
    setIsMusicPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Restore scroll position or active section on refresh
  useEffect(() => {
    if (isAuthenticated && hasOpenedHeart) {
      const savedPos = sessionStorage.getItem('selva_sara_scroll_pos');
      const savedSection = sessionStorage.getItem('selva_sara_active_section');
      const hash = window.location.hash;

      const restoreTimer = setTimeout(() => {
        if (hash) {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'auto' });
            return;
          }
        }
        if (savedSection) {
          const el = document.getElementById(savedSection);
          if (el) {
            el.scrollIntoView({ behavior: 'auto' });
            return;
          }
        }
        if (savedPos && !isNaN(Number(savedPos)) && Number(savedPos) > 0) {
          window.scrollTo({ top: Number(savedPos), behavior: 'auto' });
        }
      }, 120);

      return () => clearTimeout(restoreTimer);
    }
  }, [isAuthenticated, hasOpenedHeart]);

  // Track scroll position and current section continuously
  useEffect(() => {
    if (!isAuthenticated || !hasOpenedHeart) return;

    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const y = window.scrollY;
        sessionStorage.setItem('selva_sara_scroll_pos', y.toString());

        const sectionIds = ['final', 'surprises', 'childhood-surprise', 'gift', 'letter', 'gallery', 'timeline', 'love-animation', 'photo-reveal'];
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.15) {
              sessionStorage.setItem('selva_sara_active_section', id);
              if (window.location.hash !== `#${id}`) {
                history.replaceState(null, null, `#${id}`);
              }
              break;
            }
          }
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isAuthenticated, hasOpenedHeart]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf1f0] via-[#fff5f6] to-[#ffffff] text-[#4a2c2a] relative font-sans selection:bg-rose-200 selection:text-rose-900">
      
      {/* Dynamic Animated Cosmic Background (Stars, Floating Hearts & Glow Orbs) */}
      <BackgroundCosmos />

      {/* Enchanting 3D Fluttering Butterflies & Border Glowing Hearts */}
      <ButterfliesCosmos />

      {/* Interactive Stardust & Heart Particle Trail for Touch & Mouse */}
      <RomanticTouchTrail />

      {/* Secret Passcode Screen (Password: sara) */}
      <AnimatePresence>
        {!isAuthenticated && (
          <PasscodeLock
            onAuthenticated={handleAuthenticated}
          />
        )}
      </AnimatePresence>

      {/* Main Experience Flow (Only accessible after entering passcode "sara") */}
      {isAuthenticated && (
        <>
          {/* Top Reading Progress Bar */}
          <ScrollProgress />

          {/* Step 1: Cinematic Welcome Screen Overlay (Visible initially until Open My Heart is clicked) */}
          <AnimatePresence>
            {!hasOpenedHeart && (
              <WelcomeScreen
                onOpenHeart={handleOpenHeart}
                onToggleMusic={handleToggleMusic}
                isMusicPlaying={isMusicPlaying}
                onLockWebsite={handleLockWebsite}
              />
            )}
          </AnimatePresence>

          {/* Main 10-Step Experience (Visible after Welcome Screen is unlocked) */}
          {hasOpenedHeart && (
            <>
              {/* Subtle Floating Romantic Controls (Vaarayo Vaarayo + Logout) */}
              <div className="fixed top-4 right-4 z-40 flex items-center space-x-2">
                <button
                  onClick={() => handleToggleMusic(!isMusicPlaying)}
                  className="px-3.5 py-1.5 rounded-full bg-white/95 border border-rose-300 shadow-md text-rose-700 hover:bg-rose-50 transition-all flex items-center space-x-2 backdrop-blur-md active:scale-95"
                  title="Vaarayo Vaarayo (Aadhavan)"
                >
                  <span className={`w-2 h-2 rounded-full ${isMusicPlaying ? 'bg-rose-500 animate-ping' : 'bg-rose-300'}`} />
                  <span className="font-caveat text-xl font-bold">
                    {isMusicPlaying ? 'Vaarayo Vaarayo 🎵' : 'Vaarayo Vaarayo 🎶'}
                  </span>
                </button>

                <button
                  onClick={handleLockWebsite}
                  className="px-3.5 py-1.5 rounded-full bg-white/95 border border-rose-300 shadow-md text-rose-700 hover:bg-rose-50 hover:text-rose-900 transition-all flex items-center space-x-1.5 backdrop-blur-md active:scale-95 text-xs font-bold"
                  title="Logout / Lock Portal"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Sequential Experience Flow */}
              <main className="relative z-10 flex flex-col pt-8 sm:pt-12 space-y-8 sm:space-y-16 pb-24 sm:pb-16">
                
                {/* Step 1: Cinematic Photo Reveal */}
                <PhotoReveal
                  photoUrl={girlfriendPhoto}
                  onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
                />

                {/* Mobile & App-Style Story Highlights: Sara's 7 Years Memories */}
                <LoveStoriesBar />

                {/* Step 2: Animated I LOVE YOU Section */}
                <LoveAnimation />

                {/* Step 3: Our 7 Years of Love Relationship Timeline */}
                <TimelineSection />

                {/* Step 4: Interactive Memory Gallery with Lightbox */}
                <MemoryGallery />

                {/* Step 5: Digital Love Letter with Typewriter Animation */}
                <LoveLetterSection />

                {/* Step 6: Virtual Gift Opening Experience 🎁 */}
                <VirtualGiftSection />

                {/* Exclusive Secret Surprise: Little Sara's Childhood Keepsake 🌸 */}
                <ChildhoodSurpriseSection />

                {/* Step 7: Hidden Love Messages & Surprise Button */}
                <SurpriseVaultSection />

                {/* Step 8: Final Surprise Screen */}
                <FinalScreenSection
                  boyfriendName={siteConfig.boyfriendName}
                  girlfriendName={siteConfig.girlfriendName}
                  onRestartExperience={handleRestartExperience}
                />

              </main>

              {/* Mobile App Dock Navigation */}
              <MobileAppDock />
            </>
          )}

          {/* Photo Customization Modal */}
          <PhotoUploadModal
            isOpen={isPhotoModalOpen}
            onClose={() => setIsPhotoModalOpen(false)}
            currentPhoto={girlfriendPhoto}
            onUpdatePhoto={handleUpdatePhoto}
          />
        </>
      )}

    </div>
  );
}
