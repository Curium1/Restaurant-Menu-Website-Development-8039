import React, { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

const defaultMenuData = {
  restaurant: {
    name: "Bella Vista",
    description: "Authentic Italian cuisine with a modern twist",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345"
  },
  categories: [
    {
      id: 'starters',
      name: 'Starters',
      items: [
        {
          id: 1,
          name: 'Bruschetta al Pomodoro',
          description: 'Fresh tomatoes, basil, garlic on toasted bread',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
          allergens: ['gluten'],
          dietary: ['vegetarian']
        },
        {
          id: 2,
          name: 'Antipasto Platter',
          description: 'Selection of cured meats, cheeses, and olives',
          price: 18.99,
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
          allergens: ['dairy', 'nuts'],
          dietary: []
        }
      ]
    },
    {
      id: 'mains',
      name: 'Main Courses',
      items: [
        {
          id: 3,
          name: 'Spaghetti Carbonara',
          description: 'Classic Roman pasta with eggs, cheese, pancetta',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400',
          allergens: ['gluten', 'dairy', 'eggs'],
          dietary: []
        },
        {
          id: 4,
          name: 'Margherita Pizza',
          description: 'Fresh mozzarella, tomato sauce, basil',
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
          allergens: ['gluten', 'dairy'],
          dietary: ['vegetarian']
        },
        {
          id: 5,
          name: 'Grilled Salmon',
          description: 'Fresh Atlantic salmon with lemon herb butter',
          price: 28.99,
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
          allergens: ['fish'],
          dietary: ['gluten-free']
        }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      items: [
        {
          id: 6,
          name: 'Tiramisu',
          description: 'Classic Italian dessert with coffee and mascarpone',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
          allergens: ['dairy', 'eggs', 'gluten'],
          dietary: ['vegetarian']
        },
        {
          id: 7,
          name: 'Gelato Selection',
          description: 'Choice of vanilla, chocolate, or strawberry',
          price: 6.99,
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
          allergens: ['dairy'],
          dietary: ['vegetarian', 'gluten-free']
        }
      ]
    },
    {
      id: 'drinks',
      name: 'Beverages',
      items: [
        {
          id: 8,
          name: 'House Wine',
          description: 'Red or white wine from our cellar',
          price: 7.99,
          image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400',
          allergens: ['sulfites'],
          dietary: ['vegan', 'gluten-free']
        },
        {
          id: 9,
          name: 'Fresh Lemonade',
          description: 'Freshly squeezed lemons with mint',
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400',
          allergens: [],
          dietary: ['vegan', 'gluten-free']
        }
      ]
    }
  ]
};

export const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState(() => {
    const saved = localStorage.getItem('restaurantMenu');
    return saved ? JSON.parse(saved) : defaultMenuData;
  });

  useEffect(() => {
    localStorage.setItem('restaurantMenu', JSON.stringify(menuData));
  }, [menuData]);

  const updateRestaurantInfo = (info) => {
    setMenuData(prev => ({
      ...prev,
      restaurant: { ...prev.restaurant, ...info }
    }));
  };

  const addCategory = (category) => {
    setMenuData(prev => ({
      ...prev,
      categories: [...prev.categories, { ...category, items: [] }]
    }));
  };

  const updateCategory = (categoryId, updates) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId ? { ...cat, ...updates } : cat
      )
    }));
  };

  const deleteCategory = (categoryId) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== categoryId)
    }));
  };

  const addMenuItem = (categoryId, item) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: [...cat.items, { ...item, id: Date.now() }] }
          : cat
      )
    }));
  };

  const updateMenuItem = (categoryId, itemId, updates) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map(item =>
                item.id === itemId ? { ...item, ...updates } : item
              )
            }
          : cat
      )
    }));
  };

  const deleteMenuItem = (categoryId, itemId) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
          : cat
      )
    }));
  };

  const value = {
    menuData,
    updateRestaurantInfo,
    addCategory,
    updateCategory,
    deleteCategory,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};