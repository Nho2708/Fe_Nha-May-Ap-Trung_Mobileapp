import { useState } from 'react';
import { ArrowLeft, Search, ShoppingCart, Filter, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Product = {
  id: string;
  name: string;
  category: string;
  capacity: number;
  power: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  sold: number;
  image: string;
  inStock: boolean;
  badge?: string;
};

type ProductsScreenProps = {
  onBack: () => void;
  onViewCart: () => void;
  onViewDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export default function ProductsScreen({ onBack, onViewCart, onViewDetail, onAddToCart }: ProductsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartCount, setCartCount] = useState(0);

  const products: Product[] = [
    {
      id: '1',
      name: 'Máy Ấp Trứng Gia Đình 100',
      category: 'Gia đình',
      capacity: 100,
      power: '120W',
      price: 2800000,
      originalPrice: 3200000,
      discount: 88,
      rating: 4.7,
      reviews: 285,
      sold: 680,
      image: 'chicken farm',
      inStock: true,
    },
    {
      id: '2',
      name: 'Máy Ấp Trứng Mini 50',
      category: 'Gia đình',
      capacity: 50,
      power: '80W',
      price: 1500000,
      originalPrice: 1800000,
      discount: 88,
      rating: 4.5,
      reviews: 128,
      sold: 450,
      image: 'eggs incubator',
      inStock: true,
    },
    {
      id: '3',
      name: 'Máy Ấp Trứng Pro 200',
      category: 'Trang trại nhỏ',
      capacity: 200,
      power: '150W',
      price: 4500000,
      originalPrice: 5000000,
      discount: 90,
      rating: 4.8,
      reviews: 189,
      sold: 350,
      image: 'poultry farming',
      inStock: true,
      badge: 'Bán chạy',
    },
    {
      id: '4',
      name: 'Máy Ấp Trứng Smart 500',
      category: 'Trang trại lớn',
      capacity: 500,
      power: '300W',
      price: 8900000,
      originalPrice: 10000000,
      discount: 92,
      rating: 4.9,
      reviews: 95,
      sold: 210,
      image: 'smart incubator',
      inStock: true,
      badge: 'IoT',
    },
    {
      id: '5',
      name: 'Máy Ấp Trứng Basic 200',
      category: 'Trang trại nhỏ',
      capacity: 200,
      power: '140W',
      price: 3200000,
      rating: 4.6,
      reviews: 167,
      sold: 380,
      image: 'egg hatcher',
      inStock: true,
    },
    {
      id: '6',
      name: 'Máy Ấp Trứng Industrial 1000',
      category: 'Trang trại lớn',
      capacity: 1000,
      power: '500W',
      price: 15000000,
      originalPrice: 18000000,
      discount: 94,
      rating: 5.0,
      reviews: 45,
      sold: 85,
      image: 'industrial incubator',
      inStock: true,
      badge: 'Cao cấp',
    },
  ];

  const categories = [
    { id: 'all', name: 'Tất cả', count: products.length },
    { id: 'family', name: 'Gia đình', count: 2 },
    { id: 'small', name: 'Trang trại nhỏ', count: 2 },
    { id: 'large', name: 'Trang trại lớn', count: 2 },
  ];

  const handleAddToCart = (product: Product) => {
    setCartCount(cartCount + 1);
    onAddToCart(product);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="font-bold text-xl text-slate-800">Cửa hàng</h1>
                <p className="text-xs text-slate-500">Chọn máy ấp phù hợp</p>
              </div>
            </div>
            <button
              onClick={onViewCart}
              className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={24} className="text-slate-700" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </div>
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm máy ấp trứng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Title & Filter */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Sản phẩm</h2>
            <p className="text-slate-600 text-sm">Tìm thấy {filteredProducts.length} sản phẩm</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Filter size={18} />
            <span className="text-sm font-semibold">Bộ lọc</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:border-blue-600'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-slate-200 relative">
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {product.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                <ImageWithFallback
                  src={`https://source.unsplash.com/400x300/?${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Category tag */}
                <div className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded mb-2 font-medium">
                  {product.category}
                </div>

                {/* Name */}
                <h3 className="font-bold text-base text-slate-800 mb-2">{product.name}</h3>

                {/* Specs */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Sức chứa: {product.capacity} trứng</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Công suất: {product.power}</span>
                  </div>
                  {product.discount && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Tỉ lệ nở: {product.discount}%</span>
                    </div>
                  )}
                </div>

                {/* Rating & Sold */}
                <div className="flex items-center gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-slate-800">{product.rating}</span>
                    <span className="text-slate-500 text-xs">({product.reviews})</span>
                  </div>
                  <div className="text-slate-500 text-xs">• {product.sold} đã bán</div>
                </div>

                {/* Price */}
                <div className="mb-3">
                  {product.originalPrice && (
                    <div className="text-slate-400 text-xs line-through mb-1">
                      {product.originalPrice.toLocaleString('vi-VN')} ₫
                    </div>
                  )}
                  <div className="text-xl font-bold text-blue-600">
                    {product.price.toLocaleString('vi-VN')} ₫
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewDetail(product)}
                    className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-sm"
                  >
                    Chi tiết
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingCart size={16} />
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}