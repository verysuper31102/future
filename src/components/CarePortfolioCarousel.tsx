import React, { useState, useEffect, useRef } from 'react';
import { CarePortfolio } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  FolderHeart,
  Sparkles,
  CheckCircle2,
  Calendar,
  User,
  ArrowRight,
  Pause,
  Play,
  X,
  ShieldCheck
} from 'lucide-react';

interface CarePortfolioCarouselProps {
  portfolios: CarePortfolio[];
  autoplayInterval?: number; // ms
  onSelectCaregiver?: (caregiverId: string) => void;
  onBookCaregiver?: (caregiverId: string) => void;
}

export const CarePortfolioCarousel: React.FC<CarePortfolioCarouselProps> = ({
  portfolios,
  autoplayInterval = 4000,
  onSelectCaregiver,
  onBookCaregiver,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPortfolioModal, setSelectedPortfolioModal] = useState<CarePortfolio | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play interval logic
  useEffect(() => {
    if (isPaused || portfolios.length === 0) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolios.length);
    }, autoplayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, portfolios.length, autoplayInterval]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolios.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + portfolios.length) % portfolios.length);
  };

  const currentItem = portfolios[currentIndex];

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!currentItem) return null;

  return (
    <div id="care-portfolio-carousel" className="bg-white rounded-2xl border border-[#E5E2D9] p-5 sm:p-7 shadow-xs space-y-5">
      
      {/* Header section with auto-play status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F0EB]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#D4A373]/15 text-[#8C5D30] text-[11px] font-bold border border-[#D4A373]/30">
              作品集輪播
            </span>
            <h2 className="text-base sm:text-xl font-serif font-bold text-[#2C2C2C] flex items-center gap-2">
              <FolderHeart className="w-5 h-5 text-[#4A6741]" />
              精選照護服務作品集 ｜ 實例展演
            </h2>
          </div>
          <p className="text-xs text-[#6B665F] mt-1">
            真實照服員復能紀錄、管路安全照顧、懷舊情緒疏導與養生膳食調配案例。
          </p>
        </div>

        {/* Carousel controls & status indicator */}
        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              isPaused
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {isPaused ? (
              <>
                <Pause className="w-3 h-3 text-amber-600 animate-pulse" />
                <span>懸停已暫停輪播</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-600" />
                <span>自動輪播中 ({currentIndex + 1}/{portfolios.length})</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-[#FAF9F6] border border-[#E5E2D9] hover:bg-[#4A6741] hover:text-white transition-all shadow-xs"
              title="上一篇作品"
              aria-label="Previous portfolio case"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-[#FAF9F6] border border-[#E5E2D9] hover:bg-[#4A6741] hover:text-white transition-all shadow-xs"
              title="下一篇作品"
              aria-label="Next portfolio case"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Carousel Display Box - Mouse Enter Pauses, Mouse Leave Resumes */}
      <div
        className="relative bg-[#FAF9F6] rounded-2xl border border-[#E5E2D9] overflow-hidden transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Cover Image & View Count Badge (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[300px] overflow-hidden group">
            <img
              src={currentItem.coverImage}
              alt={currentItem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Views counter badge over image */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow-xs">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>瀏覽次數 <strong className="text-white font-mono">{currentItem.viewsCount.toLocaleString()}</strong> 次</span>
            </div>

            {/* Like count button */}
            <button
              onClick={(e) => toggleLike(e, currentItem.id)}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full text-xs font-semibold text-[#2C2C2C] flex items-center gap-1.5 shadow-md hover:bg-white transition-all"
            >
              <Heart
                className={`w-4 h-4 ${
                  likedMap[currentItem.id] ? 'fill-red-500 text-red-500' : 'text-[#6B665F]'
                }`}
              />
              <span className="font-mono">{currentItem.likesCount + (likedMap[currentItem.id] ? 1 : 0)}</span>
            </button>

            {/* Date Tag */}
            <div className="absolute bottom-3 left-3 text-[11px] text-white/90 flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
              <Calendar className="w-3 h-3 text-[#D4A373]" />
              <span>案例建檔日期：{currentItem.date}</span>
            </div>
          </div>

          {/* Details & Description (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                {currentItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-[#4A6741]/10 text-[#4A6741] text-[11px] font-bold border border-[#4A6741]/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2C2C2C] leading-snug">
                  {currentItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#D4A373] font-medium mt-1">
                  {currentItem.subtitle}
                </p>
              </div>

              {/* Caregiver Profile Info Strip */}
              <div className="p-3 bg-white rounded-xl border border-[#E5E2D9] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={currentItem.caregiverAvatar}
                    alt={currentItem.caregiverName}
                    className="w-10 h-10 rounded-full object-cover border border-[#4A6741]/30 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#2C2C2C]">{currentItem.caregiverName} 照服員</span>
                      <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 text-[10px] font-semibold border border-green-200 flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3 text-green-600" /> 認證照服員
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B665F]">{currentItem.caregiverTitle}</p>
                  </div>
                </div>

                {onSelectCaregiver && (
                  <button
                    onClick={() => onSelectCaregiver(currentItem.caregiverId)}
                    className="text-xs text-[#4A6741] hover:underline font-bold shrink-0"
                  >
                    查看個人履歷 →
                  </button>
                )}
              </div>

              {/* Patient Condition & Outcome */}
              <div className="space-y-1.5 text-xs text-[#2C2C2C]">
                <div className="flex items-start gap-2">
                  <span className="shrink-0 font-bold text-[#8C857B] bg-[#E5E2D9]/50 px-2 py-0.5 rounded text-[11px]">
                    照護個案狀況
                  </span>
                  <span className="text-[#6B665F] font-medium pt-0.5">{currentItem.patientCondition}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="shrink-0 font-bold text-[#4A6741] bg-[#4A6741]/10 px-2 py-0.5 rounded text-[11px]">
                    重要照護成果
                  </span>
                  <span className="font-semibold text-[#2C2C2C] pt-0.5">{currentItem.outcome}</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#E5E2D9] flex flex-wrap items-center justify-between gap-3">
              
              <div className="text-[11px] text-[#8C857B] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>點擊下方按鈕閱讀完整照護過程</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPortfolioModal(currentItem)}
                  className="px-4 py-2 bg-[#4A6741] hover:bg-[#3D5535] text-white text-xs font-medium rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  閱讀完整作品案例內容 <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Carousel Dots Indicator */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {portfolios.map((pf, idx) => (
          <button
            key={pf.id}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-8 h-2 bg-[#4A6741]'
                : 'w-2 h-2 bg-[#E5E2D9] hover:bg-[#8C857B]'
            }`}
            title={`Slide ${idx + 1}: ${pf.title}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Portfolio Case Full Detail Modal */}
      {selectedPortfolioModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-xl border border-[#E5E2D9] my-8 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedPortfolioModal(null)}
              className="absolute top-5 right-5 p-2 bg-[#FAF9F6] text-[#6B665F] hover:text-[#2C2C2C] rounded-full border border-[#E5E2D9] transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#4A6741]/10 text-[#4A6741] text-xs font-bold">
                  照護案例作品
                </span>
                <span className="text-xs text-[#8C857B] flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-[#4A6741]" /> {selectedPortfolioModal.viewsCount.toLocaleString()} 次實際瀏覽
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2C2C2C]">
                {selectedPortfolioModal.title}
              </h3>
              <p className="text-xs text-[#D4A373] font-medium">
                {selectedPortfolioModal.subtitle}
              </p>
            </div>

            {/* Cover image in modal */}
            <div className="rounded-2xl overflow-hidden max-h-64 border border-[#E5E2D9]">
              <img
                src={selectedPortfolioModal.coverImage}
                alt={selectedPortfolioModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caregiver Author box */}
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#E5E2D9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPortfolioModal.caregiverAvatar}
                  alt={selectedPortfolioModal.caregiverName}
                  className="w-12 h-12 rounded-full object-cover border border-[#4A6741]/30"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#2C2C2C]">{selectedPortfolioModal.caregiverName} 照服員</h4>
                  <p className="text-xs text-[#6B665F]">{selectedPortfolioModal.caregiverTitle}</p>
                </div>
              </div>
            </div>

            {/* Full Story Description */}
            <div className="space-y-3 text-xs sm:text-sm text-[#2C2C2C] leading-relaxed">
              <h4 className="font-serif font-bold text-[#4A6741] text-base border-b border-[#E5E2D9] pb-1">
                照護個案實錄與照顧計畫細節
              </h4>
              <p className="whitespace-pre-line text-[#4A4A4A]">
                {selectedPortfolioModal.fullDescription}
              </p>

              {/* Highlights List */}
              <div className="pt-2 space-y-2">
                <h5 className="font-bold text-xs text-[#2C2C2C]">✨ 關鍵照護亮點與突破：</h5>
                <ul className="space-y-1.5 pl-2">
                  {selectedPortfolioModal.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#6B665F]">
                      <CheckCircle2 className="w-4 h-4 text-[#4A6741] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#E5E2D9] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedPortfolioModal(null)}
                className="px-4 py-2 bg-[#FAF9F6] text-[#6B665F] text-xs rounded-xl font-medium border border-[#E5E2D9]"
              >
                關閉作品視窗
              </button>

              {onBookCaregiver && (
                <button
                  onClick={() => {
                    const cgId = selectedPortfolioModal.caregiverId;
                    setSelectedPortfolioModal(null);
                    onBookCaregiver(cgId);
                  }}
                  className="px-5 py-2.5 bg-[#4A6741] hover:bg-[#3D5535] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  預約這位照服員服務 →
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
