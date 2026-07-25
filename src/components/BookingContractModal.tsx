import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, FileText, ShieldCheck, CheckCircle2, DollarSign, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Caregiver, Booking, ShiftType } from '../types';
import { SignatureCanvas } from './SignatureCanvas';

interface BookingContractModalProps {
  caregiver: Caregiver;
  onClose: () => void;
  onBookingComplete: (newBooking: Booking) => void;
}

export const BookingContractModal: React.FC<BookingContractModalProps> = ({
  caregiver,
  onClose,
  onBookingComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [seekerName, setSeekerName] = useState('陳宗翰');
  const [seekerPhone, setSeekerPhone] = useState('0988-765-432');
  const [patientName, setPatientName] = useState('陳阿公');
  const [patientAge, setPatientAge] = useState(82);
  const [patientGender, setPatientGender] = useState<'male' | 'female'>('male');
  const [disabilityLevel, setDisabilityLevel] = useState('Level 4 (中度失能)');
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['鼻胃管照護', '失智症陪伴', '翻身拍背']);
  const [serviceAddress, setServiceAddress] = useState(`${caregiver.city}大安區新生南路二段 120 號 5 樓`);
  
  const [shiftType, setShiftType] = useState<ShiftType>('24h');
  const [startDate, setStartDate] = useState('2026-07-28');
  const [endDate, setEndDate] = useState('2026-07-30');
  
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Calculate pricing
  const totalDays = 3; // e.g. July 28 to July 30
  let baseRate = caregiver.dailyRate24h;
  if (shiftType === '12h_day' || shiftType === '12h_night') baseRate = caregiver.dailyRate12h;
  if (shiftType === 'hourly') baseRate = caregiver.hourlyRate * 8; // assuming 8 hours daily

  const subtotal = baseRate * totalDays;
  const platformFee = Math.round(subtotal * 0.08); // 8% escrow fee
  const grandTotal = subtotal;

  const toggleCondition = (cond: string) => {
    setSelectedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  const handleFinishBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const newBooking: Booking = {
        id: `BK-${Date.now().toString().slice(-6)}`,
        caregiverId: caregiver.id,
        caregiverName: caregiver.name,
        caregiverAvatar: caregiver.avatar,
        caregiverPhone: '0912-345-678',
        seekerName,
        seekerPhone,
        patientName,
        patientAge,
        patientGender,
        disabilityLevel,
        selectedConditions,
        serviceAddress,
        shiftType,
        startDate,
        endDate,
        totalDays,
        estimatedHours: shiftType === '24h' ? totalDays * 24 : totalDays * 12,
        totalAmount: grandTotal,
        platformFee,
        escrowStatus: 'escrowed',
        contractSigned: true,
        signatureDataUrl: signatureData || undefined,
        status: 'confirmed',
        createdAt: new Date().toLocaleString('zh-TW', { hour12: false }),
      };

      setIsProcessingPayment(false);
      onBookingComplete(newBooking);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF9F6] rounded-2xl border border-[#E5E2D9] shadow-xl max-w-2xl w-full flex flex-col overflow-hidden animate-in fade-in duration-200">
        
        {/* Modal Top Header */}
        <div className="p-5 bg-white border-b border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#4A6741] text-white rounded-lg">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-[#2C2C2C]">即時預約與標準電子合約</h3>
              <p className="text-xs text-[#9A958E]">步驟 {step} / 4：{step === 1 ? '照顧需求與日期' : step === 2 ? '電子合約審閱' : step === 3 ? '家屬線上簽署' : '金流託管完成'}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full text-[#9A958E] hover:text-[#2C2C2C] hover:bg-[#F1F0EB]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div className="px-6 py-3 bg-[#F1F0EB] border-b border-[#E5E2D9] flex items-center justify-between text-xs font-medium">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#4A6741] font-bold' : 'text-[#9A958E]'}`}>
            <span className="w-5 h-5 rounded-full bg-[#4A6741] text-white flex items-center justify-center text-[10px]">1</span> 需求填寫
          </div>
          <span className="text-[#E5E2D9]">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#4A6741] font-bold' : 'text-[#9A958E]'}`}>
            <span className="w-5 h-5 rounded-full bg-[#4A6741] text-white flex items-center justify-center text-[10px]">2</span> 審閱合約
          </div>
          <span className="text-[#E5E2D9]">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#4A6741] font-bold' : 'text-[#9A958E]'}`}>
            <span className="w-5 h-5 rounded-full bg-[#4A6741] text-white flex items-center justify-center text-[10px]">3</span> 電子簽名
          </div>
          <span className="text-[#E5E2D9]">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-[#4A6741] font-bold' : 'text-[#9A958E]'}`}>
            <span className="w-5 h-5 rounded-full bg-[#4A6741] text-white flex items-center justify-center text-[10px]">4</span> 價金託管
          </div>
        </div>

        {/* Step Contents */}
        <div className="p-6 overflow-y-auto max-h-[65vh] space-y-5 text-sm text-[#2C2C2C]">
          
          {/* STEP 1: PATIENT & SERVICE INFO */}
          {step === 1 && (
            <div className="space-y-4">
              
              {/* Caregiver Summary */}
              <div className="p-3 bg-white rounded-xl border border-[#E5E2D9] flex items-center gap-3">
                <img
                  src={caregiver.avatar}
                  alt={caregiver.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="font-serif font-bold text-[#2C2C2C]">{caregiver.name} 照服員</div>
                  <div className="text-xs text-[#6B665F]">預約班別資費：{shiftType === '24h' ? `NT$ ${caregiver.dailyRate24h} / 全天` : `NT$ ${caregiver.dailyRate12h} / 12h`}</div>
                </div>
              </div>

              {/* Patient Basic Info Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6B665F] mb-1">聯絡家屬姓名</label>
                  <input
                    type="text"
                    value={seekerName}
                    onChange={(e) => setSeekerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B665F] mb-1">聯絡電話</label>
                  <input
                    type="text"
                    value={seekerPhone}
                    onChange={(e) => setSeekerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6B665F] mb-1">被照護者稱呼</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B665F] mb-1">年齡</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B665F] mb-1">失能等級</label>
                  <select
                    value={disabilityLevel}
                    onChange={(e) => setDisabilityLevel(e.target.value)}
                    className="w-full px-2 py-2 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                  >
                    <option value="Level 1-2 (輕度失能)">Level 1-2 (輕度)</option>
                    <option value="Level 3-4 (中度失能)">Level 3-4 (中度)</option>
                    <option value="Level 5-6 (重度失能)">Level 5-6 (重度)</option>
                    <option value="Level 7-8 (極重度失能)">Level 7-8 (極重度)</option>
                  </select>
                </div>
              </div>

              {/* Service Address */}
              <div>
                <label className="block text-xs font-medium text-[#6B665F] mb-1">照顧服務地點（地址）</label>
                <input
                  type="text"
                  value={serviceAddress}
                  onChange={(e) => setServiceAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                />
              </div>

              {/* Shift Type Selection */}
              <div>
                <label className="block text-xs font-medium text-[#6B665F] mb-1">班別選擇</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: '24h', label: '24h 全天駐點' },
                    { id: '12h_day', label: '12h 日班' },
                    { id: '12h_night', label: '12h 夜間陪宿' },
                    { id: 'hourly', label: '按時計費' },
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setShiftType(s.id as ShiftType)}
                      className={`p-2.5 rounded-lg border text-center font-medium transition-all ${
                        shiftType === s.id
                          ? 'bg-[#4A6741] text-white border-[#4A6741]'
                          : 'bg-white text-[#6B665F] border-[#E5E2D9] hover:bg-[#F1F0EB]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6B665F] mb-1">服務開始日期</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B665F] mb-1">預計結束日期</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                  />
                </div>
              </div>

              {/* Special Conditions */}
              <div>
                <label className="block text-xs font-medium text-[#6B665F] mb-1">照護項目註記（可多選）</label>
                <div className="flex flex-wrap gap-1.5">
                  {['鼻胃管照護', '導尿管照護', '翻身拍背', '失智症陪伴', '肢體復健 Assistance', '備餐服務'].map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => toggleCondition(c)}
                      className={`px-2.5 py-1 rounded-md text-xs transition-all ${
                        selectedConditions.includes(c)
                          ? 'bg-[#F1F0EB] text-[#2C2C2C] border border-[#4A6741] font-bold'
                          : 'bg-white text-[#9A958E] border border-[#E5E2D9]'
                      }`}
                    >
                      {selectedConditions.includes(c) ? '✓ ' : ''}{c}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: CONTRACT REVIEW */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 bg-white border border-[#E5E2D9] rounded-xl space-y-3 font-serif">
                <div className="text-center font-bold text-base border-b border-[#E5E2D9] pb-2 text-[#2C2C2C]">
                  中華民國衛生福利部長照服務定型化契約範本
                </div>
                <div className="text-xs text-[#6B665F] space-y-2 leading-relaxed">
                  <p><strong>立合約人：</strong>案家委託人 {seekerName}（以下簡稱甲方）與照顧服務員 {caregiver.name}（以下簡稱乙方）。</p>
                  <p><strong>第一條（服務地點與對象）：</strong>乙方同意於【{serviceAddress}】照顧【{patientName}】。</p>
                  <p><strong>第二條（服務期間與班別）：</strong>自 {startDate} 至 {endDate} 止，計 {totalDays} 天，班別為【{shiftType}】。</p>
                  <p><strong>第三條（金流託管與撥款）：</strong>甲方費用全額交由「CareLink 第三方價金託管專戶」。乙方完成每日服務簽到且無異議後，平台始撥付服務費，保障雙方權益。</p>
                  <p><strong>第四條（緊急處置與換人保障）：</strong>若服勤期間發生不可抗力突發狀況，甲方得向 24H 專人客服申請緊急派員換人或辦理相關保障退還。</p>
                </div>
              </div>

              {/* Price Breakdown Box */}
              <div className="p-4 bg-[#F1F0EB] rounded-xl border border-[#E5E2D9] space-y-2 text-xs">
                <div className="font-serif font-bold text-[#2C2C2C] text-sm flex items-center justify-between">
                  <span>服務費用總額試算</span>
                  <span className="text-[#4A6741] text-lg font-bold">NT$ {grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#6B665F]">
                  <span>小計（每日 NT$ {baseRate} × {totalDays} 天）</span>
                  <span>NT$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#6B665F]">
                  <span>平台金流託管暨履約保證服務費（8%）</span>
                  <span className="text-[#4A6741]">免額外加收 (平台吸收)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DIGITAL SIGNATURE */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-3 bg-green-50 text-green-800 rounded-lg text-xs flex items-center gap-2 border border-green-200">
                <ShieldCheck className="w-5 h-5 text-green-700 shrink-0" />
                <span>
                  根據《電子簽章法》，您在此處之手寫簽名具備完整法律效力，合約生效後將寄送副本至您的電子郵件。
                </span>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-serif font-bold text-[#2C2C2C]">
                  請簽署家屬全名（{seekerName}）：
                </label>
                <SignatureCanvas
                  onSave={(url) => setSignatureData(url)}
                  onClear={() => setSignatureData(null)}
                />
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT ESCROW */}
          {step === 4 && (
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold text-[#2C2C2C]">定型化電子合約簽署完成！</h4>
                <p className="text-xs text-[#6B665F] mt-1">
                  請完成價金託管，款項將保管於第三方履約專戶，服務完成後才撥款。
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E5E2D9] rounded-xl text-left text-xs space-y-2">
                <div className="flex justify-between font-serif font-bold text-sm text-[#2C2C2C] border-b border-[#E5E2D9] pb-2">
                  <span>應付託管總金額：</span>
                  <span className="text-[#4A6741]">NT$ {grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#6B665F]">
                  <span>照服員：</span>
                  <span>{caregiver.name}（從業{caregiver.experienceYears}年）</span>
                </div>
                <div className="flex justify-between text-[#6B665F]">
                  <span>被照護者：</span>
                  <span>{patientName} ({patientAge}歲)</span>
                </div>
                <div className="flex justify-between text-[#6B665F]">
                  <span>服務日期：</span>
                  <span>{startDate} 至 {endDate} ({totalDays}天)</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions Bar */}
        <div className="p-5 bg-white border-t border-[#E5E2D9] flex items-center justify-between">
          {step > 1 && step < 4 && (
            <button
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="px-4 py-2 rounded-lg border border-[#E5E2D9] hover:bg-[#F1F0EB] text-xs font-medium text-[#6B665F] flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> 上一步
            </button>
          )}

          {step === 1 && (
            <div className="text-xs text-[#9A958E]">步驟 1/4</div>
          )}

          {step < 3 && (
            <button
              onClick={() => setStep((prev) => (prev + 1) as any)}
              className="ml-auto px-6 py-2 bg-[#4A6741] hover:opacity-90 text-white text-xs font-medium rounded-lg flex items-center gap-1 transition-all"
            >
              下一步 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={() => setStep(4)}
              disabled={!signatureData}
              className="ml-auto px-6 py-2 bg-[#4A6741] hover:opacity-90 text-white text-xs font-medium rounded-lg flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
            >
              確認簽署並前往託管付款 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 4 && (
            <button
              onClick={handleFinishBooking}
              disabled={isProcessingPayment}
              className="w-full py-2.5 bg-[#4A6741] hover:opacity-90 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              {isProcessingPayment ? (
                '安全託管扣款處理中...'
              ) : (
                <>
                  <DollarSign className="w-4 h-4" /> 確認第三方託管金流，完成預約！
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

