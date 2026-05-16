import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Package {
  name: string;
  price: string;
  period: string;
  featured: boolean;
  features: string[];
}

const packages: Package[] = [
  {
    name: 'Starter',
    price: '$999',
    period: '/project',
    featured: false,
    features: [
      'Single-page website',
      'Responsive design',
      'Basic SEO',
      '2 revision rounds',
      '14-day delivery',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: '$2,999',
    period: '/project',
    featured: true,
    features: [
      'Multi-page website (up to 5)',
      'Custom UI/UX design',
      'Advanced SEO',
      'CMS integration',
      '5 revision rounds',
      '30-day delivery',
      'Priority support',
      'Performance optimization',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    featured: false,
    features: [
      'Unlimited pages',
      'Full-stack development',
      'AI integration',
      'Cloud deployment',
      'Dedicated team',
      'Unlimited revisions',
      'Ongoing maintenance',
      '24/7 support',
    ],
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animations
      if (headerRef.current) {
        gsap.from(headerRef.current.querySelectorAll('.animate-header'), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        });
      }

      // Cards flip-in animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.package-card');
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            {
              y: 100,
              opacity: 0,
              rotateX: -30,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              scale: 1,
              duration: 1.2,
              delay: i * 0.15,
              ease: 'power4.out',
              scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: '#000000' }}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(229,9,20,0.04) 0%, transparent 50%)' }} 
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <p className="animate-header font-label mb-6" style={{ color: 'rgba(229, 9, 20, 0.7)' }}>
            PACKAGES
          </p>
          <h2 className="animate-header font-h1 text-white mb-6">
            Choose Your Path
          </h2>
          <p className="animate-header text-lg max-w-[500px] mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Flexible pricing designed to scale with your ambitions
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ perspective: '1200px' }}
        >
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`package-card relative rounded-2xl p-10 lg:p-12 transition-all duration-500 ${
                pkg.featured
                  ? ''
                  : 'glass-card'
              }`}
              style={
                pkg.featured
                  ? {
                      background: 'linear-gradient(180deg, rgba(229,9,20,0.06) 0%, rgba(255,255,255,0.02) 30%)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: '1px solid rgba(229, 9, 20, 0.25)',
                      boxShadow: '0 0 60px rgba(229, 9, 20, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
                      transformStyle: 'preserve-3d',
                      opacity: 0,
                    }
                  : { opacity: 0, transformStyle: 'preserve-3d' }
              }
            >
              {/* Featured glow */}
              {pkg.featured && (
                <div 
                  className="absolute -top-px left-8 right-8 h-[1px]" 
                  style={{ background: 'linear-gradient(90deg, transparent, #e50914, transparent)' }} 
                />
              )}

              {/* Badge */}
              {pkg.featured && (
                <div className="flex justify-center mb-8">
                  <span
                    className="font-label text-[10px] px-5 py-1.5 rounded-full text-white"
                    style={{ background: 'linear-gradient(135deg, #e50914, #b20710)', letterSpacing: '0.15em' }}
                  >
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-h2 text-white text-center tracking-tight">{pkg.name}</h3>

              {/* Price */}
              <div className="text-center mt-5 mb-8">
                <span
                  className="font-extrabold tracking-tight"
                  style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: pkg.featured ? '#e50914' : '#ffffff' }}
                >
                  {pkg.price}
                </span>
                {pkg.period && (
                  <span className="text-sm ml-2" style={{ color: 'rgba(255,255,255,0.3)' }}>{pkg.period}</span>
                )}
              </div>

              {/* Divider */}
              <div className="h-[1px] mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

              {/* Features */}
              <ul className="flex flex-col gap-4 mb-10">
                {pkg.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" 
                      style={{ background: pkg.featured ? 'rgba(229,9,20,0.15)' : 'rgba(255,255,255,0.05)' }}
                    >
                      <Check size={11} style={{ color: pkg.featured ? '#e50914' : 'rgba(255,255,255,0.5)' }} />
                    </div>
                    <span className="text-[14px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 rounded-full font-label text-[11px] font-semibold tracking-[0.12em] transition-all duration-500 flex items-center justify-center gap-2 ${
                  pkg.featured
                    ? 'text-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(229,9,20,0.3)]'
                    : 'border text-white hover:border-red-DEFAULT hover:text-red-DEFAULT'
                }`}
                style={
                  pkg.featured
                    ? { background: 'linear-gradient(135deg, #e50914, #b20710)' }
                    : { borderColor: 'rgba(255,255,255,0.1)' }
                }
              >
                {pkg.price === 'Custom' ? 'CONTACT US' : 'GET STARTED'}
                <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
