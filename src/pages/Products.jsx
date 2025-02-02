import React from 'react';
import { useGet } from '../api/useGet';

const ImagePreview = ({ imageUrl }) => {
  return (
    <div className="p-4 border rounded-md shadow-md">
      <img
        src={imageUrl}
        alt="Preview"
        className="w-full h-auto rounded-md"
      />
    </div>
  );
};


const Products = () => {
  const { data: products, loading, error } = useGet('products');

  return (
    <div className="m-auto p-8 bg-white min-h-screen w-4/4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Products</h1>
      <p className="text-gray-600 mb-6">View and manage your products.</p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Filter products..."
            className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
          />
         
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-[#2a4270] text-white rounded-md flex items-center hover:bg-gray-800">
            <span className="mr-2">Import Product</span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <p className="text-center py-6">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-6">Error: {error}</p>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-[#2a4270]">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Image</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Supplier</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product Link</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-[#eef2f9] divide-y divide-gray-200">
        {products?.map((product, index) => (
          <tr key={product.id || index} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="w-16 h-16 flex items-center justify-center bg-[#94abbe] rounded-md overflow-hidden">
                <ImagePreview 
                  imageUrl={product.images[0]} 
                  className="w-4 h-4 object-contain"
                />
              </div>
            </td>
            <td className="px-6 py-4 max-w-xs font-medium text-gray-900">
              {product.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="text-gray-900 font-medium">
                ${parseFloat(product.price).toFixed(2)}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
              {product.supplier}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                <span>View Product</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <a
                href={`/edit-product/${product.id}`}
                className="inline-flex items-center text-gray-500 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="ml-2">Edit</span>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  {products?.length === 0 && (
    <div className="text-center py-8 bg-gray-50">
      <p className="text-gray-500">No products found</p>
    </div>
  )}
</div>
        )}
      </div>
    </div>
  );
};

export default Products;
