import React from 'react';
import { Search, ClipboardList, MessageSquare, Heart, PhoneCall, Smartphone, Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../hooks/useTheme';

interface MobileBottomNavProps {
  activeMode: 'seeker' | 'caregiver' | 'ops';
  setActiveMode: (mode: 'seeker' | 'caregiver' | 'ops') => void;
  savedCount: number;
  unreadCount: number;
  onOpenSaved: () => void;
  onOpenChat: () => void;
  onOpenSupport: () => void;
  onOpenForm: () => void;
  onOpenInstallPwa?: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark';
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeMode,
  setActiveMode,
  savedCount,
  unreadCount,
  onOpenSaved,
  onOpenChat,
  onOpenSupport,
  onOpenForm,
  onOpenInstallPwa,
  theme,
  setTheme,
  resolvedTheme,
}) => {
  const toggleNextTheme = () => {
    if (theme === 'system') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'system') return <Smartphone className="w-5 h-5 text-[#D4A373]" />;
    if (resolvedTheme === 'dark') return <Moon className="w-5 h-5 text-amber-300" />;
    return <Sun className="w-5 h-5 text-amber-500" />;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#1C221A]/95 backdrop-blur-md border-t border-[#E5E2D9] dark:border-[#323D2E] md:hidden px-3 py-2 shadow-lg transition-colors">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Search / Home */}
        <button
          onClick={() => {
            setActiveMode('seeker');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 transition-colors cursor-pointer ${
            activeMode === 'seeker' ? 'text-[#4A6741] dark:text-[#7EA373] font-bold' : 'text-[#6B665F] dark:text-[#B2ADA3]'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px]">智慧媒合</span>
        </button>

        {/* Form Link */}
        <button
          onClick={onOpenForm}
          className="flex flex-col items-center gap-0.5 p-1.5 text-[#6B665F] dark:text-[#B2ADA3] hover:text-[#4A6741] dark:hover:text-[#7EA373] transition-colors cursor-pointer"
        >
          <ClipboardList className="w-5 h-5 text-[#D4A373]" />
          <span className="text-[10px]">需求表單</span>
        </button>

        {/* Saved Favorites */}
        <button
          onClick={onOpenSaved}
          className="relative flex flex-col items-center gap-0.5 p-1.5 text-[#6B665F] dark:text-[#B2ADA3] hover:text-[#4A6741] dark:hover:text-[#7EA373] transition-colors cursor-pointer"
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px]">我的收藏</span>
          {savedCount > 0 && (
            <span className="absolute top-1 right-2 w-3.5 h-3.5 bg-[#D4A373] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>

        {/* In-app Chat */}
        <button
          onClick={onOpenChat}
          className="relative flex flex-col items-center gap-0.5 p-1.5 text-[#6B665F] dark:text-[#B2ADA3] hover:text-[#4A6741] dark:hover:text-[#7EA373] transition-colors cursor-pointer"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">諮詢對話</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-2 w-3.5 h-3.5 bg-[#D4A373] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Quick Theme Toggle */}
        <button
          onClick={toggleNextTheme}
          className="flex flex-col items-center gap-0.5 p-1.5 text-[#6B665F] dark:text-[#B2ADA3] hover:text-[#4A6741] dark:hover:text-[#7EA373] transition-colors cursor-pointer"
          title={`切換主題（目前：${theme === 'system' ? '隨手機' : theme === 'dark' ? '深色' : '淺色'}）`}
        >
          {getThemeIcon()}
          <span className="text-[10px]">
            {theme === 'system' ? '隨手機' : theme === 'dark' ? '深色' : '淺色'}
          </span>
        </button>

        {/* Install Mobile PWA Shortcut */}
        {onOpenInstallPwa && (
          <button
            onClick={onOpenInstallPwa}
            className="flex flex-col items-center gap-0.5 p-1.5 text-[#6B665F] dark:text-[#B2ADA3] hover:text-[#4A6741] dark:hover:text-[#7EA373] transition-colors cursor-pointer"
            title="加到桌面"
          >
            <Smartphone className="w-5 h-5 text-[#D4A373]" />
            <span className="text-[10px]">加到桌面</span>
          </button>
        )}

        {/* 24H Hotline */}
        <button
          onClick={onOpenSupport}
          className="flex flex-col items-center gap-0.5 p-1.5 text-[#6B665F] dark:text-[#B2ADA3] hover:text-[#4A6741] dark:hover:text-[#7EA373] transition-colors cursor-pointer"
        >
          <PhoneCall className="w-5 h-5 text-[#D4A373]" />
          <span className="text-[10px]">24H客服</span>
        </button>

      </div>
    </div>
  );
};
