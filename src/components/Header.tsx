import React from 'react';
import { Heart, MessageSquare, ShieldCheck, FileText, PhoneCall, HeartHandshake, UserCheck, Search } from 'lucide-react';

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
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E2D9] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline matching Professional Polish theme */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveMode('seeker')}>
            <div className="w-11 h-11 rounded-xl bg-[#4A6741] text-white flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif italic text-[#4A6741] font-bold tracking-tight">CareLink</span>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#F1F0EB] text-[#4A6741] font-medium border border-[#E5E2D9]">
                  暖心看護
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#9A958E] font-medium mt-0.5">
                Professional Care Concierge
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="hidden lg:flex items-center bg-[#F1F0EB] p-1.5 rounded-full border border-[#E5E2D9]">
            <button
              onClick={() => setActiveMode('seeker')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeMode === 'seeker'
                  ? 'bg-[#4A6741] text-white shadow-xs'
                  : 'text-[#6B665F] hover:text-[#2C2C2C]'
              }`}
            >
              <Search className="w-3.5 h-3.5" /> 智慧媒合搜尋 (家屬)
            </button>
            <button
              onClick={() => setActiveMode('caregiver')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeMode === 'caregiver'
                  ? 'bg-[#4A6741] text-white shadow-xs'
                  : 'text-[#6B665F] hover:text-[#2C2C2C]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> 照服員履歷與排班
            </button>
            <button
              onClick={() => setActiveMode('ops')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeMode === 'ops'
                  ? 'bg-[#4A6741] text-white shadow-xs'
                  : 'text-[#6B665F] hover:text-[#2C2C2C]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> 電子合約帳單 (風控)
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Mobile Mode Dropdown Select */}
            <select
              value={activeMode}
              onChange={(e) => setActiveMode(e.target.value as any)}
              className="lg:hidden text-xs bg-[#F1F0EB] border border-[#E5E2D9] rounded-lg px-2.5 py-1.5 text-[#2C2C2C] font-medium"
            >
              <option value="seeker">智慧媒合搜尋</option>
              <option value="caregiver">照服員履歷與排班</option>
              <option value="ops">電子合約帳單</option>
            </select>

            {/* Saved Favorites */}
            <button
              onClick={onOpenSaved}
              className="relative p-2.5 rounded-full hover:bg-[#F1F0EB] text-[#6B665F] transition-colors"
              title="已收藏照服員"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4A373] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Active Bookings & Digital Contracts */}
            <button
              onClick={onOpenBookings}
              className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-[#F1F0EB] text-[#6B665F] text-xs font-medium border border-transparent hover:border-[#E5E2D9] transition-all"
            >
              <FileText className="w-4 h-4 stroke-[1.75]" />
              <span className="hidden md:inline">電子合約帳單</span>
              {activeBookingsCount > 0 && (
                <span className="px-1.5 py-0.5 bg-[#4A6741] text-white text-[10px] rounded-full font-bold">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* In-app Chat Center */}
            <button
              onClick={onOpenChat}
              className="relative p-2.5 rounded-full hover:bg-[#F1F0EB] text-[#6B665F] transition-colors"
              title="訊息對話"
            >
              <MessageSquare className="w-5 h-5 stroke-[1.75]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4A373] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Support & Emergency Hotline */}
            <button
              onClick={onOpenSupport}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#F1F0EB] hover:bg-[#E5E2D9] text-[#2C2C2C] rounded-full text-xs font-medium border border-[#E5E2D9] transition-all ml-1"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4A373]" />
              <span className="hidden sm:inline">24H 專人客服</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

