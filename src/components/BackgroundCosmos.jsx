import React, { useEffect, useRef, useState } from 'react';

export default function BackgroundCosmos() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Gently Falling Romantic Rose Petals (drifting down like autumn leaves)
    const petalCount = 28;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 10,
      speedY: Math.random() * 0.9 + 0.6,
      speedX: Math.random() * 0.6 - 0.3,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayAmplitude: Math.random() * 35 + 15,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.55 + 0.35,
      color: Math.random() > 0.4 ? '244, 114, 182' : '225, 29, 72', // Pink or Rose
    }));

    // 2. Rising Soft Luminous Hearts (drifting up from bottom)
    const heartCount = 20;
    const hearts = Array.from({ length: heartCount }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 200,
      size: Math.random() * 14 + 10,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      color: Math.random() > 0.3 ? '244, 63, 94' : '251, 146, 60', // Rose or Peach
    }));

    // 3. Twinkling Golden Fairy Dust
    const dustCount = 45;
    const fairyDust = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.015 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.3 ? '245, 158, 11' : '251, 191, 36', // Warm Gold
    }));

    // 4. Interactive Touch/Click Floating Heart Bursts
    const interactiveParticles = [];
    const addHeartBurst = (x, y, count = 5) => {
      for (let i = 0; i < count; i++) {
        interactiveParticles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          size: Math.random() * 16 + 12,
          speedY: Math.random() * 2.2 + 1.2,
          speedX: (Math.random() - 0.5) * 2.2,
          opacity: 1,
          decay: Math.random() * 0.016 + 0.012,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.05,
          color: Math.random() > 0.5 ? '225, 29, 72' : '244, 114, 182',
        });
      }
    };

    const handleClick = (e) => {
      addHeartBurst(e.clientX, e.clientY, 7);
    };

    const handleTouch = (e) => {
      if (e.touches && e.touches[0]) {
        addHeartBurst(e.touches[0].clientX, e.touches[0].clientY, 6);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);

    // Rose Petal Drawing Helper
    function drawRosePetal(ctx, x, y, size, angle, opacity, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.8, size * 0.9, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size * 0.9, size * 0.5, -size * 0.8, -size * 0.8, 0, -size);
      ctx.fillStyle = `rgba(${color}, ${opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${color}, 0.35)`;
      ctx.fill();
      ctx.restore();
    }

    // Heart Drawing Helper
    function drawHeart(ctx, x, y, size, opacity, rotation, color = '225, 29, 72') {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size / 30, size / 30);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-15, -15, -25, 5, 0, 25);
      ctx.bezierCurveTo(25, 5, 15, -15, 0, 0);
      ctx.fillStyle = `rgba(${color}, ${opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${color}, 0.4)`;
      ctx.fill();
      ctx.restore();
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // 1. Render Golden Fairy Dust
      for (const dust of fairyDust) {
        dust.alpha += dust.speed * dust.direction;
        if (dust.alpha > 0.85) {
          dust.alpha = 0.85;
          dust.direction = -1;
        } else if (dust.alpha < 0.15) {
          dust.alpha = 0.15;
          dust.direction = 1;
        }

        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dust.color}, ${dust.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${dust.color}, 0.6)`;
        ctx.fill();
      }

      // 2. Render Falling Rose Petals
      for (const petal of petals) {
        petal.y += petal.speedY;
        petal.x += Math.sin(time + petal.swaySpeed * 100) * 0.8 + petal.speedX;
        petal.angle += petal.angularSpeed;

        if (petal.y > height + 40) {
          petal.y = -30;
          petal.x = Math.random() * width;
        }

        drawRosePetal(ctx, petal.x, petal.y, petal.size, petal.angle, petal.opacity, petal.color);
      }

      // 3. Render Rising Ambient Love Hearts
      for (const h of hearts) {
        h.y -= h.speedY;
        h.x += h.speedX + Math.sin(time + h.y * 0.01) * 0.4;
        h.rotation += h.rotSpeed;

        if (h.y < -50) {
          h.y = height + 40;
          h.x = Math.random() * width;
        }

        drawHeart(ctx, h.x, h.y, h.size, h.opacity, h.rotation, h.color);
      }

      // 4. Render Interactive Click/Tap Hearts
      for (let i = interactiveParticles.length - 1; i >= 0; i--) {
        const p = interactiveParticles[i];
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0) {
          interactiveParticles.splice(i, 1);
          continue;
        }

        drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.rotation, p.color);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft romantic peach and rose ambient glowing orbs */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-rose-300/30 blur-[130px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-pink-200/40 blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-200/30 blur-[130px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Interactive Cursor Light Halo */}
      <div
        className="absolute w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out pointer-events-none opacity-40"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.18) 0%, rgba(251, 191, 36, 0.08) 50%, transparent 75%)',
        }}
      />

      {/* Canvas rendering falling petals, rising hearts, and fairy sparkles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
