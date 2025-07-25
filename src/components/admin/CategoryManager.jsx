import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useMenu } from '../../context/MenuContext';

const { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } = FiIcons;

const CategoryManager = () => {
  const { menuData, addCategory, updateCategory, deleteCategory } = useMenu();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [editData, setEditData] = useState({});

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      addCategory({
        id: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
        name: newCategory.name.trim()
      });
      setNewCategory({ name: '' });
      setIsAdding(false);
    }
  };

  const handleEditCategory = (category) => {
    setEditingId(category.id);
    setEditData({ name: category.name });
  };

  const handleSaveEdit = (categoryId) => {
    if (editData.name.trim()) {
      updateCategory(categoryId, { name: editData.name.trim() });
      setEditingId(null);
      setEditData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? All items in this category will be lost.')) {
      deleteCategory(categoryId);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-secondary-800">Menu Categories</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          Add Category
        </motion.button>
      </div>

      {/* Add Category Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddCategory}
            className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg"
          >
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Category name..."
                value={newCategory.name}
                onChange={(e) => setNewCategory({ name: e.target.value })}
                className="flex-1 px-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setNewCategory({ name: '' });
                }}
                className="px-4 py-2 bg-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-300 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Categories List */}
      <div className="space-y-4">
        {menuData.categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {editingId === category.id ? (
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ name: e.target.value })}
                      className="flex-1 px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSaveEdit(category.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiSave} className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCancelEdit}
                        className="p-2 text-secondary-500 hover:bg-secondary-50 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiX} className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-800">{category.name}</h3>
                    <p className="text-sm text-secondary-500">
                      {category.items.length} item{category.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>

              {editingId !== category.id && (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEditCategory(category)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {menuData.categories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiPlus} className="w-6 h-6 text-secondary-400" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-700 mb-2">No categories yet</h3>
            <p className="text-secondary-500">Add your first category to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;