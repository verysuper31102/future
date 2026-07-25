import React, { useState } from 'react';
import { X, PhoneCall, ShieldAlert, Clock, CheckCircle2, MessageCircle, AlertTriangle } from 'lucide-react';

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const [complaintType, setComplaintType] = useState('emergency_replacement');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF9F6] rounded-2xl border border-[#E5E2D9] shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in duration-200">
        
        {/* Top Header */}
        <div className="p-5 bg-white border-b border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#F1F0EB] text-[#D4A373] rounded-lg border border-[#E5E2D9]">
              <PhoneCall className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-[#2C2C2C]">24H 專屬客服與緊急調派應變中心</h3>
              <p className="text-xs text-[#6B665F]">保障照護安全 ｜ 突發狀況專員 15 分鐘即時接辦</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full text-[#9A958E] hover:text-[#2C2C2C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-[#2C2C2C]">
          
          {/* Emergency Hotline Box */}
          <div className="p-4 bg-white rounded-xl border border-[#E5E2D9] flex items-center justify-between">
            <div>
              <div className="text-[#6B665F]">免付費緊急通話專線</div>
              <div className="text-xl font-serif font-bold text-[#4A6741] mt-0.5">0800-885-995</div>
              <div className="text-[11px] text-[#9A958E]">（24小時全年無休專人服務）</div>
            </div>
            <a
              href="tel:0800885995"
              className="px-4 py-2.5 bg-[#4A6741] text-white font-medium rounded-lg hover:opacity-90"
            >
              撥打電話
            </a>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="font-serif font-bold text-sm text-[#2C2C2C]">線上回報照顧爭議與臨時換人申訴</div>

              <div>
                <label className="block text-xs font-medium text-[#6B665F] mb-1">申訴或處置類型</label>
                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                >
                  <option value="emergency_replacement">🚨 服勤中突發不適 / 申請緊急調派換人</option>
                  <option value="dispute">⚠️ 服勤細節或合約認知糾紛</option>
                  <option value="cancel">📄 預約變更與退費諮詢</option>
                  <option value="safety">🛡️ 職場安全或申訴反應</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6B665F] mb-1">狀況說明與需求詳細備註</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="請簡述目前遇到的困難或緊急狀況..."
                  className="w-full p-3 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D4A373] hover:opacity-90 text-white font-serif font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" /> 送出緊急需求單
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-serif font-bold text-[#2C2C2C]">需求單已成功送達平台應變小組</h4>
              <p className="text-xs text-[#6B665F] max-w-xs mx-auto">
                我們的專屬長照專員將於 15 分鐘內與您以電話及即時通訊聯繫，確保受照護者安全與服務無縫接軌。
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#4A6741] text-white font-medium rounded-lg text-xs"
              >
                回到主頁面
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

