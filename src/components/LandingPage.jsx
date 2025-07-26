import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import { useAuth } from '../contexts/AuthContext'
import LanguageSwitcher from './LanguageSwitcher'

const {
  FiMenu,
  FiShoppingCart,
  FiFilter,
  FiFileText,
  FiStar,
  FiChevronDown,
  FiCheck,
  FiUsers,
  FiTrendingUp,
  FiSmartphone,
  FiGlobe,
  FiHeart,
  FiClock
} = FiIcons

const LandingPage = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const { t } = useTranslation()
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = () => {
    navigate('/auth')
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    try {
      const { error } = await signIn('demo', 'noricMenu')
      if (!error) {
        navigate('/dashboard')
      } else {
        console.error('Demo login failed:', error)
        navigate('/auth')
      }
    } catch (err) {
      console.error('Demo login error:', err)
      navigate('/auth')
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: FiMenu,
      title: t('features.items.menuManagement.title'),
      description: t('features.items.menuManagement.description')
    },
    {
      icon: FiShoppingCart,
      title: t('features.items.onlineOrders.title'),
      description: t('features.items.onlineOrders.description')
    },
    {
      icon: FiFilter,
      title: t('features.items.allergyFilters.title'),
      description: t('features.items.allergyFilters.description')
    },
    {
      icon: FiFileText,
      title: t('features.items.pdfExport.title'),
      description: t('features.items.pdfExport.description')
    }
  ]

  const testimonials = [
    {
      name: t('testimonials.items.maria.name'),
      restaurant: t('testimonials.items.maria.restaurant'),
      content: t('testimonials.items.maria.content'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: t('testimonials.items.james.name'),
      restaurant: t('testimonials.items.james.restaurant'),
      content: t('testimonials.items.james.content'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: t('testimonials.items.sophie.name'),
      restaurant: t('testimonials.items.sophie.restaurant'),
      content: t('testimonials.items.sophie.content'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ]

  const faqs = [
    {
      question: t('faq.items.setup.question'),
      answer: t('faq.items.setup.answer')
    },
    {
      question: t('faq.items.technical.question'),
      answer: t('faq.items.technical.answer')
    },
    {
      question: t('faq.items.orders.question'),
      answer: t('faq.items.orders.answer')
    },
    {
      question: t('faq.items.qrCodes.question'),
      answer: t('faq.items.qrCodes.answer')
    },
    {
      question: t('faq.items.payments.question'),
      answer: t('faq.items.payments.answer')
    },
    {
      question: t('faq.items.realtime.question'),
      answer: t('faq.items.realtime.answer')
    }
  ]

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-secondary-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-primary-600"
              >
                {t('nav.brand')}
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50"
              >
                {isLoading ? t('common.loading') : t('nav.demo')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                {t('nav.getStarted')}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 leading-tight">
                {t('hero.title')}
                <span className="text-primary-600"> {t('hero.titleHighlight')}</span>
              </h1>
              <p className="text-xl text-secondary-600 mt-6 leading-relaxed">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg"
                >
                  {t('hero.startTrial')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition-colors font-semibold text-lg disabled:opacity-50"
                >
                  {isLoading ? t('hero.loadingDemo') : t('hero.tryDemo')}
                </motion.button>
              </div>

              <div className="flex items-center space-x-6 mt-8">
                <div className="flex items-center">
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-secondary-600">{t('hero.benefits.noSetupFees')}</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-secondary-600">{t('hero.benefits.freeTrial')}</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-secondary-600">{t('hero.benefits.cancelAnytime')}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop"
                  alt="Modern restaurant interior"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent rounded-2xl"></div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-semibold">{t('hero.floatingElements.ordersIncrease')}</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiSmartphone} className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-semibold">{t('hero.floatingElements.qrMenu')}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-secondary-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '2,500+', label: t('stats.restaurants') },
              { number: '1M+', label: t('stats.ordersProcessed') },
              { number: '99.9%', label: t('stats.uptime') },
              { number: '24/7', label: t('stats.support') }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-100 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-secondary-600">
              {t('testimonials.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary-50 rounded-xl p-8 relative"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-secondary-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-secondary-900">
                      {testimonial.name}
                    </div>
                    <div className="text-secondary-600 text-sm">
                      {testimonial.restaurant}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-xl text-secondary-600">
              {t('faq.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-secondary-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-secondary-50 transition-colors"
                >
                  <span className="font-semibold text-secondary-900 text-lg">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SafeIcon icon={FiChevronDown} className="w-5 h-5 text-secondary-400" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedFaq === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6">
                    <p className="text-secondary-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-8 py-4 bg-white text-primary-600 rounded-xl hover:bg-primary-50 transition-colors font-semibold text-lg shadow-lg"
              >
                {t('cta.startTrial')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-primary-600 transition-colors font-semibold text-lg disabled:opacity-50"
              >
                {isLoading ? t('cta.loadingDemo') : t('cta.tryDemo')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-primary-400 mb-4">
                {t('footer.brand')}
              </div>
              <p className="text-secondary-300 leading-relaxed">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('footer.product.title')}</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.product.digitalMenus')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.product.onlineOrdering')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.product.qrCodes')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.product.analytics')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('footer.support.title')}</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.support.helpCenter')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.support.contactUs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.support.training')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.support.apiDocs')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('footer.company.title')}</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.company.aboutUs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.company.careers')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.company.privacyPolicy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.company.termsOfService')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage