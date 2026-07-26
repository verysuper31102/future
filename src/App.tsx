/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CaregiverSearchFilter } from './components/CaregiverSearchFilter';
import { CaregiverCard } from './components/CaregiverCard';
import { CaregiverDetailModal } from './components/CaregiverDetailModal';
import { BookingContractModal } from './components/BookingContractModal';
import { CaregiverDashboard } from './components/CaregiverDashboard';
import { ChatDrawer } from './components/ChatDrawer';
import { SupportModal } from './components/SupportModal';
import { OpsDashboardModal } from './components/OpsDashboardModal';
import { TypewriterSlogan } from './components/TypewriterSlogan';
import { AnimatedCounter } from './components/AnimatedCounter';
import { CarePortfolioCarousel } from './components/CarePortfolioCarousel';
import { ParallaxSection } from './components/ParallaxSection';
import { ScrollReveal } from './components/ScrollReveal';
import { MagneticButton } from './components/MagneticButton';
import { GoogleFormSection } from './components/GoogleFormSection';
import { MobileBottomNav } from './components/MobileBottomNav';
import { InstallPwaModal } from './components/InstallPwaModal';
import { useTheme } from './hooks/useTheme';

import { MOCK_CAREGIVERS, MOCK_REVIEWS, MOCK_COURSES, INITIAL_BOOKINGS } from './data/mockData';
import { CORPORATE_SLOGANS, STATS_DATA, MOCK_PORTFOLIOS } from './data/portfolioData';
import { FilterState, Caregiver, Booking } from './types';
import { Sparkles, Heart, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';


export default function App() {
  // Theme Manager (Light, Dark, System Preference)
  const { theme, setTheme, resolvedTheme, isSystemDark } = useTheme();

  // Navigation Mode: 'seeker' (Family Seeker), 'caregiver' (Caregiver Provider Dashboard), 'ops' (Platform Operations)
  const [activeMode, setActiveMode] = useState<'seeker' | 'caregiver' | 'ops'>('seeker');

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
    city: '全部縣市',
    district: '全部行政區',
    disabilityLevel: 'all',
    careConditions: [],
    shiftType: 'all',
    maxHourlyPrice: 500,
    searchKeyword: '',
    sortBy: 'match',
  });

  // Data & State Storage
  const [caregivers, setCaregivers] = useState<Caregiver[]>(MOCK_CAREGIVERS);
  const [savedIds, setSavedIds] = useState<string[]>(['cg-101']);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Modals & Drawers state
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null); // Detail Modal
  const [bookingCaregiver, setBookingCaregiver] = useState<Caregiver | null>(null); // Booking Modal
  const [chatCaregiver, setChatCaregiver] = useState<Caregiver | null>(null); // Chat Drawer
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showOpsModal, setShowOpsModal] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [showInstallPwaModal, setShowInstallPwaModal] = useState(false);

  // Toggle Save Favorite
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilter({
      city: '全部縣市',
      district: '全部行政區',
      disabilityLevel: 'all',
      careConditions: [],
      shiftType: 'all',
      maxHourlyPrice: 500,
      searchKeyword: '',
      sortBy: 'match',
    });
    setShowSavedOnly(false);
  };

  // Smart Matching Score Algorithm
  const processedCaregivers = useMemo(() => {
    return caregivers.map((cg) => {
      let score = 75; // baseline

      // City match
      if (filter.city !== '全部縣市' && cg.city === filter.city) score += 10;
      // District match
      if (filter.district !== '全部行政區' && cg.districts.includes(filter.district)) score += 10;

      // Care conditions match
      if (filter.careConditions.length > 0) {
        const matched = filter.careConditions.filter((c) => cg.specialties.includes(c));
        score += matched.length * 6;
      }

      // Keyword match
      if (filter.searchKeyword.trim()) {
        const kw = filter.searchKeyword.toLowerCase();
        if (
          cg.name.toLowerCase().includes(kw) ||
          cg.title.toLowerCase().includes(kw) ||
          cg.specialties.some((s) => s.toLowerCase().includes(kw))
        ) {
          score += 15;
        }
      }

      // Cap score at 99%
      const finalScore = Math.min(99, score);

      return {
        ...cg,
        matchScore: finalScore,
      };
    });
  }, [caregivers, filter]);

  // Filtered Caregivers List
  const filteredCaregivers = useMemo(() => {
    let result = [...processedCaregivers];

    if (showSavedOnly) {
      result = result.filter((cg) => savedIds.includes(cg.id));
    }

    if (filter.city !== '全部縣市') {
      result = result.filter((cg) => cg.city === filter.city);
    }

    if (filter.district !== '全部行政區') {
      result = result.filter((cg) => cg.districts.includes(filter.district));
    }

    if (filter.careConditions.length > 0) {
      result = result.filter((cg) =>
        filter.careConditions.some((cond) => cg.specialties.includes(cond))
      );
    }

    if (filter.searchKeyword.trim()) {
      const kw = filter.searchKeyword.toLowerCase();
      result = result.filter(
        (cg) =>
          cg.name.toLowerCase().includes(kw) ||
          cg.title.toLowerCase().includes(kw) ||
          cg.specialties.some((s) => s.toLowerCase().includes(kw))
      );
    }

    // Sort
    if (filter.sortBy === 'match') {
      result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else if (filter.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filter.sortBy === 'experience') {
      result.sort((a, b) => b.experienceYears - a.experienceYears);
    } else if (filter.sortBy === 'price_low') {
      result.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (filter.sortBy === 'price_high') {
      result.sort((a, b) => b.hourlyRate - a.hourlyRate);
    }

    return result;
  }, [processedCaregivers, filter, savedIds, showSavedOnly]);

  // Booking completion callback
  const handleBookingComplete = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setBookingCaregiver(null);
    setShowOpsModal(true); // show confirmation in ops dashboard
  };

  // Booking cancellation callback
  const handleCancelBooking = (bookingId: string, reason: string) => {
    const cancelledTime = new Date().toLocaleString('zh-TW', { hour12: false });
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'cancelled',
              escrowStatus: 'refunded',
              cancellationReason: reason,
              cancelledAt: cancelledTime,
            }
          : b
      )
    );
  };

  // Caregiver Profile Update Callback
  const handleUpdateCaregiverProfile = (updated: Caregiver) => {
    setCaregivers((prev) =>
      prev.map((cg) => (cg.id === updated.id ? updated : cg))
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121612] text-[#2C2C2C] dark:text-[#F2F0E9] font-sans selection:bg-[#4A6741]/20 selection:text-[#4A6741] flex flex-col relative pb-16 md:pb-0 transition-colors">
      
      {/* App Header */}
      <Header
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        savedCount={savedIds.length}
        unreadCount={1}
        activeBookingsCount={bookings.filter((b) => b.status !== 'cancelled').length}
        onOpenSaved={() => {
          setActiveMode('seeker');
          setShowSavedOnly(!showSavedOnly);
        }}
        onOpenBookings={() => setShowOpsModal(true)}
        onOpenChat={() => setChatCaregiver(caregivers[0])}
        onOpenSupport={() => setShowSupportModal(true)}
        onOpenForm={() => {
          setActiveMode('seeker');
          setTimeout(() => {
            const elem = document.getElementById('form-section');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenInstallPwa={() => setShowInstallPwaModal(true)}
        theme={theme}
        setTheme={setTheme}
        resolvedTheme={resolvedTheme}
        isSystemDark={isSystemDark}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* VIEW 1: SEEKER (FAMILY) MODE */}
        {activeMode === 'seeker' && (
          <div className="space-y-8">
            
            {/* 1. Typewriter Corporate Care System Slogan */}
            <ScrollReveal delay={0} direction="up">
              <TypewriterSlogan slogans={CORPORATE_SLOGANS} />
            </ScrollReveal>

            {/* 2. Parallax Hero Banner */}
            <ScrollReveal delay={100} direction="up">
              <ParallaxSection
                bgImage="https://images.unsplash.com/photo-1576765608622-067973a79f53?auto=format&fit=crop&q=80&w=1600"
                overlayOpacity={0.88}
                speed={0.2}
              >
                <div className="p-6 sm:p-10 space-y-4 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D4A373] text-xs font-semibold border border-white/20">
                    <Sparkles className="w-3.5 h-3.5" /> CareLink 智慧專人照護 concierge 服務
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-white leading-tight">
                    用心挑選，給家人最暖心的溫柔照護。
                  </h1>
                  <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed max-w-2xl">
                    專業國家單一級照服員驗證、警察良民證雙重審核，搭配衛生福利部標準定型化契約與第三方專戶託管服務。
                  </p>

                  {/* Platform Guarantees Badges */}
                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/90 font-medium">
                    <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% 本國優質照服員
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 警察刑事紀錄良民證核驗
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 第三方履約價金託管保障
                    </span>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <MagneticButton
                      onClick={() => setShowSupportModal(true)}
                      className="px-5 py-2.5 text-xs font-bold shadow-lg"
                      variant="secondary"
                    >
                      權益保障與專人評估 →
                    </MagneticButton>
                  </div>
                </div>
              </ParallaxSection>
            </ScrollReveal>

            {/* 3. Animated Jumping Stats Counter */}
            <ScrollReveal delay={200} direction="up">
              <AnimatedCounter stats={STATS_DATA} />
            </ScrollReveal>

            {/* 4. Auto-rotating Caregiver Portfolio Showcase Carousel */}
            <ScrollReveal delay={300} direction="up">
              <CarePortfolioCarousel
                portfolios={MOCK_PORTFOLIOS}
                autoplayInterval={4000}
                onSelectCaregiver={(cgId) => {
                  const cg = caregivers.find((c) => c.id === cgId);
                  if (cg) setSelectedCaregiver(cg);
                }}
                onBookCaregiver={(cgId) => {
                  const cg = caregivers.find((c) => c.id === cgId) || caregivers[0];
                  setBookingCaregiver(cg);
                }}
              />
            </ScrollReveal>

            {/* Smart Match & Search Filter Box */}
            <ScrollReveal delay={400} direction="up">
              <CaregiverSearchFilter
                filter={filter}
                setFilter={setFilter}
                totalCount={filteredCaregivers.length}
                onReset={handleResetFilters}
              />
            </ScrollReveal>


            {/* Saved filter pill indicator */}
            {showSavedOnly && (
              <div className="p-3 bg-[#FAF0EA] border border-[#F2D6C9] rounded-2xl flex items-center justify-between text-xs text-[#D98A6C]">
                <span>❤️ 目前僅顯示您收藏的 {savedIds.length} 位照服員</span>
                <button onClick={() => setShowSavedOnly(false)} className="underline font-bold">
                  顯示全部照服員
                </button>
              </div>
            )}

            {/* Caregiver Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCaregivers.map((cg) => (
                <CaregiverCard
                  key={cg.id}
                  caregiver={cg}
                  isSaved={savedIds.includes(cg.id)}
                  onToggleSave={handleToggleSave}
                  onSelect={(caregiver) => setSelectedCaregiver(caregiver)}
                  onBook={(caregiver) => setBookingCaregiver(caregiver)}
                  onChat={(caregiver) => setChatCaregiver(caregiver)}
                />
              ))}
            </div>

            {filteredCaregivers.length === 0 && (
              <div className="bg-white rounded-2xl border border-[#E5E2D9] p-8 sm:p-12 text-center space-y-4 shadow-xs">
                <div className="w-12 h-12 bg-[#F1F0EB] text-[#4A6741] rounded-xl flex items-center justify-center mx-auto border border-[#E5E2D9]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#2C2C2C] text-base">未找到符合「{filter.city}{filter.district !== '全部行政區' ? filter.district : ''}」之照服員</h3>
                  <p className="text-xs text-[#6B665F] max-w-md mx-auto mt-1 leading-relaxed">
                    您所搜尋的區域目前尚無專任照服員，但平台提供跨區派遣或專人人工急調服務。
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-[#4A6741] hover:opacity-90 text-white text-xs rounded-lg font-medium transition-all"
                  >
                    重設所有篩選條件
                  </button>
                  <button
                    onClick={() => setFilter((prev) => ({ ...prev, city: '全部縣市', district: '全部行政區' }))}
                    className="px-4 py-2 bg-[#F1F0EB] hover:bg-[#E5E2D9] text-[#2C2C2C] text-xs rounded-lg font-medium border border-[#E5E2D9] transition-all"
                  >
                    切換為全台地區
                  </button>
                  <button
                    onClick={() => setShowSupportModal(true)}
                    className="px-4 py-2 bg-[#D4A373] hover:opacity-90 text-white text-xs rounded-lg font-medium transition-all"
                  >
                    聯絡 24H 專人派員
                  </button>
                </div>
              </div>
            )}

            {/* 6. Embedded Google Form Section */}
            <ScrollReveal delay={100} direction="up">
              <div className="pt-8">
                <GoogleFormSection id="form-section" />
              </div>
            </ScrollReveal>

          </div>
        )}

        {/* VIEW 2: CAREGIVER PROVIDER WORKSPACE */}
        {activeMode === 'caregiver' && (
          <CaregiverDashboard
            caregiver={caregivers[0]}
            courses={MOCK_COURSES}
            bookings={bookings}
            onOpenChat={() => setChatCaregiver(caregivers[0])}
            onOpenSupport={() => setShowSupportModal(true)}
            onUpdateCaregiverProfile={handleUpdateCaregiverProfile}
          />
        )}

        {/* VIEW 3: PLATFORM OPERATIONS & CONTRACT ESCROW OVERVIEW */}
        {activeMode === 'ops' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5DFD5] p-6 space-y-2">
              <h2 className="text-xl font-bold text-[#2D3748] font-serif">第三方金流託管與電子合約專戶中心</h2>
              <p className="text-xs text-[#718096]">包含合約審閱、手寫電子簽章存查、價金託管與服務滿意撥款條款紀錄。</p>
            </div>
            <OpsDashboardModal
              bookings={bookings}
              onClose={() => setActiveMode('seeker')}
              onCancelBooking={handleCancelBooking}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-[#E5DFD5] py-8 text-xs text-[#718096]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#2D3748] font-serif">暖心看護</span>
            <span>｜ 簡單文青風格本國照服員智慧媒合平台</span>
          </div>
          <div className="flex items-center gap-4 text-[#A0AEC0]">
            <button
              onClick={() => {
                setActiveMode('seeker');
                setTimeout(() => {
                  const elem = document.getElementById('form-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-[#4A6741] font-medium hover:underline cursor-pointer"
            >
              填寫新客戶基本資料表單
            </button>
            <span>•</span>
            <span>衛生福利部定型化契約範本標準</span>
            <span>•</span>
            <span>第三方價金託管履約保證</span>
            <span>•</span>
            <span>24H 緊急服務專線</span>
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}

      {/* Caregiver Detail Resume Modal */}
      {selectedCaregiver && (
        <CaregiverDetailModal
          caregiver={selectedCaregiver}
          reviews={MOCK_REVIEWS}
          isSaved={savedIds.includes(selectedCaregiver.id)}
          onClose={() => setSelectedCaregiver(null)}
          onToggleSave={handleToggleSave}
          onBook={(cg) => {
            setSelectedCaregiver(null);
            setBookingCaregiver(cg);
          }}
          onChat={(cg) => {
            setSelectedCaregiver(null);
            setChatCaregiver(cg);
          }}
        />
      )}

      {/* Booking Wizard & Digital Contract Modal */}
      {bookingCaregiver && (
        <BookingContractModal
          caregiver={bookingCaregiver}
          onClose={() => setBookingCaregiver(null)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* Privacy In-app Chat Drawer */}
      {chatCaregiver && (
        <ChatDrawer
          caregiver={chatCaregiver}
          onClose={() => setChatCaregiver(null)}
          onOpenBookingModal={() => {
            const cg = chatCaregiver;
            setChatCaregiver(null);
            setBookingCaregiver(cg);
          }}
        />
      )}

      {/* Support & Emergency Hotline Modal */}
      {showSupportModal && (
        <SupportModal onClose={() => setShowSupportModal(false)} />
      )}

      {/* Ops Dashboard Modal from header */}
      {showOpsModal && (
        <OpsDashboardModal
          bookings={bookings}
          onClose={() => setShowOpsModal(false)}
          onCancelBooking={handleCancelBooking}
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        savedCount={savedIds.length}
        unreadCount={1}
        onOpenSaved={() => {
          setActiveMode('seeker');
          setShowSavedOnly(!showSavedOnly);
        }}
        onOpenChat={() => setChatCaregiver(caregivers[0])}
        onOpenSupport={() => setShowSupportModal(true)}
        onOpenForm={() => {
          setActiveMode('seeker');
          setTimeout(() => {
            const elem = document.getElementById('form-section');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenInstallPwa={() => setShowInstallPwaModal(true)}
        theme={theme}
        setTheme={setTheme}
        resolvedTheme={resolvedTheme}
      />

      {/* PWA / iOS Home Screen Install Modal */}
      <InstallPwaModal
        isOpen={showInstallPwaModal}
        onClose={() => setShowInstallPwaModal(false)}
      />

    </div>
  );
}
