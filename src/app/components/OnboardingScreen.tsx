import { useState } from 'react';
import { Egg, Thermometer, Bell, BarChart3, ChevronRight } from 'lucide-react';

type OnboardingScreenProps = {
  onComplete: () => void;
};

const slides = [
  {
    icon: Egg,
    title: 'Quản lý máy ấp thông minh',
    description: 'Theo dõi và điều khiển nhiều máy ấp trứng từ một ứng dụng duy nhất',
    color: 'text-blue-500',
  },
  {
    icon: Thermometer,
    title: 'Giám sát realtime',
    description: 'Nhận thông tin nhiệt độ, độ ẩm và trạng thái máy mọi lúc mọi nơi',
    color: 'text-orange-500',
  },
  {
    icon: Bell,
    title: 'Cảnh báo thông minh',
    description: 'AI phân tích và cảnh báo khi có bất thường, giúp xử lý kịp thời',
    color: 'text-red-500',
  },
  {
    icon: BarChart3,
    title: 'Báo cáo chi tiết',
    description: 'Thống kê tỷ lệ nở, theo dõi hiệu suất và tối ưu quy trình ấp',
    color: 'text-green-500',
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-between p-6 text-white">
      {/* Skip button */}
      <div className="w-full flex justify-end">
        <button
          onClick={onComplete}
          className="text-white/80 hover:text-white text-sm"
        >
          Bỏ qua
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm">
        <div className={`${slide.color} bg-white/10 backdrop-blur-sm rounded-full p-8 mb-8`}>
          <Icon size={80} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-4">{slide.title}</h1>
        <p className="text-white/90 text-lg leading-relaxed">{slide.description}</p>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-sm space-y-4">
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full bg-white text-blue-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
        >
          {currentSlide < slides.length - 1 ? 'Tiếp tục' : 'Bắt đầu'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
