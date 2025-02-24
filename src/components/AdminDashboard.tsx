import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

// Mock data for demonstration
const dailyStats = {
  busServices: 2456,
  bikeServices: 1893,
  totalRevenue: 185450,
  activeUsers: 12834,
  busUsageByHour: [45, 78, 156, 234, 312, 389, 423, 467, 445, 378, 289, 234, 189, 167, 189, 234, 312, 378, 345, 289, 234, 167, 123, 89],
  bikeUsageByHour: [23, 45, 89, 156, 234, 312, 345, 378, 412, 389, 345, 289, 234, 189, 167, 189, 234, 267, 234, 189, 156, 123, 89, 45],
  revenueByDay: [156500, 167800, 189300, 198500, 185450, 192300, 187600],
  userGrowth: [8450, 9200, 10150, 11300, 12100, 12834],
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();

  const stats = [
    { icon: Clock, label: 'Bus Services Today', value: dailyStats.busServices.toLocaleString() },
    { icon: Clock, label: 'Bike Services Today', value: dailyStats.bikeServices.toLocaleString() },
    { icon: DollarSign, label: 'Total Revenue', value: `${dailyStats.totalRevenue.toLocaleString()} DZD` },
    { icon: Users, label: 'Active Users', value: dailyStats.activeUsers.toLocaleString() },
  ];

  const renderGridLines = () => (
    <div className="absolute inset-0 flex flex-col justify-between">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-full border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
          style={{ bottom: `${(i * 100) / 4}%` }}
        />
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <Icon className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 className="text-xl font-semibold mb-6">Hourly Usage Comparison</h2>
            <div className="h-80 relative">
              {renderGridLines()}
              <div className="absolute inset-0 flex items-end justify-between gap-1">
                {dailyStats.busUsageByHour.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col gap-1">
                      <div 
                        className={`w-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'} rounded-t`}
                        style={{ height: `${(value / 500) * 100}%` }}
                      />
                      <div 
                        className={`w-full ${isDarkMode ? 'bg-green-400' : 'bg-green-500'} rounded-t`}
                        style={{ height: `${(dailyStats.bikeUsageByHour[index] / 500) * 100}%` }}
                      />
                    </div>
                    <div className="mt-2 -rotate-45 origin-top-left">
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {String(index).padStart(2, '0')}:00
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Bus Services
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${isDarkMode ? 'bg-green-400' : 'bg-green-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Bike Services
                </span>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 className="text-xl font-semibold mb-6">Weekly Revenue</h2>
            <div className="h-80 relative">
              {renderGridLines()}
              <div className="absolute inset-0 flex items-end justify-between gap-4">
                {dailyStats.revenueByDay.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full ${isDarkMode ? 'bg-purple-400' : 'bg-purple-500'} rounded-t`}
                      style={{ height: `${(value / 200000) * 100}%` }}
                    />
                    <div className="mt-2 text-center">
                      <span className={`text-xs block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Day {index + 1}
                      </span>
                      <span className={`text-xs font-medium block mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {(value / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-xl font-semibold mb-6">User Growth</h2>
          <div className="h-80 relative">
            {renderGridLines()}
            <div className="absolute inset-0 flex items-end justify-between gap-4">
              {dailyStats.userGrowth.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full ${isDarkMode ? 'bg-teal-400' : 'bg-teal-500'} rounded-t`}
                    style={{ height: `${(value / 15000) * 100}%` }}
                  />
                  <div className="mt-2 text-center">
                    <span className={`text-xs block ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Week {index + 1}
                    </span>
                    <span className={`text-xs font-medium block mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {(value / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}