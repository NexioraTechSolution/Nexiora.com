import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const animate = () => {
      // Outer ring follows with lag
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.12;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.12;

      // Inner dot follows faster
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.25;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1}) scale(${isClicking ? 0.9 : 1})`;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [isHovering, isClicking]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          borderRadius: '50%',
          border: `1px solid ${isHovering ? '#e50914' : 'rgba(255,255,255,0.3)'}`,
          transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
          boxShadow: isHovering ? '0 0 15px rgba(229, 9, 20, 0.3)' : 'none',
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: isHovering ? '#e50914' : '#ffffff',
          transition: 'background 0.3s ease',
        }}
      />
    </>
  );
}
