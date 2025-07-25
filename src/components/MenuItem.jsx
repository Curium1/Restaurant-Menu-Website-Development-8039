import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiInfo, FiX } = FiIcons;

const allergenIcons = {
  gluten: '🌾',
  dairy: '🥛',
  nuts: '🥜',
  eggs: '🥚',
  fish: '🐟',
  shellfish: '🦐',
  soy: '🫘',
  sulfites: '🍷'
};

const dietaryIcons = {
  vegetarian: '🥬',
  vegan: '🌱',
  'gluten-free': '🌾',
  'dairy-free': '🥛',
  'nut-free': '🥜'
};

const MenuItem = ({ item, index, categoryIndex }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);

  const delay = categoryIndex * 0.1 + index * 0.05;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-secondary-100"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="sm:w-48 h-48 sm:h-32 relative overflow-hidden bg-secondary-100">
            {item.image && !imageError ? (
              <motion.img
                src={item.image}
                alt={item.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary-100 to-secondary-200">
                <span className="text-4xl">🍽️</span>
              </div>
            )}
            
            {/* Price Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.2 }}
              className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md"
            >
              <span className="text-lg font-bold text-primary-600">${item.price}</span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-secondary-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowDetails(true)}
                className="ml-4 p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
              >
                <SafeIcon icon={FiInfo} className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {/* Dietary Tags */}
              {item.dietary.map(dietary => (
                <span
                  key={dietary}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                >
                  <span>{dietaryIcons[dietary]}</span>
                  <span className="capitalize">{dietary.replace('-', ' ')}</span>
                </span>
              ))}

              {/* Allergen Warning */}
              {item.allergens.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                  <span>⚠️</span>
                  <span>Contains allergens</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative">
                {item.image && !imageError ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
                    <span className="text-6xl">🍽️</span>
                  </div>
                )}
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5 text-secondary-600" />
                </button>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <span className="text-xl font-bold text-primary-600">${item.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-secondary-800 mb-3">{item.name}</h2>
                <p className="text-secondary-600 mb-6 leading-relaxed">{item.description}</p>

                {/* Dietary Information */}
                {item.dietary.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-secondary-700 mb-3">Dietary Options</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.dietary.map(dietary => (
                        <span
                          key={dietary}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium"
                        >
                          <span>{dietaryIcons[dietary]}</span>
                          <span className="capitalize">{dietary.replace('-', ' ')}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Allergen Information */}
                {item.allergens.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-secondary-700 mb-3">Allergen Information</h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-amber-800 text-sm mb-3 font-medium">
                        ⚠️ This dish contains the following allergens:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.allergens.map(allergen => (
                          <span
                            key={allergen}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium"
                          >
                            <span>{allergenIcons[allergen]}</span>
                            <span className="capitalize">{allergen}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuItem;