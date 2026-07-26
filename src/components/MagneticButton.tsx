import React, { useRef, useState } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  magneticStrength?: number; // max offset in px
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  id?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  magneticStrength = 6,
  className = '',
  variant = 'primary',
  onClick,
  id,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    // Measure the stationary outer container, so rect NEVER shifts during transform
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Subtle, smooth magnetic attraction without wild drifting
    const limit = Math.min(magneticStrength, 8);
    const magnetX = (distanceX / (rect.width / 2)) * limit;
    const magnetY = (distanceY / (rect.height / 2)) * limit;

    setOffset({ x: magnetX, y: magnetY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setIsPressed(false);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#4A6741] text-white hover:bg-[#3D5535] active:bg-[#32472B] shadow-xs';
      case 'secondary':
        return 'bg-[#D4A373] text-white hover:bg-[#C29263] active:bg-[#B08153] shadow-xs';
      case 'outline':
        return 'bg-white text-[#4A6741] border border-[#4A6741] hover:bg-[#4A6741]/10';
      case 'ghost':
        return 'bg-transparent text-[#2C2C2C] hover:bg-[#E5E2D9]/50';
      default:
        return 'bg-[#4A6741] text-white';
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative"
    >
      <button
        id={id}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={onClick}
        className={`relative inline-flex items-center justify-center font-bold rounded-xl transition-transform duration-200 ease-out cursor-pointer ${getVariantStyles()} ${className}`}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${isPressed ? 0.95 : 1})`,
          willChange: 'transform',
        }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2 pointer-events-none">{children}</span>
      </button>
    </div>
  );
};
