import React from 'react';
import { Heart, MessageSquare, ShieldCheck, FileText, PhoneCall, HeartHandshake, UserCheck, Search, ClipboardList } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeMode } from '../hooks/useTheme';

interface HeaderProps {
  activeMode: 'seeker' | 'caregiver' | 'ops';
  setActiveMode: (mode: 'seeker' | 'caregiver' | 'ops') => void;
  savedCount: number;
  unreadCount: number;
  activeBookingsCount: number;
  onOpenSaved: () => void;
  onOpenBookings: () => void;
  onOpenChat: () => void;
  onOpenSupport: () => void;
  onOpenForm?: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark';
  isSystemDark: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeMode,
  setActiveMode,
  savedCount,
  unreadCount,
  activeBookingsCount,
  onOpenSaved,
  onOpenBookings,
  onOpenChat,
  onOpenSupport,
  onOpenForm,
  theme,
  setTheme,
  resolvedTheme,
  isSystemDark,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#1C221A]/95 backdrop-blur-md border-b border-[#E5E2D9] dark:border-[#323D2E] shadow-xs w-full overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 min-w-0">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-2 sm:gap-3.5 cursor-pointer shrink-0" onClick={() => setActiveMode('seeker')}>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#4A6741] text-white flex items-center justify-center shadow-xs shrink-0">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-serif italic text-[#4A6741] dark:text-[#7EA373] font-bold tracking-tight">CareLink</span>
                <span className="hidden md:inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#F1F0EB] dark:bg-[#252E23] text-[#4A6741] dark:text-[#7EA373] font-medium border border-[#E5E2D9] dark:border-[#323D2E]">
                  暖心看護
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#9A958E] dark:text-[#807B73] font-medium mt-0.5 hidden xs:block">
                Professional Care Concierge
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons (Desktop) */}
          <div className="hidden lg:flex items-center bg-[#F1F0EB] dark:bg-[#252E23] p-1.5 rounded-full border border-[#E5E2D9] dark:border-[#323D2E] shrink-0">
            <button
              onClick={() => setActiveMode('seeker')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeMode === 'seeker'
                  ? 'bg-[#4A6741] text-white shadow-xs'
                  : 'text-[#6B665F] dark:text-[#B2ADA3] hover:text-[#2C2C2C] dark:hover:text-[#F2F0E9]'
              }`}
            >
              <Search className="w-3.5 h-3.5" /> 智慧媒合搜尋 (家屬)
            </button>
            <button
              onClick={() => setActiveMode('caregiver')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeMode === 'caregiver'
                  ? 'bg-[#4A6741] text-white shadow-xs'
                  : 'text-[#6B665F] dark:text-[#B2ADA3] hover:text-[#2C2C2C] dark:hover:text-[#F2F0E9]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> 照服員履歷與排班
            </button>
            <button
              onClick={() => setActiveMode('ops')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeMode === 'ops'
                  ? 'bg-[#4A6741] text-white shadow-xs'
                  : 'text-[#6B665F] dark:text-[#B2ADA3] hover:text-[#2C2C2C] dark:hover:text-[#F2F0E9]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> 電子合約帳單 (風控)
            </button>
          </div>

          {/* Action Buttons Container */}
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 overflow-x-auto no-scrollbar py-1">
            
            {/* Mobile Mode Dropdown Select */}
            <select
              value={activeMode}
              onChange={(e) => setActiveMode(e.target.value as any)}
              className="lg:hidden text-xs bg-[#F1F0EB] dark:bg-[#252E23] border border-[#E5E2D9] dark:border-[#323D2E] rounded-lg px-2 py-1.5 text-[#2C2C2C] dark:text-[#F2F0E9] font-medium max-w-[90px] sm:max-w-[130px] truncate shrink-0 cursor-pointer"
            >
              <option value="seeker">智慧媒合</option>
              <option value="caregiver">照服員排班</option>
              <option value="ops">合約帳單</option>
            </select>

            {/* Saved Favorites */}
            <button
              onClick={onOpenSaved}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-[#F1F0EB] dark:hover:bg-[#252E23] text-[#6B665F] dark:text-[#B2ADA3] transition-colors shrink-0 cursor-pointer"
              title="已收藏照服員"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
              {savedCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#D4A373] text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Active Bookings & Digital Contracts */}
            <button
              onClick={onOpenBookings}
              className="relative flex items-center gap-1 sm:gap-1.5 p-2 sm:px-3.5 sm:py-2 rounded-full hover:bg-[#F1F0EB] dark:hover:bg-[#252E23] text-[#6B665F] dark:text-[#B2ADA3] text-xs font-medium border border-transparent hover:border-[#E5E2D9] dark:hover:border-[#323D2E] transition-all shrink-0 cursor-pointer"
              title="電子合約帳單"
            >
              <FileText className="w-4 h-4 stroke-[1.75]" />
              <span className="hidden md:inline">電子合約帳單</span>
              {activeBookingsCount > 0 && (
                <span className="px-1.5 py-0.5 bg-[#4A6741] dark:bg-[#7EA373] text-white text-[9px] sm:text-[10px] rounded-full font-bold">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* In-app Chat Center */}
            <button
              onClick={onOpenChat}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-[#F1F0EB] dark:hover:bg-[#252E23] text-[#6B665F] dark:text-[#B2ADA3] transition-colors shrink-0 cursor-pointer"
              title="訊息對話"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#D4A373] text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Google Form Link */}
            <button
              onClick={() => {
                if (onOpenForm) {
                  onOpenForm();
                } else {
                  const elem = document.getElementById('form-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-1 sm:gap-1.5 p-2 sm:px-3.5 sm:py-2 bg-[#4A6741]/10 hover:bg-[#4A6741] text-[#4A6741] dark:text-[#7EA373] hover:text-white rounded-full text-xs font-medium border border-[#4A6741]/30 transition-all cursor-pointer shrink-0"
              title="前往新客戶基本資料表單"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">新客戶基本資料表單</span>
            </button>

            {/* Theme Mode Toggle (Light / Dark / System) */}
            <ThemeToggle
              theme={theme}
              setTheme={setTheme}
              resolvedTheme={resolvedTheme}
              isSystemDark={isSystemDark}
              className="shrink-0"
            />

            {/* Support & Emergency Hotline */}
            <button
              onClick={onOpenSupport}
              className="flex items-center gap-1 sm:gap-1.5 p-2 sm:px-3.5 sm:py-2 bg-[#F1F0EB] dark:bg-[#252E23] hover:bg-[#E5E2D9] dark:hover:bg-[#323D2E] text-[#2C2C2C] dark:text-[#F2F0E9] rounded-full text-xs font-medium border border-[#E5E2D9] dark:border-[#323D2E] transition-all cursor-pointer shrink-0"
              title="24H 客服"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4A373]" />
              <span className="hidden sm:inline">24H 客服</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

