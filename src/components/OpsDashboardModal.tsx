import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, AlertTriangle, RotateCcw, XCircle } from 'lucide-react';
import { Booking } from '../types';

interface OpsDashboardModalProps {
  bookings: Booking[];
  onClose: () => void;
  onCancelBooking?: (bookingId: string, reason: string) => void;
}

const CANCELLATION_REASONS = [
  '案家行程調整 / 已無需照顧服務',
  '已找到其他照顧替代方案',
  '班別時間不符 / 需要更換照服員',
  '下單資料輸入錯誤，欲重新下單',
  '其他個人因素'
];

export const OpsDashboardModal: React.FC<OpsDashboardModalProps> = ({
  bookings,
  onClose,
  onCancelBooking,
}) => {
  const [cancelingBooking, setCancelingBooking] = useState<Booking | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>(CANCELLATION_REASONS[0]);
  const [customReason, setCustomReason] = useState<string>('');
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string | null>(null);

  // Calculate active escrowed amount (excluding cancelled ones)
  const activeBookings = bookings.filter((b) => b.status !== 'cancelled');
  const totalEscrowed = activeBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const cancelledCount = bookings.filter((b) => b.status === 'cancelled').length;

  const handleConfirmCancel = () => {
    if (!cancelingBooking || !onCancelBooking) return;
    const finalReason = selectedReason === '其他個人因素' && customReason.trim()
      ? customReason.trim()
      : selectedReason;

    onCancelBooking(cancelingBooking.id, finalReason);
    setCancelSuccessMsg(`訂單 ${cancelingBooking.id} 已成功解約，託管金額 NT$ ${cancelingBooking.totalAmount.toLocaleString()} 將全額退款。`);
    setCancelingBooking(null);
    setCustomReason('');

    setTimeout(() => {
      setCancelSuccessMsg(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF9F6] rounded-2xl border border-[#E5E2D9] shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-200 relative my-auto">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E5E2D9] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#2C2C2C] text-white rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-[#2C2C2C] text-sm sm:text-base">平台核心營運 ｜ 第三方金流託管與電子合約總覽</h3>
              <p className="text-xs text-[#6B665F]">保障家屬付款與照服員服務完工撥款</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full text-[#9A958E] hover:text-[#2C2C2C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Toast */}
        {cancelSuccessMsg && (
          <div className="mx-4 sm:mx-6 mt-3 p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center gap-2 animate-in fade-in shrink-0">
            <RotateCcw className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{cancelSuccessMsg}</span>
          </div>
        )}

        {/* Overview Stats & List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-[#2C2C2C] flex-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-[#E5E2D9]">
              <div className="text-[#6B665F]">第三方專戶進行中託管總額</div>
              <div className="text-lg sm:text-xl font-serif font-bold text-[#4A6741] mt-1">NT$ {totalEscrowed.toLocaleString()}</div>
            </div>
            <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-[#E5E2D9]">
              <div className="text-[#6B665F]">生效中電子合約</div>
              <div className="text-lg sm:text-xl font-serif font-bold text-[#2C2C2C] mt-1">{activeBookings.length} 份合約</div>
            </div>
            <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-[#E5E2D9]">
              <div className="text-[#6B665F]">已退款/解約訂單</div>
              <div className="text-lg sm:text-xl font-serif font-bold text-[#D4A373] mt-1">{cancelledCount} 筆單</div>
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#2C2C2C]">合約與金流託管紀錄清單</h4>

            {bookings.length === 0 ? (
              <div className="p-6 text-center text-[#9A958E] bg-white rounded-xl border border-[#E5E2D9]">
                尚無合約紀錄，歡迎前往「尋找看護」發起預約。
              </div>
            ) : (
              bookings.map((b) => {
                const isCancelled = b.status === 'cancelled';

                return (
                  <div
                    key={b.id}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isCancelled
                        ? 'bg-[#F7F6F2] border-[#E5E2D9] opacity-80'
                        : 'bg-white border-[#E5E2D9] shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2 gap-2 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#2C2C2C]">{b.id}</span>
                        {isCancelled ? (
                          <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-medium text-[11px] border border-gray-300 flex items-center gap-1">
                            <XCircle className="w-3 h-3 text-gray-500" /> 已取消 (價金已辦理退款)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-green-50 text-green-800 font-medium text-[11px] border border-green-200 flex items-center gap-1">
                            <Lock className="w-3 h-3 text-[#D4A373]" /> 金流價金託管中
                          </span>
                        )}
                      </div>
                      <span className="text-[#9A958E] text-[11px]">{b.createdAt} 成立</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#6B665F] my-2.5">
                      <div>照服員：<strong className="text-[#2C2C2C] font-serif">{b.caregiverName}</strong></div>
                      <div>受照護者：<strong className="text-[#2C2C2C] font-serif">{b.patientName}</strong></div>
                      <div>班別日期：<strong className="text-[#2C2C2C]">{b.startDate} ({b.shiftType})</strong></div>
                      <div>託管金額：<strong className={`${isCancelled ? 'line-through text-gray-400' : 'text-[#4A6741]'} text-xs font-serif`}>NT$ {b.totalAmount.toLocaleString()}</strong></div>
                    </div>

                    {isCancelled ? (
                      <div className="p-2.5 bg-gray-100 rounded-lg text-[11px] text-gray-600 space-y-0.5">
                        <div className="font-medium text-gray-800">解約與全額退款成功</div>
                        <div>解約原因：{b.cancellationReason || '案家行程調整'} ｜ 時間：{b.cancelledAt || b.createdAt}</div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between pt-2 text-[11px] border-t border-[#E5E2D9] gap-2 flex-wrap sm:flex-nowrap">
                        <span className="text-[#4A6741] font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 已完成家屬線上電子簽署合約
                        </span>

                        {onCancelBooking && (
                          <button
                            onClick={() => setCancelingBooking(b)}
                            className="px-3 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 hover:border-rose-300 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            取消訂單與申請退款
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Cancellation Confirmation Modal Overlay (Fixed Standalone Modal) */}
        {cancelingBooking && (
          <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl border border-[#E5E2D9] max-w-md w-full shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-150 my-auto">
              
              {/* Modal Header */}
              <div className="p-4 border-b border-[#E5E2D9] flex items-center justify-between shrink-0 bg-[#FAF9F6]">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
                    <AlertTriangle className="w-5 h-5" />
                  </span>
                  <h4 className="font-serif font-bold text-[#2C2C2C] text-base">確認解約與取消訂單</h4>
                </div>
                <button
                  onClick={() => setCancelingBooking(null)}
                  className="p-1.5 rounded-full text-[#9A958E] hover:text-[#2C2C2C] hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs text-[#6B665F] flex-1">
                <div className="p-3 bg-[#F1F0EB] rounded-xl border border-[#E5E2D9] space-y-1">
                  <div>合約編號：<strong className="text-[#2C2C2C] font-serif">{cancelingBooking.id}</strong></div>
                  <div>預約照服員：<strong className="text-[#2C2C2C]">{cancelingBooking.caregiverName} 照服員</strong></div>
                  <div>服務時間：{cancelingBooking.startDate} 共 {cancelingBooking.totalDays} 天</div>
                  <div>退款總額：<strong className="text-[#4A6741] font-serif text-sm">NT$ {cancelingBooking.totalAmount.toLocaleString()}</strong> (100% 全額退款)</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">請選擇取消訂單原因：</label>
                  <div className="space-y-1.5">
                    {CANCELLATION_REASONS.map((r) => (
                      <label
                        key={r}
                        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                          selectedReason === r
                            ? 'bg-green-50 border-[#4A6741] text-[#4A6741] font-medium'
                            : 'bg-white border-[#E5E2D9] text-[#6B665F] hover:bg-[#F1F0EB]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="cancellationReason"
                          checked={selectedReason === r}
                          onChange={() => setSelectedReason(r)}
                          className="accent-[#4A6741]"
                        />
                        <span className="leading-snug">{r}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {selectedReason === '其他個人因素' && (
                  <div>
                    <input
                      type="text"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      placeholder="請輸入其他取消原因說明..."
                      className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
                    />
                  </div>
                )}

                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-[11px] leading-relaxed">
                  <strong>退款保障說明：</strong>
                  依照衛福部定型化契約規範，服務開照前申請解約，第三方託管專戶將於 1-3 個工作天內辦理全額刷退或匯款，無任何扣款或手續費。
                </div>
              </div>

              {/* Modal Footer (Sticky/Fixed at bottom) */}
              <div className="p-3.5 bg-[#FAF9F6] border-t border-[#E5E2D9] flex items-center justify-end gap-2 shrink-0">
                <button
                  onClick={() => setCancelingBooking(null)}
                  className="px-4 py-2 bg-white hover:bg-[#E5E2D9] text-[#2C2C2C] text-xs font-medium rounded-lg border border-[#E5E2D9] transition-all cursor-pointer"
                >
                  暫不取消
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-serif font-bold rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  確定解約並退款
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};


