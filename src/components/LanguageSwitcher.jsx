import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <option value="en">English</option>
        <option value="sv">Svenska</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
