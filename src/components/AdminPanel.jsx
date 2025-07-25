import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useMenu } from '../context/MenuContext';
import RestaurantInfoEditor from './admin/RestaurantInfoEditor';
import CategoryManager from './admin/CategoryManager';
import MenuItemEditor from './admin/MenuItemEditor';

const { FiArrowLeft, FiHome, FiSettings, FiGrid, FiPlusCircle } = FiIcons;

const AdminPanel = () => {
  const { menuData } = useMenu();
  const [activeTab, setActiveTab] = useState('restaurant');

  const tabs = [
    { id: 'restaurant', label: 'Restaurant Info', icon: FiHome },
    { id: 'categories', label: 'Categories', icon: FiGrid },
    { id: 'items', label: 'Menu Items', icon: FiPlusCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-secondary-100 hover:bg-secondary-200 transition-colors"
                >
                  <SafeIcon icon={FiArrowLeft} className="w-5 h-5 text-secondary-600" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-secondary-800">Admin Panel</h1>
                <p className="text-secondary-600">Manage your restaurant menu</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiSettings} className="w-5 h-5 text-secondary-400" />
              <span className="text-sm text-secondary-600">{menuData.restaurant.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
              <h2 className="text-lg font-semibold text-secondary-800 mb-4">Menu Management</h2>
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'text-secondary-600 hover:bg-secondary-50'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-secondary-50 rounded-lg">
                <h3 className="text-sm font-semibold text-secondary-700 mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Categories:</span>
                    <span className="font-medium text-secondary-800">{menuData.categories.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Total Items:</span>
                    <span className="font-medium text-secondary-800">
                      {menuData.categories.reduce((total, cat) => total + cat.items.length, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-secondary-200"
            >
              {activeTab === 'restaurant' && <RestaurantInfoEditor />}
              {activeTab === 'categories' && <CategoryManager />}
              {activeTab === 'items' && <MenuItemEditor />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;