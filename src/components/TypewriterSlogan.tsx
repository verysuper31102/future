import React, { useState, useEffect } from 'react';
import { Building2, Sparkles } from 'lucide-react';

interface TypewriterSloganProps {
  slogans: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const TypewriterSlogan: React.FC<TypewriterSloganProps> = ({
  slogans,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2800,
}) => {
  const [sloganIndex, setSloganIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = slogans[sloganIndex];

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pause at full text
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Move to next slogan
        setIsDeleting(false);
        setSloganIndex((prev) => (prev + 1) % slogans.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, sloganIndex, slogans, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div id="typewriter-slogan-section" className="w-full bg-gradient-to-r from-[#2C3E2B] via-[#4A6741] to-[#3B5433] text-white rounded-2xl p-4 sm:p-6 shadow-md border border-[#4A6741]/30 overflow-hidden relative">
      {/* Decorative background glow */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#D4A373]/20 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        
        {/* Left Badge & Slogan */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-[#D4A373] shadow-inner">
            <Building2 className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider bg-[#D4A373] text-white uppercase shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 企業照護體系 Slogan
              </span>
              <span className="text-xs text-white/70 font-mono hidden sm:inline-block">
                Enterprise EAP Care Network
              </span>
            </div>

            {/* Typewriter Text Box */}
            <div className="min-h-[2.25rem] flex items-center">
              <h2 className="text-sm sm:text-base md:text-lg font-serif font-medium tracking-wide text-emerald-50 leading-relaxed">
                {displayText}
                <span className="inline-block w-2 h-5 ml-1 bg-[#D4A373] animate-pulse align-middle" />
              </h2>
            </div>
          </div>
        </div>

        {/* Right CTA tag */}
        <div className="shrink-0 flex items-center gap-2 text-xs text-white/80 border-t md:border-t-0 md:border-l border-white/15 pt-3 md:pt-0 md:pl-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-medium text-emerald-100">企業特約合作方案進行中</span>
        </div>

      </div>
    </div>
  );
};
