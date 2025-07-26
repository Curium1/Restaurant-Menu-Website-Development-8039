import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'

const { FiGlobe, FiChevronDown } = FiIcons

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' }
]

const LanguageSwitcher = ({ className = '' }) => {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
    
    // Update document language attribute for accessibility
    document.documentElement.lang = languageCode
    
    // Update document direction if needed (for RTL languages in the future)
    document.documentElement.dir = 'ltr' // All current languages are LTR
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        aria-label={t('language.switchLanguage')}
      >
        <SafeIcon icon={FiGlobe} className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <SafeIcon icon={FiChevronDown} className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 min-w-[140px]"
            >
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    i18n.language === language.code
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm">{language.name}</span>
                  {i18n.language === language.code && (
                    <SafeIcon icon={FiIcons.FiCheck} className="w-4 h-4 ml-auto text-primary-600" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher