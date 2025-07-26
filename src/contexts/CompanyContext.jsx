import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const CompanyContext = createContext()

export const useCompany = () => {
  const context = useContext(CompanyContext)
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider')
  }
  return context
}

export const CompanyProvider = ({ children }) => {
  const { currentCompany, user } = useAuth()
  const [menuCategories, setMenuCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentCompany && user) {
      fetchCompanyData()
    }
  }, [currentCompany, user])

  const fetchCompanyData = async () => {
    if (!currentCompany) return
    
    setLoading(true)
    try {
      await Promise.all([
        fetchMenuCategories(),
        fetchMenuItems(),
        fetchOrders()
      ])
    } catch (error) {
      console.error('Error fetching company data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMenuCategories = async () => {
    if (!currentCompany) return

    const { data, error } = await supabase
      .from('menu_categories_rt2024')
      .select('*')
      .eq('company_id', currentCompany.id)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return
    }

    setMenuCategories(data || [])
  }

  const fetchMenuItems = async () => {
    if (!currentCompany) return

    const { data, error } = await supabase
      .from('menu_items_rt2024')
      .select(`
        *,
        menu_categories_rt2024 (name)
      `)
      .eq('company_id', currentCompany.id)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching menu items:', error)
      return
    }

    setMenuItems(data || [])
  }

  const fetchOrders = async () => {
    if (!currentCompany) return

    const { data, error } = await supabase
      .from('orders_rt2024')
      .select(`
        *,
        order_items_rt2024 (
          *,
          menu_items_rt2024 (name, price)
        )
      `)
      .eq('company_id', currentCompany.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error fetching orders:', error)
      return
    }

    setOrders(data || [])
  }

  // Category management
  const addCategory = async (categoryData) => {
    if (!currentCompany) return { error: 'No company selected' }

    const { data, error } = await supabase
      .from('menu_categories_rt2024')
      .insert({
        ...categoryData,
        company_id: currentCompany.id
      })
      .select()
      .single()

    if (!error) {
      setMenuCategories(prev => [...prev, data])
    }

    return { data, error }
  }

  const updateCategory = async (categoryId, updates) => {
    const { data, error } = await supabase
      .from('menu_categories_rt2024')
      .update(updates)
      .eq('id', categoryId)
      .select()
      .single()

    if (!error) {
      setMenuCategories(prev => 
        prev.map(cat => cat.id === categoryId ? data : cat)
      )
    }

    return { data, error }
  }

  const deleteCategory = async (categoryId) => {
    const { error } = await supabase
      .from('menu_categories_rt2024')
      .update({ is_active: false })
      .eq('id', categoryId)

    if (!error) {
      setMenuCategories(prev => prev.filter(cat => cat.id !== categoryId))
    }

    return { error }
  }

  // Menu item management
  const addMenuItem = async (itemData) => {
    if (!currentCompany) return { error: 'No company selected' }

    const { data, error } = await supabase
      .from('menu_items_rt2024')
      .insert({
        ...itemData,
        company_id: currentCompany.id
      })
      .select(`
        *,
        menu_categories_rt2024 (name)
      `)
      .single()

    if (!error) {
      setMenuItems(prev => [...prev, data])
    }

    return { data, error }
  }

  const updateMenuItem = async (itemId, updates) => {
    const { data, error } = await supabase
      .from('menu_items_rt2024')
      .update(updates)
      .eq('id', itemId)
      .select(`
        *,
        menu_categories_rt2024 (name)
      `)
      .single()

    if (!error) {
      setMenuItems(prev => 
        prev.map(item => item.id === itemId ? data : item)
      )
    }

    return { data, error }
  }

  const deleteMenuItem = async (itemId) => {
    const { error } = await supabase
      .from('menu_items_rt2024')
      .update({ is_active: false })
      .eq('id', itemId)

    if (!error) {
      setMenuItems(prev => prev.filter(item => item.id !== itemId))
    }

    return { error }
  }

  // Order management
  const updateOrderStatus = async (orderId, status) => {
    const { data, error } = await supabase
      .from('orders_rt2024')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single()

    if (!error) {
      setOrders(prev => 
        prev.map(order => order.id === orderId ? data : order)
      )
    }

    return { data, error }
  }

  const value = {
    menuCategories,
    menuItems,
    orders,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateOrderStatus,
    refreshData: fetchCompanyData
  }

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  )
}