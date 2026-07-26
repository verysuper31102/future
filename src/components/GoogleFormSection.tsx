import React from 'react';
import { ClipboardList, ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface GoogleFormSectionProps {
  id?: string;
}

export const GoogleFormSection: React.FC<GoogleFormSectionProps> = ({ id = 'form-section' }) => {
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdrVxCXixhhsBUq7oBMYU_9Ad6cfiDDwPDyr2BDz75i790SCQ/viewform?usp=publish-editor';

  return (
    <section id={id} className="scroll-mt-24">
      {/* Clean & Elegant Form CTA Card */}
      <div className="bg-white rounded-3xl border border-[#E5E2D9] p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-5 relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F1F0EB] text-[#4A6741] text-xs font-semibold border border-[#E5E2D9]">
            <ClipboardList className="w-4 h-4 text-[#D4A373]" /> 新客戶基本資料表單
          </div>
          
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2C2C] tracking-tight">
            新客戶基本資料登記與需求評估
          </h2>
          
          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#6B665F] font-sans leading-relaxed">
            若您有長照機構需求、急件專人派班、特殊醫療照護條件或服務反饋，請點擊下方按鈕填寫 CareLink 新客戶基本資料表單，我們的專業照護顧問團隊將於 24 小時內專人與您聯繫。
          </p>

          {/* Highlights */}
          <div className="py-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6B665F] font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4A6741]" /> 24 小時內專員聯繫
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4A6741]" /> 個人資料嚴密加密保護
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4A373]" /> 提供免費合約與方案諮詢
            </span>
          </div>

          {/* Single Clear Action Button */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <MagneticButton
                variant="primary"
                className="px-6 py-3.5 text-sm sm:text-base shadow-md flex items-center gap-2.5"
              >
                <Send className="w-4 h-4 text-[#D4A373]" />
                <span>新客戶基本資料表單</span>
                <ExternalLink className="w-4 h-4 opacity-80 ml-1" />
              </MagneticButton>
            </a>
            
            <span className="text-xs text-[#6B665F]">
              * 點擊將於新分頁開啟安全的 Google 官方表單
            </span>
          </div>
        </div>

        {/* Decorative ambient background blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#4A6741]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      </div>
    </section>
  );
};
