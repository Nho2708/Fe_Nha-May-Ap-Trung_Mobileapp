import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';

type AIChatScreenProps = {
  onBack: () => void;
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const quickQuestions = [
  'Nhiệt độ hiện tại của máy ấp #1?',
  'Trứng ấp từ ngày nào?',
  'Khi nào trứng sẽ nở?',
  'Tỷ lệ thành công hiện tại?',
];

const aiResponses: Record<string, string> = {
  'nhiệt độ': 'Máy ấp #1 đang duy trì nhiệt độ 37.8°C, đúng với mức cài đặt. Trong 24h qua nhiệt độ dao động từ 37.7-37.9°C, rất ổn định.',
  'ngày': 'Vụ ấp trứng gà tại máy ấp #1 bắt đầu từ ngày 01/01/2026. Hiện tại đã được 7 ngày.',
  'nở': 'Dự kiến trứng sẽ nở vào ngày 22/01/2026. Còn khoảng 14 ngày nữa. Bạn nên chuẩn bị soi trứng lần 2 vào ngày 15/01.',
  'tỷ lệ': 'Hiện tại có 48/50 trứng còn tốt, tỷ lệ thành công là 96%. Đây là con số rất tốt! 2 trứng đã bị loại do vô sinh.',
};

export default function AIChatScreen({ onBack }: AIChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Xin chào! Tôi là AI trợ lý của bạn. Tôi có thể giúp bạn theo dõi tình trạng máy ấp, trả lời câu hỏi về quá trình ấp trứng và đưa ra lời khuyên dựa trên dữ liệu realtime. Bạn cần hỗ trợ gì?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const inputLower = input.toLowerCase();
      let response = 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi về nhiệt độ, độ ẩm, ngày ấp, hoặc tỷ lệ thành công.';

      for (const [key, value] of Object.entries(aiResponses)) {
        if (inputLower.includes(key)) {
          response = value;
          break;
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-lg flex items-center gap-2">
            <Bot size={24} />
            AI Trợ lý
          </h1>
          <p className="text-purple-100 text-sm">Luôn sẵn sàng hỗ trợ bạn</p>
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'
            }`}>
              {message.role === 'user' ? (
                <User size={18} className="text-white" />
              ) : (
                <Bot size={18} className="text-white" />
              )}
            </div>
            <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'flex justify-end' : ''}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-slate-200 text-slate-900'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                }`}>
                  {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-sm text-slate-600 mb-3">Câu hỏi gợi ý:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-left hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-slate-200 px-6 py-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-purple-500 text-white p-3 rounded-xl hover:bg-purple-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            <Send size={24} />
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          AI được huấn luyện dựa trên dữ liệu realtime từ máy ấp của bạn
        </p>
      </div>
    </div>
  );
}
