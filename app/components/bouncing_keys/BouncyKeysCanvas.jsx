"use client";

import { useEffect, useRef } from "react";

export default function BouncyKeysCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const colorsRef = useRef({});

  const getColor = (char) => {
    if (!colorsRef.current[char]) {
      colorsRef.current[char] = `hsl(${Math.random() * 360}, 100%, 60%)`;
    }
    return colorsRef.current[char];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addParticle = (char) => {
      const size = Math.min(canvas.width, canvas.height) * (0.2 + Math.random() * 0.15);

      particlesRef.current.push({
        x: Math.random() * (canvas.width - size) + size / 2,
        y: Math.random() * (canvas.height - size) + size / 2,
        dx: (Math.random() - 0.5) * 10,
        dy: (Math.random() - 0.5) * 10,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.05,
        size,
        char,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.05 + Math.random() * 0.05,
        created: performance.now(), // timestamp
      });
    };

    const collide = (a, b) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = (a.size + b.size) * 0.25;

      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const force = 2;
        a.dx += Math.cos(angle) * force;
        a.dy += Math.sin(angle) * force;
        b.dx -= Math.cos(angle) * force;
        b.dy -= Math.sin(angle) * force;
      }
    };

    let t = 0;

    const loop = () => {
      const W = canvas.width;
      const H = canvas.height;
      t += 0.01;

      // FADE BACKGROUND WITHOUT GRAYING COLORS
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.03)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      // COLORED HAZE
      ctx.fillStyle = `hsla(${(t * 30) % 360}, 80%, 50%, 0.03)`;
      ctx.fillRect(0, 0, W, H);

      const arr = particlesRef.current;

      // collisions
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          collide(arr[i], arr[j]);
        }
      }

      // draw + physics
      for (let p of arr) {
        p.wobble += p.wobbleSpeed;

        p.x += p.dx + Math.sin(p.wobble * 2) * 1.5;
        p.y += p.dy + Math.cos(p.wobble * 2) * 1.5;
        p.rotation += p.spin;

        if (p.x - p.size / 2 < 0 || p.x + p.size / 2 > W) p.dx *= -1;
        if (p.y - p.size / 2 < 0 || p.y + p.size / 2 > H) p.dy *= -1;

        const jellyX = 1 + Math.sin(p.wobble) * 0.4;
        const jellyY = 1 + Math.cos(p.wobble * 1.3) * 0.4;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(jellyX, jellyY);

        ctx.font = `900 ${p.size}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.shadowBlur = 40;
        ctx.shadowColor = getColor(p.char);
        ctx.fillStyle = getColor(p.char);

        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }

      // REMOVE AFTER 15 SECONDS
      const now = performance.now();
      particlesRef.current = arr.filter(
        (p) => now - p.created < 15000 // 15 seconds
      );

      requestAnimationFrame(loop);
    };

    loop();

    const handleKey = (e) => {
      if (/^[a-zA-Z0-9]$/.test(e.key)) {
        addParticle(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
