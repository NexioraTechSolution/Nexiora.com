import { useEffect, useState, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Lenis from '@studio-freight/lenis';

interface NavigationProps {
  lenisRef: React.RefObject<Lenis | null>;
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Show nav after preloader
    const timer = setTimeout(() => setVisible(true), 4200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 100);
      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 500) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback(
    (href: string) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(href, { offset: -72 });
      }
      setMobileMenuOpen(false);
    },
    [lenisRef]
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${hidden && !mobileMenuOpen ? '-translate-y-full' : 'translate-y-0'}`}
        style={{
          background: scrolled ? 'rgba(0,0,0,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex h-[72px] items-center justify-between px-6 lg:px-12 max-w-[1400px]">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="text-[14px] font-bold tracking-[0.2em] text-white hover:text-red-DEFAULT transition-colors duration-500"
          >
            NEXIORA
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative text-[13px] font-medium tracking-[0.06em] transition-colors duration-500 py-2 ${
                  activeSection === link.href
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-red-DEFAULT" 
                    style={{ boxShadow: '0 0 8px rgba(229,9,20,0.5)' }} 
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden lg:block text-[11px] font-semibold tracking-[0.1em] px-6 py-2.5 rounded-full text-white border border-white/10 hover:border-red-DEFAULT hover:text-red-DEFAULT transition-all duration-500"
            >
              GET STARTED
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-red-DEFAULT transition-colors duration-300"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(0,0,0,0.98)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-3xl font-light tracking-[0.05em] text-white/80 hover:text-red-DEFAULT transition-colors duration-300"
              style={{
                transitionDelay: mobileMenuOpen ? `${i * 50}ms` : '0ms',
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-6 text-[13px] font-semibold tracking-[0.1em] px-10 py-4 rounded-full text-white"
            style={{
              background: 'linear-gradient(135deg, #e50914, #b20710)',
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
            }}
          >
            GET STARTED
          </button>
        </div>
      </div>
    </>
  );
}
