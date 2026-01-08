import { useState } from 'react';
import { Egg, Mail, Phone, Lock } from 'lucide-react';

type LoginScreenProps = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, would validate credentials
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white rounded-full p-6 mb-4">
            <Egg size={48} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Máy Ấp Thông Minh</h1>
          <p className="text-white/80">Quản lý ấp trứng dễ dàng</p>
        </div>

        {/* Login form */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-center">Đăng nhập</h2>

          {/* Method tabs */}
          <div className="flex gap-2 mb-6 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                method === 'phone'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone size={16} className="inline mr-2" />
              Số điện thoại
            </button>
            <button
              onClick={() => setMethod('email')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                method === 'email'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail size={16} className="inline mr-2" />
              Email
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Identifier input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {method === 'phone' ? 'Số điện thoại' : 'Email'}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {method === 'phone' ? <Phone size={20} /> : <Mail size={20} />}
                </div>
                <input
                  type={method === 'phone' ? 'tel' : 'email'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={method === 'phone' ? '0901234567' : 'email@example.com'}
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <button type="button" className="text-sm text-blue-600 hover:underline">
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Đăng nhập
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Chưa có tài khoản?{' '}
            <button className="text-blue-600 font-semibold hover:underline">
              Đăng ký ngay
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          Bằng việc đăng nhập, bạn đồng ý với Điều khoản sử dụng
        </p>
      </div>
    </div>
  );
}
