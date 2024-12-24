import React from 'react';

const Supplier = () => {
  return (
    <div className="m-auto p-8 bg-gray-100 min-h-screen w-2/4">
      <h1 className="text-2xl font-semibold mb-6">Suppliers</h1>
      <div className="space-y-8">
        {/* General Listing Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">General Listing Settings</h2>
          <div className="space-y-4">
            {/* Marketplace region */}
            <div>
              <label className="block font-medium mb-2">Marketplace region</label>
              <select className="w-full p-2 border rounded-md">
                <option>United States</option>
                {/* Add other options here */}
              </select>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="toggle-checkbox" />
                <span>Upload product videos</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="toggle-checkbox" />
                <span>Include out of stock variations</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="toggle-checkbox" />
                <span>Duplicate to max photos</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="toggle-checkbox" />
                <span>Fixed item specifics</span>
              </label>
            </div>

            {/* Set Fixed Item Specifics */}
            <div>
              <h3 className="font-medium mb-2">Set fixed item specifics</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-1/2 p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Value"
                  className="w-1/2 p-2 border rounded-md"
                />
                <button className="p-2 bg-gray-100 text-gray-700 rounded-md">
                  +
                </button>
              </div>
            </div>

            {/* Additional Toggles */}
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="toggle-checkbox" />
              <span>Add border to main image</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="toggle-checkbox" />
              <span>Promoted listings</span>
            </label>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            Save
          </button>
        </div>

        {/* Template Listing Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Template Listing Settings</h2>
          <div className="space-y-4">
            {/* Use Custom Template */}
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="toggle-checkbox" />
              <span>Use custom template</span>
            </label>

            {/* Base Template */}
            <div>
              <label className="block font-medium mb-2">Base template</label>
              <select className="w-full p-2 border rounded-md">
                <option>Basic</option>
                {/* Add other options here */}
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block font-medium mb-2">Country</label>
              <select className="w-full p-2 border rounded-md">
                <option>China</option>
                {/* Add other options here */}
              </select>
            </div>

            {/* Item Location */}
            <div>
              <label className="block font-medium mb-2">Item location</label>
              <input
                type="text"
                placeholder="Shanghai"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
