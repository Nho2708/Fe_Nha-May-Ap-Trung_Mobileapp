import { useState } from 'react';
import { ArrowLeft, Camera, Egg, ChevronRight, Scale, Grid3x3 } from 'lucide-react';
import type { Device } from '../App';

type CreateBatchScreenProps = {
  device: Device | null;
  onBack: () => void;
  onComplete: () => void;
  setNewBatchData: (data: {
    eggType: string;
    totalEggs: number;
    temperature: number;
    humidity: number;
    days: number;
  }) => void;
};

type Step = 'weight' | 'arrange' | 'photo' | 'count' | 'type' | 'settings' | 'confirm';

const eggTypes = [
  { id: 'chicken', name: 'Trứng gà', temp: 37.8, humidity: 60, days: 21 },
  { id: 'duck', name: 'Trứng vịt', temp: 37.5, humidity: 65, days: 28 },
  { id: 'quail', name: 'Trứng cút', temp: 37.7, humidity: 60, days: 17 },
  { id: 'goose', name: 'Trứng ngỗng', temp: 37.5, humidity: 65, days: 30 },
];

export default function CreateBatchScreen({ device, onBack, onComplete, setNewBatchData }: CreateBatchScreenProps) {
  const [step, setStep] = useState<Step>('weight');
  const [weight, setWeight] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [eggCount, setEggCount] = useState(0);
  const [selectedType, setSelectedType] = useState<typeof eggTypes[0] | null>(null);
  const [customTemp, setCustomTemp] = useState('');
  const [customHumidity, setCustomHumidity] = useState('');

  const handlePhotoTaken = () => {
    setPhotoTaken(true);
    // Simulate AI counting
    setTimeout(() => {
      const count = Math.floor(Math.random() * 20) + 40; // Random 40-60
      setEggCount(count);
      setStep('count');
    }, 2000);
  };

  const handleStartIncubation = () => {
    // In real app, would send data to backend/device
    onComplete();
    if (selectedType) {
      setNewBatchData({
        eggType: selectedType.name,
        totalEggs: eggCount,
        temperature: parseFloat(customTemp),
        humidity: parseFloat(customHumidity),
        days: selectedType.days,
      });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'weight':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale size={40} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Cân khối lượng trứng</h2>
              <p className="text-slate-600">Nhập tổng khối lượng trứng để theo dõi</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Khối lượng (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ví dụ: 3.5"
                step="0.1"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Mẹo:</strong> Cân trứng giúp bạn theo dõi độ mất nước trong quá trình ấp
              </p>
            </div>

            <button
              onClick={() => setStep('arrange')}
              disabled={!weight}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Tiếp tục
              <ChevronRight size={20} />
            </button>
          </div>
        );

      case 'arrange':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Grid3x3 size={40} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Xếp trứng vào vỉ</h2>
              <p className="text-slate-600">Sắp xếp trứng đều trên vỉ ấp</p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
              <p className="text-sm text-orange-900 font-medium">Lưu ý khi xếp trứng:</p>
              <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
                <li>Đầu tù hướng lên, đầu nhọn hướng xuống</li>
                <li>Xếp đều, không chồng lên nhau</li>
                <li>Để khoảng cách giữa các quả</li>
                <li>Loại bỏ trứng có vết nứt, bẩn</li>
              </ul>
            </div>

            <div className="text-center py-8">
              <div className="text-6xl mb-4">🥚</div>
              <p className="text-slate-500">Sắp xếp xong, chuyển sang bước tiếp theo</p>
            </div>

            <button
              onClick={() => setStep('photo')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Đã xếp xong
              <ChevronRight size={20} />
            </button>
          </div>
        );

      case 'photo':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={40} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Chụp ảnh trứng</h2>
              <p className="text-slate-600">AI sẽ tự động đếm số lượng trứng</p>
            </div>

            {/* Camera preview */}
            <div className="aspect-square bg-slate-900 rounded-xl overflow-hidden relative">
              {!photoTaken ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera size={64} className="text-white/40" />
                  <div className="absolute inset-4 border-2 border-white/40 border-dashed rounded-lg"></div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                  <div className="text-white flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white mb-3"></div>
                    <p>AI đang đếm trứng...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Mẹo:</strong> Chụp từ trên xuống, đảm bảo đủ ánh sáng và tất cả trứng đều nằm trong khung hình
              </p>
            </div>

            <button
              onClick={handlePhotoTaken}
              disabled={photoTaken}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {photoTaken ? 'Đang xử lý...' : 'Chụp ảnh'}
            </button>
          </div>
        );

      case 'count':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Egg size={40} className="text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Xác nhận số lượng</h2>
              <p className="text-slate-600">AI đã phát hiện số trứng</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white text-center">
              <div className="text-6xl font-bold mb-2">{eggCount}</div>
              <div className="text-blue-100">quả trứng</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Điều chỉnh số lượng (nếu cần)
              </label>
              <input
                type="number"
                value={eggCount}
                onChange={(e) => setEggCount(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900">
                ✓ AI đã phân tích ảnh bằng công nghệ YOLO
              </p>
            </div>

            <button
              onClick={() => setStep('type')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Xác nhận
              <ChevronRight size={20} />
            </button>
          </div>
        );

      case 'type':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">Chọn loại trứng</h2>
              <p className="text-slate-600">Hệ thống sẽ tự động cài đặt thông số tối ưu</p>
            </div>

            <div className="space-y-3">
              {eggTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type);
                    setCustomTemp(type.temp.toString());
                    setCustomHumidity(type.humidity.toString());
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedType?.id === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="font-semibold mb-1">{type.name}</div>
                      <div className="text-sm text-slate-600">
                        {type.temp}°C • {type.humidity}% • {type.days} ngày
                      </div>
                    </div>
                    {selectedType?.id === type.id && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('settings')}
              disabled={!selectedType}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Tiếp tục
              <ChevronRight size={20} />
            </button>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">Cài đặt thông số</h2>
              <p className="text-slate-600">Điều chỉnh nếu cần thiết</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="font-medium text-blue-900 mb-1">
                Loại trứng: {selectedType?.name}
              </div>
              <div className="text-sm text-blue-800">
                Thời gian ấp dự kiến: {selectedType?.days} ngày
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nhiệt độ (°C)
                </label>
                <input
                  type="number"
                  value={customTemp}
                  onChange={(e) => setCustomTemp(e.target.value)}
                  step="0.1"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Độ ẩm (%)
                </label>
                <input
                  type="number"
                  value={customHumidity}
                  onChange={(e) => setCustomHumidity(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-900">
                <strong>Lưu ý:</strong> Thông số này được đề xuất dựa trên kinh nghiệm. Chỉ điều chỉnh nếu bạn có kinh nghiệm.
              </p>
            </div>

            <button
              onClick={() => setStep('confirm')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Tiếp tục
              <ChevronRight size={20} />
            </button>
          </div>
        );

      case 'confirm':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">Xác nhận thông tin</h2>
              <p className="text-slate-600">Kiểm tra lại trước khi bắt đầu</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Máy ấp</span>
                <span className="font-semibold">{device?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Loại trứng</span>
                <span className="font-semibold">{selectedType?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Số lượng</span>
                <span className="font-semibold">{eggCount} quả</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Khối lượng</span>
                <span className="font-semibold">{weight} kg</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Nhiệt độ</span>
                <span className="font-semibold">{customTemp}°C</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Độ ẩm</span>
                <span className="font-semibold">{customHumidity}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Thời gian ấp</span>
                <span className="font-semibold">{selectedType?.days} ngày</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-900 font-medium mb-1">Sẵn sàng bắt đầu!</p>
              <p className="text-sm text-green-800">
                Dự kiến nở: {new Date(Date.now() + (selectedType?.days || 21) * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}
              </p>
            </div>

            <button
              onClick={handleStartIncubation}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Bắt đầu ấp trứng
            </button>
          </div>
        );
    }
  };

  const steps: Step[] = ['weight', 'arrange', 'photo', 'count', 'type', 'settings', 'confirm'];
  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Tạo vụ ấp mới</h1>
            <p className="text-sm text-slate-600">{device?.name}</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
}