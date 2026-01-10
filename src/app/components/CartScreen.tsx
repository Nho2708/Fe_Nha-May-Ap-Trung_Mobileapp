import { useState } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Tag, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type CartItem = {
  id: string;
  name: string;
  capacity: number;
  power: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
};

type CartScreenProps = {
  onBack: () => void;
  onCheckout: (items: CartItem[], total: number) => void;
};

export default function CartScreen({ onBack, onCheckout }: CartScreenProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Máy Ấp Trứng Gia Đình 100',
      capacity: 100,
      power: '120W',
      price: 2800000,
      quantity: 1,
      image: 'chicken farm',
      inStock: true,
    },
  ]);

  const [discount, setDiscount] = useState(0.3); // 30% discount
  const [couponCode, setCouponCode] = useState('');

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;
  const shippingFee = 0; // Free shipping

  const handleCheckout = () => {
    onCheckout(cartItems, total);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-bold text-lg text-slate-800">Giỏ hàng</h1>
              <p className="text-xs text-slate-500">{cartItems.length} sản phẩm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <ShoppingBag size={48} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">Giỏ hàng trống</h3>
            <p className="text-sm text-slate-600 mb-4">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <button
              onClick={onBack}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <div className="flex gap-3">
                    {/* Image */}
                    <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={`https://source.unsplash.com/200x200/?${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1.5">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-slate-800 mb-1 truncate">{item.name}</h3>
                          <div className="space-y-0.5">
                            <p className="text-xs text-slate-600">Sức chứa: {item.capacity} trứng</p>
                            <p className="text-xs text-slate-600">Công suất: {item.power}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors h-fit ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {item.inStock ? (
                        <div className="flex items-center gap-1.5 text-xs text-green-600 mb-2">
                          <CheckCircle2 size={14} />
                          <span>Còn hàng</span>
                        </div>
                      ) : (
                        <div className="text-xs text-red-600 mb-2">Hết hàng</div>
                      )}

                      {/* Price & Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="text-base font-bold text-blue-600">
                          {item.price.toLocaleString('vi-VN')} ₫
                        </div>
                        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-1.5 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white rounded transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-semibold w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white rounded transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Total for this item */}
                      <div className="mt-2.5 pt-2.5 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-xs text-slate-600">Tổng tiền sản phẩm:</span>
                        <span className="font-bold text-sm text-slate-800">
                          {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <button
                onClick={onBack}
                className="w-full border-2 border-blue-600 text-blue-600 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                ← Tiếp tục mua sắm
              </button>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <h3 className="font-bold text-base text-slate-800 mb-3">Tóm tắt đơn hàng</h3>

              {/* Coupon */}
              {discount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 text-red-600 font-semibold text-xs mb-1">
                    <Tag size={14} />
                    <span>Đặt cọc 30%</span>
                  </div>
                  <p className="text-xs text-slate-600">Còn lại: {(subtotal - discountAmount).toLocaleString('vi-VN')} ₫</p>
                  <p className="text-xs text-slate-600 mt-0.5">Thanh toán phần còn lại khi nhận hàng</p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Tạm tính ({cartItems.length} sản phẩm):</span>
                  <span className="font-semibold">{subtotal.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-red-600 text-sm">
                    <span>Đặt cọc (30%):</span>
                    <span className="font-semibold">-{discountAmount.toLocaleString('vi-VN')} ₫</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-slate-200 pt-3 mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-800 font-semibold text-sm">Tổng cộng:</span>
                  <span className="text-xl font-bold text-blue-600">{total.toLocaleString('vi-VN')} ₫</span>
                </div>
                {discount > 0 && (
                  <p className="text-xs text-slate-500">Còn lại: {(subtotal - total).toLocaleString('vi-VN')} ₫</p>
                )}
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-blue-800">
                  <CheckCircle2 size={14} className="text-blue-600 flex-shrink-0" />
                  <span>Ưu tiên giao hàng</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-800">
                  <CheckCircle2 size={14} className="text-blue-600 flex-shrink-0" />
                  <span>Giảm 5% gói vận chuyển</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-800">
                  <CheckCircle2 size={14} className="text-blue-600 flex-shrink-0" />
                  <span>Tích điểm thưởng x2</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-sm hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Mua ngay - Thanh toán đủ
              </button>

              {/* Deposit Option */}
              {discount > 0 && (
                <button
                  onClick={handleCheckout}
                  className="w-full mt-2 border-2 border-blue-600 text-blue-600 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-sm"
                >
                  Đặt cọc 30%
                </button>
              )}

              {/* Trust Badges */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
                  <span>Thanh toán an toàn & bảo mật</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
                  <span>Miễn phí vận chuyển toàn quốc</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
                  <span>Bảo hành 2 năm chính hãng</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
                  <span>Hỗ trợ kỹ thuật 24/7</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}