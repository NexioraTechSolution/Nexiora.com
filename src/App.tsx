import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Packages from './sections/Packages';
import Projects from './sections/Projects';
import UpcomingProjects from './sections/UpcomingProjects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import BackgroundEffects from './components/BackgroundEffects';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Refresh ScrollTrigger after preloader completes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <CustomCursor />
      <Navigation lenisRef={lenisRef} />
      <BackgroundEffects />

      <main>
        <Hero lenisRef={lenisRef} />
        <About />
        <Services />
        <Packages />
        <Projects />
        <UpcomingProjects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
