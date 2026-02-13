'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen pt-72 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl font-serif font-bold text-gray-800 mb-6">
          {t('home.title')}
        </h1>
        
        <p className="text-2xl text-gray-600 mb-8">
          {t('home.subtitle')}
        </p>
        
        <p className="text-lg text-gray-500 mb-12">
          {t('home.heroDescription')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/en/properties" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            {t('nav.properties')}
          </a>
          <a href="/en/contact" className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
            {t('nav.contact')}
          </a>
        </div>

        <div className="mt-20 text-sm text-gray-400">
          <p>✅ Internationalization is working!</p>
          <p>🌍 Switch languages using the selector in the top-right</p>
        </div>
      </div>
    </div>
  );
}