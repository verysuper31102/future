import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Smartphone, Check, ChevronDown } from 'lucide-react';
import { ThemeMode } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark';
  isSystemDark: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  setTheme,
  resolvedTheme,
  isSystemDark,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getActiveIcon = () => {
    if (theme === 'system') {
      return <Smartphone className="w-4 h-4 text-[#D4A373] dark:text-[#E6B88A]" />;
    }
    if (resolvedTheme === 'dark') {
      return <Moon className="w-4 h-4 text-amber-300" />;
    }
    return <Sun className="w-4 h-4 text-amber-500" />;
  };

  const getActiveLabel = () => {
    if (theme === 'system') {
      return `手機模式 (${isSystemDark ? '深色' : '淺色'})`;
    }
    return theme === 'dark' ? '深色模式' : '淺色模式';
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#F1F0EB] dark:bg-[#252E23] hover:bg-[#E5E2D9] dark:hover:bg-[#323D2E] text-[#2C2C2C] dark:text-[#ECEAE4] text-xs font-medium border border-[#E5E2D9] dark:border-[#323D2E] transition-all cursor-pointer shadow-xs"
        title="切換主題 (淺色 / 深色 / 隨手機)"
        aria-label="模式切換選單"
      >
        {getActiveIcon()}
        <span className="hidden sm:inline-block text-xs font-medium">{getActiveLabel()}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#6B665F] dark:text-[#A8A39A] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Theme Selection Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1D231B] rounded-2xl shadow-xl border border-[#E5E2D9] dark:border-[#323D2E] py-2 z-50 animate-fadeIn text-xs">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-[#9A958E] dark:text-[#78736B] uppercase tracking-wider border-b border-[#F1F0EB] dark:border-[#2A3328] mb-1">
            色彩主題設定
          </div>

          <button
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F1F0EB] dark:hover:bg-[#252E23] transition-colors cursor-pointer ${
              theme === 'system' ? 'text-[#4A6741] dark:text-[#7EA373] font-bold' : 'text-[#2C2C2C] dark:text-[#ECEAE4]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#D4A373]" />
              <div>
                <div>偵測手機/系統模式</div>
                <div className="text-[10px] text-[#9A958E] dark:text-[#78736B] font-normal">
                  自動跟隨 ({isSystemDark ? '目前深色' : '目前淺色'})
                </div>
              </div>
            </div>
            {theme === 'system' && <Check className="w-4 h-4 text-[#4A6741] dark:text-[#7EA373]" />}
          </button>

          <button
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F1F0EB] dark:hover:bg-[#252E23] transition-colors cursor-pointer ${
              theme === 'light' ? 'text-[#4A6741] dark:text-[#7EA373] font-bold' : 'text-[#2C2C2C] dark:text-[#ECEAE4]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>淺色模式 (Light)</span>
            </div>
            {theme === 'light' && <Check className="w-4 h-4 text-[#4A6741] dark:text-[#7EA373]" />}
          </button>

          <button
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F1F0EB] dark:hover:bg-[#252E23] transition-colors cursor-pointer ${
              theme === 'dark' ? 'text-[#4A6741] dark:text-[#7EA373] font-bold' : 'text-[#2C2C2C] dark:text-[#ECEAE4]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-amber-300" />
              <span>深色模式 (Dark)</span>
            </div>
            {theme === 'dark' && <Check className="w-4 h-4 text-[#4A6741] dark:text-[#7EA373]" />}
          </button>
        </div>
      )}
    </div>
  );
};
