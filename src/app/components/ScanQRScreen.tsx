import { useState } from 'react';
import { ArrowLeft, QrCode, CheckCircle2, XCircle } from 'lucide-react';

type ScanQRScreenProps = {
  onBack: () => void;
};

export default function ScanQRScreen({ onBack }: ScanQRScreenProps) {
  const [scanStatus, setScanStatus] = useState<'scanning' | 'success' | 'error' | null>(null);
  const [message, setMessage] = useState('');

  const simulateScan = (isValid: boolean) => {
    setScanStatus('scanning');
    
    setTimeout(() => {
      if (isValid) {
        setScanStatus('success');
        setMessage('Máy ấp đã được thêm thành công!');
        setTimeout(() => {
          onBack();
        }, 2000);
      } else {
        setScanStatus('error');
        setMessage('Mã QR không hợp lệ hoặc đã được đăng ký bởi tài khoản khác');
      }
    }, 1500);
  };

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
        <h1 className="font-semibold text-lg">Thêm máy ấp mới</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Hướng dẫn quét mã QR</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Tìm mã QR ở mặt sau của máy ấp</li>
            <li>Đưa mã QR vào khung hình bên dưới</li>
            <li>Đợi hệ thống xác thực và kết nối</li>
          </ol>
        </div>

        {/* Scanner frame */}
        <div className="relative aspect-square max-w-sm mx-auto mb-6">
          <div className="absolute inset-0 bg-black/80 rounded-2xl overflow-hidden">
            {/* Camera placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              {scanStatus === null && (
                <div className="text-white/60 flex flex-col items-center">
                  <QrCode size={64} className="mb-2" />
                  <p className="text-sm">Sẵn sàng quét</p>
                </div>
              )}
              
              {scanStatus === 'scanning' && (
                <div className="text-white flex flex-col items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white mb-3"></div>
                  <p className="text-sm">Đang xác thực...</p>
                </div>
              )}

              {scanStatus === 'success' && (
                <div className="text-green-400 flex flex-col items-center">
                  <CheckCircle2 size={64} className="mb-2" />
                  <p className="text-sm text-white">{message}</p>
                </div>
              )}

              {scanStatus === 'error' && (
                <div className="text-red-400 flex flex-col items-center px-6">
                  <XCircle size={64} className="mb-2" />
                  <p className="text-sm text-white text-center">{message}</p>
                </div>
              )}
            </div>

            {/* Scan corners */}
            {scanStatus === null && (
              <>
                <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                
                {/* Scanning line animation */}
                <div className="absolute inset-x-8 top-8 h-0.5 bg-blue-500 animate-pulse"></div>
              </>
            )}
          </div>
        </div>

        {/* Demo buttons */}
        {scanStatus === null && (
          <div className="space-y-3 max-w-sm mx-auto">
            <p className="text-center text-sm text-slate-500 mb-4">
              (Demo: Nhấn nút bên dưới để mô phỏng quét)
            </p>
            <button
              onClick={() => simulateScan(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Quét thành công
            </button>
            <button
              onClick={() => simulateScan(false)}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Quét thất bại
            </button>
          </div>
        )}

        {scanStatus === 'error' && (
          <div className="max-w-sm mx-auto">
            <button
              onClick={() => {
                setScanStatus(null);
                setMessage('');
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Quét lại
            </button>
          </div>
        )}

        {/* Help text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 mb-2">Gặp vấn đề?</p>
          <button className="text-blue-600 font-medium hover:underline">
            Liên hệ hỗ trợ
          </button>
        </div>
      </div>
    </div>
  );
}
