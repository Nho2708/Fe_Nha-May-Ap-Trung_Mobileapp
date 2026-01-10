import { CheckCircle2, Package, Truck, QrCode, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type CartItem = {
  id: string;
  name: string;
  capacity: number;
  quantity: number;
  price: number;
  image: string;
};

type OrderSuccessScreenProps = {
  items: CartItem[];
  total: number;
  onComplete: () => void;
};

export default function OrderSuccessScreen({ items, total, onComplete }: OrderSuccessScreenProps) {
  const orderCode = `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Progress Tabs */}
      <div className="bg-white border-b px-6">
        <div className="flex">
          <div className="flex-1 text-center py-3 border-b-2 border-blue-600 text-blue-600 text-sm">
            Thông tin
          </div>
          <div className="flex-1 text-center py-3 border-b-2 border-blue-600 text-blue-600 text-sm">
            Thanh toán
          </div>
          <div className="flex-1 text-center py-3 border-b-2 border-blue-600 text-blue-600 font-semibold text-sm">
            Hoàn tất
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={56} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Đặt hàng thành công!</h1>
            <p className="text-slate-600 text-lg mb-1">Mã đơn hàng: <span className="font-bold text-blue-600">{orderCode}</span></p>
            <p className="text-sm text-slate-500">Đã thanh toán: {total.toLocaleString('vi-VN')} ₫</p>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
            <h2 className="font-bold text-lg text-slate-800 mb-6">Quy trình tiếp theo</h2>
            
            <div className="space-y-6">
              {/* Step 1 - Active */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="w-0.5 h-16 bg-blue-600 mt-2"></div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-blue-600" />
                    Sale xác nhận đơn hàng
                  </h3>
                  <p className="text-sm text-blue-600 font-semibold">Trong vòng 2 giờ</p>
                  <p className="text-xs text-slate-500 mt-1">Đơn hàng đang được xử lý</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">
                    2
                  </div>
                  <div className="w-0.5 h-16 bg-slate-200 mt-2"></div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <Package size={18} className="text-slate-400" />
                    Chuẩn bị và đóng gói
                  </h3>
                  <p className="text-sm text-slate-600">1-2 ngày làm việc</p>
                  <p className="text-xs text-slate-500 mt-1">Kiểm tra chất lượng sản phẩm</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">
                    3
                  </div>
                  <div className="w-0.5 h-16 bg-slate-200 mt-2"></div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <Truck size={18} className="text-slate-400" />
                    Giao hàng
                  </h3>
                  <p className="text-sm text-slate-600">Ưu tiên giao nhanh: 2-5 ngày kể từ khi xuất</p>
                  <p className="text-xs text-slate-500 mt-1">Miễn phí vận chuyển toàn quốc</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <QrCode size={18} className="text-slate-400" />
                    Nhận QR code
                  </h3>
                  <p className="text-sm text-slate-600">Nhận mã kích hoạt thiết bị khi giao hàng</p>
                  <p className="text-xs text-slate-500 mt-1">Quét QR để thêm máy vào app</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
            <h2 className="font-bold text-lg text-slate-800 mb-4">Tóm tắt đơn hàng</h2>
            
            {/* Product */}
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b border-slate-200">
                <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/200x200/?${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-sm text-slate-600">Số lượng: {item.quantity}</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">
                    {item.price.toLocaleString('vi-VN')} ₫
                  </p>
                </div>
              </div>
            ))}

            {/* Totals */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Tạm tính:</span>
                <span className="font-semibold text-slate-800">{total.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Phí vận chuyển:</span>
                <span className="font-semibold text-green-600">Giảm 5%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-800">Tổng thanh toán:</span>
                <span className="text-2xl font-bold text-blue-600">{total.toLocaleString('vi-VN')} ₫</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Bảo hành 2 năm</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Miễn phí vận chuyển</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Hỗ trợ kỹ thuật 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Ưu tiên giao hàng</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 mb-6">
            <h2 className="font-bold text-lg text-slate-800 mb-4">Thông tin liên hệ</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-blue-600" />
                <div>
                  <p className="text-sm text-slate-600">Hotline: 1900-xxxx</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-blue-600" />
                <div>
                  <p className="text-sm text-slate-600">Email: support@mayaptrung.vn</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3">
                Làm việc: 8:00 - 20:00 hàng ngày
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
