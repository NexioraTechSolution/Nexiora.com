import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Smartphone, Palette, Cloud, Brain,Megaphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Custom websites and web applications built with modern frameworks. From landing pages to complex SaaS platforms, we deliver pixel-perfect, performant solutions.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description:
      'Native and cross-platform mobile applications for iOS and Android. We create intuitive, high-performance apps that users love.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'User-centered design that combines aesthetics with functionality. We create interfaces that are beautiful, intuitive, and conversion-optimized.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'Strategic digital marketing campaigns that grow your brand online. SEO, paid ads, social media, and conversion optimization designed to drive results.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Scalable cloud infrastructure and DevOps automation. We architect, migrate, and manage cloud environments on AWS, Azure, and GCP.',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description:
      'Harness the power of artificial intelligence. From machine learning models to NLP and computer vision, we integrate AI into your products.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animations
      if (headerRef.current) {
        const label = headerRef.current.querySelector('.section-label');
        const title = headerRef.current.querySelector('.section-title');
        const subtitle = headerRef.current.querySelector('.section-subtitle');

        gsap.fromTo(label,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
          }
        );

        // Title word-by-word reveal
        if (title) {
          const words = title.querySelectorAll('.title-word');
          gsap.fromTo(words,
            { y: '100%', opacity: 0 },
            {
              y: '0%', opacity: 1, duration: 1, stagger: 0.08,
              ease: 'power4.out',
              scrollTrigger: { trigger: headerRef.current, start: 'top 75%' }
            }
          );
        }

        gsap.fromTo(subtitle,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3,
            scrollTrigger: { trigger: headerRef.current, start: 'top 75%' }
          }
        );
      }

      // Cards 3D entrance animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-card');
        cards.forEach((card, i) => {
          const col = i % 3;

          gsap.fromTo(card,
            {
              y: 80,
              opacity: 0,
              rotateX: 20,
              rotateY: (col - 1) * 5,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 1,
              delay: i * 0.1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 80%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = 'What We Do Best'.split(' ');

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: '#0a0a0a' }}
    >
      {/* Subtle top gradient */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none" 
        style={{ background: 'linear-gradient(to bottom, #000000, transparent)' }} 
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <p className="section-label font-label mb-6" style={{ color: 'rgba(229, 9, 20, 0.7)' }}>
            OUR SERVICES
          </p>
          <h2 className="section-title font-h1 text-white mb-6 overflow-hidden">
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <span className="title-word inline-block" style={{ transform: 'translateY(100%)' }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="section-subtitle text-lg max-w-[500px] mx-auto" style={{ color: 'rgba(255,255,255,0.4)', opacity: 0 }}>
            Comprehensive digital solutions tailored to your needs
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card glass-card p-10 group relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d', opacity: 0 }}
              >
                {/* Red accent line on hover */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ background: 'linear-gradient(90deg, transparent, #e50914, transparent)' }} 
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{ 
                      background: 'rgba(229, 9, 20, 0.08)',
                      border: '1px solid rgba(229, 9, 20, 0.15)',
                    }}
                  >
                    <Icon
                      size={24}
                      className="transition-all duration-500"
                      style={{ color: '#e50914' }}
                    />
                  </div>
                  <h3 className="font-h3 text-white text-xl mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {service.description}
                  </p>
                </div>

                {/* Hover glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(229,9,20,0.06) 0%, transparent 60%)' }} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
