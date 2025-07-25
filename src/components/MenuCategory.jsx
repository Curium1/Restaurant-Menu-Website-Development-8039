import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MenuItem from './MenuItem';

const MenuCategory = ({ category, index, onCategoryInView }) => {
  const categoryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onCategoryInView(category.id);
        }
      },
      { threshold: 0.3, rootMargin: '-200px 0px -200px 0px' }
    );

    if (categoryRef.current) {
      observer.observe(categoryRef.current);
    }

    return () => observer.disconnect();
  }, [category.id, onCategoryInView]);

  return (
    <motion.section
      ref={categoryRef}
      id={`category-${category.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="scroll-mt-48"
    >
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="text-3xl font-display font-bold text-secondary-800 mb-2"
        >
          {category.name}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
          className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full origin-left"
        />
      </div>

      <div className="grid gap-6 md:gap-8">
        {category.items.map((item, itemIndex) => (
          <MenuItem
            key={item.id}
            item={item}
            index={itemIndex}
            categoryIndex={index}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default MenuCategory;