import React, { useEffect, useRef } from 'react';

/**
 * RomanticTouchTrail
 * Cinema-Grade interactive sparkle and heart particle trail.
 * Follows mouse moves and mobile finger swipes, bursting glowing hearts and stardust!
 */
export default function RomanticTouchTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particles = [];
    const maxParticles = 90;

    const colors = [
      'rgba(244, 63, 94, ',   // rose-500
      'rgba(251, 113, 133, ', // rose-400
      'rgba(236, 72, 153, ',  // pink-500
      'rgba(244, 114, 182, ', // pink-400
      'rgba(251, 191, 36, ',  // amber-400 (gold sparkle)
      'rgba(253, 224, 71, ',  // yellow-300 (stardust)
    ];

    // Helper: draw mini heart
    const drawHeart = (ctx, x, y, size, color, alpha, rot) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(size / 24, size / 24);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-12, -12, -20, 4, 0, 20);
      ctx.bezierCurveTo(20, 4, 12, -12, 0, 0);
      ctx.fillStyle = `${color}${alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `${color}0.6)`;
      ctx.fill();
      ctx.restore();
    };

    // Helper: draw 4-point sparkle star
    const drawSparkle = (ctx, x, y, size, color, alpha, rot) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        ctx.lineTo(
          Math.cos(((i + 0.5) * Math.PI) / 2) * (size * 0.28),
          Math.sin(((i + 0.5) * Math.PI) / 2) * (size * 0.28)
        );
      }
      ctx.closePath();
      ctx.fillStyle = `${color}${alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `${color}0.8)`;
      ctx.fill();
      ctx.restore();
    };

    const addParticle = (x, y, isBurst = false) => {
      if (particles.length > maxParticles && !isBurst) return;

      const isHeart = Math.random() > 0.45;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      const speed = isBurst ? Math.random() * 3.5 + 1.5 : Math.random() * 1.5 + 0.5;
      const angle = isBurst ? Math.random() * Math.PI * 2 : -Math.PI / 2 + (Math.random() - 0.5) * 1.2;

      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (isBurst ? 0.5 : 0.8),
        size: isHeart ? Math.random() * 10 + 9 : Math.random() * 7 + 4,
        color: baseColor,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1,
        isHeart,
      });
    };

    let lastX = 0;
    let lastY = 0;

    const handlePointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const dist = Math.hypot(x - lastX, y - lastY);

      if (dist > 10) {
        addParticle(x, y);
        if (Math.random() > 0.4) {
          addParticle(x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 10);
        }
        lastX = x;
        lastY = y;
      }
    };

    const handlePointerDown = (e) => {
      // Tap/Click burst: 8 lovely particles
      const count = 9;
      for (let i = 0; i < count; i++) {
        addParticle(e.clientX, e.clientY, true);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        handlePointerMove({ clientX: touch.clientX, clientY: touch.clientY });
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        handlePointerDown({ clientX: touch.clientX, clientY: touch.clientY });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // slight gravity
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        if (p.isHeart) {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
