import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  lenisRef: React.RefObject<Lenis | null>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.8 });

      // Background parallax scale
      gsap.fromTo(bgRef.current, 
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 3.6 }
      );

      // Label fade in
      tl.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0
      );

      // Headline character animation
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.hero-char');
        tl.fromTo(
          chars,
          { y: 120, opacity: 0, rotateX: -80, skewY: 8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            skewY: 0,
            duration: 1.2,
            stagger: 0.04,
            ease: 'power4.out',
          },
          0.15
        );
      }

      // Tagline word-by-word reveal
      if (taglineRef.current) {
        const words = taglineRef.current.querySelectorAll('.tag-word');
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.8
        );
      }

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        1.2
      );

      // Scroll line
      tl.fromTo(
        lineRef.current,
        { opacity: 0, scaleY: 0 },
        { opacity: 1, scaleY: 1, duration: 0.8, ease: 'power2.out' },
        1.5
      );

      // Parallax on scroll
      gsap.to(contentRef.current, {
        y: -200,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=40vh',
          scrub: 0.5,
        },
      });

      // Background parallax (moves slower)
      gsap.to(bgRef.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=50vh',
          scrub: 0.5,
        },
      });

      // Scroll indicator bounce
      const scrollBounce = lineRef.current?.querySelector('.scroll-bounce');
      if (scrollBounce) {
        gsap.to(scrollBounce, {
          y: 12,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { offset: -72 });
    }
  };

  const headlineText = 'NEXIORA';
  const taglineWords = 'TRANSFORMING IDEAS INTO DIGITAL REALITY'.split(' ');

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Background gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(229, 9, 20, 0.06) 0%, #000000 60%)',
        }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div 
          className="absolute left-1/4 top-0 bottom-0 w-[1px]" 
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }} 
        />
        <div 
          className="absolute left-1/2 top-0 bottom-0 w-[1px]" 
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)' }} 
        />
        <div 
          className="absolute left-3/4 top-0 bottom-0 w-[1px]" 
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }} 
        />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10">
        {/* Label */}
        <p
          ref={labelRef}
          className="font-label mb-8"
          style={{ color: 'rgba(229, 9, 20, 0.8)', opacity: 0 }}
        >
          TECHNOLOGY REDEFINED
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-white mb-6"
          style={{ perspective: '800px' }}
        >
          {headlineText.split('').map((char, i) => (
            <span
              key={i}
              className="hero-char inline-block"
              style={{ transformOrigin: 'bottom center' }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="max-w-[700px] mx-auto mb-12 flex flex-wrap justify-center gap-x-3 gap-y-1"
          style={{ fontSize: 'clamp(14px, 2vw, 22px)', fontWeight: 300, letterSpacing: '0.15em', opacity: 0 }}
        >
          {taglineWords.map((word, i) => (
            <span key={i} className="tag-word inline-block text-white/50">
              {word}
            </span>
          ))}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4" style={{ opacity: 0 }}>
          <button onClick={() => scrollTo('#services')} className="btn-primary">
            <span className="flex items-center gap-2">
              EXPLORE SERVICES
              <ArrowRight size={14} />
            </span>
          </button>
          <button onClick={() => scrollTo('#projects')} className="btn-outline">
            <span>VIEW PROJECTS</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={lineRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 origin-top"
        style={{ opacity: 0 }}
      >
        <span className="font-label text-[9px] text-white/30 tracking-[0.2em]">SCROLL</span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-red-DEFAULT" 
            style={{ boxShadow: '0 0 6px rgba(229,9,20,0.5)' }} 
          />
        </div>
        <ChevronDown size={14} className="text-white/30 scroll-bounce" />
      </div>
    </section>
  );
}
