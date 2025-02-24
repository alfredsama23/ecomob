import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Bus, 
  Bike, 
  Clock, 
  CreditCard, 
  MapPin, 
  Navigation, 
  Phone,
  Search,
  Shield,
  Cloud,
  Trophy,
  Zap,
  Settings,
  Sun,
  Leaf
} from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { useAuthStore } from './store/authStore';

function Feature({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
      <div className="p-3 bg-blue-100 rounded-full mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleLogin = (mode: 'user' | 'admin') => {
    setIsAdminMode(mode === 'admin');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        isAdminMode={isAdminMode}
      />
      
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">ECOmob Smart Urban Mobility</h1>
              <p className="text-xl mb-8">Experience the future of sustainable transportation with smart weather-aware routing, eco-rewards, and modular e-bikes.</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleLogin('user')}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition"
                >
                  User Login
                </button>
                <button 
                  onClick={() => handleLogin('admin')}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition"
                >
                  Admin Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Smart Features for Smart Travel</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature 
              icon={Cloud}
              title="Smart Weather Routing"
              description="Get intelligent transport recommendations based on real-time weather. We'll suggest a bus when it's raining or an e-bike on sunny days."
            />
            <Feature 
              icon={Trophy}
              title="Eco-Rewards System"
              description="Earn points for choosing green transport options. Compete in challenges and redeem rewards like free rides and shopping vouchers."
            />
            <Feature 
              icon={Zap}
              title="Wireless Charging"
              description="Experience hassle-free charging with wireless pads at stations. Always find a fully charged bike ready for your journey."
            />
            <Feature 
              icon={Settings}
              title="Modular Smart Bikes"
              description="Customize your ride with add-ons like storage boxes and phone holders. Auto-adjusting seats for perfect comfort."
            />
            <Feature 
              icon={Sun}
              title="Solar-Powered Stations"
              description="Sustainable charging stations powered by solar energy, providing green power for bikes and free WiFi."
            />
            <Feature 
              icon={Shield}
              title="Smart Security"
              description="Advanced anti-theft system with smart locks and real-time tracking for worry-free rides."
            />
          </div>
        </div>
      </div>

      {/* Eco-Rewards Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">Earn While You Save the Planet 🌍</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Leaf className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Eco Points System</h3>
                    <p className="text-gray-600">Earn points for every kg of CO₂ saved by choosing green transport options.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Weekly Challenges</h3>
                    <p className="text-gray-600">Join eco-challenges and compete for exclusive rewards and bonuses.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Valuable Rewards</h3>
                    <p className="text-gray-600">Redeem points for free rides, shopping vouchers, and premium features.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1708037227099-64249d177529?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Eco-friendly urban mobility" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Smart Stations Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">Next-Gen Charging Stations ⚡</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Sun className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Solar-Powered Infrastructure</h3>
                    <p className="text-gray-600">Sustainable energy powers our stations, providing green charging for all e-bikes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Wireless Charging</h3>
                    <p className="text-gray-600">Simply park your bike at any station for automatic wireless charging.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-6 h-6 text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Smart Maintenance</h3>
                    <p className="text-gray-600">Automated system checks and predictive maintenance keep bikes in perfect condition.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1621394445346-c7b502f07206?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Electric bike charging station" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Transform Your Daily Commute?</h2>
          <div className="flex justify-center gap-6">
            <button 
              onClick={() => handleLogin('user')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Login Now
            </button>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">Making urban mobility smarter, easier, and more sustainable.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Download App</a></li>
                <li><a href="#" className="hover:text-white">Locations</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <div className="flex items-center text-gray-400 mb-2">
                <Phone className="w-5 h-5 mr-2" />
                <span>1-800-123-4567</span>
              </div>
              <p className="text-gray-400">support@smartmobility.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ECOmob Smart Urban Mobility. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;