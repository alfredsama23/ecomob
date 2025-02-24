import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { 
  Sun, 
  Moon, 
  LogOut, 
  TrendingUp, 
  Wallet, 
  Users, 
  Activity, 
  Plus, 
  X, 
  CreditCard, 
  Calendar, 
  KeySquare, 
  ZoomIn, 
  ZoomOut,
  Bus,
  Bike,
  Timer,
  QrCode,
  Navigation2,
  AlertCircle,
  Lock,
  Unlock
} from 'lucide-react';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BusTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (duration: number) => void;
}

interface BikeRentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRent: (duration: number) => void;
}

interface QRScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface Station {
  distance: number;
  time: number;
}

interface ActiveTicket {
  timeLeft: number;
}

interface BikeRental {
  timeLeft: number;
}

function TopUpModal({ isOpen, onClose }: TopUpModalProps) {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const addBalance = useAuthStore(state => state.addBalance);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount);
    if (numAmount > 0) {
      addBalance(numAmount);
      alert('Balance added successfully!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Top Up Balance</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount (DZD)
            </label>
            <select
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Select amount</option>
              <option value="1000">1,000 DZD</option>
              <option value="2000">2,000 DZD</option>
              <option value="5000">5,000 DZD</option>
              <option value="10000">10,000 DZD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                CVV
              </label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
                maxLength={3}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
}

function BusTicketModal({ isOpen, onClose, onPurchase }: BusTicketModalProps) {
  const [duration, setDuration] = useState(60);
  const deductBalance = useAuthStore(state => state.deductBalance);
  const balance = useAuthStore(state => state.balance);

  if (!isOpen) return null;

  const handlePurchase = () => {
    const cost = Math.floor(duration / 30) * 50; // 50 DZD per 30 minutes
    if (deductBalance(cost)) {
      onPurchase(duration);
      onClose();
    } else {
      alert('Insufficient balance!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Purchase Bus Ticket</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value={30}>30 minutes - 50 DZD</option>
              <option value={60}>1 hour - 100 DZD</option>
              <option value={120}>2 hours - 200 DZD</option>
              <option value={180}>3 hours - 300 DZD</option>
            </select>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>Your balance:</span>
            <span>{balance} DZD</span>
          </div>
          <button
            onClick={handlePurchase}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Purchase Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

function BikeRentalModal({ isOpen, onClose, onRent }: BikeRentalModalProps) {
  const [duration, setDuration] = useState(30);
  const deductBalance = useAuthStore(state => state.deductBalance);
  const balance = useAuthStore(state => state.balance);
  const [showQRScan, setShowQRScan] = useState(false);

  if (!isOpen) return null;

  const handleRent = () => {
    const cost = Math.floor(duration / 30) * 100; // 100 DZD per 30 minutes
    if (deductBalance(cost)) {
      setShowQRScan(true);
    } else {
      alert('Insufficient balance!');
    }
  };

  const handleQRComplete = () => {
    onRent(duration);
    onClose();
  };

  if (showQRScan) {
    return (
      <QRScanModal
        isOpen={true}
        onClose={() => setShowQRScan(false)}
        onComplete={handleQRComplete}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Rent E-Bike</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value={30}>30 minutes - 100 DZD</option>
              <option value={60}>1 hour - 200 DZD</option>
              <option value={120}>2 hours - 400 DZD</option>
              <option value={180}>3 hours - 600 DZD</option>
            </select>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>Your balance:</span>
            <span>{balance} DZD</span>
          </div>
          <button
            onClick={handleRent}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}

function QRScanModal({ isOpen, onClose, onComplete }: QRScanModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Scan QR Code</h2>
        <div className="space-y-6">
          <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
            <div 
              className="absolute inset-x-0 h-1 bg-blue-500 opacity-75"
              style={{ animation: 'scan 2s linear infinite' }}
            />
          </div>
          <button
            onClick={onComplete}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            I've Scanned the Code
          </button>
        </div>
      </div>
    </div>
  );
}

function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setPosition({ x: 0, y: 0 });
      setScale(1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setStartPos({ x: dist, y: 0 });
    } else {
      setIsDragging(true);
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const newScale = scale * (dist / (startPos.x || dist));
      setScale(Math.min(Math.max(newScale, 0.5), 3));
      setStartPos({ x: dist, y: 0 });
    } else if (isDragging) {
      const newX = e.touches[0].clientX - startPos.x;
      const newY = e.touches[0].clientY - startPos.y;

      const mapWidth = (mapRef.current?.offsetWidth || 0) * scale;
      const mapHeight = (mapRef.current?.offsetHeight || 0) * scale;
      const containerWidth = mapRef.current?.parentElement?.offsetWidth || 0;
      const containerHeight = mapRef.current?.parentElement?.offsetHeight || 0;

      const minX = containerWidth - mapWidth;
      const minY = containerHeight - mapHeight;

      setPosition({
        x: Math.min(0, Math.max(newX, minX)),
        y: Math.min(0, Math.max(newY, minY))
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800">
      <div className={`${isMobile ? 'h-[400px]' : 'h-[calc(100vh-16rem)]'} relative`}>
        <div
          ref={mapRef}
          className={`absolute ${isMobile ? 'cursor-grab active:cursor-grabbing' : ''}`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            touchAction: 'none',
            width: isMobile ? '100%' : 'auto',
            height: isMobile ? 'auto' : '100%'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src="https://i.imgur.com/RMdpfCS.png"
            alt="Interactive Map"
            className={isMobile ? 'w-full h-auto' : 'w-auto h-full'}
            draggable="false"
            style={{ objectFit: isMobile ? 'contain' : 'cover' }}
          />
        </div>
      </div>
      
      {isMobile && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-100"
          >
            <ZoomIn size={24} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-100"
          >
            <ZoomOut size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

export function Dashboard() {
  const { username, balance, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isBusTicketModalOpen, setIsBusTicketModalOpen] = useState(false);
  const [isBikeRentalModalOpen, setIsBikeRentalModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<'bus' | 'bike' | null>(null);
  const [activeTicket, setActiveTicket] = useState<ActiveTicket | null>(null);
  const [activeBikeRental, setActiveBikeRental] = useState<BikeRental | null>(null);
  const [nearestStation, setNearestStation] = useState<Station | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleServiceSelect = (service: 'bus' | 'bike') => {
    setSelectedService(service);
    setNearestStation({
      distance: 250,
      time: 3
    });
  };

  const handleBusTicketPurchase = (duration: number) => {
    setActiveTicket({ timeLeft: duration * 60 });
  };

  const handleBikeRental = (duration: number) => {
    setActiveBikeRental({ timeLeft: duration * 60 });
  };

  const handleActiveTicketClick = () => {
    alert('Ticket QR Code is already visible');
  };

  useEffect(() => {
    let interval: number;
    if (activeTicket) {
      interval = window.setInterval(() => {
        setActiveTicket(prev => {
          if (prev && prev.timeLeft > 0) {
            return { timeLeft: prev.timeLeft - 1 };
          }
          return null;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTicket]);

  useEffect(() => {
    let interval: number;
    if (activeBikeRental) {
      interval = window.setInterval(() => {
        setActiveBikeRental(prev => {
          if (prev && prev.timeLeft > 0) {
            return { timeLeft: prev.timeLeft - 1 };
          }
          return null;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeBikeRental]);

  const stats = [
    { icon: TrendingUp, label: 'Total Rides', value: '156' },
    { 
      icon: Wallet, 
      label: 'Balance', 
      value: `${balance} DZD`,
      action: {
        icon: Plus,
        onClick: () => setIsTopUpModalOpen(true)
      }
    },
    { icon: Users, label: 'Referrals', value: '12' },
    { icon: Activity, label: 'CO₂ Saved', value: '256kg' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <TopUpModal isOpen={isTopUpModalOpen} onClose={() => setIsTopUpModalOpen(false)} />
      <BusTicketModal 
        isOpen={isBusTicketModalOpen} 
        onClose={() => setIsBusTicketModalOpen(false)}
        onPurchase={handleBusTicketPurchase}
      />
      <BikeRentalModal
        isOpen={isBikeRentalModalOpen}
        onClose={() => setIsBikeRentalModalOpen(false)}
        onRent={handleBikeRental}
      />
      
      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                } text-white transition`}
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(({ icon: Icon, label, value, action }) => (
            <div
              key={label}
              className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <Icon className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                  </div>
                </div>
                {action && (
                  <button
                    onClick={action.onClick}
                    className={`p-2 rounded-full ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    } transition-colors`}
                  >
                    <action.icon size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => handleServiceSelect('bus')}
            className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg hover:shadow-xl transition-shadow ${
              selectedService === 'bus' ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <Bus className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2">Bus Service</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Public transportation with real-time tracking
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleServiceSelect('bike')}
            className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg hover:shadow-xl transition-shadow ${
              selectedService === 'bike' ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <Bike className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-2">E-Bike Service</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Eco-friendly bike sharing system
                </p>
              </div>
            </div>
          </button>
        </div>

        {selectedService === 'bus' && nearestStation && (
          <div className={`mb-8 p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <Navigation2 className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Nearest Bus Station</h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {nearestStation.distance}m away ({nearestStation.time} min walk)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBusTicketModalOpen(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Buy Ticket
              </button>
            </div>
            {activeTicket && (
              <button
                onClick={handleActiveTicketClick}
                className="w-full p-4 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-600 dark:text-green-400">
                    Active Ticket ({Math.floor(activeTicket.timeLeft / 60)}:{String(activeTicket.timeLeft % 60).padStart(2, '0')})
                  </span>
                </div>
                <span className="text-green-600 dark:text-green-400">View →</span>
              </button>
            )}
          </div>
        )}

        {selectedService === 'bike' && nearestStation && (
          <div className={`mb-8 p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <Navigation2 className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Nearest E-Bike Station</h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {nearestStation.distance}m away ({nearestStation.time} min walk)
                  </p>
                </div>
              </div>
              {!activeBikeRental && (
                <button
                  onClick={() => setIsBikeRentalModalOpen(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Rent Bike
                </button>
              )}
            </div>
            {activeBikeRental && (
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Unlock className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-600 dark:text-green-400">
                      E-Bike Unlocked - Enjoy your ride!
                    </span>
                  </div>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {Math.floor(activeBikeRental.timeLeft / 60)}:{String(activeBikeRental.timeLeft % 60).padStart(2, '0')} remaining
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={`rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
          <h2 className="text-xl font-semibold mb-4">Available Vehicles Nearby</h2>
          <InteractiveMap />
        </div>
      </main>
    </div>
  );
}