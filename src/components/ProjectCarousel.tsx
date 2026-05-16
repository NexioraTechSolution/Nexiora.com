import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  badge?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  variant?: 'red' | 'neutral';
}

export default function ProjectCarousel({ projects, variant = 'red' }: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPos = useRef(0);
  const rafId = useRef<number | null>(null);
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const dragScroll = useRef(0);

  const cardWidth = 416; // 400px card + 16px gap
  const maxScroll = projects.length * cardWidth;

  const animate = useCallback(() => {
    if (!isPaused && !isDragging.current) {
      scrollPos.current += 0.4;
      if (scrollPos.current > maxScroll) {
        scrollPos.current = 0;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${scrollPos.current}px)`;
      }
    }
    rafId.current = requestAnimationFrame(animate);
  }, [isPaused, maxScroll]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current!.querySelectorAll('.carousel-card'), 
      {
        x: 120,
        opacity: 0,
        rotateY: -15,
      },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      const newPos =
        direction === 'left'
          ? Math.max(0, scrollPos.current - cardWidth)
          : Math.min(maxScroll, scrollPos.current + cardWidth);

      scrollPos.current = newPos;
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          x: -newPos,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    },
    [maxScroll]
  );

  const handleDragStart = useCallback((clientX: number) => {
    isDragging.current = true;
    dragStart.current = clientX;
    dragScroll.current = scrollPos.current;
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging.current) return;
    const diff = dragStart.current - clientX;
    scrollPos.current = Math.max(0, Math.min(maxScroll, dragScroll.current + diff));
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${scrollPos.current}px)`;
    }
  }, [maxScroll]);

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const isRed = variant === 'red';

  return (
    <div
      ref={containerRef}
      className="relative mt-16 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); isDragging.current = false; }}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
      style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
    >
      {/* Navigation Arrows */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <button
          onClick={() => scroll('left')}
          className="w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 hover:border-red-DEFAULT hover:text-red-DEFAULT"
          style={{ 
            background: 'rgba(255,255,255,0.03)', 
            borderColor: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.6)' 
          }}
        >
          <ChevronLeft size={18} />
        </button>
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <button
          onClick={() => scroll('right')}
          className="w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 hover:border-red-DEFAULT hover:text-red-DEFAULT"
          style={{ 
            background: 'rgba(255,255,255,0.03)', 
            borderColor: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.6)' 
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Track */}
      <div className="overflow-hidden lg:mx-10">
        <div
          ref={trackRef}
          className="flex gap-4 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {/* Duplicate for seamless loop */}
          {[...projects, ...projects].map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="carousel-card flex-shrink-0 w-[380px] lg:w-[400px] rounded-2xl overflow-hidden group transition-all duration-500"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${isRed ? 'rgba(229,9,20,0.1)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {/* Image with parallax */}
              <div className="h-[280px] overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                  loading="lazy"
                  draggable={false}
                />
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0" 
                  style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)' }} 
                />
                {/* Badge */}
                {project.badge && (
                  <div className="absolute top-4 left-4">
                    <span
                      className="font-label text-[9px] px-3 py-1 rounded-full"
                      style={{ 
                        background: isRed ? 'rgba(229,9,20,0.15)' : 'rgba(255,255,255,0.08)', 
                        color: isRed ? '#e50914' : 'rgba(255,255,255,0.5)', 
                        border: `1px solid ${isRed ? 'rgba(229,9,20,0.2)' : 'rgba(255,255,255,0.1)'}` 
                      }}
                    >
                      {project.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <p 
                  className="font-label text-[10px] mb-2" 
                  style={{ color: isRed ? '#e50914' : 'rgba(255,255,255,0.4)' }}
                >
                  {project.category}
                </p>
                <h3 className="font-h3 text-white text-lg mb-2 tracking-tight">{project.name}</h3>
                <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {project.description}
                </p>
              </div>

              {/* Bottom accent line on hover */}
              <div 
                className="h-[2px] transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left" 
                style={{ background: isRed ? 'linear-gradient(90deg, #e50914, transparent)' : 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
