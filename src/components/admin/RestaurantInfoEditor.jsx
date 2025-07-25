import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useMenu } from '../../context/MenuContext';

const { FiSave, FiEdit } = FiIcons;

const RestaurantInfoEditor = () => {
  const { menuData, updateRestaurantInfo } = useMenu();
  const [formData, setFormData] = useState(menuData.restaurant);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRestaurantInfo(formData);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-secondary-800">Restaurant Information</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isEditing
              ? 'bg-secondary-500 text-white hover:bg-secondary-600'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          <SafeIcon icon={isEditing ? FiSave : FiEdit} className="w-4 h-4" />
          {isEditing ? 'Cancel' : 'Edit'}
        </motion.button>
      </div>

      {isEditing ? (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Restaurant Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              Save Changes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => {
                setFormData(menuData.restaurant);
                setIsEditing(false);
              }}
              className="px-6 py-3 bg-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-300 transition-colors font-medium"
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-secondary-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-secondary-800 mb-4">{formData.name}</h3>
            <p className="text-secondary-600 mb-4">{formData.description}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-secondary-700">Phone:</span>
                <p className="text-secondary-600">{formData.phone}</p>
              </div>
              <div>
                <span className="font-medium text-secondary-700">Address:</span>
                <p className="text-secondary-600">{formData.address}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantInfoEditor;