import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  DollarSign,
  BookOpen,
  CheckCircle,
  Clock,
  FileUp,
  AlertCircle,
  Plus,
  Check,
  ExternalLink,
  UserCheck,
  ShieldAlert,
  Save,
  Upload,
  FileText,
  User,
  Trash2,
  CheckCircle2,
  Search,
  X,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { Caregiver, Course, Booking, DocumentUploadStatus } from '../types';

interface CaregiverDashboardProps {
  caregiver: Caregiver;
  courses: Course[];
  bookings: Booking[];
  onOpenChat: () => void;
  onOpenSupport: () => void;
  onUpdateCaregiverProfile?: (updatedCaregiver: Caregiver) => void;
}

const CATEGORIZED_SPECIALTIES = [
  {
    category: '管路與醫療護理',
    skills: ['鼻胃管照護', '氣切吸痰', '導尿管照護', '洗腎點滴護理', '傷口清潔換藥', '血糖血壓量測與紀錄']
  },
  {
    category: '日常生活與身體照顧',
    skills: ['翻身拍背', '日常沐浴擦澡', '服藥提醒與紀錄', '關懷備餐與餵食', '移位與防跌保護', '大小便失禁照顧']
  },
  {
    category: '復健活動與陪同',
    skills: ['肢體復健協助', '坐輪椅陪同就醫', '戶外散步運動', '代購生活用品與備藥']
  },
  {
    category: '精神陪伴與特殊照顧',
    skills: ['失智症陪伴', '臨終關懷安寧照護', '語言與認知訓練', '外籍看護溝通指導']
  }
];

const ALL_LANGUAGES_OPTIONS = ['國語', '台語', '客語', '英語', '印尼語', '越南語'];

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'verified' | 'pending';
}

export const CaregiverDashboard: React.FC<CaregiverDashboardProps> = ({
  caregiver,
  courses,
  bookings,
  onOpenChat,
  onOpenSupport,
  onUpdateCaregiverProfile,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'documents' | 'earnings' | 'training' | 'rights'>('schedule');

  // Caregiver Editable Profile Form State
  const [profileForm, setProfileForm] = useState<Caregiver>({ ...caregiver });
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>('照顧服務員單一級技術士證');

  // Skills Modal State
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [skillsSearchTerm, setSkillsSearchTerm] = useState('');

  // Keep profile form updated if caregiver prop changes
  React.useEffect(() => {
    setProfileForm({ ...caregiver });
  }, [caregiver]);

  // Uploaded files mock list
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: 'f1',
      name: '良民證_警察刑事紀錄證明_2026.pdf',
      type: '警察刑事紀錄證明',
      size: '1.2 MB',
      uploadDate: '2026-01-10',
      status: 'verified'
    },
    {
      id: 'f2',
      name: '照顧服務員單一級技術士證照.jpg',
      type: '技術士證照',
      size: '2.4 MB',
      uploadDate: '2025-11-20',
      status: 'verified'
    },
    {
      id: 'f3',
      name: '長照人員服務小卡正反面.png',
      type: '長照服務小卡',
      size: '890 KB',
      uploadDate: '2025-12-05',
      status: 'verified'
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);

  // Document verification status simulation state
  const [docStatus, setDocStatus] = useState<DocumentUploadStatus>({
    idCardVerified: true,
    policeRecordVerified: true, // 良民證
    singleTechLicenseVerified: true, // 單一級技術士證
    healthReportVerified: true, // 體檢報告
    cprCertVerified: true,
    longTermCareCardVerified: true,
  });

  // Calendar toggle simulation
  const [availableDates, setAvailableDates] = useState<string[]>([
    '2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28', '2026-07-29', '2026-07-30'
  ]);

  const toggleDateAvailability = (dateStr: string) => {
    setAvailableDates((prev) =>
      prev.includes(dateStr) ? prev.filter((d) => d !== dateStr) : [...prev, dateStr]
    );
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateCaregiverProfile) {
      onUpdateCaregiverProfile(profileForm);
    }
    setSaveSuccessMsg('個人履歷與服務報價資料已成功儲存！平台已同步更新家屬端搜尋資料。');
    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 4000);
  };

  const handleToggleSpecialty = (skill: string) => {
    setProfileForm((prev) => {
      const currentList = Array.isArray(prev.specialties) ? prev.specialties : [];
      const exists = currentList.includes(skill);
      const newList = exists
        ? currentList.filter((s) => s !== skill)
        : [...currentList, skill];
      return {
        ...prev,
        specialties: newList
      };
    });
  };

  const handleToggleLanguage = (lang: string) => {
    setProfileForm((prev) => {
      const currentList = Array.isArray(prev.languages) ? prev.languages : [];
      const exists = currentList.includes(lang);
      const newList = exists
        ? currentList.filter((l) => l !== lang)
        : [...currentList, lang];
      return {
        ...prev,
        languages: newList
      };
    });
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (!trimmed) return;
    setProfileForm((prev) => {
      const currentList = Array.isArray(prev.specialties) ? prev.specialties : [];
      if (currentList.includes(trimmed)) return prev;
      return {
        ...prev,
        specialties: [...currentList, trimmed]
      };
    });
    setCustomSkillInput('');
  };

  const handleConfirmSkillsModal = () => {
    setIsSkillsModalOpen(false);
    if (onUpdateCaregiverProfile) {
      onUpdateCaregiverProfile(profileForm);
    }
    setSaveSuccessMsg('專業技能項目已成功更新並同步至個人履歷！');
    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 3500);
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const category = selectedDocCategory;
    setIsUploading(true);

    setTimeout(() => {
      const newDoc: UploadedFile = {
        id: `file-${Date.now()}`,
        name: file.name,
        type: category,
        size: file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(0)} KB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setUploadedFiles((prev) => [newDoc, ...prev]);
      setIsUploading(false);
    }, 1000);

    // Reset input value so same file can be re-selected if needed
    e.target.value = '';
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const totalEarnings = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const netEarnings = Math.round(totalEarnings * 0.92); // 92% to caregiver, 8% platform fee

  return (
    <div className="space-y-6">
      
      {/* Caregiver Welcome Banner */}
      <div className="bg-white rounded-2xl border border-[#E5E2D9] p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={caregiver.avatar}
            alt={caregiver.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-lg object-cover border border-[#E5E2D9]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-bold text-[#2C2C2C]">{caregiver.name} 照服員工作主頁</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#4A6741] text-white font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 官方核驗合格
              </span>
            </div>
            <p className="text-xs text-[#6B665F] mt-1">從業年資：{caregiver.experienceYears} 年 ｜ 服務評價：{caregiver.rating} ★</p>
          </div>
        </div>

        {/* Quick Earnings & Status Pill */}
        <div className="flex items-center gap-4 text-xs font-medium bg-[#F1F0EB] p-3 rounded-xl border border-[#E5E2D9]">
          <div>
            <div className="text-[#9A958E]">本月託管入帳</div>
            <div className="text-lg font-serif font-bold text-[#4A6741]">NT$ {netEarnings.toLocaleString()}</div>
          </div>
          <div className="h-8 w-px bg-[#E5E2D9]" />
          <div>
            <div className="text-[#9A958E]">認證憑證標章</div>
            <div className="text-sm font-serif font-bold text-[#2C2C2C]">{caregiver.verifiedBadges.length} 項通過</div>
          </div>
        </div>
      </div>

      {/* Quick Resume Upload Highlight Banner */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-emerald-700 text-white rounded-xl shrink-0">
            <FileText className="w-5 h-5" />
          </span>
          <div>
            <span className="font-serif font-bold text-emerald-900 text-sm">看護個人履歷上傳與服務設定專區</span>
            <p className="text-emerald-800 text-[11px] mt-0.5">您可自由編輯從業背景、照護專長、時薪/日薪報價，並上傳良民證與技術士證照檔案。</p>
          </div>
        </div>
        <button
          onClick={() => setActiveSubTab('documents')}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs rounded-xl transition-all cursor-pointer shrink-0"
        >
          前往編輯履歷與上傳檔案 →
        </button>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E5E2D9] pb-3 text-xs font-medium">
        {[
          { id: 'schedule', label: '📅 排班與接案管理' },
          { id: 'documents', label: '📄 上傳履歷與證照審核' },
          { id: 'earnings', label: '💰 收入明細與撥款紀錄' },
          { id: 'training', label: '🎓 線上進修與長照積分' },
          { id: 'rights', label: '⚖️ 職場權益與申訴管道' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-lg transition-all ${
              activeSubTab === tab.id
                ? 'bg-[#4A6741] text-white font-semibold'
                : 'bg-white text-[#6B665F] hover:text-[#2C2C2C] border border-[#E5E2D9]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUBTAB 1: SCHEDULE & CASES */}
      {activeSubTab === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E2D9] p-6 space-y-4">
            <h3 className="font-serif font-bold text-[#2C2C2C] text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#4A6741]" /> 設定接案空檔日曆
            </h3>
            <p className="text-xs text-[#6B665F]">
              點選日期切換開放/關閉接案。點選開啟後，家屬配對系統會即時顯示您的接案意願。
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
              {['2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28', '2026-07-29', '2026-07-30'].map((dateStr) => {
                const isOpen = availableDates.includes(dateStr);
                return (
                  <button
                    key={dateStr}
                    onClick={() => toggleDateAvailability(dateStr)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      isOpen
                        ? 'bg-green-50 border-[#4A6741] text-[#4A6741] font-bold'
                        : 'bg-white border-[#E5E2D9] text-[#9A958E]'
                    }`}
                  >
                    <div className="text-xs">{dateStr}</div>
                    <div className="text-[11px] mt-1">{isOpen ? '✓ 可接案' : '✕ 休假'}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Job Requests */}
          <div className="bg-white rounded-2xl border border-[#E5E2D9] p-6 space-y-4">
            <h3 className="font-serif font-bold text-[#2C2C2C] text-base flex items-center justify-between">
              <span>收到之案家預約邀請 ({bookings.filter(b => b.status !== 'cancelled').length})</span>
              <span className="text-xs text-[#4A6741] font-sans font-normal">第三方價金已託管保障</span>
            </h3>

            <div className="space-y-3">
              {bookings.length === 0 ? (
                <div className="p-4 bg-[#F1F0EB] text-[#9A958E] rounded-xl text-center text-xs">尚無預約邀請</div>
              ) : (
                bookings.map((b) => {
                  const isCancelled = b.status === 'cancelled';
                  return (
                    <div
                      key={b.id}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isCancelled ? 'bg-[#F7F6F2] border-[#E5E2D9] opacity-75' : 'bg-[#F1F0EB] border-[#E5E2D9]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-[#2C2C2C] text-sm">{b.seekerName} 家屬預約</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-[#4A6741] text-white font-sans">{b.disabilityLevel}</span>
                          {isCancelled && (
                            <span className="text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-medium border border-rose-200">已解約退款</span>
                          )}
                        </div>
                        <div className="text-xs text-[#6B665F] mt-1 space-y-0.5">
                          <div>受照護對象：{b.patientName} ({b.patientAge}歲) ｜ 班別：{b.shiftType}</div>
                          <div>服務地點：{b.serviceAddress}</div>
                          <div>日期：{b.startDate} 至 {b.endDate}（共 {b.totalDays} 天）</div>
                          {isCancelled && b.cancellationReason && (
                            <div className="text-rose-700 font-medium">取消原因：{b.cancellationReason}</div>
                          )}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-2">
                        <div className="text-right">
                          <div className="text-xs text-[#9A958E]">{isCancelled ? '託管金額已退款' : '預計入帳'}</div>
                          <div className={`text-base font-serif font-bold ${isCancelled ? 'line-through text-gray-400' : 'text-[#4A6741]'}`}>
                            NT$ {Math.round(b.totalAmount * 0.92).toLocaleString()}
                          </div>
                        </div>
                        {!isCancelled && (
                          <button
                            onClick={onOpenChat}
                            className="px-3.5 py-1.5 bg-[#4A6741] text-white text-xs font-medium rounded-lg hover:opacity-90 transition-all cursor-pointer"
                          >
                            與家屬線上洽談
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: RESUME & DOCUMENTS EDITING */}
      {activeSubTab === 'documents' && (
        <div className="space-y-6">

          {/* Success Toast Notification */}
          {saveSuccessMsg && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-900 rounded-2xl text-xs flex items-center justify-between animate-in fade-in shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
                <span className="font-medium">{saveSuccessMsg}</span>
              </div>
            </div>
          )}

          {/* SECTION 1: Personal Resume & Service Rates Form */}
          <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-[#E5E2D9] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 gap-2 flex-wrap sm:flex-nowrap">
              <div>
                <h3 className="font-serif font-bold text-[#2C2C2C] text-base flex items-center gap-2">
                  <User className="w-5 h-5 text-[#4A6741]" /> 看護個人履歷與服務報價編輯
                </h3>
                <p className="text-xs text-[#6B665F] mt-0.5">即時更新您的個人背景、服務縣市、照護專長與收費標準，將同步展示於案家搜尋頁面。</p>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#4A6741] hover:opacity-90 text-white text-xs font-serif font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Save className="w-4 h-4" /> 儲存履歷變更
              </button>
            </div>

            {/* Basic Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-[#2C2C2C] font-semibold mb-1">照服員姓名 *</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#4A6741] bg-[#FAF9F6]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#2C2C2C] font-semibold mb-1">從業年資 (年) *</label>
                <input
                  type="number"
                  value={profileForm.experienceYears}
                  onChange={(e) => setProfileForm({ ...profileForm, experienceYears: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#4A6741] bg-[#FAF9F6]"
                  min={0}
                  required
                />
              </div>

              <div>
                <label className="block text-[#2C2C2C] font-semibold mb-1">主要服務縣市 *</label>
                <select
                  value={profileForm.city}
                  onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#4A6741] bg-[#FAF9F6]"
                >
                  {['台北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '台中市', '彰化縣', '台南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-[#2C2C2C] font-semibold mb-1">專業服務副標題 / 個人特點簡介 *</label>
                <input
                  type="text"
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  placeholder="例如：雙北地區 / 專精氣切與失智症復健照護"
                  className="w-full px-3 py-2 border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#4A6741] bg-[#FAF9F6]"
                  required
                />
              </div>
            </div>

            {/* Service Rates Configuration */}
            <div className="p-4 bg-[#F1F0EB] rounded-2xl border border-[#E5E2D9] space-y-3">
              <h4 className="font-serif font-bold text-xs text-[#2C2C2C] flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-[#4A6741]" /> 服務費率與班別計價設定 (NT$)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-[#6B665F] mb-1">每小時單價 (Hourly Rate)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#9A958E]">NT$</span>
                    <input
                      type="number"
                      value={profileForm.hourlyRate}
                      onChange={(e) => setProfileForm({ ...profileForm, hourlyRate: Number(e.target.value) })}
                      className="w-full pl-10 pr-3 py-2 bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#4A6741]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#6B665F] mb-1">12小時班單價 (Half Day Rate)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#9A958E]">NT$</span>
                    <input
                      type="number"
                      value={profileForm.dailyRate12h}
                      onChange={(e) => setProfileForm({ ...profileForm, dailyRate12h: Number(e.target.value) })}
                      className="w-full pl-10 pr-3 py-2 bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#4A6741]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#6B665F] mb-1">24小時全天班單價 (Full Day Rate)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#9A958E]">NT$</span>
                    <input
                      type="number"
                      value={profileForm.dailyRate24h}
                      onChange={(e) => setProfileForm({ ...profileForm, dailyRate24h: Number(e.target.value) })}
                      className="w-full pl-10 pr-3 py-2 bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#4A6741]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Care Specialties checklist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#2C2C2C]">
                  具備之專業照護技能 (多選)：
                  <span className="ml-2 px-2 py-0.5 bg-green-50 text-[#4A6741] rounded-md border border-green-200 text-[11px] font-bold">
                    已選 {(profileForm.specialties || []).length} 項
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsSkillsModalOpen(true)}
                  className="px-3 py-1.5 bg-[#4A6741] hover:opacity-90 text-white font-serif font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" /> 開啟技能選擇介面
                </button>
              </div>

              {/* Selected Skills Chips with quick edit/add button */}
              <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E2D9] flex flex-wrap gap-2 items-center min-h-[50px]">
                {(profileForm.specialties || []).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white text-[#4A6741] border border-[#4A6741]/30 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleSpecialty(skill)}
                      className="text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="移除此技能"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setIsSkillsModalOpen(true)}
                  className="px-3 py-1 bg-[#F1F0EB] hover:bg-[#E5E2D9] text-[#2C2C2C] border border-dashed border-[#9A958E] rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#4A6741]" /> 點擊彈出技能選擇選單介面
                </button>
              </div>
            </div>

            {/* Languages spoken */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#2C2C2C]">溝通語言能力 (多選)：</label>
              <div className="flex flex-wrap gap-2 text-xs">
                {ALL_LANGUAGES_OPTIONS.map((lang) => {
                  const isChecked = profileForm.languages.includes(lang);
                  return (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => handleToggleLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#4A6741] text-white border-[#4A6741]'
                          : 'bg-[#FAF9F6] border-[#E5E2D9] text-[#6B665F]'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bio and Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#2C2C2C] font-semibold mb-1">個人經歷與背景介紹</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full p-3 border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#4A6741] bg-[#FAF9F6] resize-none"
                  placeholder="請簡述您的醫院實習、機構經歷或居家護理年資..."
                />
              </div>

              <div>
                <label className="block text-[#2C2C2C] font-semibold mb-1">照護理念與給家屬的承諾</label>
                <textarea
                  rows={3}
                  value={profileForm.philosophy}
                  onChange={(e) => setProfileForm({ ...profileForm, philosophy: e.target.value })}
                  className="w-full p-3 border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#4A6741] bg-[#FAF9F6] resize-none"
                  placeholder="例如：「視病如親，用心陪伴長者尊嚴生活。」"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#E5E2D9]">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#4A6741] hover:opacity-90 text-white text-xs font-serif font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> 儲存履歷變更
              </button>
            </div>
          </form>


          {/* SECTION 2: Certificate & Document Upload */}
          <div className="bg-white rounded-2xl border border-[#E5E2D9] p-6 space-y-5">
            <div>
              <h3 className="font-serif font-bold text-[#2C2C2C] text-base flex items-center gap-2">
                <FileUp className="w-5 h-5 text-[#4A6741]" /> 證照、良民證與履歷附件上傳專區
              </h3>
              <p className="text-xs text-[#6B665F] mt-0.5">
                上傳良民證、照顧服務員單一級證書或體檢報告圖檔。審核通過後檔案將附帶官方徽章，大幅提升接案成功率。
              </p>
            </div>

            {/* Category Selector for File Upload */}
            <div className="space-y-1.5 text-xs">
              <label className="block text-[#2C2C2C] font-semibold">選擇欲上傳的文件類型：</label>
              <select
                value={selectedDocCategory}
                onChange={(e) => setSelectedDocCategory(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-[#2C2C2C] focus:outline-none focus:border-[#4A6741]"
              >
                <option value="照顧服務員單一級技術士證">照顧服務員單一級技術士證照</option>
                <option value="警察刑事紀錄證明">良民證（警察刑事紀錄證明）</option>
                <option value="長照服務人員證明卡">長照服務人員證明卡（小卡）</option>
                <option value="醫院體檢報告">醫院健康檢查報告 (胸部X光/B肝等)</option>
                <option value="急救證照">CPR / AED 急救加護專長證照</option>
                <option value="個人履歷與經歷證明">個人履歷表與護理經歷證明文件</option>
                <option value="其他專業訓練證明">其他衛福部/機構專業訓練證明</option>
              </select>
            </div>

            {/* File Drop / Selector Area */}
            <div className="p-6 bg-[#FAF9F6] border-2 border-dashed border-[#E5E2D9] hover:border-[#4A6741] rounded-2xl text-center transition-all relative">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleSimulatedFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-green-50 text-[#4A6741] flex items-center justify-center border border-green-200">
                  {isUploading ? <Clock className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
                </div>
                <div>
                  <p className="font-serif font-bold text-xs text-[#2C2C2C]">
                    {isUploading ? '檔案上傳與加密驗證中...' : `點擊或將「${selectedDocCategory}」檔案拖曳至此處上傳`}
                  </p>
                  <p className="text-[11px] text-[#9A958E] mt-0.5">支援格式：JPG, PNG, PDF ｜ 檔案大小限制 10MB 以內</p>
                </div>
              </div>
            </div>

            {/* Uploaded Document List */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-xs text-[#2C2C2C]">已上傳之證照與履歷文件紀錄 ({uploadedFiles.length})</h4>

              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="p-3.5 bg-[#F1F0EB] rounded-xl border border-[#E5E2D9] flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-white rounded-lg border border-[#E5E2D9] shrink-0 text-[#4A6741]">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-serif font-bold text-[#2C2C2C] truncate">{file.name}</div>
                        <div className="text-[11px] text-[#6B665F] flex items-center gap-2 mt-0.5">
                          <span>{file.type}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.uploadDate} 上傳</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {file.status === 'verified' ? (
                        <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full font-bold text-[11px] flex items-center gap-1 border border-green-200">
                          <Check className="w-3 h-3" /> 已審核核驗
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full font-medium text-[11px] flex items-center gap-1 border border-amber-200">
                          <Clock className="w-3 h-3" /> 審核中
                        </span>
                      )}

                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        title="刪除檔案"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Items Status */}
            <div className="pt-2 border-t border-[#E5E2D9]">
              <h4 className="font-serif font-bold text-xs text-[#2C2C2C] mb-3">官方核驗項目一覽表</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { name: '良民證（警察刑事紀錄證明）', desc: '近3個月內核發無刑事紀錄證明' },
                  { name: '照顧服務員單一級技術士證', desc: '勞動部發給之單一級職業證書' },
                  { name: '健康檢查報告（胸部X光/B肝）', desc: '近一年內醫院開立體檢合格單' },
                  { name: 'CPR / AED急救專業證照', desc: '急救加護醫學會或紅十字會認證' },
                ].map((doc) => (
                  <div key={doc.name} className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E2D9] flex items-center justify-between">
                    <div>
                      <div className="font-serif font-bold text-[#2C2C2C]">{doc.name}</div>
                      <div className="text-[#6B665F] text-[11px] mt-0.5">{doc.desc}</div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-green-50 text-green-700 rounded-full font-bold text-[11px] flex items-center gap-1 border border-green-200">
                      <Check className="w-3.5 h-3.5" /> 驗證合格
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUBTAB 3: EARNINGS */}
      {activeSubTab === 'earnings' && (
        <div className="bg-white rounded-2xl border border-[#E5E2D9] p-6 space-y-5">
          <h3 className="font-serif font-bold text-[#2C2C2C] text-base">本月預計進帳與平台服務費明細</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F1F0EB] rounded-xl border border-[#E5E2D9]">
              <div className="text-xs text-[#9A958E]">服務總累積案計</div>
              <div className="text-xl font-serif font-bold text-[#2C2C2C] mt-1">NT$ {totalEarnings.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-[#F1F0EB] rounded-xl border border-[#E5E2D9]">
              <div className="text-xs text-[#9A958E]">平台託管保險及手續費 (8%)</div>
              <div className="text-xl font-serif font-bold text-[#D4A373] mt-1">- NT$ {(totalEarnings - netEarnings).toLocaleString()}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="text-xs text-green-800">實撥撥款帳戶金額</div>
              <div className="text-xl font-serif font-bold text-green-800 mt-1">NT$ {netEarnings.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: TRAINING */}
      {activeSubTab === 'training' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E5E2D9] p-6 space-y-4">
            <div>
              <h3 className="font-serif font-bold text-[#2C2C2C] text-base">長照照服員線上進修與繼續教育積分</h3>
              <p className="text-xs text-[#6B665F] mt-0.5">完成訓練可獲得官方採計之長照積分，展現持續學習熱誠。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="p-4 bg-[#F1F0EB] rounded-xl border border-[#E5E2D9] space-y-3">
                  <div className="flex gap-3">
                    <img src={course.coverImage} alt={course.title} referrerPolicy="no-referrer" className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5E2D9] text-[#4A6741] font-medium">{course.category}</span>
                      <h4 className="font-serif font-bold text-[#2C2C2C] text-xs mt-1">{course.title}</h4>
                      <p className="text-[11px] text-[#6B665F] mt-0.5">講師：{course.instructor}（{course.hours} 小時積分）</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#6B665F] leading-relaxed font-sans">{course.description}</p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E5E2D9]">
                    <span className="font-serif font-bold text-[#4A6741]">{course.isFree ? '免費參訓' : `NT$ ${course.price}`}</span>
                    <button className="px-3 py-1 bg-[#4A6741] text-white text-xs rounded-lg hover:opacity-90">
                      {course.enrolled ? '已報名 (進入研習)' : '獨立報名'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: RIGHTS */}
      {activeSubTab === 'rights' && (
        <div className="bg-white rounded-2xl border border-[#E5E2D9] p-6 space-y-4 text-xs text-[#6B665F]">
          <h3 className="font-serif font-bold text-[#2C2C2C] text-base flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#D4A373]" /> 照服員職場安全與申訴管道
          </h3>
          <p className="leading-relaxed">
            CareLink 平台極度重視照服員的身體健康與人格尊嚴。若您在服勤期間遇到性騷擾、言語霸凌、超越合約範圍之繁重家務要求，或任何安全威脅：
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#2C2C2C]">
            <li>得依《職業安全衛生法》與定型化合約條款，立即暫停照顧服務並拍照記錄存證。</li>
            <li>點擊下方申訴專線，專員將於 15 分鐘內與您聯繫並協調派員接替。</li>
            <li>平台金流將依法扣留，確保照服員勞務費用不被惡意扣款。</li>
          </ul>

          <button
            onClick={onOpenSupport}
            className="mt-3 px-5 py-2.5 bg-[#D4A373] hover:opacity-90 text-white font-serif font-bold rounded-lg flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" /> 啟動專屬權益申訴專線
          </button>
        </div>
      )}

      {/* Skills Selection Popup Modal Interface */}
      {isSkillsModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-[#E5E2D9] max-w-2xl w-full shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-150 my-auto">
            {/* Modal Header */}
            <div className="p-4 bg-[#FAF9F6] border-b border-[#E5E2D9] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-[#4A6741] text-white rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-serif font-bold text-[#2C2C2C] text-sm sm:text-base">選擇具備之專業照護技能 (多選介面)</h3>
                  <p className="text-xs text-[#6B665F]">勾選您的醫護管路、身障照顧或復健陪伴技能，勾選項目將標示於您的履歷中</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSkillsModalOpen(false)}
                className="p-1.5 rounded-full text-[#9A958E] hover:text-[#2C2C2C] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Custom Input Bar */}
            <div className="p-4 border-b border-[#E5E2D9] space-y-3 bg-white shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#9A958E]" />
                <input
                  type="text"
                  value={skillsSearchTerm}
                  onChange={(e) => setSkillsSearchTerm(e.target.value)}
                  placeholder="搜尋技能名稱 (例如：氣切、鼻胃管、失智...)"
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs focus:outline-none focus:border-[#4A6741]"
                />
              </div>

              {/* Custom Skill Addition Form */}
              <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  placeholder="自訂新增未在列表中的特殊技能名稱..."
                  className="flex-1 px-3 py-1.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl text-xs focus:outline-none focus:border-[#4A6741]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#2C2C2C] hover:bg-black text-white text-xs font-medium rounded-xl transition-all flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" /> 新增自訂技能
                </button>
              </form>
            </div>

            {/* Categorized Skills Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-5 text-xs flex-1">
              {CATEGORIZED_SPECIALTIES.map((catGroup) => {
                const filteredSkills = catGroup.skills.filter((s) =>
                  s.toLowerCase().includes(skillsSearchTerm.toLowerCase())
                );
                if (filteredSkills.length === 0) return null;

                return (
                  <div key={catGroup.category} className="space-y-2">
                    <h4 className="font-serif font-bold text-[#2C2C2C] flex items-center gap-1.5 text-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4A6741]"></span>
                      {catGroup.category}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {filteredSkills.map((skill) => {
                        const isChecked = (profileForm.specialties || []).includes(skill);
                        return (
                          <button
                            type="button"
                            key={skill}
                            onClick={() => handleToggleSpecialty(skill)}
                            className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-green-50 border-[#4A6741] text-[#4A6741] font-medium shadow-xs'
                                : 'bg-[#FAF9F6] border-[#E5E2D9] text-[#6B665F] hover:bg-gray-100'
                            }`}
                          >
                            <span>{skill}</span>
                            {isChecked && <Check className="w-4 h-4 text-[#4A6741]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Currently Selected Summary */}
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl space-y-1.5">
                <div className="font-serif font-bold text-[#4A6741] flex items-center justify-between">
                  <span>已選擇的專業技能 ({(profileForm.specialties || []).length} 項)：</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(profileForm.specialties || []).map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-white text-[#4A6741] border border-green-300 rounded-lg text-[11px] font-medium flex items-center gap-1">
                      {s}
                      <button
                        type="button"
                        onClick={() => handleToggleSpecialty(s)}
                        className="hover:text-rose-600 cursor-pointer ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {(profileForm.specialties || []).length === 0 && (
                    <span className="text-[#9A958E] text-[11px]">尚未選擇任何技能，請點選上方項目</span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-[#FAF9F6] border-t border-[#E5E2D9] flex items-center justify-between gap-2 shrink-0">
              <span className="text-xs text-[#6B665F]">已選擇 <strong className="text-[#4A6741]">{(profileForm.specialties || []).length}</strong> 項照護專業專長</span>
              <button
                type="button"
                onClick={handleConfirmSkillsModal}
                className="px-5 py-2 bg-[#4A6741] hover:opacity-90 text-white text-xs font-serif font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" /> 完成選擇並帶入履歷
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

