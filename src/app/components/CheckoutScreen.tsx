import { useState } from 'react';
import { ArrowLeft, User, Phone, Mail, MapPin, CheckCircle2, Package, Truck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import PaymentScreen from './PaymentScreen';
import OrderSuccessScreen from './OrderSuccessScreen';

type CartItem = {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
  price: number;
  image: string;
};

type CheckoutScreenProps = {
  onBack: () => void;
  items: CartItem[];
  total: number;
  onComplete: () => void;
};

export default function CheckoutScreen({ onBack, items, total, onComplete }: CheckoutScreenProps) {
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    note: '',
  });

  const handleContinueToPayment = () => {
    if (formData.fullName && formData.phone && formData.address) {
      setStep('payment');
    }
  };

  if (step === 'success') {
    return (
      <OrderSuccessScreen
        items={items}
        total={total}
        onComplete={onComplete}
      />
    );
  }

  if (step === 'payment') {
    return (
      <PaymentScreen
        onBack={() => setStep('info')}
        items={items}
        total={total}
        customerInfo={formData}
        onSuccess={() => setStep('success')}
      />
    );
  }

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
              <h1 className="font-bold text-xl text-slate-800">Thanh toán</h1>
              <p className="text-sm text-slate-500">Đặt cọc 30% - Thanh toán khi nhận hàng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step === 'info' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
            }`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium text-slate-700">Thông tin</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-300"></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step === 'payment' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'
            }`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium text-slate-400">Đặt cọc</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center font-bold">
              3
            </div>
            <span className="ml-2 text-sm font-medium text-slate-400">Hoàn tất</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Thông tin giao hàng</h2>
              
              <form className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Họ và tên *
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Số điện thoại *
                  </label>
                  <div className="relative">
                    <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="0912345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="a@a"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Địa chỉ giao hàng *
                  </label>
                  <div className="relative">
                    <MapPin size={20} className="absolute left-3 top-4 text-slate-400" />
                    <textarea
                      placeholder="Số nhà, đường, phường, quận, thành phố"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-6">
              <h3 className="font-bold text-lg text-slate-800 mb-4">Tóm tắt đơn hàng</h3>

              {/* Discount Badge */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 text-red-600 font-semibold text-sm">
                  <CheckCircle2 size={16} />
                  <span>Đặt cọc 30%</span>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={`https://source.unsplash.com/100x100/?${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-slate-800 truncate">{item.name}</h4>
                      <p className="text-xs text-slate-500">Số lượng: {item.quantity}</p>
                      <p className="text-sm font-semibold text-blue-600 mt-1">
                        {item.price.toLocaleString('vi-VN')} ₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-slate-200 pt-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">{(total / 0.7).toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between text-sm text-red-600">
                  <span>Đặt cọc (30%):</span>
                  <span className="font-semibold">-{((total / 0.7) * 0.7).toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Còn lại:</span>
                  <span className="font-semibold">{((total / 0.7) * 0.7).toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-slate-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-800 font-semibold">Thanh toán đủ:</span>
                  <span className="text-2xl font-bold text-blue-600">{total.toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>

              {/* Trust Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>Bảo hành 2 năm</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>Miễn phí vận chuyển</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>Hỗ trợ kỹ thuật 24/7</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleContinueToPayment}
                disabled={!formData.fullName || !formData.phone || !formData.address}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}