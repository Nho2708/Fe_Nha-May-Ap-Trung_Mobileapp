import { ArrowLeft, TrendingUp, Egg, XCircle, Calendar, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type ReportsScreenProps = {
  onBack: () => void;
};

const monthlyData = [
  { month: 'T1', total: 150, hatched: 135, damaged: 15 },
  { month: 'T2', total: 180, hatched: 168, damaged: 12 },
  { month: 'T3', total: 200, hatched: 186, damaged: 14 },
  { month: 'T4', total: 160, hatched: 148, damaged: 12 },
  { month: 'T5', total: 190, hatched: 175, damaged: 15 },
  { month: 'T6', total: 210, hatched: 199, damaged: 11 },
];

const pieData = [
  { name: 'Đã nở', value: 1011, color: '#22c55e' },
  { name: 'Đang ấp', value: 78, color: '#3b82f6' },
  { name: 'Hư hỏng', value: 79, color: '#ef4444' },
];

const batchHistory = [
  { id: 1, type: 'Trứng gà', date: '2026-01-01', total: 50, hatched: 48, rate: 96 },
  { id: 2, type: 'Trứng vịt', date: '2025-12-15', total: 30, hatched: 28, rate: 93 },
  { id: 3, type: 'Trứng gà', date: '2025-12-01', total: 60, hatched: 57, rate: 95 },
  { id: 4, type: 'Trứng cút', date: '2025-11-20', total: 100, hatched: 92, rate: 92 },
];

export default function ReportsScreen({ onBack }: ReportsScreenProps) {
  const totalEggs = pieData.reduce((sum, item) => sum + item.value, 0);
  const totalHatched = pieData.find(item => item.name === 'Đã nở')?.value || 0;
  const overallSuccessRate = ((totalHatched / totalEggs) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-xl">Báo cáo & Thống kê</h1>
            <p className="text-green-100 text-sm">Tổng quan hiệu suất ấp trứng</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-3xl font-bold mb-1">{totalEggs}</div>
            <div className="text-xs text-green-100">Tổng trứng</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-3xl font-bold mb-1">{totalHatched}</div>
            <div className="text-xs text-green-100">Đã nở</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-3xl font-bold mb-1">{overallSuccessRate}%</div>
            <div className="text-xs text-green-100">Thành công</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Overview cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <Egg size={20} className="text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500">Đã nở</div>
                <div className="font-semibold text-xl">{totalHatched}</div>
              </div>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={12} />
              +12% so với tháng trước
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-100 p-2 rounded-lg">
                <XCircle size={20} className="text-red-600" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500">Hư hỏng</div>
                <div className="font-semibold text-xl">79</div>
              </div>
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={12} className="rotate-180" />
              -5% so với tháng trước
            </div>
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-600" />
            Tổng quan kết quả
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-slate-600">{item.name}</span>
                </div>
                <div className="font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly chart */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold mb-4">Biểu đồ theo tháng</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="hatched" fill="#22c55e" name="Đã nở" radius={[4, 4, 0, 0]} />
              <Bar dataKey="damaged" fill="#ef4444" name="Hư hỏng" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Batch history */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar size={20} className="text-blue-600" />
            Lịch sử các vụ ấp
          </h3>
          <div className="space-y-3">
            {batchHistory.map((batch) => (
              <div
                key={batch.id}
                className="bg-white rounded-xl p-4 border border-slate-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold mb-1">{batch.type}</h4>
                    <p className="text-xs text-slate-500">
                      {new Date(batch.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    batch.rate >= 95
                      ? 'bg-green-100 text-green-700'
                      : batch.rate >= 90
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {batch.rate}%
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-slate-500 text-xs mb-1">Tổng số</div>
                    <div className="font-semibold">{batch.total}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1">Đã nở</div>
                    <div className="font-semibold text-green-600">{batch.hatched}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs mb-1">Hư hỏng</div>
                    <div className="font-semibold text-red-600">{batch.total - batch.hatched}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={20} />
            Phân tích AI
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-200">•</span>
              <span>Tỷ lệ thành công của bạn cao hơn 8% so với trung bình ngành</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-200">•</span>
              <span>Trứng gà có tỷ lệ nở cao nhất (95.7%)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-200">•</span>
              <span>Tháng 6 đạt kết quả tốt nhất với 199/210 trứng nở</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
