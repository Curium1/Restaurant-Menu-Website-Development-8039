import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useAuth } from '../../contexts/AuthContext'

const { 
  FiHome, FiMenu, FiShoppingCart, FiUsers, FiSettings, FiLogOut, 
  FiStar, FiFileText, FiChevronDown, FiBuilding, FiBarChart3
} = FiIcons

const DashboardLayout = () => {
  const { user, currentCompany, companies, signOut, switchCompany, isSiteAdmin } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Menu Management', href: '/dashboard/menu', icon: FiMenu },
    { name: 'Orders', href: '/dashboard/orders', icon: FiShoppingCart },
    { name: 'Analytics', href: '/dashboard/analytics', icon: FiBarChart3 },
    { name: 'Reviews', href: '/dashboard/reviews', icon: FiStar },
    { name: 'Export Menu', href: '/dashboard/export', icon: FiFileText },
    { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
  ]

  if (isSiteAdmin()) {
    navigation.unshift(
      { name: 'Companies', href: '/dashboard/companies', icon: FiBuilding },
      { name: 'Users', href: '/dashboard/users', icon: FiUsers }
    )
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/auth')
  }

  const handleCompanySwitch = (company) => {
    switchCompany(company)
    setCompanyDropdownOpen(false)
  }

  return (
    <div className="h-screen flex overflow-hidden bg-secondary-50">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-secondary-600 opacity-75" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : '-100%'
        }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:static lg:translate-x-0 lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-secondary-200">
            <h1 className="text-xl font-bold text-secondary-900">Restaurant SaaS</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-secondary-400 hover:text-secondary-500"
            >
              <SafeIcon icon={FiIcons.FiX} className="w-6 h-6" />
            </button>
          </div>

          {/* Company Selector */}
          {companies.length > 0 && (
            <div className="px-6 py-4 border-b border-secondary-200">
              <div className="relative">
                <button
                  onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                  className="w-full flex items-center justify-between p-3 text-left bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {currentCompany?.name?.charAt(0) || 'R'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900 truncate">
                        {currentCompany?.name || 'Select Company'}
                      </p>
                      <p className="text-xs text-secondary-500">Current restaurant</p>
                    </div>
                  </div>
                  <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-secondary-400" />
                </button>

                <AnimatePresence>
                  {companyDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-secondary-200 rounded-lg shadow-lg z-10"
                    >
                      {companies.map((company) => (
                        <button
                          key={company.id}
                          onClick={() => handleCompanySwitch(company)}
                          className="w-full flex items-center gap-3 p-3 text-left hover:bg-secondary-50 first:rounded-t-lg last:rounded-b-lg"
                        >
                          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {company.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-secondary-900">{company.name}</p>
                            <p className="text-xs text-secondary-500">{company.slug}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-secondary-600 hover:bg-secondary-100'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              )
            })}
          </nav>

          {/* User menu */}
          <div className="px-6 py-4 border-t border-secondary-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.user_metadata?.first_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium text-secondary-900">
                  {user?.user_metadata?.full_name || user?.email}
                </p>
                <p className="text-xs text-secondary-500">{user?.email}</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiLogOut} className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-secondary-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-secondary-400 hover:text-secondary-500"
            >
              <SafeIcon icon={FiMenu} className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4">
              {currentCompany && (
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary-900">{currentCompany.name}</p>
                  <p className="text-xs text-secondary-500">
                    {currentCompany.webshop_enabled ? 'Webshop Active' : 'Menu Only'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout