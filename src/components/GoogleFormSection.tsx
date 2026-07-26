import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { ClipboardList, ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Send, CheckCircle, RefreshCw, User, Phone, Mail, MapPin, Calendar, HeartHandshake, Clock } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface GoogleFormSectionProps {
  id?: string;
}

export const GoogleFormSection: React.FC<GoogleFormSectionProps> = ({ id = 'form-section' }) => {
  const [state, handleSubmit] = useForm('xvzevngp');
  const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdrVxCXixhhsBUq7oBMYU_9Ad6cfiDDwPDyr2BDz75i790SCQ/viewform?usp=publish-editor';

  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      {/* Header & Form Container */}
      <div className="bg-white dark:bg-[#1C221A] rounded-3xl border border-[#E5E2D9] dark:border-[#323D2E] p-6 sm:p-10 shadow-xs relative overflow-hidden transition-colors">
        
        {/* Top Info Banner */}
        <div className="max-w-3xl space-y-4 relative z-10 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F1F0EB] dark:bg-[#252E23] text-[#4A6741] dark:text-[#7EA373] text-xs font-semibold border border-[#E5E2D9] dark:border-[#323D2E]">
            <ClipboardList className="w-4 h-4 text-[#D4A373]" /> 新客戶基本資料表單
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2C2C] dark:text-[#F2F0E9] tracking-tight">
            新客戶基本資料登記與需求評估
          </h2>
          
          <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#B2ADA3] font-sans leading-relaxed">
            若您有長照機構需求、急件專人派班、特殊醫療照護條件或服務反饋，請填寫下方 CareLink 新客戶基本資料表單，我們的專業照護顧問團隊將於 24 小時內專人與您聯繫。
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6B665F] dark:text-[#B2ADA3] font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4A6741] dark:text-[#7EA373]" /> 24 小時內專員聯繫
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4A6741] dark:text-[#7EA373]" /> 個人資料嚴密加密保護
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4A373]" /> 提供免費合約與方案諮詢
            </span>
          </div>
        </div>

        {/* Interactive Form / Success State */}
        <div className="relative z-10 bg-[#FAF9F6] dark:bg-[#121612] rounded-2xl p-6 sm:p-8 border border-[#E5E2D9] dark:border-[#323D2E]">
          {state.succeeded ? (
            <div className="text-center py-10 space-y-4 max-w-lg mx-auto animate-fadeIn">
              <div className="w-16 h-16 bg-[#4A6741]/10 rounded-full flex items-center justify-center mx-auto text-[#4A6741] dark:text-[#7EA373]">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2C2C2C] dark:text-[#F2F0E9]">
                登記成功！
              </h3>
              <p className="text-sm text-[#6B665F] dark:text-[#B2ADA3] leading-relaxed">
                感謝您填寫「新客戶基本資料表單」。CareLink 專業個案管理師已收到您的資訊，我們將於 24 小時內主動電話與您聯繫，協助評估專屬照護計畫。
              </p>
              <div className="pt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2.5 rounded-xl border border-[#E5E2D9] dark:border-[#323D2E] bg-white dark:bg-[#1C221A] text-xs font-medium text-[#2C2C2C] dark:text-[#F2F0E9] hover:bg-[#F1F0EB] transition-all flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>再填寫一份資料</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Contact Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-[#2C2C2C] dark:text-[#F2F0E9] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#4A6741] dark:text-[#7EA373]" />
                    <span>聯絡人姓名 *</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="例如：陳大明"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2D9] dark:border-[#323D2E] bg-white dark:bg-[#1C221A] text-xs text-[#2C2C2C] dark:text-[#F2F0E9] focus:outline-none focus:border-[#4A6741] transition-all"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-red-500 mt-1" />
                </div>

                {/* Contact Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-[#2C2C2C] dark:text-[#F2F0E9] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#4A6741] dark:text-[#7EA373]" />
                    <span>聯絡電話 *</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="例如：0912-345-678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2D9] dark:border-[#323D2E] bg-white dark:bg-[#1C221A] text-xs text-[#2C2C2C] dark:text-[#F2F0E9] focus:outline-none focus:border-[#4A6741] transition-all"
                  />
                  <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-xs text-red-500 mt-1" />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-[#2C2C2C] dark:text-[#F2F0E9] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#4A6741] dark:text-[#7EA373]" />
                    <span>電子信箱 *</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2D9] dark:border-[#323D2E] bg-white dark:bg-[#1C221A] text-xs text-[#2C2C2C] dark:text-[#F2F0E9] focus:outline-none focus:border-[#4A6741] transition-all"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-500 mt-1" />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label htmlFor="location" className="text-xs font-semibold text-[#2C2C2C] dark:text-[#F2F0E9] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#4A6741] dark:text-[#7EA373]" />
                    <span>照護地點 / 縣市 *</span>
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    required
                    placeholder="例如：台北市大安區 / 台大醫院"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2D9] dark:border-[#323D2E] bg-white dark:bg-[#1C221A] text-xs text-[#2C2C2C] dark:text-[#F2F0E9] focus:outline-none focus:border-[#4A6741] transition-all"
                  />
                  <ValidationError prefix="Location" field="location" errors={state.errors} className="text-xs text-red-500 mt-1" />
                </div>

                {/* Care Type */}
                <div className="space-y-1.5">
                  <label htmlFor="care_type" className="text-xs font-semibold text-[#2C2C2C] dark:text-[#F2F0E9] flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-[#4A6741] dark:text-[#7EA373]" />
                    <span>服務需求類型</span>
                  </label>
                  <select
                    id="care_type"
                    name="care_type"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2D9] dark:border-[#323D2E] bg-white dark:bg-[#1C221A] text-xs text-[#2C2C2C] dark:text-[#F2F0E9] focus:outline-none focus:border-[#4A6741] transition-all"
                  >
                    <option value="醫院全日照顧 (24H)">醫院全日照顧 (24H)</option>
                    <option value="居家照顧 (半日/全日)">居家照顧 (半日/全日)</option>
                    <option value="急件短期派班">急件短期派班</option>
                    <option value="長照機構諮詢與協助媒合">長照機構諮詢與協助媒合</option>
                    <option value="其他客製化照護需求">其他客製化照護需求</option>
                  </select>
                </div>

                {/* Preferred Contact Time */}
                <div className="space-y-1.5">
                  <label htmlFor="contact_time" className="text-xs font-semibold text-[#2C2C2C] dark:text-[#F2F0E9] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#4A6741] dark:text-[#7EA373]" />
                    <span>方便聯繫時段</span>
                  </label>
                  <select
                    id="contact_time"
                    name="contact_time"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2D9] dark:border-[#323D2E] bg-white dark:bg-[#1C221A] text-xs text-[#2C2C2C] dark:text-[#F2F0E9] focus:outline-none focus:border-[#4A6741] transition-all"
                  >
                    <option value="隨時皆可">隨時皆可</option>
                    <option value="上午時段 (09:00 - 12:00)">上午時段 (09:00 - 12:00)</option>
                    <option value="下午時段 (13:30 - 18:00)">下午時段 (13:30 - 18:00)</option>
                    <option value="晚間時段 (18:00 - 21:00)">晚間時段 (18:00 - 21:00)</option>
                  </select>
                </div>

              </div>

              {/* Patient Details & Requirements */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-[#2C2C2C] dark:text-[#F2F0E9]">
                  被照護者狀況與特殊需求說明
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="請簡述長輩或被照護者的年齡、特殊病況（如中風、失智、管路照護需求等）或期望的照服員條件..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2D9] dark:border-[#323D2E] bg-white dark:bg-[#1C221A] text-xs text-[#2C2C2C] dark:text-[#F2F0E9] focus:outline-none focus:border-[#4A6741] transition-all"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-red-500 mt-1" />
              </div>

              {/* Submit Buttons Row */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MagneticButton
                    variant="primary"
                    disabled={state.submitting}
                    className="px-6 py-3 text-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-[#D4A373]" />
                    <span>{state.submitting ? '資料送出中...' : '送出新客戶基本資料表單'}</span>
                  </MagneticButton>

                  <a
                    href={googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#6B665F] dark:text-[#B2ADA3] hover:text-[#4A6741] dark:hover:text-[#7EA373] flex items-center gap-1 underline transition-colors"
                  >
                    <span>或開至 Google 官方視窗填寫</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="text-[11px] text-[#9A958E] dark:text-[#807B73]">
                  * 由 Formspree 安全表單系統加密傳輸 (ID: xvzevngp)
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Decorative ambient background blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#4A6741]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      </div>
    </section>
  );
};
