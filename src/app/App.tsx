import { useState } from 'react';
import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import ScanQRScreen from './components/ScanQRScreen';
import CreateBatchScreen from './components/CreateBatchScreen';
import StartSuccessScreen from './components/StartSuccessScreen';
import MonitoringScreen from './components/MonitoringScreen';
import UpdateBatchScreen from './components/UpdateBatchScreen';
import ReportsScreen from './components/ReportsScreen';
import AIChatScreen from './components/AIChatScreen';
import ProductsScreen from './components/ProductsScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import CartScreen from './components/CartScreen';
import CheckoutScreen from './components/CheckoutScreen';

export type Screen = 
  | 'onboarding'
  | 'login'
  | 'home'
  | 'scanQR'
  | 'createBatch'
  | 'startSuccess'
  | 'monitoring'
  | 'updateBatch'
  | 'reports'
  | 'aiChat'
  | 'products'
  | 'productDetail'
  | 'cart'
  | 'checkout';

export type Device = {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'completed' | 'idle';
  currentBatch?: Batch;
};

export type Batch = {
  id: string;
  deviceId: string;
  eggType: string;
  totalEggs: number;
  remainingEggs: number;
  hatchedEggs: number;
  damagedEggs: number;
  startDate: Date;
  estimatedHatchDate: Date;
  currentDay: number;
  temperature: number;
  humidity: number;
  targetTemperature: number;
  targetHumidity: number;
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [newBatchData, setNewBatchData] = useState<{
    eggType: string;
    totalEggs: number;
    temperature: number;
    humidity: number;
    days: number;
  } | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  const handleSelectDevice = (device: Device) => {
    setSelectedDevice(device);
    if (device.currentBatch) {
      setSelectedBatch(device.currentBatch);
      setCurrentScreen('monitoring');
    } else {
      setCurrentScreen('createBatch');
    }
  };

  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedDevice(null);
    setSelectedBatch(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={() => setCurrentScreen('login')} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'home':
        return (
          <HomeScreen
            onSelectDevice={handleSelectDevice}
            onScanQR={() => setCurrentScreen('scanQR')}
            onViewReports={() => setCurrentScreen('reports')}
            onOpenAIChat={() => setCurrentScreen('aiChat')}
            onShop={() => setCurrentScreen('products')}
          />
        );
      case 'scanQR':
        return <ScanQRScreen onBack={handleBack} />;
      case 'createBatch':
        return (
          <CreateBatchScreen
            device={selectedDevice}
            onBack={handleBack}
            onComplete={() => setCurrentScreen('startSuccess')}
            setNewBatchData={setNewBatchData}
          />
        );
      case 'startSuccess':
        return newBatchData ? (
          <StartSuccessScreen
            eggType={newBatchData.eggType}
            totalEggs={newBatchData.totalEggs}
            temperature={newBatchData.temperature}
            humidity={newBatchData.humidity}
            days={newBatchData.days}
            onComplete={() => {
              // Create a new batch object from newBatchData
              const newBatch: Batch = {
                id: `batch-${Date.now()}`,
                deviceId: selectedDevice?.id || '',
                eggType: newBatchData.eggType,
                totalEggs: newBatchData.totalEggs,
                remainingEggs: newBatchData.totalEggs,
                hatchedEggs: 0,
                damagedEggs: 0,
                startDate: new Date(),
                estimatedHatchDate: new Date(Date.now() + newBatchData.days * 24 * 60 * 60 * 1000),
                currentDay: 1,
                temperature: newBatchData.temperature,
                humidity: newBatchData.humidity,
                targetTemperature: newBatchData.temperature,
                targetHumidity: newBatchData.humidity,
              };
              setSelectedBatch(newBatch);
              setCurrentScreen('monitoring');
            }}
          />
        ) : null;
      case 'monitoring':
        return (
          <MonitoringScreen
            batch={selectedBatch}
            onBack={handleBack}
            onUpdateBatch={() => setCurrentScreen('updateBatch')}
          />
        );
      case 'updateBatch':
        return (
          <UpdateBatchScreen
            batch={selectedBatch}
            onBack={() => setCurrentScreen('monitoring')}
          />
        );
      case 'reports':
        return <ReportsScreen onBack={handleBack} />;
      case 'aiChat':
        return <AIChatScreen onBack={handleBack} />;
      case 'products':
        return (
          <ProductsScreen
            onBack={handleBack}
            onViewCart={() => setCurrentScreen('cart')}
            onViewDetail={(product) => {
              setSelectedProduct(product);
              setCurrentScreen('productDetail');
            }}
            onAddToCart={(product) => {
              setCartItems([...cartItems, product]);
            }}
          />
        );
      case 'productDetail':
        return (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={() => setCurrentScreen('products')}
            onAddToCart={(product, quantity) => {
              setCartItems([...cartItems, { ...product, quantity }]);
            }}
            onBuyNow={(product, quantity) => {
              setCartItems([{ ...product, quantity }]);
              setOrderTotal(product.price * quantity);
              setCurrentScreen('cart');
            }}
          />
        );
      case 'cart':
        return (
          <CartScreen
            onBack={() => setCurrentScreen('products')}
            onCheckout={(items, total) => {
              setCartItems(items);
              setOrderTotal(total);
              setCurrentScreen('checkout');
            }}
          />
        );
      case 'checkout':
        return (
          <CheckoutScreen
            onBack={() => setCurrentScreen('cart')}
            items={cartItems}
            total={orderTotal}
            onComplete={handleBack}
          />
        );
      default:
        return <HomeScreen onSelectDevice={handleSelectDevice} onScanQR={() => setCurrentScreen('scanQR')} onViewReports={() => setCurrentScreen('reports')} onOpenAIChat={() => setCurrentScreen('aiChat')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {renderScreen()}
    </div>
  );
}

export default App;