import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const obj = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: target,
        duration: 2.5,
        ease: 'power2.out',
        snap: { value: 1 },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.round(obj.value) + suffix;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Word-by-word reveal for heading - scrubbed to scroll
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.reveal-word');
        gsap.fromTo(words, 
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 75%',
              end: 'top 30%',
              scrub: 0.5,
            },
          }
        );
      }

      // Body paragraph fade up
      gsap.fromTo(bodyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 80%',
          },
        }
      );

      // Stats stagger in
      gsap.from('.about-stat', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 85%',
        },
      });

      // Image parallax - moves at different speed
      if (imageRef.current && imageContainerRef.current) {
        gsap.fromTo(imageContainerRef.current,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 85%',
            },
          }
        );

        // Inner image parallax on scroll
        gsap.to(imageRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = 'We Build The Future One Pixel At A Time';
  const words = headingText.split(' ');

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: '#000000' }}
    >
      {/* Subtle gradient */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(229,9,20,0.03) 0%, transparent 50%)' }} 
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          {/* Left Column - Text */}
          <div>
            <p className="font-label mb-8" style={{ color: 'rgba(229, 9, 20, 0.7)' }}>
              ABOUT US
            </p>

            {/* Heading with word-by-word reveal */}
            <h2
              ref={headingRef}
              className="font-h1 text-white mb-8 overflow-hidden"
            >
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                  <span className="reveal-word inline-block" style={{ transform: 'translateY(110%)' }}>
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            {/* Body */}
            <p
              ref={bodyRef}
              className="text-lg leading-relaxed mb-12"
              style={{ color: 'rgba(255,255,255,0.55)', opacity: 0 }}
            >
              NEXIORA is a forward-thinking technology company that bridges the gap between
              imagination and implementation. We specialize in crafting cutting-edge digital
              solutions — from web and mobile applications to AI-powered systems and cloud
              infrastructure. Our team of engineers, designers, and strategists work in unison
              to deliver products that don't just meet expectations — they redefine them.
            </p>

            {/* Stats */}
            <div className="about-stats flex flex-wrap gap-16">
              <div className="about-stat">
                <p className="text-[42px] font-bold tracking-tight" style={{ color: '#e50914' }}>
                  <AnimatedCounter target={150} suffix="+" />
                </p>
                <p className="font-label mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  PROJECTS DELIVERED
                </p>
              </div>
              <div className="about-stat">
                <p className="text-[42px] font-bold tracking-tight" style={{ color: '#e50914' }}>
                  <AnimatedCounter target={50} suffix="+" />
                </p>
                <p className="font-label mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  TEAM MEMBERS
                </p>
              </div>
              <div className="about-stat">
                <p className="text-[42px] font-bold tracking-tight" style={{ color: '#e50914' }}>
                  <AnimatedCounter target={12} />
                </p>
                <p className="font-label mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  YEARS EXPERIENCE
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image with parallax */}
          <div
            ref={imageContainerRef}
            className="relative rounded-2xl overflow-hidden"
            style={{ opacity: 0 }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                ref={imageRef}
                src="/images/about-visual.jpg"
                alt="NEXIORA Technology"
                className="w-full h-[120%] object-cover will-change-transform"
                loading="lazy"
              />
            </div>
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)' }}
            />
            {/* Border glow */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none" 
              style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px rgba(229,9,20,0.08)' }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
