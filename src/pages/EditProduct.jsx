import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePut } from '../api/usePut';
import { useGet } from '../api/useGet';

const ImagePreview = ({ src, className }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative bg-gray-100 rounded-md overflow-hidden ${className}`}>
      {src && !hasError ? (
        <img
          src={src}
          alt="Preview"
          className="w-full h-full object-contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
};

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { putData, loading: updating, error: updateError } = usePut();
  const { data: fetchedProduct, loading: fetching, error: fetchError } = useGet(`products/${id}`);

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

  useEffect(() => {
    if (fetchedProduct) setProduct(fetchedProduct);
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
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (name, value, index) => {
    setProduct(prev => ({
      ...prev,
      [name]: prev[name].map((item, i) => i === index ? value : item)
    }));
  };

  if (fetching) return <div className="flex justify-center items-center min-h-screen"><p className="text-lg">Loading product...</p></div>;
  if (fetchError || updateError) return <div className="flex justify-center items-center min-h-screen"><p className="text-red-500">Error: {fetchError || updateError}</p></div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
              <input
                type="url"
                name="url"
                value={product.url}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={product.originalPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price</label>
              <input
                type="number"
                name="sellingPrice"
                value={product.sellingPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Image Sections */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Main Images</label>
              <div className="grid grid-cols-1 gap-4">
              {product.images.map((image, index) => (
  <div key={index} className="flex gap-4 items-start">
    <ImagePreview src={image} className="w-32 h-32 shrink-0" />
    <div className="flex-1 space-y-2">
      <input
        type="text"
        value={image}
        onChange={(e) => handleArrayInputChange('images', e.target.value, index)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Image URL"
      />
      <button
        type="button"
        onClick={() => setProduct(prev => ({
          ...prev,
          images: prev.images.filter((_, i) => i !== index)
        }))} // Fixed here
        className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Remove Image
      </button>
    </div>
  </div>
))}
                <button
                  type="button"
                  onClick={() => setProduct(prev => ({ ...prev, images: [...prev.images, ''] }))}
                  className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  + Add New Image
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Description Images</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.descriptionImages.map((image, index) => (
  <div key={index} className="group relative">
    <ImagePreview src={image} className="w-full h-48" />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
      <input
        type="text"
        value={image}
        onChange={(e) => handleArrayInputChange('descriptionImages', e.target.value, index)}
        className="w-full mx-2 px-2 py-1 text-sm bg-white rounded border border-gray-300"
        placeholder="Image URL"
      />
      <button
        type="button"
        onClick={() => setProduct(prev => ({
          ...prev,
          descriptionImages: prev.descriptionImages.filter((_, i) => i !== index)
        }))} // Fixed here
        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
))}
                <button
                  type="button"
                  onClick={() => setProduct(prev => ({ ...prev, descriptionImages: [...prev.descriptionImages, ''] }))}
                  className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  + Add Description Image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 border-t pt-6">
          <button
            type="submit"
            disabled={updating}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {updating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;