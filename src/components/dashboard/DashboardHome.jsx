import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useAuth } from '../../contexts/AuthContext'
import { useCompany } from '../../contexts/CompanyContext'
import { supabase } from '../../lib/supabase'

const { 
  FiDollarSign, 
  FiShoppingCart, 
  FiTrendingUp, 
  FiUsers, 
  FiStar, 
  FiClock,
  FiMenu,
  FiFileText
} = FiIcons;

const DashboardHome = () => {
  const { currentCompany } = useAuth()
  const { orders, menuItems } = useCompany()
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
    menuItemsCount: 0,
    reviewsCount: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentCompany) {
      fetchDashboardData()
    }
  }, [currentCompany, orders, menuItems])

  const fetchDashboardData = async () => {
    if (!currentCompany) return

    setLoading(true)
    try {
      // Calculate stats from orders
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0)
      const pendingOrders = orders.filter(order => 
        ['new', 'confirmed', 'preparing'].includes(order.status)
      ).length

      // Get recent orders (last 5)
      const recent = orders
        .filter(order => order.status !== 'cancelled')
        .slice(0, 5)

      setStats({
        totalRevenue,
        totalOrders: orders.length,
        averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
        pendingOrders,
        menuItemsCount: menuItems.length,
        reviewsCount: 0 // TODO: Implement review counting
      })

      setRecentOrders(recent)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-orange-100 text-orange-800',
      ready: 'bg-green-100 text-green-800',
      completed: 'bg-secondary-100 text-secondary-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-secondary-100 text-secondary-800'
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currentCompany?.currency || 'USD'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-secondary-900 mb-2"
        >
          Welcome back! 👋
        </motion.h1>
        <p className="text-secondary-600">
          Here's what's happening with {currentCompany?.name} today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Total Revenue</p>
              <p className="text-2xl font-bold text-secondary-900">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiShoppingCart} className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Total Orders</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.totalOrders}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-secondary-900">
                {formatCurrency(stats.averageOrderValue)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiClock} className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Pending Orders</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.pendingOrders}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Menu Items</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.menuItemsCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiStar} className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-600">Reviews</p>
              <p className="text-2xl font-bold text-secondary-900">{stats.reviewsCount}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-sm border border-secondary-200"
      >
        <div className="p-6 border-b border-secondary-200">
          <h2 className="text-xl font-bold text-secondary-900">Recent Orders</h2>
          <p className="text-secondary-600">Latest orders from your restaurant</p>
        </div>

        <div className="p-6">
          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <SafeIcon icon={FiShoppingCart} className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-700 mb-2">No orders yet</h3>
              <p className="text-secondary-500">
                {currentCompany?.webshop_enabled 
                  ? "Orders will appear here once customers start ordering."
                  : "Enable your webshop to start receiving orders."
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        #{order.order_number?.slice(-3) || order.id.slice(-3)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">{order.customer_name}</p>
                      <p className="text-sm text-secondary-600">
                        {new Date(order.created_at).toLocaleDateString()} • {order.order_type}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-secondary-900">
                      {formatCurrency(order.total_amount)}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors">
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiMenu} className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-primary-700">Add Menu Item</span>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiFileText} className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-700">Export Menu PDF</span>
              </div>
            </button>

            <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiStar} className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-700">Send Review Request</span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">Webshop Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-secondary-600">Status</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                currentCompany?.webshop_enabled 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-secondary-100 text-secondary-800'
              }`}>
                {currentCompany?.webshop_enabled ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-secondary-600">Payment</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                currentCompany?.stripe_account_id 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {currentCompany?.stripe_account_id ? 'Connected' : 'Setup Required'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">Menu Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-secondary-600">Categories</span>
              <span className="font-semibold text-secondary-900">
                {new Set(menuItems.map(item => item.category_id)).size}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-secondary-600">Active Items</span>
              <span className="font-semibold text-secondary-900">{menuItems.length}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-secondary-600">Avg Price</span>
              <span className="font-semibold text-secondary-900">
                {formatCurrency(
                  menuItems.length > 0 
                    ? menuItems.reduce((sum, item) => sum + parseFloat(item.price), 0) / menuItems.length
                    : 0
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">Reviews</h3>
          <div className="text-center py-4">
            <SafeIcon icon={FiStar} className="w-12 h-12 text-secondary-300 mx-auto mb-2" />
            <p className="text-secondary-500 text-sm">Review system coming soon</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardHome