import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, CheckCircle } from 'lucide-react';
import { virtualGifts } from '../data/surpriseNotes';
import { triggerGiftBurst, triggerHeartConfetti } from '../utils/confetti';
import { audioService } from '../utils/audioSynthesizer';

export default function VirtualGiftSection() {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [activeGiftIndex, setActiveGiftIndex] = useState(0);
  const [redeemedCoupons, setRedeemedCoupons] = useState({});

  const handleOpenGift = () => {
    if (isOpened || isOpening) return;
    setIsOpening(true);
    audioService.playChime('gift');

    setTimeout(() => {
      setIsOpened(true);
      setIsOpening(false);
      triggerGiftBurst();
    }, 900);
  };

  const handleRedeemCoupon = (couponIndex) => {
    setRedeemedCoupons(prev => ({ ...prev, [couponIndex]: true }));
    triggerHeartConfetti();
    audioService.playChime('sweet');
  };

  const activeGift = virtualGifts[activeGiftIndex];

  return (
    <section id="gift" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        
        {/* Soft Romantic Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-semibold mb-3">
            <Gift className="w-3.5 h-3.5 text-rose-500" />
            <span>Unwrap Something Special</span>
          </div>
          <h2 className="font-caveat text-5xl sm:text-7xl font-bold text-[#4a2c2a] drop-shadow-sm">
            A Token From My Heart • Sara
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#785350] max-w-md mx-auto mt-2">
            No physical box could ever hold the depth of my feelings, but I wrapped three gentle tokens of love for you.
          </p>
        </div>

        {/* Gift Box Interaction (Unopened state) */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center my-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenGift}
                className="cursor-pointer group relative flex flex-col items-center"
              >
                {/* Glowing Aura */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-rose-400 via-pink-300 to-amber-300 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition duration-700 animate-pulse-glow" />

                {/* 3D Gift Box in Soft Blush & Gold */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-br from-rose-500 via-rose-600 to-pink-500 border-2 border-amber-300 shadow-2xl flex items-center justify-center">
                  
                  {/* Ribbon cross */}
                  <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 shadow-md" />
                  <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-amber-300 via-amber-200 to-yellow-400 shadow-md" />

                  {/* Ribbon Bow */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-amber-400 border-2 border-yellow-200 flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300">
                    <Gift className="w-10 h-10 text-rose-950" />
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="font-caveat text-3xl font-bold text-[#4a2c2a] mb-0.5 group-hover:text-rose-600 transition">
                    {isOpening ? "Untying Satin Ribbon..." : "Tap to Open Sara's Gift 🎁"}
                  </h3>
                  <p className="text-xs text-[#785350] font-medium">
                    Wrapped with unconditional love & infinite respect
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Revealed Gifts Carousel (Opened state) */}
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {/* Gift Tab Switcher */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
              {virtualGifts.map((gift, idx) => (
                <button
                  key={gift.id}
                  onClick={() => {
                    setActiveGiftIndex(idx);
                    audioService.playChime('sweet');
                  }}
                  className={`px-4 py-2 rounded-2xl font-caveat text-xl sm:text-2xl font-bold transition-all duration-300 flex items-center space-x-2 border ${
                    activeGiftIndex === idx
                      ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-300/60 scale-105'
                      : 'bg-white/90 hover:bg-white text-[#4a2c2a] border-rose-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{gift.name}</span>
                </button>
              ))}
            </div>

            {/* Active Gift Showcase Card */}
            <div className="glass-panel-rose rounded-3xl p-6 sm:p-10 border-2 border-rose-300 shadow-xl relative overflow-hidden animate-border-blink">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Visual Preview */}
                <div className="lg:col-span-5 flex justify-center">
                  {activeGift.image ? (
                    <div className="relative group rounded-3xl overflow-hidden border-2 border-rose-300 shadow-xl w-full max-w-sm aspect-square bg-rose-50">
                      <img
                        src={activeGift.image}
                        alt={activeGift.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>
                  ) : (
                    <div className="w-full max-w-sm aspect-square rounded-3xl bg-rose-100 flex items-center justify-center border-2 border-rose-300">
                      <Heart className="w-20 h-20 text-rose-500 fill-rose-500 animate-heartbeat" />
                    </div>
                  )}
                </div>

                {/* Gift Story & Details */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block">
                    {activeGift.badge}
                  </span>

                  <h3 className="font-caveat text-4xl sm:text-5xl font-bold text-[#4a2c2a]">
                    {activeGift.name}
                  </h3>

                  <p className="font-caveat text-2xl text-rose-700 font-bold leading-relaxed">
                    "{activeGift.tagline}"
                  </p>

                  <p className="font-sans text-sm text-[#4a2c2a] leading-relaxed">
                    {activeGift.description}
                  </p>

                  {/* If this is the Coupons Gift */}
                  {activeGift.coupons && (
                    <div className="mt-4 space-y-2.5">
                      <div className="text-xs uppercase font-bold text-rose-700 tracking-wider">
                        Available Coupons (Tap to Redeem):
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeGift.coupons.map((coupon, cIdx) => {
                          const isRedeemed = redeemedCoupons[cIdx];
                          return (
                            <button
                              key={cIdx}
                              onClick={() => handleRedeemCoupon(cIdx)}
                              className={`p-3 rounded-xl text-left text-xs font-semibold transition-all duration-200 border flex items-center justify-between ${
                                isRedeemed
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300 line-through'
                                  : 'bg-white hover:bg-rose-50 text-[#4a2c2a] border-rose-200 hover:border-rose-400 shadow-sm'
                              }`}
                            >
                              <span className="truncate pr-2">{coupon}</span>
                              {isRedeemed ? (
                                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <span className="text-[10px] text-rose-600 font-bold uppercase bg-rose-100 px-1.5 py-0.5 rounded flex-shrink-0">
                                  Claim
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Reset Box button */}
                  <div className="pt-4 flex items-center justify-between text-xs text-[#785350] border-t border-rose-200">
                    <span>Wrapped with genuine care</span>
                    <button
                      onClick={() => setIsOpened(false)}
                      className="text-rose-600 hover:text-rose-800 underline font-semibold"
                    >
                      Re-wrap Gift Box
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
