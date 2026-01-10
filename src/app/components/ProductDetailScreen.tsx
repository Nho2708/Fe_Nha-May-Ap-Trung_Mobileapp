import { useState } from 'react';
import { ArrowLeft, Star, Check, Plus, Minus, ShoppingCart, Shield, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Product = {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price: number;
  capacity: number;
  power: string;
  hatchRate?: number;
  rating: number;
  reviews: number;
  sold?: number;
  inStock: boolean;
  image: string;
};

type ProductDetailScreenProps = {
  product?: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
};

const mockProduct: Product = {
  id: '1',
  name: 'Máy Ấp Trứng Gia Đình 100',
  category: 'Gia đình',
  description: 'Máy ấp trứng cho hộ gia đình quy mô nhỏ, tự động hóa cao, kiểm soát nhiệt độ chính xác.',
  price: 2800000,
  capacity: 100,
  power: '120W',
  hatchRate: 88,
  rating: 4.7,
  reviews: 256,
  sold: 680,
  inStock: true,
  image: 'chicken farm',
};

const specifications = [
  { label: 'Dải nhiệt độ', value: '35-40°C' },
  { label: 'Công suất điện', value: '120W' },
  { label: 'Kết nối App', value: 'Hỗ trợ iOS & Android' },
  { label: 'Motor đảo trứng', value: 'Tự động 2 giờ/lần' },
];

const benefits = [
  'Tấm sưởi 7 hợp kim cao cấp với đá phơi cảng',
  'Tỉ lệ nở trên 70% do chuyên gia phân tích thống kê',
  'Cảm biến tự động chính ấp thông minh tự động',
  'Bảo hành 2 năm, hỗ trợ lắp đặt miễn phí',
];

const mockReviews = [
  {
    id: '1',
    userName: 'Nguyễn Văn A',
    date: '01/12/2025',
    rating: 5,
    comment: 'Máy rất tốt, tỉ lệ nở cao, dễ sử dụng. Đã mua thêm 2 lần nữa!',
    image: 'user avatar',
  },
  {
    id: '2',
    userName: 'Trần Thị B',
    date: '10/12/2025',
    rating: 4,
    comment: 'Chất lượng tốt, nhiệt độ ổn định. Hơi ồn nhưng chấp nhận được.',
    image: 'user profile',
  },
  {
    id: '3',
    userName: 'Lê Văn C',
    date: '15/12/2025',
    rating: 5,
    comment: 'Tuyệt vời! App theo dõi rất tiện. Không thể rời mắt khỏi màn hình.',
    image: 'person',
  },
];

export default function ProductDetailScreen({ 
  product = mockProduct, 
  onBack, 
  onAddToCart,
  onBuyNow 
}: ProductDetailScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'compare' | 'reviews'>('specs');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-base text-slate-800">Chi tiết sản phẩm</h1>
        </div>
      </div>

      {/* Product Image */}
      <div className="bg-slate-50">
        <div className="aspect-square max-h-96 overflow-hidden">
          <ImageWithFallback
            src={`https://source.unsplash.com/800x800/?${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 py-4 space-y-4">
        {/* Title & Description */}
        <div>
          <h2 className="font-bold text-lg text-slate-800 mb-2">{product.name}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            {renderStars(product.rating)}
            <span className="font-semibold text-sm ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-slate-600">({product.reviews} đánh giá)</span>
          <span className="text-sm text-slate-400">• {product.sold} đã bán</span>
        </div>

        {/* Price */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {product.price.toLocaleString('vi-VN')} ₫
          </div>
          {product.inStock && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <Check size={16} />
              <span className="font-medium">Còn hàng - Giao hàng ngay</span>
            </div>
          )}
        </div>

        {/* Specs Quick View */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-600 mb-1">Sức chứa</div>
            <div className="font-bold text-sm text-slate-800">{product.capacity} trứng</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-600 mb-1">Tỉ lệ nở</div>
            <div className="font-bold text-sm text-green-600">{product.hatchRate}%</div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between border-t border-b border-slate-200 py-4">
          <span className="text-sm font-medium text-slate-700">Số lượng:</span>
          <div className="flex items-center gap-3 bg-slate-100 rounded-lg px-2 py-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 hover:bg-white rounded transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="font-semibold w-8 text-center text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 hover:bg-white rounded transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'specs'
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Thông số kỹ thuật
              {activeTab === 'specs' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'compare'
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              So sánh
              {activeTab === 'compare' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'reviews'
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Đánh giá ({product.reviews})
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="pb-24">
          {activeTab === 'specs' && (
            <div className="space-y-4">
              {/* Specifications */}
              <div className="space-y-3">
                {specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-600">{spec.label}:</span>
                    <span className="text-sm font-medium text-slate-800">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="mt-6">
                <h3 className="font-semibold text-sm text-slate-800 mb-3">Lợi ích sử dụng:</h3>
                <div className="space-y-2">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-2 text-sm text-slate-700">
                      <Check size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compare' && (
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 font-semibold text-slate-800">Thông số</th>
                    <th className="text-center py-3 px-2 font-semibold text-blue-600 bg-blue-50">Gia Đình 100</th>
                    <th className="text-center py-3 px-2 font-semibold text-slate-600">Mini 50</th>
                    <th className="text-center py-3 px-2 font-semibold text-slate-600">Pro 200</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 text-slate-600">Sức chứa</td>
                    <td className="py-3 px-2 text-center font-medium bg-blue-50">100 trứng</td>
                    <td className="py-3 px-2 text-center">50 trứng</td>
                    <td className="py-3 px-2 text-center">200 trứng</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 text-slate-600">Giá</td>
                    <td className="py-3 px-2 text-center font-bold text-blue-600 bg-blue-50">2.800.000 ₫</td>
                    <td className="py-3 px-2 text-center">1.500.000 ₫</td>
                    <td className="py-3 px-2 text-center">4.500.000 ₫</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 text-slate-600">Tỉ lệ nở</td>
                    <td className="py-3 px-2 text-center font-medium bg-blue-50">88%</td>
                    <td className="py-3 px-2 text-center">85%</td>
                    <td className="py-3 px-2 text-center">90%</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 text-slate-600">AI Monitoring</td>
                    <td className="py-3 px-2 text-center bg-blue-50">
                      <Check size={16} className="text-green-600 mx-auto" />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Check size={16} className="text-green-600 mx-auto" />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Check size={16} className="text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 text-slate-600">Kết nối App</td>
                    <td className="py-3 px-2 text-center bg-blue-50">
                      <Check size={16} className="text-green-600 mx-auto" />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Check size={16} className="text-green-600 mx-auto" />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Check size={16} className="text-green-600 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Rating Summary */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-800 mb-1">{product.rating}</div>
                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(product.rating)}
                    </div>
                    <div className="text-xs text-slate-600">{product.reviews} đánh giá</div>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-xs w-4">{stars}</span>
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                          <div
                            className="bg-yellow-400 h-1.5 rounded-full"
                            style={{
                              width: stars === 5 ? '70%' : stars === 4 ? '20%' : stars === 3 ? '7%' : stars === 2 ? '2%' : '1%',
                            }}
                          />
                        </div>
                        <span className="text-xs text-slate-600 w-8 text-right">
                          {stars === 5 ? '70%' : stars === 4 ? '20%' : stars === 3 ? '7%' : stars === 2 ? '2%' : '1%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b border-slate-100 pb-4 last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-slate-800">{review.userName}</span>
                          <span className="text-xs text-slate-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Warranty Banner - Above Bottom Bar */}
      <div className="fixed bottom-20 left-0 right-0 mx-4 mb-2">
        <div className="bg-blue-600 rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 text-white">
            <Shield size={18} className="flex-shrink-0" />
            <div>
              <div className="font-bold text-sm">Bảo hành 2 năm chính hãng</div>
              <div className="text-xs text-blue-100">Hỗ trợ kỹ thuật 24/7 - Đổi mới trong 7 ngày</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg">
        <div className="flex gap-3">
          <button
            onClick={() => onAddToCart(product, quantity)}
            className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            <span className="text-sm">Thêm vào giỏ</span>
          </button>
          <button
            onClick={() => onBuyNow(product, quantity)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="text-sm">Mua ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
}