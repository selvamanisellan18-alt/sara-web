import confetti from 'canvas-confetti';

// Real SVG Heart Shape for Canvas Confetti
const heartShape = confetti.shapeFromPath({
  path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
});

export const triggerHeartConfetti = () => {
  const count = 50;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
    shapes: [heartShape, 'circle'],
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 30,
    startVelocity: 60,
    colors: ['#E11D48', '#FDA4AF', '#F43F5E']
  });
  fire(0.25, {
    spread: 65,
    colors: ['#FDE047', '#F59E0B', '#F472B6']
  });
  fire(0.35, {
    spread: 110,
    decay: 0.91,
    scalar: 1.3,
    colors: ['#FF1493', '#FF69B4', '#FFF']
  });
  fire(0.15, {
    spread: 130,
    startVelocity: 30,
    decay: 0.92,
    scalar: 1.5,
    colors: ['#E11D48', '#FFD700', '#FB7185']
  });
};

export const triggerGiftBurst = () => {
  const end = Date.now() + 1.4 * 1000;
  const colors = ['#E11D48', '#F59E0B', '#EC4899', '#FBBF24', '#FFFFFF'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: colors,
      shapes: [heartShape, 'circle'],
      zIndex: 9999
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: colors,
      shapes: [heartShape, 'circle'],
      zIndex: 9999
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const triggerLetterOpenSparkles = () => {
  confetti({
    particleCount: 75,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#F59E0B', '#FDE68A', '#FDA4AF', '#F43F5E', '#E11D48'],
    shapes: [heartShape, 'circle'],
    scalar: 1.2,
    zIndex: 9999
  });
};

export const triggerRomanticExplosion = () => {
  triggerHeartConfetti();
  triggerGiftBurst();
};
