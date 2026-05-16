import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Glow orb breathing
      gsap.to('.bg-orb', {
        scale: 1.2,
        opacity: 0.15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Snowfall animation
      const flakes = containerRef.current!.querySelectorAll('.snow-flake');
      flakes.forEach((flake) => {
        gsap.to(flake, {
          y: '100vh',
          x: '+=random(-50, 50)',
          rotation: 'random(0, 360)',
          duration: 'random(10, 25)',
          ease: 'none',
          repeat: -1,
          delay: 'random(-20, 0)'
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const numFlakes = 60;

  return (
    <div ref={containerRef}>
      {/* Background Layer (Orbs and gradients) */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
        style={{ background: '#050505' }}
      >
        <div
          className="bg-orb absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-[100%] blur-[120px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(229,9,20,0.8) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 70%, #050505 100%)' }}
        />
      </div>

      {/* Foreground Layer (Snowfall over the entire website) */}
      <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
        {Array.from({ length: numFlakes }).map((_, i) => {
          const size = Math.random() * 4 + 2;
          return (
            <div
              key={i}
              className="snow-flake absolute rounded-full pointer-events-none"
              style={{
                top: '-10px',
                left: `${Math.random() * 100}vw`,
                width: `${size}px`,
                height: `${size}px`,
                background: 'rgba(229, 9, 20, 0.7)',
                boxShadow: '0 0 8px rgba(229, 9, 20, 0.5)',
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
