import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userRoles, setUserRoles] = useState([])
  const [currentCompany, setCurrentCompany] = useState(null)
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserRolesAndCompanies(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchUserRolesAndCompanies(session.user.id)
        } else {
          setUserRoles([])
          setCompanies([])
          setCurrentCompany(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserRolesAndCompanies = async (userId) => {
    try {
      // Fetch user roles and companies
      const { data: roles, error: rolesError } = await supabase
        .from('user_company_roles_rt2024')
        .select(`
          *,
          companies_rt2024 (*)
        `)
        .eq('user_id', userId)

      if (rolesError) throw rolesError

      setUserRoles(roles || [])
      const userCompanies = roles?.map(role => role.companies_rt2024) || []
      setCompanies(userCompanies)

      // Set default current company
      if (userCompanies.length > 0 && !currentCompany) {
        setCurrentCompany(userCompanies[0])
      }
    } catch (error) {
      console.error('Error fetching user roles:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signUp = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setUser(null)
      setUserRoles([])
      setCompanies([])
      setCurrentCompany(null)
    }
    return { error }
  }

  const hasRole = (role, companyId = null) => {
    return userRoles.some(userRole => {
      if (companyId) {
        return userRole.role === role && userRole.company_id === companyId
      }
      return userRole.role === role
    })
  }

  const isSiteAdmin = () => hasRole('site_admin')
  const isCompanyAdmin = (companyId = null) => hasRole('company_admin', companyId) || isSiteAdmin()
  const canEditCompany = (companyId = null) => 
    hasRole('company_admin', companyId) || hasRole('company_editor', companyId) || isSiteAdmin()

  const switchCompany = (company) => {
    setCurrentCompany(company)
    localStorage.setItem('currentCompanyId', company.id)
  }

  const value = {
    user,
    userRoles,
    currentCompany,
    companies,
    loading,
    signIn,
    signUp,
    signOut,
    hasRole,
    isSiteAdmin,
    isCompanyAdmin,
    canEditCompany,
    switchCompany,
    refreshUser: () => fetchUserRolesAndCompanies(user?.id)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}