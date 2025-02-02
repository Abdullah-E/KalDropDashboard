import React, { useState, useEffect } from 'react';
import { useGet } from '../api/useGet';
import { usePut } from '../api/usePut';

const Supplier = () => {
  const { data: uploaderSettings, loading: uploaderLoading, error: uploaderError } = useGet('uploader-settings');
  const { putData, loading: postLoading, error: postError } = usePut();

  const [settings, setSettings] = useState({
    marketplaceRegion: 'United States',
    uploadVideos: false,
    includeOutOfStock: false,
    duplicateMaxPhotos: false,
    fixedItemSpecifics: false,
    headerImage: '',
    footerImage: '',
    itemLocation: 'Shanghai',
    template: 'template1',
    itemSpecifics: [
      { Brand: 'Unbranded' },
      { Shipping: 'Free Shipping' },
      { Condition: 'New' }
    ]
  });

  const [feedbackMessage, setFeedbackMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const savedSettings = localStorage.getItem('supplierSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('supplierSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const handleItemSpecificChange = (index, key, value) => {
    setSettings(prev => {
      const newSpecifics = [...prev.itemSpecifics];
      newSpecifics[index] = { [key]: value };
      const newSettings = { ...prev, itemSpecifics: newSpecifics };
      localStorage.setItem('supplierSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const handleSaveSettings = async () => {
    try {
      const response = await putData('uploader-settings', settings);
      showFeedback('Settings saved successfully!', 'success');
    } catch (error) {
      showFeedback(error.message, 'error');
    }
  };

  const showFeedback = (text, type) => {
    setFeedbackMessage({ text, type });
    setTimeout(() => setFeedbackMessage({ text: '', type: '' }), 3000);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-[#94abbe] to-[#eef2f9] min-h-screen p-8">
      {feedbackMessage.text && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-md ${
          feedbackMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white z-50`}>
          {feedbackMessage.text}
        </div>
      )}

      <h1 className="text-3xl font-bold text-[#2a4270] mb-6">Supplier Settings</h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {/* General Settings */}
        <div className="bg-white shadow-md rounded-xl p-8 border border-[#e5eaf3] hover:shadow-lg transition-all duration-200">
  <div className="flex items-center space-x-3 mb-6">
    <svg className="w-6 h-6 text-[#4f6ed3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    <h2 className="text-2xl font-semibold text-[#2a4270]">General Settings</h2>
  </div>

  <div className="space-y-6">
    <div className="relative">
      <label className="block text-[#94a2be] font-medium mb-2">Marketplace Region</label>
      <select
        className="w-full p-3 pl-4 pr-10 border border-[#e5eaf3] rounded-lg focus:ring-2 focus:ring-[#4f6ed3] hover:border-[#4f6ed3] transition-colors bg-white appearance-none"
        value={settings.marketplaceRegion}
        onChange={(e) => handleSettingChange('marketplaceRegion', e.target.value)}
      >
        <option value="United States">United States</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="Europe">Europe</option>
        <option value="Australia">Australia</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none top-7">
        <svg className="w-5 h-5 text-[#94a2be]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <div className="border-t border-[#e5eaf3] pt-6">
      <h3 className="text-[#2a4270] font-medium mb-4">Additional Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'uploadVideos', label: 'Upload Videos', icon: '📹' },
          { key: 'includeOutOfStock', label: 'Include Out of Stock', icon: '📦' },
          { key: 'duplicateMaxPhotos', label: 'Max Photos', icon: '🖼️' },
          { key: 'fixedItemSpecifics', label: 'Fixed Specifics', icon: '📝' }
        ].map(({ key, label, icon }) => (
          <label key={key} className="flex items-center p-3 space-x-3 rounded-lg hover:bg-[#f8faff] transition-colors cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={settings[key]}
                onChange={() => handleSettingChange(key, !settings[key])}
                className="w-5 h-5 rounded border-[#e5eaf3] text-[#4f6ed3] focus:ring-[#4f6ed3] transition-colors"
              />
            </div>
            <span className="text-[#2a4270] group-hover:text-[#4f6ed3] transition-colors">
              {icon} {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  </div>
</div>

        {/* Template Settings */}
        <div className="bg-white shadow-md rounded-xl p-8 border border-[#e5eaf3] hover:shadow-lg transition-shadow duration-200">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-semibold text-[#2a4270]">Template Settings</h2>
    <button 
      onClick={() => handlePreview()} 
      className="px-4 py-2 text-[#4f6ed3] hover:bg-[#f8faff] rounded-lg transition-all duration-200"
    >
      Preview Template
    </button>
  </div>
  
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-[#94a2be] font-medium mb-2">Template Style</label>
        <select
          className="w-full p-3 border border-[#e5eaf3] rounded-lg focus:ring-2 focus:ring-[#4f6ed3] hover:border-[#4f6ed3] transition-colors"
          value={settings.template}
          onChange={(e) => handleSettingChange('template', e.target.value)}
        >
          <option value="template1">Classic Template</option>
          <option value="template2">Modern Template</option>
          <option value="template3">Minimal Template</option>
        </select>
      </div>

      <div>
        <label className="block text-[#94a2be] font-medium mb-2">Template Layout</label>
        <div className="grid grid-cols-3 gap-3">
          {['Left', 'Center', 'Right'].map(layout => (
            <button
              key={layout}
              className={`p-3 border rounded-lg transition-all ${
                settings.layout === layout.toLowerCase()
                  ? 'border-[#4f6ed3] bg-[#f8faff] text-[#2a4270]'
                  : 'border-[#e5eaf3] hover:border-[#4f6ed3] text-[#94a2be]'
              }`}
              onClick={() => handleSettingChange('layout', layout.toLowerCase())}
            >
              {layout}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Item Specifics Section */}
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-[#2a4270]">Item Specifics</h3>
        <button
          onClick={() => handleAddSpecific()}
          className="px-4 py-2 text-sm bg-gradient-to-r from-[#2a4270] to-[#375288] text-white rounded-lg hover:from-[#375288] hover:to-[#2a4270] transition-all duration-200 shadow-sm"
        >
          Add New
        </button>
      </div>

      <div className="space-y-3">
        {settings.itemSpecifics.map((specific, index) => (
          <div key={index} className="flex items-center gap-3 group">
            <input
              type="text"
              value={Object.keys(specific)[0]}
              onChange={(e) => handleItemSpecificChange(index, e.target.value, Object.values(specific)[0])}
              className="w-1/3 p-3 border border-[#e5eaf3] rounded-lg focus:ring-2 focus:ring-[#4f6ed3] hover:border-[#4f6ed3] transition-colors"
              placeholder="Key (e.g., Brand)"
            />
            <input
              type="text"
              value={Object.values(specific)[0]}
              onChange={(e) => handleItemSpecificChange(index, Object.keys(specific)[0], e.target.value)}
              className="flex-1 p-3 border border-[#e5eaf3] rounded-lg focus:ring-2 focus:ring-[#4f6ed3] hover:border-[#4f6ed3] transition-colors"
              placeholder="Value (e.g., Unbranded)"
            />
            <button
              onClick={() => handleRemoveSpecific(index)}
              className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          disabled={postLoading}
          className={`w-full px-6 py-3 rounded-lg shadow-md ${
            postLoading 
              ? 'bg-[#94a2be]' 
              : 'bg-gradient-to-r from-[#2a4270] to-[#375288] hover:from-[#375288] hover:to-[#2a4270]'
          } text-white transition-all duration-200`}
        >
          {postLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default Supplier;