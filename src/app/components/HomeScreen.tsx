import { useState } from 'react';
import { Plus, QrCode, BarChart3, MessageCircle, Thermometer, Droplets, AlertCircle, CheckCircle2, Clock, ShoppingBag } from 'lucide-react';
import type { Device, Batch } from '../App';

type HomeScreenProps = {
  onSelectDevice: (device: Device) => void;
  onScanQR: () => void;
  onViewReports: () => void;
  onOpenAIChat: () => void;
  onShop?: () => void;
};

// Mock data
const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Máy ấp #1',
    status: 'active',
    currentBatch: {
      id: 'batch1',
      deviceId: '1',
      eggType: 'Trứng gà',
      totalEggs: 50,
      remainingEggs: 48,
      hatchedEggs: 0,
      damagedEggs: 2,
      startDate: new Date('2026-01-01'),
      estimatedHatchDate: new Date('2026-01-22'),
      currentDay: 7,
      temperature: 37.8,
      humidity: 60,
      targetTemperature: 37.8,
      targetHumidity: 60,
    },
  },
  {
    id: '2',
    name: 'Máy ấp #2',
    status: 'warning',
    currentBatch: {
      id: 'batch2',
      deviceId: '2',
      eggType: 'Trứng vịt',
      totalEggs: 30,
      remainingEggs: 30,
      hatchedEggs: 0,
      damagedEggs: 0,
      startDate: new Date('2026-01-05'),
      estimatedHatchDate: new Date('2026-01-30'),
      currentDay: 3,
      temperature: 37.2,
      humidity: 68,
      targetTemperature: 37.5,
      targetHumidity: 65,
    },
  },
  {
    id: '3',
    name: 'Máy ấp #3',
    status: 'completed',
  },
  {
    id: '4',
    name: 'Máy ấp #4',
    status: 'idle',
  },
];

export default function HomeScreen({ onSelectDevice, onScanQR, onViewReports, onOpenAIChat, onShop }: HomeScreenProps) {
  const [devices] = useState<Device[]>(mockDevices);

  const getStatusInfo = (status: Device['status']) => {
    switch (status) {
      case 'active':
        return { text: 'Đang ấp', color: 'bg-green-100 text-green-700', icon: Clock };
      case 'warning':
        return { text: 'Cảnh báo', color: 'bg-orange-100 text-orange-700', icon: AlertCircle };
      case 'completed':
        return { text: 'Hoàn tất', color: 'bg-blue-100 text-blue-700', icon: CheckCircle2 };
      case 'idle':
        return { text: 'Chưa sử dụng', color: 'bg-slate-100 text-slate-600', icon: Clock };
    }
  };

  const activeDevices = devices.filter(d => d.status === 'active' || d.status === 'warning');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 pt-12 pb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Xin chào! 👋</h1>
            <p className="text-blue-100">Quản lý máy ấp của bạn</p>
          </div>
          <button
            onClick={onOpenAIChat}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <MessageCircle size={24} />
          </button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold mb-1">{devices.length}</div>
            <div className="text-blue-100 text-sm">Tổng máy ấp</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold mb-1">{activeDevices.length}</div>
            <div className="text-blue-100 text-sm">Đang hoạt động</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 py-6 space-y-6">
        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={onScanQR}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <QrCode size={24} className="text-blue-600" />
            </div>
            <span className="font-medium text-sm">Thêm máy</span>
          </button>
          <button
            onClick={onViewReports}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
          >
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart3 size={24} className="text-green-600" />
            </div>
            <span className="font-medium text-sm">Báo cáo</span>
          </button>
          {onShop && (
            <button
              onClick={onShop}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
            >
              <div className="bg-purple-100 p-3 rounded-full">
                <ShoppingBag size={24} className="text-purple-600" />
              </div>
              <span className="font-medium text-sm">Mua sắm</span>
            </button>
          )}
        </div>

        {/* Devices list */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Danh sách máy ấp</h2>
          <div className="space-y-3">
            {devices.map((device) => {
              const statusInfo = getStatusInfo(device.status);
              const StatusIcon = statusInfo.icon;

              return (
                <button
                  key={device.id}
                  onClick={() => onSelectDevice(device)}
                  className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-left mb-1">{device.name}</h3>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon size={12} />
                        {statusInfo.text}
                      </div>
                    </div>
                  </div>

                  {device.currentBatch && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">{device.currentBatch.eggType}</span>
                        <span className="font-medium">Ngày {device.currentBatch.currentDay}/21</span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${(device.currentBatch.currentDay / 21) * 100}%` }}
                        />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="bg-orange-100 p-1.5 rounded">
                            <Thermometer size={14} className="text-orange-600" />
                          </div>
                          <div>
                            <div className="font-semibold">{device.currentBatch.temperature}°C</div>
                            <div className="text-xs text-slate-500">Nhiệt độ</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="bg-blue-100 p-1.5 rounded">
                            <Droplets size={14} className="text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold">{device.currentBatch.humidity}%</div>
                            <div className="text-xs text-slate-500">Độ ẩm</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!device.currentBatch && (
                    <div className="text-center py-2 text-sm text-slate-500">
                      Nhấn để bắt đầu vụ ấp mới
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating add button */}
      <button
        onClick={onScanQR}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}