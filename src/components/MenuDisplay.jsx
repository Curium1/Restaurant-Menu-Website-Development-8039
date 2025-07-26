import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import SafeIcon from '../common/SafeIcon';
import { useMenu } from '../context/MenuContext';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import MenuCategory from './MenuCategory';
import RestaurantHeader from './RestaurantHeader';
import LanguageSwitcher from './LanguageSwitcher';

const { FiSettings, FiQrCode } = FiIcons;

const MenuDisplay = () => {
  const { t } = useTranslation();
  const { menuData } = useMenu();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const filteredCategories = useMemo(() => {
    return menuData.categories.map(category => {
      const filteredItems = category.items.filter(item => {
        // Search filter
        const matchesSearch = searchTerm === '' || 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Allergen filters (exclude items with these allergens)
        const allergenFilters = activeFilters.filter(f => 
          ['gluten', 'dairy', 'nuts', 'eggs', 'fish', 'shellfish', 'soy', 'sulfites'].includes(f)
        );
        const matchesAllergenFilters = allergenFilters.length === 0 || 
          !allergenFilters.some(allergen => item.allergens.includes(allergen));

        // Dietary filters (include items with these dietary options)
        const dietaryFilters = activeFilters.filter(f => 
          ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'].includes(f)
        );
        const matchesDietaryFilters = dietaryFilters.length === 0 || 
          dietaryFilters.some(dietary => item.dietary.includes(dietary));

        return matchesSearch && matchesAllergenFilters && matchesDietaryFilters;
      });

      return {
        ...category,
        items: filteredItems
      };
    }).filter(category => category.items.length > 0);
  }, [menuData.categories, searchTerm, activeFilters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <LanguageSwitcher />
      {/* Admin Quick Access */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Link to="/admin" title={t('admin')}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <SafeIcon icon={FiSettings} className="w-5 h-5 text-secondary-600" />
          </motion.button>
        </Link>
        <Link to="/qr" title={t('qrCode')}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <SafeIcon icon={FiQrCode} className="w-5 h-5 text-secondary-600" />
          </motion.button>
        </Link>
      </div>

      {/* Restaurant Header */}
      <RestaurantHeader restaurant={menuData.restaurant} />

      {/* Search and Filters */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-secondary-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder={t('searchPlaceholder')} />
          <FilterBar activeFilters={activeFilters} onFiltersChange={setActiveFilters} />
        </div>
      </div>

      {/* Category Navigation */}
      {filteredCategories.length > 1 && (
        <div className="sticky top-[140px] z-30 bg-white/90 backdrop-blur-sm border-b border-secondary-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {filteredCategories.map(category => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.getElementById(`category-${category.id}`);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveCategoryId(category.id);
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategoryId === category.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Menu Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {filteredCategories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiIcons.FiSearch} className="w-8 h-8 text-secondary-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-700 mb-2">{t('noItemsFound')}</h3>
            <p className="text-secondary-500">{t('adjustFilters')}</p>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category, index) => (
              <MenuCategory
                key={category.id}
                category={category}
                index={index}
                onCategoryInView={setActiveCategoryId}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-secondary-800 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-2">{menuData.restaurant.name}</h3>
          <p className="text-secondary-300 mb-4">{t('restaurantDescription')}</p>
          <div className="space-y-1 text-sm text-secondary-400">
            <p>{t('restaurantAddress')}</p>
            <p>{t('restaurantPhone')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MenuDisplay;