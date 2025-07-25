import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useMenu } from '../../context/MenuContext';

const { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiImage } = FiIcons;

const allergenOptions = [
  { id: 'gluten', label: 'Gluten', icon: '🌾' },
  { id: 'dairy', label: 'Dairy', icon: '🥛' },
  { id: 'nuts', label: 'Nuts', icon: '🥜' },
  { id: 'eggs', label: 'Eggs', icon: '🥚' },
  { id: 'fish', label: 'Fish', icon: '🐟' },
  { id: 'shellfish', label: 'Shellfish', icon: '🦐' },
  { id: 'soy', label: 'Soy', icon: '🫘' },
  { id: 'sulfites', label: 'Sulfites', icon: '🍷' }
];

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
  { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
  { id: 'dairy-free', label: 'Dairy-Free', icon: '🥛' },
  { id: 'nut-free', label: 'Nut-Free', icon: '🥜' }
];

const MenuItemEditor = () => {
  const { menuData, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState(menuData.categories[0]?.id || '');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    allergens: [],
    dietary: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory && formData.name.trim()) {
      const item = {
        ...formData,
        price: parseFloat(formData.price) || 0
      };

      if (editingId) {
        updateMenuItem(selectedCategory, editingId, item);
        setEditingId(null);
      } else {
        addMenuItem(selectedCategory, item);
        setIsAdding(false);
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        allergens: [],
        dietary: []
      });
    }
  };

  const handleEdit = (categoryId, item) => {
    setSelectedCategory(categoryId);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      image: item.image || '',
      allergens: [...item.allergens],
      dietary: [...item.dietary]
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      allergens: [],
      dietary: []
    });
  };

  const handleDelete = (categoryId, itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      deleteMenuItem(categoryId, itemId);
    }
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const selectedCategoryData = menuData.categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-secondary-800">Menu Items</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          disabled={menuData.categories.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          Add Item
        </motion.button>
      </div>

      {menuData.categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiPlus} className="w-6 h-6 text-secondary-400" />
          </div>
          <h3 className="text-lg font-semibold text-secondary-700 mb-2">No categories available</h3>
          <p className="text-secondary-500">Create categories first before adding menu items</p>
        </div>
      ) : (
        <>
          {/* Category Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Select Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {menuData.categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.items.length} items)
                </option>
              ))}
            </select>
          </div>

          {/* Add/Edit Form */}
          <AnimatePresence>
            {isAdding && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="mb-8 p-6 bg-primary-50 border border-primary-200 rounded-lg space-y-4"
              >
                <h3 className="text-lg font-semibold text-secondary-800">
                  {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Image URL
                  </label>
                  <div className="flex gap-2">
                    <SafeIcon icon={FiImage} className="w-5 h-5 text-secondary-400 mt-3" />
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-3">
                    Dietary Options
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {dietaryOptions.map(option => (
                      <motion.button
                        key={option.id}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleArrayField('dietary', option.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.dietary.includes(option.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-white border border-secondary-200 text-secondary-600 hover:bg-secondary-50'
                        }`}
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-3">
                    Allergens
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allergenOptions.map(option => (
                      <motion.button
                        key={option.id}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleArrayField('allergens', option.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.allergens.includes(option.id)
                            ? 'bg-amber-500 text-white'
                            : 'bg-white border border-secondary-200 text-secondary-600 hover:bg-secondary-50'
                        }`}
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    <SafeIcon icon={FiSave} className="w-4 h-4" />
                    {editingId ? 'Update Item' : 'Add Item'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 bg-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-300 transition-colors font-medium"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Items List */}
          {selectedCategoryData && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-800">
                {selectedCategoryData.name} Items ({selectedCategoryData.items.length})
              </h3>

              {selectedCategoryData.items.length === 0 ? (
                <div className="text-center py-8 bg-secondary-50 rounded-lg">
                  <p className="text-secondary-500">No items in this category yet</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {selectedCategoryData.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-secondary-800">{item.name}</h4>
                              <p className="text-secondary-600 text-sm mb-2">{item.description}</p>
                              <p className="text-lg font-bold text-primary-600">${item.price}</p>
                            </div>
                            
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEdit(selectedCategory, item)}
                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                              >
                                <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(selectedCategory, item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.dietary.map(dietary => (
                              <span key={dietary} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                {dietary}
                              </span>
                            ))}
                            {item.allergens.map(allergen => (
                              <span key={allergen} className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                                {allergen}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MenuItemEditor;