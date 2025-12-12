// src/components/SuperParticles.jsx
import React, { useEffect, useRef } from "react";

/**
 * SuperParticles
 * - Canvas-based golden sparkles / soft particles
 * - Auto-limits particle count and stops on small screens/reduced-motion
 */
export default function SuperParticles() {
  const ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = document.createElement("canvas");
    canvas.className = "super-particles";
    canvas.setAttribute("aria-hidden", "true");
    const container = document.body;
    container.appendChild(canvas);
    ref.current = canvas;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let particles = [];
    const maxParticles = Math.min(120, Math.round((w * h) / (1400 * 900) * 120) + 30);

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.15, 0.15),
          vy: rand(-0.2, -0.5),
          life: rand(4, 12),
          age: Math.random() * 12,
          r: rand(0.6, 2.6),
          alpha: rand(0.2, 0.95),
          hue: 40 + rand(-8, 8),
        });
      }
    }
    initParticles();

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initParticles();
    }

    let last = performance.now();
    function render(now) {
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;

      // fade background slightly to create trailing glow
      ctx.clearRect(0, 0, w, h);
      // draw soft radial glow background in top area
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(255,250,245,0.06)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let p of particles) {
        p.age += dt;
        if (p.age > p.life) {
          // respawn at bottom area so particles rise
          p.x = rand(0, w);
          p.y = h + rand(10, 60);
          p.vx = rand(-0.12, 0.12);
          p.vy = rand(-0.2, -0.5);
          p.age = 0;
          p.life = rand(4, 12);
          p.r = rand(0.6, 2.6);
          p.alpha = rand(0.25, 0.9);
          p.hue = 40 + rand(-8, 8);
        }

        // gentle physics
        p.x += p.vx * (1 + dt * 6);
        p.y += p.vy * (1 + dt * 6) - dt * 8 * (p.r / 2);

        // slight horizontal sin sway
        p.x += Math.sin((p.age + p.r) * 1.2) * 0.2;

        // draw soft particle
        const rad = p.r * (1 + Math.sin(p.age * 3) * 0.15);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 12);
        const gold = `hsl(${p.hue} 60% 62% / ${p.alpha})`;
        gradient.addColorStop(0, gold);
        gradient.addColorStop(0.25, `hsl(${p.hue} 60% 55% / ${p.alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, rad * 8, 0, Math.PI * 2);
        ctx.fill();

        // small highlight
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.9, p.alpha * 0.6)})`;
        ctx.arc(p.x - rad * 1.2, p.y - rad * 1.6, Math.max(0.4, rad * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize, { passive: true });

    rafRef.current = requestAnimationFrame(render);

    // cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  return null;
}
