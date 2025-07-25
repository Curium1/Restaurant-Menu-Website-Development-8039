import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiFilter, FiChevronDown } = FiIcons;

const filterOptions = {
  dietary: {
    label: 'Dietary',
    options: [
      { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
      { id: 'vegan', label: 'Vegan', icon: '🌱' },
      { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
      { id: 'dairy-free', label: 'Dairy-Free', icon: '🥛' },
      { id: 'nut-free', label: 'Nut-Free', icon: '🥜' }
    ]
  },
  allergens: {
    label: 'Exclude Allergens',
    options: [
      { id: 'gluten', label: 'Gluten', icon: '🌾' },
      { id: 'dairy', label: 'Dairy', icon: '🥛' },
      { id: 'nuts', label: 'Nuts', icon: '🥜' },
      { id: 'eggs', label: 'Eggs', icon: '🥚' },
      { id: 'fish', label: 'Fish', icon: '🐟' },
      { id: 'shellfish', label: 'Shellfish', icon: '🦐' },
      { id: 'soy', label: 'Soy', icon: '🫘' },
      { id: 'sulfites', label: 'Sulfites', icon: '🍷' }
    ]
  }
};

const FilterBar = ({ activeFilters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFilter = (filterId) => {
    if (activeFilters.includes(filterId)) {
      onFiltersChange(activeFilters.filter(f => f !== filterId));
    } else {
      onFiltersChange([...activeFilters, filterId]);
    }
  };

  const clearAllFilters = () => {
    onFiltersChange([]);
  };

  return (
    <div className="space-y-3">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-secondary-200 rounded-xl hover:bg-secondary-50 transition-colors"
        >
          <SafeIcon icon={FiFilter} className="w-4 h-4 text-secondary-600" />
          <span className="text-sm font-medium text-secondary-700">
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-secondary-400" />
          </motion.div>
        </motion.button>

        {activeFilters.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all
          </motion.button>
        )}
      </div>

      {/* Filter Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-secondary-200 rounded-xl p-4 shadow-sm"
          >
            <div className="space-y-4">
              {Object.entries(filterOptions).map(([category, { label, options }]) => (
                <div key={category}>
                  <h4 className="text-sm font-semibold text-secondary-700 mb-2">{label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {options.map(option => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFilter(option.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeFilters.includes(option.id)
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'bg-secondary-50 text-secondary-600 hover:bg-secondary-100'
                        }`}
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && !isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {activeFilters.map(filterId => {
            const allOptions = [...filterOptions.dietary.options, ...filterOptions.allergens.options];
            const option = allOptions.find(opt => opt.id === filterId);
            return (
              <motion.span
                key={filterId}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
              >
                <span>{option?.icon}</span>
                <span>{option?.label}</span>
              </motion.span>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default FilterBar;