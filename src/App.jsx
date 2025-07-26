import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MenuDisplay from './components/MenuDisplay';
import AdminPanel from './components/AdminPanel';
import QRGenerator from './components/QRGenerator';
import { MenuProvider } from './context/MenuContext';
import './App.css';

function App() {
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