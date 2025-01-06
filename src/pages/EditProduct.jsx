import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePut } from '../api/usePut';
import { useGet } from '../api/useGet';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const { putData, loading: updating, error: updateError } = usePut();
  const { data: fetchedProduct, loading: fetching, error: fetchError } = useGet(`products/${id}`);
console.log(fetchedProduct);
  const [product, setProduct] = useState({
    title: '',
    descriptionImages: [],
    images: [],
    price: 0,
    url: '',
    originalPrice: 0,
    sellingPrice: 0,
    specifications: {},
    variants: []
  });

  // Update form when product data is fetched
  useEffect(() => {
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    }
  }, [fetchedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await putData(`products/${id}`, product);
      navigate('/products');
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (name, value, index) => {
    setProduct(prev => ({
      ...prev,
      [name]: prev[name].map((item, i) => i === index ? value : item)
    }));
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  if (fetchError || updateError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {fetchError || updateError}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="url"
              name="url"
              value={product.url}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={product.originalPrice}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Selling Price</label>
              <input
                type="number"
                name="sellingPrice"
                value={product.sellingPrice}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            {product.images.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleArrayInputChange('images', e.target.value, index)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setProduct(prev => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== index)
                  }))}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setProduct(prev => ({
                ...prev,
                images: [...prev.images, '']
              }))}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Image
            </button>
          </div>

          {/* Description Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description Images</label>
            {product.descriptionImages.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleArrayInputChange('descriptionImages', e.target.value, index)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setProduct(prev => ({
                    ...prev,
                    descriptionImages: prev.descriptionImages.filter((_, i) => i !== index)
                  }))}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setProduct(prev => ({
                ...prev,
                descriptionImages: [...prev.descriptionImages, '']
              }))}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Description Image
            </button>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={updating}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {updating ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;