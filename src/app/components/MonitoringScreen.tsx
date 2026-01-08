import { useState, useEffect } from 'react';
import { ArrowLeft, Thermometer, Droplets, Wind, Zap, AlertCircle, TrendingUp, Calendar, CheckCircle2, Eye, Settings, Plus, Minus, RotateCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Batch } from '../App';

type MonitoringScreenProps = {
  batch: Batch | null;
  onBack: () => void;
  onUpdateBatch: () => void;
};

export default function MonitoringScreen({ batch, onBack, onUpdateBatch }: MonitoringScreenProps) {
  const [tempData, setTempData] = useState<Array<{ time: string; temp: number; humidity: number }>>([
    { time: '00:00', temp: 37.8, humidity: 60 },
    { time: '04:00', temp: 37.7, humidity: 61 },
    { time: '08:00', temp: 37.9, humidity: 59 },
    { time: '12:00', temp: 37.8, humidity: 60 },
    { time: '16:00', temp: 37.7, humidity: 62 },
    { time: '20:00', temp: 37.8, humidity: 60 },
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [targetTemp, setTargetTemp] = useState(batch?.targetTemperature || 37.8);
  const [targetHumidity, setTargetHumidity] = useState(batch?.targetHumidity || 60);
  const [fanSpeed, setFanSpeed] = useState(75); // 0-100%
  const [turningInterval, setTurningInterval] = useState(4); // hours
  const [turningEnabled, setTurningEnabled] = useState(batch ? batch.currentDay < 18 : true);

  // Simulate realtime updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      const newTemp = 37.8 + (Math.random() - 0.5) * 0.4;
      const newHumidity = 60 + (Math.random() - 0.5) * 4;
      
      setTempData(prev => {
        const updated = [...prev.slice(-5), { time, temp: parseFloat(newTemp.toFixed(1)), humidity: parseFloat(newHumidity.toFixed(0)) }];
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!batch) return null;

  const daysLeft = 21 - batch.currentDay;
  const progress = (batch.currentDay / 21) * 100;
  const successRate = ((batch.remainingEggs / batch.totalEggs) * 100).toFixed(1);

  const timeline = [
    { day: 1, title: 'Bắt đầu ấp', description: 'Trứng được đưa vào máy', completed: true },
    { day: 7, title: 'Soi trứng lần 1', description: 'Loại bỏ trứng vô sinh', completed: batch.currentDay >= 7 },
    { day: 14, title: 'Soi trứng lần 2', description: 'Kiểm tra phôi phát triển', completed: batch.currentDay >= 14 },
    { day: 18, title: 'Ngừng xoay', description: 'Chuẩn bị cho giai đoạn nở', completed: batch.currentDay >= 18 },
    { day: 21, title: 'Nở', description: 'Gà con chào đời', completed: batch.currentDay >= 21 },
  ];

  const aiAlerts = [
    {
      type: 'info',
      message: 'Nhiệt độ ổn định trong 24h qua',
      time: '2 giờ trước',
    },
    {
      type: 'success',
      message: 'Độ ẩm đạt mức tối ưu',
      time: '5 giờ trước',
    },
  ];

  const latestTemp = tempData[tempData.length - 1];
  const tempDiff = latestTemp.temp - targetTemp;
  const humidityDiff = latestTemp.humidity - targetHumidity;

  const handleSaveSettings = () => {
    // In real app, would send to device
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">{batch.eggType}</h1>
            <p className="text-blue-100 text-sm">Ngày {batch.currentDay}/21 • {daysLeft} ngày nữa</p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Settings size={24} />
          </button>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Tiến độ ấp</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold mb-1">{batch.remainingEggs}</div>
            <div className="text-xs text-blue-100">Còn lại</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold mb-1">{batch.hatchedEggs}</div>
            <div className="text-xs text-blue-100">Đã nở</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold mb-1">{successRate}%</div>
            <div className="text-xs text-blue-100">Thành công</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Realtime sensors */}
        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Theo dõi realtime
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Thermometer size={20} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500">Nhiệt độ</div>
                  <div className="font-semibold text-lg">{latestTemp.temp}°C</div>
                </div>
              </div>
              <div className={`text-xs flex items-center gap-1 ${tempDiff > 0.5 ? 'text-red-600' : tempDiff < -0.5 ? 'text-blue-600' : 'text-green-600'}`}>
                <TrendingUp size={12} />
                {tempDiff > 0 ? '+' : ''}{tempDiff.toFixed(1)}°C so với mục tiêu
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Droplets size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500">Độ ẩm</div>
                  <div className="font-semibold text-lg">{latestTemp.humidity}%</div>
                </div>
              </div>
              <div className={`text-xs flex items-center gap-1 ${Math.abs(humidityDiff) > 3 ? 'text-orange-600' : 'text-green-600'}`}>
                <TrendingUp size={12} />
                {humidityDiff > 0 ? '+' : ''}{humidityDiff}% so với mục tiêu
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Wind size={20} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500">Quạt</div>
                  <div className="font-semibold">Hoạt động</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Zap size={20} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500">Sưởi</div>
                  <div className="font-semibold">Tắt</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature chart */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold mb-4">Biểu đồ nhiệt độ & độ ẩm</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={tempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} name="Nhiệt độ (°C)" />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Độ ẩm (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Alerts */}
        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle size={20} className="text-blue-600" />
            Cảnh báo & Gợi ý AI
          </h2>
          <div className="space-y-2">
            {aiAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${
                  alert.type === 'info'
                    ? 'bg-blue-50 border-blue-200'
                    : alert.type === 'success'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-orange-50 border-orange-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${
                    alert.type === 'info'
                      ? 'text-blue-600'
                      : alert.type === 'success'
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}>
                    {alert.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      alert.type === 'info'
                        ? 'text-blue-900'
                        : alert.type === 'success'
                        ? 'text-green-900'
                        : 'text-orange-900'
                    }`}>
                      {alert.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar size={20} className="text-blue-600" />
            Lịch trình ấp trứng
          </h2>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {item.completed ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 bg-slate-400 rounded-full"></div>}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${item.completed ? 'bg-green-300' : 'bg-slate-200'}`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{item.title}</span>
                      <span className="text-xs text-slate-500">Ngày {item.day}</span>
                    </div>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Update button */}
        <button
          onClick={onUpdateBatch}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Eye size={20} />
          Kiểm tra & cập nhật trứng
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Điều chỉnh thông số</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Temperature Control */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                <Thermometer size={18} className="text-orange-600" />
                Nhiệt độ mục tiêu (°C)
              </label>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white text-center mb-4">
                <div className="text-5xl font-bold mb-2">{targetTemp.toFixed(1)}°C</div>
                <div className="text-orange-100 text-sm">Nhiệt độ hiện tại: {latestTemp.temp}°C</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTargetTemp(Math.max(35, targetTemp - 0.1))}
                  className="w-14 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-2xl hover:border-orange-500 hover:bg-orange-50 transition-colors"
                >
                  <Minus size={24} className="mx-auto" />
                </button>
                <input
                  type="range"
                  min="35"
                  max="40"
                  step="0.1"
                  value={targetTemp}
                  onChange={(e) => setTargetTemp(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={() => setTargetTemp(Math.min(40, targetTemp + 0.1))}
                  className="w-14 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-2xl hover:border-orange-500 hover:bg-orange-50 transition-colors"
                >
                  <Plus size={24} className="mx-auto" />
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>35°C</span>
                <span>40°C</span>
              </div>
            </div>

            {/* Humidity Control */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                <Droplets size={18} className="text-blue-600" />
                Độ ẩm mục tiêu (%)
              </label>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center mb-4">
                <div className="text-5xl font-bold mb-2">{targetHumidity}%</div>
                <div className="text-blue-100 text-sm">Độ ẩm hiện tại: {latestTemp.humidity}%</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTargetHumidity(Math.max(40, targetHumidity - 1))}
                  className="w-14 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-2xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Minus size={24} className="mx-auto" />
                </button>
                <input
                  type="range"
                  min="40"
                  max="80"
                  step="1"
                  value={targetHumidity}
                  onChange={(e) => setTargetHumidity(parseInt(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={() => setTargetHumidity(Math.min(80, targetHumidity + 1))}
                  className="w-14 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-2xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Plus size={24} className="mx-auto" />
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>40%</span>
                <span>80%</span>
              </div>
            </div>

            {/* Fan Speed Control */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                <Wind size={18} className="text-purple-600" />
                Tốc độ quạt (%)
              </label>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center mb-4">
                <div className="text-5xl font-bold mb-2">{fanSpeed}%</div>
                <div className="text-purple-100 text-sm">Tốc độ quạt hiện tại: {fanSpeed}%</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFanSpeed(Math.max(0, fanSpeed - 5))}
                  className="w-14 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-2xl hover:border-purple-500 hover:bg-purple-50 transition-colors"
                >
                  <Minus size={24} className="mx-auto" />
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={fanSpeed}
                  onChange={(e) => setFanSpeed(parseInt(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={() => setFanSpeed(Math.min(100, fanSpeed + 5))}
                  className="w-14 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-2xl hover:border-purple-500 hover:bg-purple-50 transition-colors"
                >
                  <Plus size={24} className="mx-auto" />
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Turning Interval Control */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                <RotateCw size={18} className="text-blue-600" />
                Khoảng cách xoay (giờ)
              </label>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center mb-4">
                <div className="text-5xl font-bold mb-2">{turningInterval} giờ</div>
                <div className="text-blue-100 text-sm">Khoảng cách xoay hiện tại: {turningInterval} giờ</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTurningInterval(Math.max(1, turningInterval - 1))}
                  className="w-14 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-2xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Minus size={24} className="mx-auto" />
                </button>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={turningInterval}
                  onChange={(e) => setTurningInterval(parseInt(e.target.value))}
                  className="flex-1"
                />
                <button
                  onClick={() => setTurningInterval(Math.min(12, turningInterval + 1))}
                  className="w-14 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-2xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Plus size={24} className="mx-auto" />
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>1 giờ</span>
                <span>12 giờ</span>
              </div>
            </div>

            {/* Turning Enabled Control */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                <RotateCw size={18} className="text-blue-600" />
                Bật xoay
              </label>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center mb-4">
                <div className="text-5xl font-bold mb-2">{turningEnabled ? 'Bật' : 'Tắt'}</div>
                <div className="text-blue-100 text-sm">Trạng thái xoay hiện tại: {turningEnabled ? 'Bật' : 'Tắt'}</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTurningEnabled(false)}
                  className="w-14 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-2xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  Tắt
                </button>
                <button
                  onClick={() => setTurningEnabled(true)}
                  className="w-14 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-2xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  Bật
                </button>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-sm text-orange-900">
                <strong>⚠️ Lưu ý:</strong> Thay đổi thông số có thể ảnh hưởng đến quá trình ấp. Chỉ điều chỉnh khi thật sự cần thiết và có kinh nghiệm.
              </p>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveSettings}
                className="py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}