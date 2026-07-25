import React, { useState } from 'react';
import { X, Send, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { ChatMessage, Caregiver } from '../types';

interface ChatDrawerProps {
  caregiver: Caregiver;
  onClose: () => void;
  onOpenBookingModal: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  caregiver,
  onClose,
  onOpenBookingModal,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderRole: 'caregiver',
      senderName: caregiver.name,
      text: `您好！我是${caregiver.name}照服員，很高興為您服務。請詢問任何關於${caregiver.specialties.join('、')}等照護細節！`,
      timestamp: '14:30',
    },
    {
      id: 'm2',
      senderRole: 'seeker',
      senderName: '陳家屬',
      text: '您好，家裡阿公 82 歲有鼻胃管，預計下週二需要 24 小時駐點照顧 3 天，請問時間安排得過來嗎？',
      timestamp: '14:32',
    },
    {
      id: 'm3',
      senderRole: 'caregiver',
      senderName: caregiver.name,
      text: '沒問題的！我過去有多年管路照護與翻身拍背經驗，下週二時間是空檔。您可以隨時點選右上方「線上預約簽約」即可產出定型化電子合約。',
      timestamp: '14:33',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderRole: 'seeker',
      senderName: '陳家屬',
      text,
      timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputMessage('');

    // Simulate Caregiver Response
    setTimeout(() => {
      const caregiverReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        senderRole: 'caregiver',
        senderName: caregiver.name,
        text: '好的！相關情況我都記下了。若有其他照顧特殊飲食或服藥時間需求，也請隨時告訴我喔！',
        timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
      setMessages((prev) => [...prev, caregiverReply]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FAF9F6] w-full max-w-md h-full flex flex-col border-l border-[#E5E2D9] shadow-xl animate-in slide-in-from-right duration-200">
        
        {/* Chat Drawer Header */}
        <div className="p-4 bg-white border-b border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={caregiver.avatar}
              alt={caregiver.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-lg object-cover border border-[#E5E2D9]"
            />
            <div>
              <div className="font-serif font-bold text-sm text-[#2C2C2C]">{caregiver.name} 照服員</div>
              <div className="text-[11px] text-[#4A6741] flex items-center gap-1 font-medium">
                <Lock className="w-3 h-3 text-[#D4A373]" /> 平台隱私對話（保護個人聯絡資訊）
              </div>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full text-[#9A958E] hover:text-[#2C2C2C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="p-3 bg-green-50 border-b border-green-200 text-[11px] text-green-800 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-green-700" /> 洽談滿意可直接建立電子合約
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenBookingModal();
            }}
            className="px-2.5 py-1 bg-[#4A6741] text-white rounded font-medium hover:opacity-90"
          >
            直接預約
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.senderRole === 'seeker' ? 'items-end' : 'items-start'
              }`}
            >
              <span className="text-[10px] text-[#9A958E] mb-0.5">{msg.senderName} • {msg.timestamp}</span>
              <div
                className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
                  msg.senderRole === 'seeker'
                    ? 'bg-[#4A6741] text-white rounded-br-xs'
                    : 'bg-white text-[#2C2C2C] border border-[#E5E2D9] rounded-bl-xs shadow-xs font-sans'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-white border-t border-[#E5E2D9] flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
          {[
            '請問有照顧鼻胃管經驗嗎？',
            '請問全天駐點包含備餐嗎？',
            '請問服勤時間有彈性調整空間嗎？',
          ].map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-[#F1F0EB] border border-[#E5E2D9] rounded-full text-[#6B665F] hover:bg-[#E5E2D9]"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#E5E2D9] flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="輸入隱私對話訊息..."
            className="flex-1 px-3 py-2 bg-[#F1F0EB] border border-[#E5E2D9] rounded-lg text-xs focus:outline-none focus:border-[#4A6741]"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 bg-[#4A6741] hover:opacity-90 text-white rounded-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

