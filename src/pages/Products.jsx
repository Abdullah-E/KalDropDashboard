import React from 'react';

const Products = () => {
  return (
    <div className="m-auto p-8 bg-gray-100 min-h-screen w-2/4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Products</h1>
      <p className="text-gray-600 mb-6">View and manage your products.</p>

      {/* Filter & Actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Filter products..."
            className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            + Supplier
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-black text-white rounded-md flex items-center hover:bg-gray-800">
            <span className="mr-2">Import Product</span>
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            View
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Supplier</th>
              <th className="px-4 py-2 text-left text-gray-600">Price</th>
              <th className="px-4 py-2 text-left text-gray-600">Upload Date</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              {
                name: 'Cadenas de Acero Inoxidable',
                supplier: 'eBay',
                price: '$82.50',
                uploadDate: '12/19/2024',
                image: 'path/to/image1.jpg',
              },
              {
                name: 'Anillos Sortijas 14k',
                supplier: 'eBay',
                price: '$44.85',
                uploadDate: '12/19/2024',
                image: 'path/to/image2.jpg',
              },
              {
                name: 'Casaca De Hombre Chamarra',
                supplier: 'eBay',
                price: '$62.99',
                uploadDate: '12/19/2024',
                image: 'path/to/image3.jpg',
              },
            ].map((product, index) => (
              <tr key={index}>
                <td className="px-4 py-3 flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span className="text-gray-800">{product.name}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-orange-500">{product.supplier}</span>
                </td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3">{product.uploadDate}</td>
                <td className="px-4 py-3">
                  <button className="text-gray-500 hover:text-gray-800">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
