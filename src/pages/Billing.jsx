import React from 'react';

const Billing = () => {
  return (
    <div className="m-auto p-8 bg-gray-100 min-h-screen w-2/4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Integration</h1>
      <p className="text-gray-600 mb-6">
        Add funds
      </p>

      {/* Payment Action Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Options</h2>
        <div className="space-y-4">
          {/* Add Funds */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Add Funds</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                Add Money
              </button>
            </div>
          </div>

          {/* Request Payment */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Request Payment</label>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter recipient email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                Request
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for Paddle Integration */}
      <div className="bg-gray-200 shadow rounded-lg p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Paddle Integration</h2>
        
      </div>
    </div>
  );
};
export default Billing;
