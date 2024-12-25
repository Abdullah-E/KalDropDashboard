import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    url: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const API_BASE_URL = "http://localhost:3000/api/v1"; // Replace with your actual BASE_PATH if needed

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        if (response.data.length > 0) {
          setProduct(response.data[0]); // Assuming the API returns an array with one product
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.put(`${API_BASE_URL}/products/${id}`, {
        name: product.name,
        price: product.price,
        url: product.url,
      });
      navigate("/products"); // Redirect to the products list after saving
    } catch (err) {
      setError(err.response?.data?.message || "Error updating product");
    } finally {
      setSaving(false);
    }
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="m-auto p-8 bg-gray-100 min-h-screen w-2/4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Product</h1>
      <p className="text-gray-600 mb-6">Modify product details below.</p>

      {loading ? (
        <p className="text-center py-6">Loading product...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-6">Error: {error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-gray-700">URL</label>
            <input
              type="url"
              name="url"
              value={product.url}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="ml-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
