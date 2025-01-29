import React, { useState, useEffect } from 'react';
import { useGet } from '../api/useGet';
import { usePut } from '../api/usePut';

const Supplier = () => {
  // Fetch data and states
  const { data: uploaderSettings, loading: uploaderLoading, error: uploaderError } = useGet('uploader-settings');
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
      {Brand: 'Unbranded' },
      {Shipping:'Free Shipping'},
      {MPN:'1123'}
    ],
  });

  const [feedbackMessage, setFeedbackMessage] = useState({ text: '', type: '' });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('supplierSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      // Transform itemSpecifics from object of objects to array of objects
      if (parsedSettings.itemSpecifics && typeof parsedSettings.itemSpecifics === 'object' && !Array.isArray(parsedSettings.itemSpecifics)) {
        parsedSettings.itemSpecifics = Object.entries(parsedSettings.itemSpecifics).map(([key, value]) => ({ [key]: value }));
      }
      setSettings(parsedSettings);
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
  const handleItemSpecificChange = (index, key, value) => {
    setSettings((prev) => {
      const updatedSpecifics = [...prev.itemSpecifics];
      updatedSpecifics[index] = { [key]: value }; // Update the key-value pair
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
        itemSpecifics: [...prev.itemSpecifics, { '': '' }], // Add a new empty key-value pair
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
      // Transform itemSpecifics from array of objects to object of objects
      const itemSpecificsObject = settings.itemSpecifics.reduce((acc, specific) => {
        const key = Object.keys(specific)[0];
        const value = specific[key];
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {});

      const putSettings = {
        ...settings,
        itemSpecifics: itemSpecificsObject, // Send as object of objects
      };

      const response = await putData('uploader-settings', putSettings);
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
              <label className="block font-medium mb-2">Item Specifics</label>
              <div className="space-y-3">
                {settings.itemSpecifics.map((specific, index) => {
                  const key = Object.keys(specific)[0];
                  const value = specific[key];
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="w-1/3 p-2 border rounded-md"
                        value={key}
                        placeholder="Key (e.g., Brand)"
                        onChange={(e) => handleItemSpecificChange(index, e.target.value, value)}
                      />
                      <input
                        type="text"
                        className="w-1/2 p-2 border rounded-md"
                        value={value}
                        placeholder="Value (e.g., Unbranded)"
                        onChange={(e) => handleItemSpecificChange(index, key, e.target.value)}
                      />
                      <button
                        className="p-2 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveItemSpecific(index)}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
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