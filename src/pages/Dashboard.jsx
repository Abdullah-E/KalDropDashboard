import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useGet } from '../api/useGet';
import { useUser } from '../Components/ProtectedRoute';
const Dashboard = () => {
  const revenueData = [
    { date: '2024-12-18', value: 10 },
    { date: '2024-12-19', value: 30 },
    { date: '2024-12-20', value: 2000 },
    { date: '2024-12-21', value: 590 },
    { date: '2024-12-22', value: 0 },
    { date: '2024-12-23', value: 2500 }
  ];
  const { data: products } = useGet('products');
  console.log('Products:', products);
  const productCount = Array.isArray(products) ? products.length : 0;
  const user = useUser();
    console.log('User:', user);

  return (
    <div className="flex-1 bg-gradient-to-br from-[#94abbe] to-[#eef2f9] min-h-screen p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Dashboard</h1>
        <p className="text-black text-lg">{user.first_name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-[#e5eaf3]">
          <h3 className="text-[#94a2be] font-medium mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-black">{productCount}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-[#e5eaf3]">
          <h3 className="text-[#94a2be] font-medium mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-black">$2,500</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-[#e5eaf3]">
          <h3 className="text-[#94a2be] font-medium mb-2">Active Listings</h3>
          <p className="text-3xl font-bold text-black">150</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-[#e5eaf3]">
          <h3 className="text-[#94a2be] font-medium mb-2">Success Rate</h3>
          <p className="text-3xl font-bold text-black">95%</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-[#e5eaf3]">
        <h2 className="text-2xl font-bold text-black mb-6">Revenue Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis 
                dataKey="date" 
                stroke="#94a2be"
                tickLine={false}
              />
              <YAxis 
                stroke="#94a2be"
                tickLine={false}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4f6ed3"
                strokeWidth={2}
                dot={{ fill: '#4f6ed3', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;