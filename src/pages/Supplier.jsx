import React, { useState, useEffect } from 'react';
import { useGet } from '../api/useGet';
import { usePost } from '../api/usePost';
import { usePut } from '../api/usePut';

const Supplier = () => {
  // Fetch data and states
  //const { data: template, loading, error } = useGet('template');
  const { data: uploaderSettings, loading: uploaderLoading, error: uploaderError } = useGet('uploader-settings');
  console.log(uploaderSettings);
  const { putData, loading: postLoading, error: postError } = usePut();

  const [settings, setSettings] = useState({
    // General settings
    marketplaceRegion: 'United States',
    uploadVideos: false,
    includeOutOfStock: false,
    duplicateMaxPhotos: false,
    fixedItemSpecifics: false,
    addBorderToMainImage: false,
    promotedListings: false,

    // Template settings
    headerImage: '',
    footerImage: '',
    itemLocation: 'Shanghai',
    itemSpecifics: [
      { key: 'Shipping', value: 'Free shipping' },
      { key: 'Condition', value: 'New' },
      { key: 'Brand', value: 'Unbranded' },
    ],
  });

  const [feedbackMessage, setFeedbackMessage] = useState({ text: '', type: '' });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('supplierSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Display feedback message
  const showFeedback = (text, type) => {
    setFeedbackMessage({ text, type });
    setTimeout(() => setFeedbackMessage({ text: '', type: '' }), 3000);
  };

  // Update general settings
  const handleGeneralSettingChange = (setting, value) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        [setting]: value !== undefined ? value : !prev[setting],
      };
      localStorage.setItem('supplierSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Update item specifics
  const handleItemSpecificChange = (index, field, value) => {
    setSettings((prev) => {
      const updatedSpecifics = [...prev.itemSpecifics];
      updatedSpecifics[index] = { ...updatedSpecifics[index], [field]: value };
      const newSettings = { ...prev, itemSpecifics: updatedSpecifics };
      localStorage.setItem('supplierSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Add a new item specific
  const handleAddItemSpecific = () => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        itemSpecifics: [...prev.itemSpecifics, { key: '', value: '' }],
      };
      localStorage.setItem('supplierSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Remove an item specific
  const handleRemoveItemSpecific = (index) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        itemSpecifics: prev.itemSpecifics.filter((_, i) => i !== index),
      };
      localStorage.setItem('supplierSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Save settings
  const handleSaveSettings = async () => {
    try {
        const response = await putData('uploader-settings', settings);
        // if (response.error) {
        //     throw new Error(response.error.message);
        // }
        showFeedback('Settings saved successfully!', 'success');
    } catch (err) {
        showFeedback(`Error saving settings: ${err.message}`, 'error');
    }
};

  return (
    <div className="m-auto p-8 bg-gray-100 min-h-screen w-2/4">
      {/* Feedback Message */}
      {feedbackMessage.text && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md ${
            feedbackMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {feedbackMessage.text}
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-6">Suppliers</h1>
      <div className="space-y-8">
        {/* General Listing Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">General Listing Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Marketplace Region</label>
              <select
                className="w-full p-2 border rounded-md"
                value={settings.marketplaceRegion}
                onChange={(e) => handleGeneralSettingChange('marketplaceRegion', e.target.value)}
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Europe</option>
                <option>Australia</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Add toggles dynamically */}
              {[
                { label: 'Upload Product Videos', key: 'uploadVideos' },
                { label: 'Include Out of Stock Variations', key: 'includeOutOfStock' },
                { label: 'Duplicate to Max Photos', key: 'duplicateMaxPhotos' },
                { label: 'Fixed Item Specifics', key: 'fixedItemSpecifics' },
              ].map((toggle) => (
                <label key={toggle.key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="toggle-checkbox"
                    checked={settings[toggle.key]}
                    onChange={() => handleGeneralSettingChange(toggle.key)}
                  />
                  <span>{toggle.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Template Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Template Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Header Image URL</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={settings.headerImage}
                onChange={(e) => handleGeneralSettingChange('headerImage', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Footer Image URL</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={settings.footerImage}
                onChange={(e) => handleGeneralSettingChange('footerImage', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Item Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={settings.itemLocation}
                onChange={(e) => handleGeneralSettingChange('itemLocation', e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Item Specifics</label>
              <div className="space-y-3">
                {settings.itemSpecifics.map((specific, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="w-1/3 p-2 border rounded-md"
                      value={specific.key}
                      placeholder="Key (e.g., Brand)"
                      onChange={(e) => handleItemSpecificChange(index, 'key', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-1/2 p-2 border rounded-md"
                      value={specific.value}
                      placeholder="Value (e.g., Unbranded)"
                      onChange={(e) => handleItemSpecificChange(index, 'value', e.target.value)}
                    />
                    <button
                      className="p-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItemSpecific(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={handleAddItemSpecific}
                >
                  Add Specific
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          className={`mt-4 px-4 py-2 rounded-md ${
            postLoading ? 'bg-gray-400' : 'bg-blue-600'
          } text-white`}
          onClick={handleSaveSettings}
          disabled={postLoading}
        >
          {postLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default Supplier;
