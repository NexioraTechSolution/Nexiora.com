import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const linkColumns = [
  {
    title: 'COMPANY',
    links: ['About', 'Careers', 'Blog', 'Press'],
  },
  {
    title: 'SERVICES',
    links: ['Web Dev', 'Mobile', 'Design', 'Cloud'],
  },
  {
    title: 'RESOURCES',
    links: ['Documentation', 'Case Studies', 'FAQ', 'Support'],
  },
  {
    title: 'LEGAL',
    links: ['Privacy Policy', 'Terms of Service', 'Cookies'],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(footerRef.current!.querySelectorAll('.footer-animate'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="pt-24 pb-10 relative"
      style={{ background: '#000000' }}
    >
      {/* Top gradient */}
      <div 
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none" 
        style={{ background: 'linear-gradient(to bottom, #0a0a0a, transparent)' }} 
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-14 mb-16">
          {/* Logo + Tagline */}
          <div className="footer-animate">
            <span className="text-[14px] font-bold tracking-[0.25em] text-white block mb-4">
              NEXIORA
            </span>
            <p className="text-sm max-w-[260px]" style={{ color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
              Transforming ideas into digital reality. We craft experiences that matter.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
            {linkColumns.map((column) => (
              <div key={column.title} className="footer-animate">
                <p className="font-label mb-5" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>
                  {column.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[13px] transition-colors duration-300 hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div 
          className="h-[1px] mb-8 footer-animate" 
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} 
        />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 footer-animate">
          <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            &copy; 2026 NEXIORA. All rights reserved.
          </p>
          <p className="font-label text-[9px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            TRANSFORMING IDEAS INTO DIGITAL REALITY
          </p>
        </div>
      </div>
    </footer>
  );
}
