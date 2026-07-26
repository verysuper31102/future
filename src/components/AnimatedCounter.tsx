import React, { useState, useEffect } from 'react';
import { Eye, FolderHeart, HeartHandshake, Building, ShieldCheck, TrendingUp } from 'lucide-react';

interface StatsConfig {
  totalViews: number;
  portfolioCount: number;
  servicedFamilies: number;
  partnerEnterprises: number;
  verifiedCaregivers: number;
}

interface AnimatedCounterProps {
  stats: StatsConfig;
  duration?: number; // duration in ms
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  stats,
  duration = 1800,
}) => {
  const [counts, setCounts] = useState({
    totalViews: 0,
    portfolioCount: 0,
    servicedFamilies: 0,
    partnerEnterprises: 0,
    verifiedCaregivers: 0,
  });

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out quad formula for smooth decelerating animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        totalViews: Math.floor(easeOut * stats.totalViews),
        portfolioCount: Math.floor(easeOut * stats.portfolioCount),
        servicedFamilies: Math.floor(easeOut * stats.servicedFamilies),
        partnerEnterprises: Math.floor(easeOut * stats.partnerEnterprises),
        verifiedCaregivers: Math.floor(easeOut * stats.verifiedCaregivers),
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [stats, duration]);

  const statItems = [
    {
      id: 'views',
      label: '實際總瀏覽次數',
      value: counts.totalViews.toLocaleString(),
      unit: '次',
      icon: Eye,
      color: 'text-[#4A6741]',
      bg: 'bg-[#4A6741]/10',
      badge: '即時數據更新',
    },
    {
      id: 'portfolios',
      label: '精選照護作品數',
      value: counts.portfolioCount.toLocaleString(),
      unit: '件',
      icon: FolderHeart,
      color: 'text-[#D4A373]',
      bg: 'bg-[#D4A373]/10',
      badge: '實名案例紀錄',
    },
    {
      id: 'families',
      label: '累積服務滿意家庭',
      value: counts.servicedFamilies.toLocaleString(),
      unit: '戶',
      icon: HeartHandshake,
      color: 'text-[#C86D51]',
      bg: 'bg-[#C86D51]/10',
      badge: '好評滿意度 99.4%',
    },
    {
      id: 'caregivers',
      label: '國家雙證照照服員',
      value: counts.verifiedCaregivers.toLocaleString(),
      unit: '位',
      icon: ShieldCheck,
      color: 'text-[#2B6CB0]',
      bg: 'bg-[#2B6CB0]/10',
      badge: '100%良民證查驗',
    },
  ];

  return (
    <div id="animated-stats-section" className="bg-white rounded-2xl border border-[#E5E2D9] p-5 sm:p-7 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#F1F0EB]">
        <div>
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#2C2C2C] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#4A6741]" />
            企業照護平台 ｜ 實際營運數據統計
          </h2>
          <p className="text-xs text-[#6B665F]">
            公開透明數據紀錄，真實反映民眾瀏覽、照護作品紀錄與品質肯定。
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#4A6741] bg-[#4A6741]/10 px-3 py-1 rounded-full w-fit">
          <span className="w-2 h-2 rounded-full bg-[#4A6741] animate-ping" />
          全台系統數據同步中
        </div>
      </div>

      {/* Grid of Animated Stat Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-1">
        {statItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E2D9] hover:border-[#4A6741]/40 hover:bg-white transition-all duration-300 hover:shadow-xs group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] text-[#8C857B] font-medium bg-white px-2 py-0.5 rounded-full border border-[#E5E2D9]">
                  {item.badge}
                </span>
              </div>

              <p className="text-xs text-[#6B665F] font-medium mb-1">
                {item.label}
              </p>

              <div className="flex items-baseline gap-1">
                <span className={`text-xl sm:text-2xl font-serif font-bold ${item.color} tracking-tight font-mono`}>
                  {item.value}
                </span>
                <span className="text-xs font-bold text-[#6B665F]">
                  {item.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
