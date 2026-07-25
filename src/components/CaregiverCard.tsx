import React from 'react';
import { Heart, Star, ShieldCheck, MapPin, Calendar, MessageSquare, Check, Sparkles, ChevronRight } from 'lucide-react';
import { Caregiver } from '../types';

interface CaregiverCardProps {
  caregiver: Caregiver;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (caregiver: Caregiver) => void;
  onBook: (caregiver: Caregiver) => void;
  onChat: (caregiver: Caregiver) => void;
}

export const CaregiverCard: React.FC<CaregiverCardProps> = ({
  caregiver,
  isSaved,
  onToggleSave,
  onSelect,
  onBook,
  onChat,
}) => {
  return (
    <div className="group bg-white rounded-xl border border-[#E5E2D9] hover:border-[#4A6741] p-5 sm:p-6 transition-all duration-200 shadow-xs relative flex flex-col justify-between">
      
      <div>
        {/* Card Header: Avatar, Name, Verified Badges, Match Score */}
        <div className="flex items-start justify-between gap-4">
          
          <div className="flex items-start gap-4">
            {/* Caregiver Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={caregiver.avatar}
                alt={caregiver.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover bg-gray-100 border border-[#E5E2D9]"
              />
              <div className="absolute -top-1 -right-1">
                <div className="w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" title="線上駐點中" />
              </div>
            </div>

            {/* Caregiver Name & Title */}
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <h3
                    onClick={() => onSelect(caregiver)}
                    className="text-lg font-serif font-bold text-[#2C2C2C] hover:text-[#4A6741] cursor-pointer transition-colors"
                  >
                    {caregiver.name}
                  </h3>
                  <span className="text-xs bg-[#F1F0EB] text-[#4A6741] px-2 py-0.5 rounded font-sans italic">
                    已驗證
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-base sm:text-lg font-serif font-bold text-[#D4A373]">
                    ${caregiver.dailyRate24h.toLocaleString()} <span className="text-xs font-normal text-[#9A958E]">/ 日</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#6B665F] mt-1 font-sans">
                服務資歷：{caregiver.experienceYears}年 ｜ 擅長：{caregiver.specialties.slice(0, 2).join('、')}
              </p>

              {/* Rating & Review */}
              <div className="flex items-center mt-2.5 space-x-1.5 text-xs">
                <span className="text-[#D4A373] tracking-widest text-sm font-serif">★★★★★</span>
                <span className="font-bold text-[#2C2C2C]">{caregiver.rating}</span>
                <span className="text-[#9A958E]">({caregiver.reviewCount} 則評價)</span>
                <span className="text-[#E5E2D9]">|</span>
                <span className="text-[#6B665F] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#4A6741]" />
                  {caregiver.city}{caregiver.districts.length > 0 ? ` (${caregiver.districts.slice(0, 2).join('、')}${caregiver.districts.length > 2 ? '等' : ''})` : ''}
                </span>
              </div>
            </div>

          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={() => onToggleSave(caregiver.id)}
            className={`p-2 rounded-full transition-colors ${
              isSaved
                ? 'bg-[#F1F0EB] text-[#D4A373]'
                : 'text-[#9A958E] hover:text-[#D4A373] hover:bg-[#FAF9F6]'
            }`}
            title={isSaved ? '已收藏' : '加入收藏'}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#D4A373]' : ''}`} />
          </button>

        </div>

        {/* Philosophy snippet */}
        <div className="mt-3.5 p-3 bg-[#F1F0EB] rounded-lg border-l-2 border-[#D4A373] text-xs text-[#6B665F] italic font-serif leading-relaxed">
          「{caregiver.philosophy}」
        </div>

        {/* Specialties Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {caregiver.specialties.map((spec) => (
            <span
              key={spec}
              className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF9F6] text-[#6B665F] border border-[#E5E2D9] font-medium"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Verified Credentials Pills */}
        <div className="mt-3 pt-2.5 border-t border-[#E5E2D9] flex flex-wrap items-center gap-2 text-[10px]">
          {caregiver.verifiedBadges.slice(0, 3).map((badge) => (
            <span key={badge.id} className="bg-green-50 text-green-700 px-2 py-0.5 rounded font-medium flex items-center gap-1">
              <Check className="w-2.5 h-2.5 text-green-600" /> {badge.name}
            </span>
          ))}
          {caregiver.verifiedBadges.length > 3 && (
            <span className="text-[#9A958E] text-[10px]">
              +{caregiver.verifiedBadges.length - 3} 查驗
            </span>
          )}
        </div>

      </div>

      {/* Card Footer: Pricing & Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-[#E5E2D9] flex items-center justify-between gap-3">
        
        {/* Hourly Rate reference */}
        <div className="text-xs text-[#6B665F]">
          <span className="text-[#9A958E]">時薪參考：</span>
          <span className="font-serif font-bold text-[#2C2C2C] ml-1">NT$ {caregiver.hourlyRate} / 時</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => onChat(caregiver)}
            className="p-2.5 rounded-lg border border-[#E5E2D9] hover:bg-[#F1F0EB] text-[#6B665F] transition-colors"
            title="訊息對話"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelect(caregiver)}
            className="px-3.5 py-2 rounded-lg text-xs font-medium border border-[#E5E2D9] hover:bg-[#F1F0EB] text-[#2C2C2C] transition-all flex items-center gap-1"
          >
            檔案預覽 <ChevronRight className="w-3.5 h-3.5 text-[#9A958E]" />
          </button>

          <button
            onClick={() => onBook(caregiver)}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-[#4A6741] hover:opacity-90 text-white shadow-xs transition-all flex items-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" /> 預約試配
          </button>

        </div>

      </div>

    </div>
  );
};

