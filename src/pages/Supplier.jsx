import React, { useState, useEffect } from 'react';

const Supplier = () => {
  // Combined state for all settings
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
      { key: 'Brand', value: 'Unbranded' }
    ]
  });

  const [feedbackMessage, setFeedbackMessage] = useState({ text: '', type: '' });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('supplierSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Show feedback message
  const showFeedback = (text, type) => {
    setFeedbackMessage({ text, type });
    setTimeout(() => setFeedbackMessage({ text: '', type: '' }), 3000);
  };

  // Handle general setting changes
  const handleGeneralSettingChange = (setting, value) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        [setting]: value !== undefined ? value : !prev[setting]
      };
      localStorage.setItem('supplierSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Handle item specifics changes
  const handleItemSpecificChange = (index, field, value) => {
    setSettings(prev => {
      const newSpecifics = [...prev.itemSpecifics];
      newSpecifics[index] = {
        ...newSpecifics[index],
        [field]: value
      };
      const newSettings = {
        ...prev,
        itemSpecifics: newSpecifics
      };
      localStorage.setItem('supplierSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Add new item specific
  const handleAddItemSpecific = () => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        itemSpecifics: [...prev.itemSpecifics, { key: '', value: '' }]
      };
      localStorage.setItem('supplierSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Remove item specific
  const handleRemoveItemSpecific = (index) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        itemSpecifics: prev.itemSpecifics.filter((_, i) => i !== index)
      };
      localStorage.setItem('supplierSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // Save all settings
  const handleSaveSettings = async () => {
    try {
      // Here you would typically make an API call to save the settings
      // await api.saveSettings(settings);
      showFeedback('Settings saved successfully!', 'success');
      localStorage.setItem('supplierSettings', JSON.stringify(settings));
    } catch (error) {
      showFeedback('Failed to save settings.', 'error');
    }
  };

  return (
    <div className="m-auto p-8 bg-gray-100 min-h-screen w-2/4">
      {/* Feedback Message */}
      {feedbackMessage.text && (
        <div className={`fixed top-4 right-4 p-4 rounded-md ${
          feedbackMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {feedbackMessage.text}
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-6">Suppliers</h1>
      <div className="space-y-8">
        {/* General Listing Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">General Listing Settings</h2>
          <div className="space-y-4">
            {/* Marketplace region */}
            <div>
              <label className="block font-medium mb-2">Marketplace region</label>
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

            {/* Toggles */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="toggle-checkbox"
                  checked={settings.uploadVideos}
                  onChange={() => handleGeneralSettingChange('uploadVideos')}
                />
                <span>Upload product videos</span>
              </label>
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="toggle-checkbox"
                  checked={settings.includeOutOfStock}
                  onChange={() => handleGeneralSettingChange('includeOutOfStock')}
                />
                <span>Include out of stock variations</span>
              </label>
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="toggle-checkbox"
                  checked={settings.duplicateMaxPhotos}
                  onChange={() => handleGeneralSettingChange('duplicateMaxPhotos')}
                />
                <span>Duplicate to max photos</span>
              </label>
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="toggle-checkbox"
                  checked={settings.fixedItemSpecifics}
                  onChange={() => handleGeneralSettingChange('fixedItemSpecifics')}
                />
                <span>Fixed item specifics</span>
              </label>
            </div>
          </div>
        </div>

        {/* Template Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Template Settings</h2>
          <div className="space-y-4">
            {/* Header & Footer Images */}
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

            {/* Item Location */}
            <div>
              <label className="block font-medium mb-2">Item Location</label>
              <input
                type="text"
                placeholder="Shanghai"
                className="w-full p-2 border rounded-md"
                value={settings.itemLocation}
                onChange={(e) => handleGeneralSettingChange('itemLocation', e.target.value)}
              />
            </div>

            {/* Item Specifics */}
            <div>
              <label className="block font-medium mb-2">Item Specifics</label>
              <div className="space-y-3">
                {settings.itemSpecifics.map((specific, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Key (e.g., Brand)"
                      className="w-1/3 p-2 border rounded-md"
                      value={specific.key}
                      onChange={(e) => handleItemSpecificChange(index, 'key', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g., Unbranded)"
                      className="w-1/2 p-2 border rounded-md"
                      value={specific.value}
                      onChange={(e) => handleItemSpecificChange(index, 'value', e.target.value)}
                    />
                    <button
                      className="p-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItemSpecific(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
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
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleSaveSettings}
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default Supplier;