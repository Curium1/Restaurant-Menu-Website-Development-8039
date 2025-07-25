import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useMenu } from '../context/MenuContext';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

const { FiArrowLeft, FiDownload, FiPrinter, FiShare2 } = FiIcons;

const QRGenerator = () => {
  const { menuData } = useMenu();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const qrCardRef = useRef(null);

  const menuUrl = window.location.origin + window.location.pathname;

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(menuUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#ffffff'
        }
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCard = async () => {
    if (!qrCardRef.current) return;

    try {
      const canvas = await html2canvas(qrCardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = `${menuData.restaurant.name.replace(/\s+/g, '-')}-menu-qr.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading QR card:', error);
    }
  };

  const printQRCard = () => {
    if (!qrCardRef.current) return;

    const printWindow = window.open('', '_blank');
    const cardHtml = qrCardRef.current.outerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Menu QR Code - ${menuData.restaurant.name}</title>
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            @media print { body { margin: 0; padding: 0; } }
          </style>
        </head>
        <body>
          ${cardHtml}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${menuData.restaurant.name} - Digital Menu`,
          text: 'Check out our digital menu!',
          url: menuUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(menuUrl);
      alert('Menu URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-secondary-100 hover:bg-secondary-200 transition-colors"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5 text-secondary-600" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-secondary-800">QR Code Generator</h1>
              <p className="text-secondary-600">Generate QR codes for easy menu access</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Code Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-secondary-200 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-secondary-800 mb-6">Menu QR Code</h2>
              
              <div
                ref={qrCardRef}
                className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-8 text-white text-center"
              >
                <h3 className="text-2xl font-bold mb-2">{menuData.restaurant.name}</h3>
                <p className="text-primary-100 mb-6">{menuData.restaurant.description}</p>
                
                <div className="bg-white rounded-xl p-6 mb-6 inline-block">
                  {isGenerating ? (
                    <div className="w-64 h-64 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="Menu QR Code" className="w-64 h-64" />
                  ) : (
                    <div className="w-64 h-64 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <span className="text-secondary-400">Failed to generate QR code</span>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <p className="text-primary-100 text-sm mb-2">Scan to view our digital menu</p>
                  <p className="text-primary-200 text-xs font-mono break-all">{menuUrl}</p>
                </div>
                
                <div className="mt-6 text-sm text-primary-100">
                  <p>📍 {menuData.restaurant.address}</p>
                  <p>📞 {menuData.restaurant.phone}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions and Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg border border-secondary-200 p-6">
              <h3 className="text-lg font-bold text-secondary-800 mb-4">Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadQRCard}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                >
                  <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  Download QR Card
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={printQRCard}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors font-medium"
                >
                  <SafeIcon icon={FiPrinter} className="w-5 h-5" />
                  Print QR Card
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={shareQRCode}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <SafeIcon icon={FiShare2} className="w-5 h-5" />
                  Share Menu Link
                </motion.button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-xl shadow-lg border border-secondary-200 p-6">
              <h3 className="text-lg font-bold text-secondary-800 mb-4">How to Use</h3>
              <div className="space-y-4 text-sm text-secondary-600">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <p>Download or print the QR code card</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <p>Place it on tables, at the entrance, or in promotional materials</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <p>Customers scan with their phone camera to access your menu</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <p>Update your menu anytime through the admin panel</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-800 mb-4">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-amber-700">
                <li>• Print QR codes on water-resistant material for table use</li>
                <li>• Include a brief instruction like "Scan for menu"</li>
                <li>• Test the QR code with different devices before printing</li>
                <li>• Consider creating different sizes for various use cases</li>
                <li>• Update your menu regularly to keep customers engaged</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;