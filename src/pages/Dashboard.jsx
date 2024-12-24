import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const revenueData = [
    { date: '2024-12-18', value: 10 },
    { date: '2024-12-19', value: 30 },
    { date: '2024-12-20', value: 2000 },
    { date: '2024-12-21', value: 590 },
    { date: '2024-12-22', value: 0 },
    { date: '2024-12-23', value: 2500 }
  ];

  return (
    
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Quickly assess your success.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 mb-2">Orders</div>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">In the last 7 days</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 mb-2">Income</div>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-gray-500">In the last 7 days</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 mb-2">Sell through rate</div>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-gray-500">In the last 7 days</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 mb-2">Avg income</div>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-gray-500">Per day in the last 7 days</p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Revenue</h2>
              <p className="text-sm text-gray-500">Revenue over the last 7 days</p>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(str) => {
                      const date = new Date(str);
                      return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
                    }}
                  />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    strokeWidth={2} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Top sellers</h2>
                <p className="text-sm text-gray-500">Top selling products in the last 7 days</p>
              </div>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Top Countries</h2>
                <p className="text-sm text-gray-500">Top countries by number of orders in the last 7 days</p>
              </div>
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          </div>
        </div>
        </div>
  );
};

export default Dashboard;