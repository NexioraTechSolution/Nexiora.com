import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCarousel from '../components/ProjectCarousel';
import type { Project } from '../components/ProjectCarousel';

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    id: 1,
    name: 'Aether Commerce',
    category: 'E-Commerce',
    description: 'A next-generation e-commerce platform with AI-powered recommendations and real-time inventory management.',
    image: '/images/project-1.jpg',
  },
  {
    id: 2,
    name: 'Nebula Finance',
    category: 'Fintech',
    description: 'Revolutionary personal finance app with predictive budgeting and investment insights.',
    image: '/images/project-2.jpg',
  },
  {
    id: 3,
    name: 'PulseCare',
    category: 'Healthcare',
    description: 'Telemedicine platform connecting patients with specialists through secure video consultations.',
    image: '/images/project-3.jpg',
  },
  {
    id: 4,
    name: 'Stellar Education',
    category: 'EdTech',
    description: 'Interactive learning management system with gamification and adaptive learning paths.',
    image: '/images/project-4.jpg',
  },
  {
    id: 5,
    name: 'Vortex Social',
    category: 'Social Media',
    description: 'Decentralized social platform focused on privacy and content ownership.',
    image: '/images/project-5.jpg',
  },
  {
    id: 6,
    name: 'Prism Analytics',
    category: 'SaaS',
    description: 'Real-time business intelligence dashboard with predictive analytics and automated reporting.',
    image: '/images/project-6.jpg',
  },
];

export default function Projects() {
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
    <section id="projects" className="section-padding relative" style={{ background: '#0a0a0a' }}>
      <div 
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none" 
        style={{ background: 'linear-gradient(to bottom, #000000, transparent)' }} 
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div ref={headerRef}>
          <p className="animate-in font-label mb-6" style={{ color: 'rgba(229, 9, 20, 0.7)' }}>
            OUR WORK
          </p>
          <h2 className="animate-in font-h1 text-white">
            Projects That Define Us
          </h2>
        </div>

        <ProjectCarousel projects={projects} variant="red" />
      </div>
    </section>
  );
}
