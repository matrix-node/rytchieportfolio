"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbitalAngleRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Floating text labels list with coordinates
  const floatingTags = [
    { text: 'React.ts', x: 0.25, y: 0.2, speed: 0.4, size: 10 },
    { text: 'TypeScript', x: 0.75, y: 0.3, speed: 0.3, size: 11 },
    { text: 'Arch_OS', x: 0.15, y: 0.7, speed: 0.5, size: 11 },
    { text: 'Sec_Audit', x: 0.8, y: 0.75, speed: 0.2, size: 11 },
    { text: 'Systems_IT', x: 0.4, y: 0.85, speed: 0.35, size: 10 },
    { text: 'FullStack', x: 0.5, y: 0.15, speed: 0.25, size: 12 }
  ];

  const floatingOffsets = useRef(floatingTags.map(() => ({ xOffset: 0, yOffset: 0, angle: Math.random() * Math.PI * 2 })));

  // Size observer
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || !entries[0]) return;
      const { width, height } = entries[0].contentRect;
      // Debounced set to state
      setDimensions({
        width: Math.max(width, 300),
        height: Math.max(height, 300)
      });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Sync canvas dimensions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
  }, [dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Build particle network
    const particleCount = dimensions.width < 640 ? 18 : 34;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      glow: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 1,
        glow: Math.random() * 0.5 + 0.3
      });
    }

    // Media query to check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 1. Draw Subtle Animated Tech Grid Lines
      ctx.strokeStyle = 'rgba(173,198,255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      
      // Moving displacement based on orbitalAngle to give depth
      const offset = isReducedMotion ? 0 : (orbitalAngleRef.current * 10) % gridSize;

      for (let x = offset; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }
      for (let y = offset; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // 2. Render Core Holographic Rotating Mesh/Orb at Center
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const baseRadius = Math.min(dimensions.width, dimensions.height) * 0.24;

      if (!isReducedMotion) {
        orbitalAngleRef.current += 0.003;
      }

      // Draw outer tactical scanner rings
      ctx.strokeStyle = 'rgba(173,198,255, 0.07)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 1.35, 0, Math.PI * 2);
      ctx.stroke();

      // Dotted tactical boundary ring
      ctx.strokeStyle = 'rgba(192, 193, 255, 0.12)';
      ctx.setLineDash([3, 7]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 1.55, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // Reset list

      // Draw the rotating orb meshes (representing 3D wireframe layers)
      const layers = 3;
      for (let l = 0; l < layers; l++) {
        const radiusY = baseRadius * Math.abs(Math.sin(orbitalAngleRef.current + (l * Math.PI) / layers));
        const radiusX = baseRadius * Math.abs(Math.cos(orbitalAngleRef.current + (l * Math.PI) / layers));
        
        ctx.strokeStyle = l === 0 ? 'rgba(173,198,255, 0.15)' : 'rgba(192, 193, 255, 0.08)';
        ctx.shadowColor = l === 0 ? 'rgba(173,198,255, 0.25)' : 'transparent';
        ctx.shadowBlur = l === 0 ? 8 : 0;
        ctx.lineWidth = l === 0 ? 1.5 : 1;

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, baseRadius, radiusY, orbitalAngleRef.current * (l + 1) * 0.1, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, baseRadius, -orbitalAngleRef.current * (l + 1) * 0.1, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.shadowBlur = 0; // reset shadow

      // 3. Render and Connect Floating Particle Mesh Nodes
      particles.forEach((p, idx) => {
        if (!isReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Boundary bounce with padding
          const padding = 20;
          if (p.x < padding || p.x > dimensions.width - padding) p.vx *= -1;
          if (p.y < padding || p.y > dimensions.height - padding) p.vy *= -1;

          // Mouse magnet drag effect
          if (mouseRef.current.active) {
            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              const force = (130 - dist) / 6000;
              p.x += dx * force;
              p.y += dy * force;
            }
          }
        }

        // Draw particle node
        ctx.fillStyle = `rgba(173,198,255, ${p.glow})`;
        ctx.shadowColor = 'rgba(173,198,255, 0.4)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Trace connections to neighboring nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 85;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.14;
            ctx.strokeStyle = `rgba(173,198,255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      // 4. Draw Floating HUD Terminal labels
      floatingTags.forEach((tag, idx) => {
        const offset = floatingOffsets.current[idx];
        if (!isReducedMotion) {
          offset.angle += 0.008 * tag.speed;
          offset.xOffset = Math.sin(offset.angle) * 7;
          offset.yOffset = Math.cos(offset.angle * 1.5) * 5;
        }

        const x = tag.x * dimensions.width + offset.xOffset;
        const y = tag.y * dimensions.height + offset.yOffset;

        // Draw bounding glass HUD tab
        ctx.fillStyle = 'rgba(18, 18, 26, 0.75)';
        ctx.strokeStyle = 'rgba(173,198,255, 0.2)';
        ctx.lineWidth = 1;

        const textWidth = ctx.measureText(tag.text).width || 60;
        const px = 8;
        const py = 5;

        // Draw pill-shaped path
        ctx.beginPath();
        ctx.roundRect(x - textWidth / 2 - px, y - py - 6, textWidth + px * 2, 18, 4);
        ctx.fill();
        ctx.stroke();

        // Label small neon tactical dot inside badge
        ctx.fillStyle = '#10B981'; // bright state green
        ctx.beginPath();
        ctx.arc(x - textWidth / 2 - px / 2 + 1, y + 2, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Label text in futuristic JetBrains Mono styling
        ctx.fillStyle = '#adc6ff'; // primary-fixed
        ctx.font = '700 8px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(tag.text, x + 3, y + 5);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [dimensions]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full min-h-[400px] overflow-hidden pointer-events-auto"
      style={{ touchAction: 'none' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-70 group-hover:opacity-95 transition-opacity duration-500"
      />
      {/* Tiny floating terminal status lines in corner of scene */}
      <div className="absolute bottom-4 left-6 font-mono text-[9px] text-[#849495] tracking-wider select-none space-y-1 z-10 p-2 glass-panel border border-white/5 bg-[#0a0e14]/40 rounded">
        <div><span className="text-[#10B981]">●</span> sys.status = &quot;available&quot;</div>
        <div><span className="text-[#adc6ff]">●</span> deploying_confidence... done</div>
        <div><span className="text-tertiary">●</span> linux_energy: active</div>
        <div><span className="text-[#ffb786]">●</span> bugs: under investigation</div>
      </div>
    </div>
  );
}
