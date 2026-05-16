import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCarousel from '../components/ProjectCarousel';
import type { Project } from '../components/ProjectCarousel';

gsap.registerPlugin(ScrollTrigger);

const upcomingProjects: Project[] = [
  {
    id: 1,
    name: 'Synapse AI',
    category: 'Artificial Intelligence',
    description: 'Autonomous AI agent platform for enterprise workflow automation and decision intelligence.',
    image: '/images/upcoming-1.jpg',
    badge: 'COMING Q3 2026',
  },
  {
    id: 2,
    name: 'Orbit VR',
    category: 'Virtual Reality',
    description: 'Immersive VR collaboration suite for remote teams with spatial computing features.',
    image: '/images/upcoming-2.jpg',
    badge: 'COMING Q3 2026',
  },
  {
    id: 3,
    name: 'Cipher Vault',
    category: 'Cybersecurity',
    description: 'Zero-trust security infrastructure with quantum-resistant encryption protocols.',
    image: '/images/upcoming-3.jpg',
    badge: 'COMING Q3 2026',
  },
  {
    id: 4,
    name: 'Pulse IoT',
    category: 'Internet of Things',
    description: 'Smart city infrastructure management platform with real-time sensor analytics.',
    image: '/images/upcoming-4.jpg',
    badge: 'COMING Q3 2026',
  },
];

export default function UpcomingProjects() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const els = headerRef.current!.querySelectorAll('.animate-in');
      gsap.from(els, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="upcoming" className="section-padding relative" style={{ background: '#000000' }}>
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(229,9,20,0.03) 0%, transparent 50%)' }} 
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div ref={headerRef}>
          <p className="animate-in font-label mb-6" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>
            COMING SOON
          </p>
          <h2 className="animate-in font-h1 text-white">
            What's Next
          </h2>
        </div>

        <ProjectCarousel projects={upcomingProjects} variant="neutral" />
      </div>
    </section>
  );
}
