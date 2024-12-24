import React, { useState } from 'react';
import { Search, ArrowUpDown, MoreVertical } from 'lucide-react';

const Orders = () => {
  // Sample data - replace with your actual data
  const sampleOrders = [
    {
      id: '27-12398-37783',
      status: 'Unhandled order',
      product: 'Carteras De Mujer De Moda Piel Bolsos Moneder...',
      supplier: 'ebay',
      amount: 29.90,
      quantity: 1,
      shipped: 'Not shipped',
      createdAt: '06/12/2024'
    },
    {
      id: '08-12405-58339',
      product: 'Pulsera Esclava Brazalete Manilla de Oro 10K...',
      supplier: 'ebay',
      amount: 17.90,
      quantity: 1,
      shipped: '05/12/2024',
      createdAt: '03/12/2024'
    },
    // Add more sample orders as needed
  ];

  const [orders, setOrders] = useState(sampleOrders);
  const [filterText, setFilterText] = useState('');

  return (
    <div className="flex-1 overflow-auto bg-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My orders</h1>
        <p className="text-gray-600">View and manage your stores orders.</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter orders..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Supplier</option>
              <option value="ebay">eBay</option>
            </select>
            <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Is handled</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            View
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 p-4">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  <button className="flex items-center gap-1">
                    Order No.
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Supplier</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  <button className="flex items-center gap-1">
                    Amount
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  <button className="flex items-center gap-1">
                    Quantity
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  <button className="flex items-center gap-1">
                    Shipped
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  <button className="flex items-center gap-1">
                    Created At
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="w-8 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-3">
                    {order.status && (
                      <div className="mb-1">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          {order.status}
                        </span>
                      </div>
                    )}
                    <span className="text-sm">{order.id}</span>
                  </td>
                  <td className="px-4 py-3 text-sm">{order.product}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">Ebay</span>
                  </td>
                  <td className="px-4 py-3 text-sm">${order.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">{order.quantity}</td>
                  <td className="px-4 py-3 text-sm">{order.shipped}</td>
                  <td className="px-4 py-3 text-sm">{order.createdAt}</td>
                  <td className="px-4 py-3">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;