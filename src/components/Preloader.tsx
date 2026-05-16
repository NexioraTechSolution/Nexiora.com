import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();
    const lines = [
      '> INITIALIZING DIGITAL CORE...',
      '> CONNECTING TO MAINFRAME...',
      '> BYPASSING SECURITY PROTOCOLS...',
      '> UPLOADING CREATIVE ASSETS...',
      '> SYSTEM ONLINE.',
    ];

    let currentLine = 0;

    // Phase 1: Terminal typing effect (0 - 2.5s)
    tl.to({}, {
      duration: 2.5,
      onUpdate: function() {
        const progress = this.progress();
        const numLines = Math.floor(progress * lines.length) + 1;
        if (numLines !== currentLine && numLines <= lines.length) {
          currentLine = numLines;
          setTerminalLines(lines.slice(0, numLines));
        }
      }
    });

    // Phase 2: Fade out terminal, reveal logo (2.5 - 3s)
    tl.to(terminalRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Phase 3: Logo text letter-by-letter reveal
    if (logoTextRef.current) {
      const chars = logoTextRef.current.querySelectorAll('.preloader-char');
      tl.fromTo(
        chars,
        { opacity: 0, y: 30, color: '#ff0000' },
        {
          opacity: 1,
          y: 0,
          color: '#ffffff',
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }

    // Tagline fade in
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    );

    // Phase 4: Hold briefly, then curtain reveal
    tl.to({}, { duration: 0.6 });

    // Curtain split - top and bottom halves slide away
    const topCurtain = containerRef.current?.querySelector('.curtain-top');
    const bottomCurtain = containerRef.current?.querySelector('.curtain-bottom');

    if (topCurtain) {
      tl.to(topCurtain, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
      }, 'curtain');
    }

    if (bottomCurtain) {
      tl.to(bottomCurtain, {
        yPercent: 100,
        duration: 1,
        ease: 'power4.inOut',
      }, 'curtain');
    }

    // Logo fades during curtain
    tl.to(logoRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.6,
      ease: 'power2.in',
    }, 'curtain+=0.2');

    // Complete
    tl.call(() => {
      onComplete();
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const logoText = 'NEXIORA';

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Top Curtain */}
      <div className="curtain-top absolute inset-0" style={{ clipPath: 'inset(0 0 50% 0)', background: '#030303' }}>
        <div className="absolute bottom-0 w-full h-[1px] bg-red-DEFAULT/50 shadow-[0_0_15px_rgba(229,9,20,0.8)]" />
      </div>
      {/* Bottom Curtain */}
      <div className="curtain-bottom absolute inset-0" style={{ clipPath: 'inset(50% 0 0 0)', background: '#030303' }}>
        <div className="absolute top-0 w-full h-[1px] bg-red-DEFAULT/50 shadow-[0_0_15px_rgba(229,9,20,0.8)]" />
      </div>

      {/* Content Center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 font-mono">
        {/* Terminal Text */}
        <div ref={terminalRef} className="absolute flex flex-col items-start gap-2 max-w-[400px] w-full px-6">
          <div ref={linesRef} className="flex flex-col gap-2 w-full">
            {terminalLines.map((line, i) => (
              <div key={i} className="text-sm md:text-base tracking-widest font-bold drop-shadow-[0_0_8px_rgba(229,9,20,0.6)]" style={{ color: 'rgba(229, 9, 20, 0.7)' }}>
                {line}
              </div>
            ))}
            <div className="w-3 h-5 animate-pulse mt-1" style={{ background: 'rgba(229, 9, 20, 0.7)' }} />
          </div>
        </div>

        {/* Logo Reveal */}
        <div ref={logoRef} className="absolute flex flex-col items-center gap-4 opacity-0">
          <span
            ref={logoTextRef}
            className="text-[32px] md:text-[48px] font-bold tracking-[0.25em] text-white"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
          >
            {logoText.split('').map((char, i) => (
              <span key={i} className="preloader-char inline-block opacity-0">
                {char}
              </span>
            ))}
          </span>
          <span
            ref={taglineRef}
            className="font-label text-red-DEFAULT tracking-[0.3em] text-[10px] md:text-[12px] opacity-0 drop-shadow-[0_0_10px_rgba(229,9,20,0.5)]"
          >
            DIGITAL EXPERTISE INITIALIZED
          </span>
        </div>
      </div>
    </div>
  );
}
