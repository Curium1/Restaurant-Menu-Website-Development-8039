import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { QuestProvider } from '@questlabs/react-sdk'
import '@questlabs/react-sdk/dist/style.css'

// Contexts
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CompanyProvider } from './contexts/CompanyContext'

// Components
import LandingPage from './components/LandingPage'
import AuthPage from './components/auth/AuthPage'
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardHome from './components/dashboard/DashboardHome'
import HelpHub from './components/HelpHub'

// Legacy components (for backward compatibility)
import MenuDisplay from './components/MenuDisplay'
import AdminPanel from './components/AdminPanel'
import QRGenerator from './components/QRGenerator'

// Config
import questConfig from './config/questConfig'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary-600 font-medium">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return children
}

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary-600 font-medium">Loading...</p>
        </motion.div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
            <AnimatePresence mode="wait">
              <Routes>
                {/* Landing page */}
                <Route path="/" element={<LandingPage />} />

                {/* Public routes */}
                <Route path="/auth" element={
                  <PublicRoute>
                    <AuthPage />
                  </PublicRoute>
                } />

                {/* Legacy public menu routes (for existing QR codes) */}
                <Route path="/menu/:slug" element={<MenuDisplay />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/qr" element={<QRGenerator />} />

                {/* Protected dashboard routes */}
                <Route path="/dashboard/*" element={
                  <ProtectedRoute>
                    <CompanyProvider>
                      <DashboardLayout />
                    </CompanyProvider>
                  </ProtectedRoute>
                }>
                  <Route index element={<DashboardHome />} />
                  <Route path="menu" element={<div className="p-6">Menu Management (Coming Soon)</div>} />
                  <Route path="orders" element={<div className="p-6">Order Management (Coming Soon)</div>} />
                  <Route path="analytics" element={<div className="p-6">Analytics (Coming Soon)</div>} />
                  <Route path="reviews" element={<div className="p-6">Review Management (Coming Soon)</div>} />
                  <Route path="export" element={<div className="p-6">Menu Export (Coming Soon)</div>} />
                  <Route path="settings" element={<div className="p-6">Settings (Coming Soon)</div>} />
                  <Route path="companies" element={<div className="p-6">Company Management (Coming Soon)</div>} />
                  <Route path="users" element={<div className="p-6">User Management (Coming Soon)</div>} />
                </Route>

                {/* Fallback redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
            <HelpHub />
          </div>
        </Router>
      </AuthProvider>
    </QuestProvider>
  )
}

export default App