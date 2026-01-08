import { useEffect } from 'react';
import { CheckCircle2, Egg, Calendar, Thermometer, Droplets } from 'lucide-react';

type StartSuccessScreenProps = {
  eggType: string;
  totalEggs: number;
  temperature: number;
  humidity: number;
  days: number;
  onComplete: () => void;
};

export default function StartSuccessScreen({
  eggType,
  totalEggs,
  temperature,
  humidity,
  days,
  onComplete,
}: StartSuccessScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 flex items-center justify-center p-6">
      <div className="text-center text-white max-w-md">
        {/* Success icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce">
          <CheckCircle2 size={60} className="text-white" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-3">Bắt đầu thành công!</h1>
        <p className="text-green-100 text-lg mb-8">
          Máy ấp đã được khởi động và đang ổn định nhiệt độ
        </p>

        {/* Summary */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4 text-left">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Egg size={20} />
            </div>
            <div className="flex-1">
              <div className="text-white/80 text-sm">Loại trứng</div>
              <div className="font-semibold">{eggType}</div>
            </div>
            <div className="text-2xl font-bold">{totalEggs}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Thermometer size={20} />
            </div>
            <div className="flex-1">
              <div className="text-white/80 text-sm">Nhiệt độ mục tiêu</div>
              <div className="font-semibold">{temperature}°C</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Droplets size={20} />
            </div>
            <div className="flex-1">
              <div className="text-white/80 text-sm">Độ ẩm mục tiêu</div>
              <div className="font-semibold">{humidity}%</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Calendar size={20} />
            </div>
            <div className="flex-1">
              <div className="text-white/80 text-sm">Thời gian ấp</div>
              <div className="font-semibold">{days} ngày</div>
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="mt-8">
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-white/80 text-sm mt-3">Đang chuyển đến màn hình theo dõi...</p>
        </div>
      </div>
    </div>
  );
}
