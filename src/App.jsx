import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MenuDisplay from './components/MenuDisplay';
import AdminPanel from './components/AdminPanel';
import QRGenerator from './components/QRGenerator';
import { MenuProvider } from './context/MenuContext';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary-600 font-medium">Loading your menu...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <MenuProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<MenuDisplay />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/qr" element={<QRGenerator />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </MenuProvider>
  );
}

export default App;