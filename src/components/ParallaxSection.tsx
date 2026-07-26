import React, { useEffect, useState, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgImage?: string;
  speed?: number; // 0.1 to 0.5 for subtle lag
  className?: string;
  overlayOpacity?: number;
  id?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  bgImage = 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&q=80&w=1600',
  speed = 0.25,
  className = '',
  overlayOpacity = 0.85,
  id,
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPos = window.scrollY || window.pageYOffset;
      const elementTop = rect.top + scrollPos;
      
      // Calculate scroll offset relative to section view
      const relativeScroll = scrollPos - elementTop;
      setOffsetY(relativeScroll * speed);
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // init

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`relative overflow-hidden rounded-2xl border border-[#E5E2D9] ${className}`}
    >
      {/* Background image with parallax scroll translate */}
      {bgImage && (
        <div
          className="absolute inset-0 w-full h-[140%] -top-[20%] bg-cover bg-center pointer-events-none transition-transform ease-out"
          style={{
            backgroundImage: `url(${bgImage})`,
            transform: `translate3d(0, ${offsetY}px, 0)`,
            willChange: 'transform',
          }}
        />
      )}

      {/* Dark warm overlay for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1D2B1C] via-[#2C3E2B] to-[#1D2B1C] pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
