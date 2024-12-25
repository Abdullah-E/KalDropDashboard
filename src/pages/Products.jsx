import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base API URL
  const API_BASE_URL = "http://localhost:3000/api/v1"; // Replace with your actual BASE_PATH if needed

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const userId = "a077e5a3-d54f-4c81-9d7e-d42465873881"; // Replace with actual user ID
      const response = await fetch(`${API_BASE_URL}/user/${userId}/products`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data); // Set products data
      } catch (err) {
      setError(err.message);
      } finally {
      setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        {loading ? (
          <p className="text-center py-6">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-6">Error: {error}</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">ID</th>
                <th className="px-4 py-2 text-left text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Price</th>
                <th className="px-4 py-2 text-left text-gray-600">Supplier</th>
                <th className="px-4 py-2 text-left text-gray-600">URL</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product.id || index}>
                  <td className="px-4 py-3">{product.id}</td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.price}</td>
                  <td className="px-4 py-3">{product.supplier}</td>
                  <td className="px-4 py-3">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Product
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`/edit-product/${product.id}`}
                      className="text-gray-500 hover:text-gray-800"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
