import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import LanguageSwitcher from '../LanguageSwitcher'

const AuthPage = () => {
  const [mode, setMode] = useState('login')
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      {/* Language Switcher - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-secondary-900 mb-6">
            {t('auth.title').split(' ')[0]} <span className="text-primary-500">{t('auth.title').split(' ')[1]}</span>
          </h1>
          <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
            {t('auth.subtitle')}
          </p>
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto lg:mx-0">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="font-semibold text-secondary-800">{t('auth.features.menuManagement.title')}</h3>
              <p className="text-sm text-secondary-600">{t('auth.features.menuManagement.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="font-semibold text-secondary-800">{t('auth.features.onlineOrders.title')}</h3>
              <p className="text-sm text-secondary-600">{t('auth.features.onlineOrders.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="font-semibold text-secondary-800">{t('auth.features.payments.title')}</h3>
              <p className="text-sm text-secondary-600">{t('auth.features.payments.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold text-secondary-800">{t('auth.features.reviews.title')}</h3>
              <p className="text-sm text-secondary-600">{t('auth.features.reviews.description')}</p>
            </div>
          </div>
        </motion.div>

        {/* Right side - Auth Forms */}
        <div className="w-full">
          {mode === 'login' ? (
            <LoginForm onToggleMode={setMode} />
          ) : (
            <SignUpForm onToggleMode={setMode} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage