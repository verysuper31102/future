import React, { useState } from 'react';
import { Smartphone, Share, PlusSquare, Copy, Check, ExternalLink, X, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface InstallPwaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPwaModal: React.FC<InstallPwaModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Get current direct URL preserving path (e.g. /future)
  const isIframe = typeof window !== 'undefined' && window.self !== window.top;
  let currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (isIframe) {
    try {
      if (window.top && window.top.location.href) {
        currentUrl = window.top.location.href;
      }
    } catch (e) {
      // Cross-origin fallback uses current iframe URL which includes path
      currentUrl = window.location.href;
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenNewTab = () => {
    window.open(currentUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-[#1C221A] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E5E2D9] dark:border-[#323D2E] shadow-2xl relative overflow-hidden text-[#2C2C2C] dark:text-[#F2F0E9]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F1F0EB] dark:bg-[#252E23] hover:bg-[#E5E2D9] dark:hover:bg-[#323D2E] text-[#6B665F] dark:text-[#B2ADA3] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#4A6741] text-white flex items-center justify-center shadow-md shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#4A6741]/10 text-[#4A6741] dark:text-[#7EA373] text-[11px] font-semibold mb-1">
              <Sparkles className="w-3 h-3 text-[#D4A373]" /> iOS / Android 免下載快速捷徑
            </div>
            <h3 className="text-xl font-serif font-bold tracking-tight">
              將 CareLink 新增至手機主畫面
            </h3>
          </div>
        </div>

        {/* Notice for iframe mode (e.g. preview environment) */}
        {isIframe && (
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-200 text-xs space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-100">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              重要提醒：防止 iOS 網址讀取錯誤
            </div>
            <p className="leading-relaxed">
              因目前位於線上預覽（iFrame）架構中，直接點擊 Safari 分享可能會出現「網址錯誤」。請先點擊下方按鈕【在新分頁打開獨立網址】，再新增至主畫面！
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={handleOpenNewTab}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>在新分頁打開獨立網址</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step-by-step Guide for iOS Safari */}
        <div className="space-y-4 mb-6">
          <div className="text-xs font-semibold text-[#9A958E] dark:text-[#807B73] uppercase tracking-wider">
            iOS iPhone Safari 3 步驟設定說明：
          </div>

          <div className="space-y-3 text-xs">
            {/* Step 1 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF9F6] dark:bg-[#121612] border border-[#E5E2D9] dark:border-[#323D2E]">
              <div className="w-6 h-6 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold shrink-0 text-xs">
                1
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-[#2C2C2C] dark:text-[#F2F0E9] flex items-center gap-1.5">
                  點擊 Safari 瀏覽器底部【分享按鈕】
                  <Share className="w-4 h-4 text-[#4A6741] dark:text-[#7EA373] inline" />
                </div>
                <p className="text-[#6B665F] dark:text-[#B2ADA3]">
                  請確保使用 iPhone 原生 Safari 瀏覽器打開本頁面。
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF9F6] dark:bg-[#121612] border border-[#E5E2D9] dark:border-[#323D2E]">
              <div className="w-6 h-6 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold shrink-0 text-xs">
                2
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-[#2C2C2C] dark:text-[#F2F0E9] flex items-center gap-1.5">
                  選單往下滑動，選擇【加入主畫面】
                  <PlusSquare className="w-4 h-4 text-[#D4A373] inline" />
                </div>
                <p className="text-[#6B665F] dark:text-[#B2ADA3]">
                  在選單中搜尋「加入主畫面」(Add to Home Screen)。
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF9F6] dark:bg-[#121612] border border-[#E5E2D9] dark:border-[#323D2E]">
              <div className="w-6 h-6 rounded-full bg-[#4A6741] text-white flex items-center justify-center font-bold shrink-0 text-xs">
                3
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-[#2C2C2C] dark:text-[#F2F0E9]">
                  點擊右上角【新增】完成建立！
                </div>
                <p className="text-[#6B665F] dark:text-[#B2ADA3]">
                  桌面即會產生 CareLink 綠色溫馨專屬 App 圖示，隨點隨用。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleOpenNewTab}
            className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-[#4A6741] hover:bg-[#3B5334] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>在新分頁打開獨立網址</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto py-3 px-4 rounded-xl border border-[#E5E2D9] dark:border-[#323D2E] bg-[#F1F0EB] dark:bg-[#252E23] hover:bg-[#E5E2D9] dark:hover:bg-[#323D2E] text-[#2C2C2C] dark:text-[#F2F0E9] font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#4A6741] dark:text-[#7EA373]" />
                <span>已複製網址</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#6B665F] dark:text-[#B2ADA3]" />
                <span>複製獨立網址</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
