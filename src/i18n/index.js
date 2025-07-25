import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Import translation files
import enTranslations from './locales/en.json'
import svTranslations from './locales/sv.json'

const resources = {
  en: {
    translation: enTranslations
  },
  sv: {
    translation: svTranslations
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    backend: {
      loadPath: '/locales/{{lng}}.json'
    }
  })

export default i18n