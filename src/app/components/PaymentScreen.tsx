import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Copy, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type CartItem = {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
  price: number;
  image: string;
};

type PaymentScreenProps = {
  onBack: () => void;
  items: CartItem[];
  total: number;
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
  };
  onSuccess: () => void;
};

export default function PaymentScreen({ onBack, items, total, customerInfo, onSuccess }: PaymentScreenProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'full' | 'deposit'>('full');
  const [copied, setCopied] = useState<string | null>(null);

  const depositAmount = Math.round(total * 0.3);
  const remainingAmount = total - depositAmount;
  const paymentAmount = selectedPaymentMethod === 'full' ? total : depositAmount;

  const bankInfo = {
    bankName: 'Vietcombank',
    accountNumber: '1234567890',
    accountName: 'CÔNG TY MÁY ẤP TRỨNG',
    amount: paymentAmount,
    content: `ORD-${Date.now().toString().slice(-6)}`,
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleConfirmPayment = () => {
    // In real app, would verify payment before proceeding
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="font-bold text-xl text-slate-800">Thanh toán đơn hàng</h1>
              <p className="text-sm text-slate-500">Chọn phương thức thanh toán</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Tabs */}
      <div className="bg-white border-b px-6">
        <div className="flex">
          <div className="flex-1 text-center py-3 border-b-2 border-slate-300 text-slate-400 text-sm">
            Thông tin
          </div>
          <div className="flex-1 text-center py-3 border-b-2 border-blue-600 text-blue-600 font-semibold text-sm">
            Thanh toán
          </div>
          <div className="flex-1 text-center py-3 border-b-2 border-slate-300 text-slate-400 text-sm">
            Hoàn tất
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Payment Method Selection */}
          <div className="space-y-3">
            {/* Full Payment Option */}
            <button
              onClick={() => setSelectedPaymentMethod('full')}
              className={`w-full text-left rounded-2xl p-5 border-2 transition-all ${
                selectedPaymentMethod === 'full'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                  selectedPaymentMethod === 'full' ? 'bg-blue-600' : 'bg-white border-2 border-slate-300'
                }`}>
                  {selectedPaymentMethod === 'full' && (
                    <CheckCircle2 size={16} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 mb-2">Ưu đãi thanh toán đủ</h3>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      <span>Ưu tiên giao hàng nhanh nhất</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      <span>Giảm 5% phí vận chuyển</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      <span>Tặng voucher 500.000đ cho lần mua tiếp theo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      <span>Nhận QR code ngay khi giao hàng</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Deposit Option */}
            <button
              onClick={() => setSelectedPaymentMethod('deposit')}
              className={`w-full text-left rounded-2xl p-5 border-2 transition-all ${
                selectedPaymentMethod === 'deposit'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                  selectedPaymentMethod === 'deposit' ? 'bg-blue-600' : 'bg-white border-2 border-slate-300'
                }`}>
                  {selectedPaymentMethod === 'deposit' && (
                    <CheckCircle2 size={16} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 mb-1">Đặt cọc 30%</h3>
                  <p className="text-sm text-slate-600">
                    Thanh toán {depositAmount.toLocaleString('vi-VN')} ₫ trước, còn lại {remainingAmount.toLocaleString('vi-VN')} ₫ khi nhận hàng
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Phương thức thanh toán</h3>
            
            {/* Bank Transfer */}
            <div className="border-2 border-blue-600 rounded-xl p-4 bg-blue-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">Chuyển khoản ngân hàng</h4>
                  <p className="text-sm text-slate-600">Xác nhận thanh toán trong 5 phút</p>
                </div>
              </div>
            </div>

            {/* E-Wallet (Disabled) */}
            <div className="mt-3 border border-slate-200 rounded-xl p-4 bg-slate-50 opacity-60">
              <div className="flex items-center gap-3">
                <div className="bg-slate-300 text-white p-2 rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-600">Ví điện tử (MoMo, ZaloPay)</h4>
                  <p className="text-sm text-slate-500">Thanh toán trực tiếp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Transfer Details */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Thông tin chuyển khoản</h3>
            
            <div className="space-y-3">
              {/* Bank Name */}
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Ngân hàng:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">{bankInfo.bankName}</span>
                  <button
                    onClick={() => handleCopy(bankInfo.bankName, 'bank')}
                    className="p-1 hover:bg-slate-100 rounded"
                  >
                    <Copy size={16} className={copied === 'bank' ? 'text-green-600' : 'text-slate-400'} />
                  </button>
                </div>
              </div>

              {/* Account Number */}
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Số tài khoản:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">{bankInfo.accountNumber}</span>
                  <button
                    onClick={() => handleCopy(bankInfo.accountNumber, 'account')}
                    className="p-1 hover:bg-slate-100 rounded"
                  >
                    <Copy size={16} className={copied === 'account' ? 'text-green-600' : 'text-slate-400'} />
                  </button>
                </div>
              </div>

              {/* Account Name */}
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Chủ tài khoản:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">{bankInfo.accountName}</span>
                  <button
                    onClick={() => handleCopy(bankInfo.accountName, 'name')}
                    className="p-1 hover:bg-slate-100 rounded"
                  >
                    <Copy size={16} className={copied === 'name' ? 'text-green-600' : 'text-slate-400'} />
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Số tiền:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-600 text-lg">{bankInfo.amount.toLocaleString('vi-VN')} ₫</span>
                  <button
                    onClick={() => handleCopy(bankInfo.amount.toString(), 'amount')}
                    className="p-1 hover:bg-slate-100 rounded"
                  >
                    <Copy size={16} className={copied === 'amount' ? 'text-green-600' : 'text-slate-400'} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-600">Nội dung:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-600">{bankInfo.content}</span>
                  <button
                    onClick={() => handleCopy(bankInfo.content, 'content')}
                    className="p-1 hover:bg-slate-100 rounded"
                  >
                    <Copy size={16} className={copied === 'content' ? 'text-green-600' : 'text-slate-400'} />
                  </button>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="mt-4 bg-slate-100 rounded-xl p-6 text-center">
              <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center border-2 border-slate-300">
                <span className="text-slate-400 text-sm">QR Code</span>
              </div>
              <p className="text-sm text-slate-600">Quét mã QR để thanh toán nhanh</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 sticky bottom-0 bg-slate-50 py-4">
            <button
              onClick={onBack}
              className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
            >
              Quay lại
            </button>
            <button
              onClick={handleConfirmPayment}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
