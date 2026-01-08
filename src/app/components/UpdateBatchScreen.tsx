import { useState } from 'react';
import { ArrowLeft, AlertCircle, Egg, TrendingUp } from 'lucide-react';
import type { Batch } from '../App';

type UpdateBatchScreenProps = {
  batch: Batch | null;
  onBack: () => void;
};

export default function UpdateBatchScreen({ batch, onBack }: UpdateBatchScreenProps) {
  const [damagedCount, setDamagedCount] = useState(0);
  const [hatchedCount, setHatchedCount] = useState(0);

  if (!batch) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, would update batch data
    onBack();
  };

  const currentRemaining = batch.remainingEggs - damagedCount;
  const newTotal = batch.hatchedEggs + hatchedCount;
  const newSuccessRate = ((currentRemaining / batch.totalEggs) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Kiểm tra & cập nhật</h1>
          <p className="text-sm text-slate-600">{batch.eggType} • Ngày {batch.currentDay}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          {/* Current status */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Trạng thái hiện tại</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-800">Tổng số trứng:</span>
                <span className="font-semibold text-blue-900">{batch.totalEggs} quả</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">Còn lại:</span>
                <span className="font-semibold text-blue-900">{batch.remainingEggs} quả</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">Đã nở:</span>
                <span className="font-semibold text-blue-900">{batch.hatchedEggs} quả</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">Đã hư:</span>
                <span className="font-semibold text-blue-900">{batch.damagedEggs} quả</span>
              </div>
            </div>
          </div>

          {/* Update damaged eggs */}
          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-600" />
              Cập nhật trứng hư
            </label>
            <p className="text-sm text-slate-600 mb-3">
              Số trứng vô sinh, chết phôi hoặc hư hỏng phát hiện lần này
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setDamagedCount(Math.max(0, damagedCount - 1))}
                className="w-12 h-12 bg-white border-2 border-slate-200 rounded-lg font-bold text-xl hover:border-blue-500 transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold text-red-600">{damagedCount}</div>
                <div className="text-sm text-slate-500">quả</div>
              </div>
              <button
                type="button"
                onClick={() => setDamagedCount(Math.min(batch.remainingEggs, damagedCount + 1))}
                className="w-12 h-12 bg-white border-2 border-slate-200 rounded-lg font-bold text-xl hover:border-blue-500 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Update hatched eggs */}
          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <Egg size={18} className="text-green-600" />
              Cập nhật trứng nở
            </label>
            <p className="text-sm text-slate-600 mb-3">
              Số trứng đã nở thành công
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setHatchedCount(Math.max(0, hatchedCount - 1))}
                className="w-12 h-12 bg-white border-2 border-slate-200 rounded-lg font-bold text-xl hover:border-blue-500 transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold text-green-600">{hatchedCount}</div>
                <div className="text-sm text-slate-500">quả</div>
              </div>
              <button
                type="button"
                onClick={() => setHatchedCount(Math.min(batch.remainingEggs, hatchedCount + 1))}
                className="w-12 h-12 bg-white border-2 border-slate-200 rounded-lg font-bold text-xl hover:border-blue-500 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Preview */}
          {(damagedCount > 0 || hatchedCount > 0) && (
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={18} />
                Sau khi cập nhật
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Còn lại:</span>
                  <span className="text-2xl font-bold">{currentRemaining} quả</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Đã nở:</span>
                  <span className="text-2xl font-bold">{newTotal} quả</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tổng hư:</span>
                  <span className="text-2xl font-bold">{batch.damagedEggs + damagedCount} quả</span>
                </div>
                <div className="border-t border-white/20 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span>Tỷ lệ thành công:</span>
                    <span className="text-3xl font-bold">{newSuccessRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <h4 className="font-semibold text-orange-900 mb-2">💡 Mẹo kiểm tra trứng</h4>
            <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
              <li>Soi đèn để phát hiện trứng vô sinh (màu sáng, trong suốt)</li>
              <li>Trứng có phôi phát triển sẽ có mạch máu và bóng tối</li>
              <li>Trứng chết phôi có mùi hôi, cầm nhẹ cảm thấy sủi bọt</li>
              <li>Kiểm tra định kỳ giúp tăng hiệu quả ấp</li>
            </ul>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={damagedCount === 0 && hatchedCount === 0}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Lưu cập nhật
          </button>
        </form>
      </div>
    </div>
  );
}
