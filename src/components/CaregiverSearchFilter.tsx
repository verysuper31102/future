import React from 'react';
import { Filter, Search, RotateCcw, Check, Sparkles, MapPin, Clock, Stethoscope, SlidersHorizontal } from 'lucide-react';
import { FilterState, ShiftType } from '../types';

interface CaregiverSearchFilterProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
  onReset: () => void;
}

const CITIES = [
  '全部縣市',
  '台北市',
  '新北市',
  '基隆市',
  '桃園市',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '台中市',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '台南市',
  '高雄市',
  '屏東縣',
  '宜蘭縣',
  '花蓮縣',
  '臺東縣',
  '澎湖縣',
  '金門縣',
  '連江縣'
];

const DISTRICTS_MAP: Record<string, string[]> = {
  '台北市': ['全部行政區', '中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
  '新北市': ['全部行政區', '板橋區', '三重區', '中和區', '永和區', '新莊區', '新店區', '土城區', '蘆洲區', '樹林區', '汐止區', '鶯歌區', '三峽區', '淡水區', '瑞芳區', '五股區', '泰山區', '林口區', '深坑區', '石碇區', '坪林區', '三芝區', '石門區', '八里區', '平溪區', '雙溪區', '貢寮區', '金山區', '萬里區', '烏來區'],
  '基隆市': ['全部行政區', '仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區'],
  '桃園市': ['全部行政區', '桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '大溪區', '龍潭區', '龜山區', '大園區', '觀音區', '新屋區', '復興區'],
  '新竹市': ['全部行政區', '東區', '北區', '香山區'],
  '新竹縣': ['全部行政區', '竹北市', '竹東鎮', '新埔鎮', '關西鎮', '湖口鄉', '新豐鄉', '芎林鄉', '橫山鄉', '北埔鄉', '寶山鄉', '峨眉鄉', '尖石鄉', '五峰鄉'],
  '苗栗縣': ['全部行政區', '苗栗市', '頭份市', '竹南鎮', '後龍鎮', '通霄鎮', '苑裡鎮', '卓蘭鎮', '造橋鄉', '西湖鄉', '頭屋鄉', '公館鄉', '銅鑼鄉', '三義鄉', '大湖鄉', '獅潭鄉', '三灣鄉', '南庄鄉', '泰安鄉'],
  '台中市': ['全部行政區', '中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '石岡區', '東勢區', '和平區', '新社區', '潭子區', '大雅區', '神岡區', '大肚區', '沙鹿區', '龍井區', '梧棲區', '清水區', '大甲區', '外埔區', '大安區'],
  '彰化縣': ['全部行政區', '彰化市', '員林市', '和美鎮', '鹿港鎮', '溪湖鎮', '二林鎮', '田中鎮', '北斗鎮', '花壇鄉', '芬園鄉', '大村鄉', '永靖鄉', '伸港鄉', '線西鄉', '秀水鄉', '埔心鄉', '埔鹽鄉', '大城鄉', '芳苑鄉', '竹塘鄉', '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '溪州鄉'],
  '南投縣': ['全部行政區', '南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'],
  '雲林縣': ['全部行政區', '斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮', '古坑鄉', '大埤鄉', '莿桐鄉', '林內鄉', '二崙鄉', '崙背鄉', '麥寮鄉', '東勢鄉', '褒忠鄉', '臺西鄉', '元長鄉', '四湖鄉', '口湖鄉', '水林鄉'],
  '嘉義市': ['全部行政區', '東區', '西區'],
  '嘉義縣': ['全部行政區', '太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉', '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉', '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'],
  '台南市': ['全部行政區', '中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區'],
  '高雄市': ['全部行政區', '楠梓區', '左營區', '鼓山區', '三民區', '鹽埕區', '前金區', '新興區', '苓雅區', '前鎮區', '旗津區', '小港區', '鳳山區', '林園區', '大寮區', '大樹區', '大社區', '仁武區', '鳥松區', '岡山區', '橋頭區', '燕巢區', '田寮區', '阿蓮區', '路竹區', '湖內區', '茄萣區', '永安區', '彌陀區', '梓官區', '旗山區', '美濃區', '六龜區', '杉林區', '甲仙區', '桃源區', '茂林區', '那瑪夏區'],
  '屏東縣': ['全部行政區', '屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '枋山鄉', '三地門鄉', '霧臺鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉'],
  '宜蘭縣': ['全部行政區', '宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'],
  '花蓮縣': ['全部行政區', '花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '富里鄉', '秀林鄉', '萬榮鄉', '卓溪鄉'],
  '臺東縣': ['全部行政區', '臺東市', '成功鎮', '關山鎮', '長濱鄉', '海端鄉', '池上鄉', '東河鄉', '鹿野鄉', '延平鄉', '卑南鄉', '金峰鄉', '大武鄉', '達仁鄉', '綠島鄉', '蘭嶼鄉', '太麻里鄉'],
  '澎湖縣': ['全部行政區', '馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'],
  '金門縣': ['全部行政區', '金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'],
  '連江縣': ['全部行政區', '南竿鄉', '北竿鄉', '莒光鄉', '東引鄉']
};

const CARE_CONDITIONS_OPTIONS = [
  '失智症陪伴',
  '鼻胃管照護',
  '導尿管照護',
  '翻身拍背',
  '肢體復健協助',
  '氣切吸痰',
  '洗腎點滴護理',
  '日常沐浴擦澡',
  '服藥提醒與紀錄',
  '關懷備餐'
];

export const CaregiverSearchFilter: React.FC<CaregiverSearchFilterProps> = ({
  filter,
  setFilter,
  totalCount,
  onReset,
}) => {
  const toggleCondition = (condition: string) => {
    setFilter((prev) => {
      const exists = prev.careConditions.includes(condition);
      return {
        ...prev,
        careConditions: exists
          ? prev.careConditions.filter((c) => c !== condition)
          : [...prev.careConditions, condition],
      };
    });
  };

  const availableDistricts = DISTRICTS_MAP[filter.city] || ['全部行政區'];

  return (
    <div className="bg-white rounded-2xl border border-[#E5E2D9] p-5 sm:p-6 shadow-xs space-y-5">
      
      {/* Top Bar: Search input & City / District Select */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
        
        {/* Search input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-[#9A958E] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={filter.searchKeyword}
            onChange={(e) => setFilter((prev) => ({ ...prev, searchKeyword: e.target.value }))}
            placeholder="搜尋姓名、證照、專長 (如：鼻胃管、失智症)..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F1F0EB] border border-transparent rounded-xl text-sm text-[#2C2C2C] placeholder-[#9A958E] focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all outline-none"
          />
        </div>

        {/* City Select */}
        <div className="md:col-span-3 relative flex items-center">
          <MapPin className="w-4 h-4 text-[#4A6741] absolute left-3.5 pointer-events-none" />
          <select
            value={filter.city}
            onChange={(e) => setFilter((prev) => ({ ...prev, city: e.target.value, district: '全部行政區' }))}
            className="w-full pl-9 pr-8 py-2.5 bg-[#F1F0EB] border border-transparent rounded-xl text-sm text-[#2C2C2C] focus:bg-white focus:border-[#4A6741] cursor-pointer outline-none font-medium"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* District Select */}
        <div className="md:col-span-2 relative flex items-center">
          <select
            value={filter.district}
            onChange={(e) => setFilter((prev) => ({ ...prev, district: e.target.value }))}
            disabled={filter.city === '全部縣市'}
            className="w-full px-3.5 py-2.5 bg-[#F1F0EB] border border-transparent rounded-xl text-sm text-[#2C2C2C] focus:bg-white focus:border-[#4A6741] cursor-pointer disabled:opacity-50 outline-none font-medium"
          >
            {availableDistricts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Sort option */}
        <div className="md:col-span-2 relative flex items-center">
          <select
            value={filter.sortBy}
            onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.target.value as any }))}
            className="w-full px-3 py-2.5 bg-[#F1F0EB] border border-transparent rounded-xl text-xs font-semibold text-[#4A6741] focus:bg-white focus:border-[#4A6741] cursor-pointer outline-none"
          >
            <option value="match">✨ 智慧配對最高</option>
            <option value="rating">★ 滿意評價最高</option>
            <option value="experience">🎓 照顧資歷最深</option>
            <option value="price_low">💰 價格由低到高</option>
            <option value="price_high">💰 價格由高到低</option>
          </select>
        </div>

      </div>

      {/* Row 2: Shift Type Options */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3.5 border-t border-[#E5E2D9]">
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#6B665F] flex items-center gap-1 mr-1 font-serif">
            <Clock className="w-3.5 h-3.5 text-[#4A6741]" /> 班別型態：
          </span>
          {[
            { id: 'all', label: '不限班別' },
            { id: '24h', label: '24h 全天駐點' },
            { id: '12h_day', label: '12h 日班' },
            { id: '12h_night', label: '12h 夜間陪宿' },
            { id: 'hourly', label: '短期計時 (鐘點)' },
          ].map((shift) => (
            <button
              key={shift.id}
              onClick={() => setFilter((prev) => ({ ...prev, shiftType: shift.id as any }))}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter.shiftType === shift.id
                  ? 'bg-[#4A6741] text-white shadow-xs'
                  : 'bg-[#F1F0EB] text-[#6B665F] hover:text-[#2C2C2C] border border-[#E5E2D9]'
              }`}
            >
              {shift.label}
            </button>
          ))}
        </div>

        {/* Disability Level Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#6B665F] font-serif">失能等級：</span>
          <select
            value={filter.disabilityLevel}
            onChange={(e) => setFilter((prev) => ({ ...prev, disabilityLevel: e.target.value }))}
            className="px-3 py-1.5 bg-[#F1F0EB] border border-[#E5E2D9] rounded-lg text-xs text-[#2C2C2C] focus:outline-none focus:border-[#4A6741]"
          >
            <option value="all">不限等級</option>
            <option value="level_1_2">輕度失能 (Level 1 - 2)</option>
            <option value="level_3_4">中度失能 (Level 3 - 4)</option>
            <option value="level_5_6">重度失能 (Level 5 - 6)</option>
            <option value="level_7_8">極重度失能 (Level 7 - 8)</option>
          </select>
        </div>

      </div>

      {/* Row 3: Specialty Care Conditions Badges */}
      <div className="pt-3.5 border-t border-[#E5E2D9]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#6B665F] flex items-center gap-1.5 font-serif">
            <Stethoscope className="w-3.5 h-3.5 text-[#D4A373]" /> 病況特長與需求篩選：
          </span>
          {filter.careConditions.length > 0 && (
            <span className="text-[11px] text-[#4A6741] font-bold">
              已選 {filter.careConditions.length} 項
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {CARE_CONDITIONS_OPTIONS.map((cond) => {
            const isSelected = filter.careConditions.includes(cond);
            return (
              <button
                key={cond}
                onClick={() => toggleCondition(cond)}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-[#4A6741] text-white border border-[#4A6741]'
                    : 'bg-[#F1F0EB] text-[#6B665F] hover:bg-[#E5E2D9] border border-[#E5E2D9]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
                {cond}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="flex items-center justify-between pt-3.5 border-t border-[#E5E2D9] text-xs text-[#6B665F]">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-[#2C2C2C]">
            為您推薦優質照服員 (<span className="text-[#4A6741]">{totalCount}</span>)
          </span>
          <span className="text-[#E5E2D9]">｜</span>
          <span className="hidden sm:inline-block text-[11px] text-[#9A958E]">全站照服員均通過警察刑事紀錄與單一級證照驗證</span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[#6B665F] hover:text-[#4A6741] font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> 重設條件
        </button>
      </div>

    </div>
  );
};

