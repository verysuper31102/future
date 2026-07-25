import React, { useState } from 'react';
import { X, ShieldCheck, Star, Calendar, Check, Award, MapPin, Clock, Heart, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { Caregiver, Review } from '../types';

interface CaregiverDetailModalProps {
  caregiver: Caregiver;
  reviews: Review[];
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  onBook: (caregiver: Caregiver) => void;
  onChat: (caregiver: Caregiver) => void;
}

export const CaregiverDetailModal: React.FC<CaregiverDetailModalProps> = ({
  caregiver,
  reviews,
  isSaved,
  onClose,
  onToggleSave,
  onBook,
  onChat,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'credentials' | 'schedule' | 'reviews'>('profile');

  const caregiverReviews = reviews.filter((r) => r.caregiverId === caregiver.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF9F6] rounded-2xl border border-[#E5E2D9] shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Modal Bar */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E5E2D9] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#F1F0EB] text-[#4A6741] rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2C2C2C]">{caregiver.name} 照服員詳細檔案</h2>
              <p className="text-[11px] text-[#9A958E] font-medium">官方審核標章 ｜ 勞動部單一級證照合格認證</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#9A958E] hover:text-[#2C2C2C] hover:bg-[#F1F0EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Hero Banner & Quick Stats */}
        <div className="p-6 bg-white border-b border-[#E5E2D9] space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={caregiver.avatar}
                alt={caregiver.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-lg object-cover border border-[#E5E2D9]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-serif font-bold text-[#2C2C2C]">{caregiver.name}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#4A6741] text-white font-medium">
                    資歷 {caregiver.experienceYears} 年
                  </span>
                </div>
                <p className="text-xs text-[#6B665F] mt-0.5">{caregiver.title}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-[#6B665F]">
                  <span className="flex items-center gap-1 text-[#D4A373] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#D4A373]" /> {caregiver.rating} ({caregiver.reviewCount} 則評價)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#4A6741]" /> {caregiver.city}（{caregiver.districts.join('、')}）
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onToggleSave(caregiver.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isSaved ? 'bg-[#F1F0EB] border-[#E5E2D9] text-[#D4A373]' : 'border-[#E5E2D9] text-[#9A958E]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#D4A373]' : ''}`} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#E5E2D9] text-xs font-medium">
            {[
              { id: 'profile', label: '個人簡介與理念' },
              { id: 'credentials', label: `專業證照 (${caregiver.verifiedBadges.length})` },
              { id: 'schedule', label: '排班空檔月曆' },
              { id: 'reviews', label: `家屬真實評價 (${caregiverReviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#4A6741] text-white font-semibold'
                    : 'bg-[#F1F0EB] text-[#6B665F] hover:text-[#2C2C2C] hover:bg-[#E5E2D9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#2C2C2C]">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Philosophy Quote Box */}
              <div className="p-4 bg-[#F1F0EB] rounded-xl border-l-2 border-[#D4A373] space-y-1">
                <span className="text-[10px] text-[#9A958E] font-bold tracking-widest uppercase flex items-center gap-1 font-serif">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" /> 照護理念
                </span>
                <p className="text-sm font-serif italic text-[#2C2C2C] leading-relaxed">
                  「{caregiver.philosophy}」
                </p>
              </div>

              {/* Bio & Background */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#2C2C2C] font-serif text-base">過往經驗與經歷說明</h4>
                <p className="text-xs text-[#6B665F] leading-relaxed">{caregiver.bio}</p>
              </div>

              {/* Specialty Skills */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#2C2C2C] font-serif text-base">照護項目與專長項目</h4>
                <div className="flex flex-wrap gap-2">
                  {caregiver.specialties.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-white border border-[#E5E2D9] text-[#2C2C2C] rounded-lg text-xs font-medium">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#2C2C2C] font-serif text-base">溝通語言</h4>
                <div className="flex gap-2">
                  {caregiver.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-[#F1F0EB] border border-[#E5E2D9] rounded-md text-xs text-[#6B665F]">
                      🗣️ {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rate Breakdown */}
              <div className="p-4 bg-white rounded-xl border border-[#E5E2D9] space-y-3">
                <h4 className="font-bold text-[#2C2C2C] font-serif text-sm">收費明細（平台託管服務標準價碼）</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-[#F1F0EB] rounded-lg border border-[#E5E2D9]">
                    <div className="text-[11px] text-[#9A958E]">計時方案</div>
                    <div className="text-base font-serif font-bold text-[#2C2C2C] mt-0.5">NT$ {caregiver.hourlyRate} / hr</div>
                  </div>
                  <div className="p-3 bg-[#F1F0EB] rounded-lg border border-[#E5E2D9]">
                    <div className="text-[11px] text-[#9A958E]">12小時日班</div>
                    <div className="text-base font-serif font-bold text-[#2C2C2C] mt-0.5">NT$ {caregiver.dailyRate12h} / 日</div>
                  </div>
                  <div className="p-3 bg-[#F1F0EB] rounded-lg border border-[#E5E2D9]">
                    <div className="text-[11px] text-[#9A958E]">24小時駐點</div>
                    <div className="text-base font-serif font-bold text-[#4A6741] mt-0.5">NT$ {caregiver.dailyRate24h} / 日</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CREDENTIALS */}
          {activeTab === 'credentials' && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-xs text-green-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 shrink-0 text-green-700" />
                <span>
                  本平台所有證照均經由勞動部及警政署良民證紀錄核驗，並註記「官方真實核驗標章」。
                </span>
              </div>

              <div className="space-y-3">
                {caregiver.verifiedBadges.map((badge) => (
                  <div key={badge.id} className="p-4 bg-white rounded-xl border border-[#E5E2D9] flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#F1F0EB] text-[#D4A373] rounded-lg mt-0.5">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-serif font-bold text-[#2C2C2C] text-sm flex items-center gap-2">
                          {badge.name}
                          <span className="text-[10px] px-2 py-0.5 bg-[#4A6741] text-white rounded font-sans font-medium">
                            官方核驗通過
                          </span>
                        </div>
                        <div className="text-xs text-[#6B665F] mt-1">
                          發照/審核單位：{badge.issuer}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-[#9A958E]">
                      核驗日期：{badge.verifiedDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="text-xs text-[#6B665F] flex items-center gap-1 font-serif">
                <Calendar className="w-4 h-4 text-[#4A6741]" />
                點選下方即時空檔班別，即可帶入預約簽約流程：
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caregiver.availability.map((slot) => (
                  <div key={slot.date} className="p-4 bg-white rounded-xl border border-[#E5E2D9] space-y-2">
                    <div className="font-serif font-bold text-sm text-[#2C2C2C] border-b border-[#E5E2D9] pb-1.5 flex justify-between">
                      <span>📅 {slot.date}</span>
                      <span className="text-xs text-[#4A6741] font-sans font-normal">即可線上預約</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      <span className={`p-1.5 rounded-md text-center ${slot.shifts['24h'] ? 'bg-green-50 text-green-700 font-medium' : 'bg-[#F1F0EB] text-[#9A958E]'}`}>
                        {slot.shifts['24h'] ? '✓ 24h 全天駐點' : '✕ 24h已滿'}
                      </span>
                      <span className={`p-1.5 rounded-md text-center ${slot.shifts['12h_day'] ? 'bg-green-50 text-green-700 font-medium' : 'bg-[#F1F0EB] text-[#9A958E]'}`}>
                        {slot.shifts['12h_day'] ? '✓ 12h 日班' : '✕ 日班已滿'}
                      </span>
                      <span className={`p-1.5 rounded-md text-center ${slot.shifts['12h_night'] ? 'bg-green-50 text-green-700 font-medium' : 'bg-[#F1F0EB] text-[#9A958E]'}`}>
                        {slot.shifts['12h_night'] ? '✓ 12h 夜間陪宿' : '✕ 夜間已滿'}
                      </span>
                      <span className={`p-1.5 rounded-md text-center ${slot.shifts['hourly'] ? 'bg-green-50 text-green-700 font-medium' : 'bg-[#F1F0EB] text-[#9A958E]'}`}>
                        {slot.shifts['hourly'] ? '✓ 按時計費' : '✕ 計時已滿'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {caregiverReviews.length === 0 ? (
                <div className="text-center py-8 text-[#9A958E] text-xs">
                  目前尚無評價紀錄，首位預約之案家可享有平台特別關懷金。
                </div>
              ) : (
                caregiverReviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-white rounded-xl border border-[#E5E2D9] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-serif font-bold text-[#2C2C2C]">{rev.authorName}</span>
                      <span className="text-[#9A958E]">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#D4A373] text-xs font-semibold">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4A373]" />
                      ))}
                      <span className="ml-1 text-[#4A6741] font-normal text-[11px] bg-green-50 px-2 py-0.5 rounded">
                        照護背景：{rev.patientCondition}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B665F] leading-relaxed italic font-serif">"{rev.text}"</p>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-white border-t border-[#E5E2D9] flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onChat(caregiver);
            }}
            className="px-5 py-2.5 rounded-lg border border-[#E5E2D9] hover:bg-[#F1F0EB] text-[#2C2C2C] text-xs font-medium flex items-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[#4A6741]" /> 開始初步洽談
          </button>

          <button
            onClick={() => {
              onClose();
              onBook(caregiver);
            }}
            className="px-6 py-2.5 rounded-lg bg-[#4A6741] hover:opacity-90 text-white text-xs font-medium flex items-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4" /> 預約面談 / 試配
          </button>
        </div>

      </div>
    </div>
  );
};

