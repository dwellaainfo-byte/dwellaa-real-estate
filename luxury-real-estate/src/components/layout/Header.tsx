'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X, Home, Search, Users, Mail, Phone, UserPlus, LogIn } from 'lucide-react';
import Button from '@/components/ui/Button';
import LanguageSelector from '@/components/ui/LanguageSelector';
import LocationSearch from '@/components/search/LocationSearch';
import AuthModal from '@/components/auth/AuthModal';
import UserMenu from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('buy');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  
  const { isAuthenticated, isLoading } = useAuth();
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const propertyTabs = [
    { id: 'buy', name: t('propertyTypes.buy'), href: '/properties?type=sale' },
    { id: 'rent', name: t('propertyTypes.rent'), href: '/properties?type=rent' },
    { id: 'sell', name: t('propertyTypes.sell'), href: '/sell' },
  ];

  const navigation = [
    { name: t('nav.properties'), href: '/properties', icon: Home },
    { name: t('nav.team'), href: '/team', icon: Users },
    { name: t('nav.contact'), href: '/contact', icon: Mail },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg backdrop-blur-sm' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      {/* Top Bar with Language Selector */}
      <div className="border-b border-gray-100">
        <div className="container-luxury">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Link href="tel:+1-555-123-4567" className="hover:text-blue-600 transition-colors">
                +1 (555) 123-4567
              </Link>
              <span className="hidden sm:block">•</span>
              <Link href="mailto:dwellaainfo@gmail.com" className="hidden sm:block hover:text-blue-600 transition-colors">
                dwellaainfo@gmail.com
              </Link>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-serif font-bold text-gray-800">
                {t('home.title')}
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setAuthModalMode('signin');
                    setAuthModalOpen(true);
                  }}
                  className="flex items-center space-x-2"
                >
                  <LogIn size={16} />
                  <span>{t('nav.signIn')}</span>
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => {
                    setAuthModalMode('signup');
                    setAuthModalOpen(true);
                  }}
                  className="flex items-center space-x-2"
                >
                  <UserPlus size={16} />
                  <span>{t('nav.join')}</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm">
                  {t('nav.listProperty')}
                </Button>
                <Button variant="primary" size="sm">
                  {t('nav.scheduleViewing')}
                </Button>
                <UserMenu />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Big Property Type Tabs - Sotheby's Style */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-luxury">
          <div className="flex justify-center">
            {propertyTabs.map((tab, index) => (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-12 py-6 text-2xl font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                } ${
                  index === 0 ? 'rounded-l-lg' : ''
                } ${
                  index === propertyTabs.length - 1 ? 'rounded-r-lg' : ''
                }`}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Location Search Section */}
      <div className="border-t border-gray-100 bg-white">
        <div className="container-luxury">
          <div className="py-6">
            <div className="max-w-4xl mx-auto">
              <LocationSearch />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="px-3 space-y-3">
                {!isAuthenticated ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center space-x-2"
                      onClick={() => {
                        setAuthModalMode('signin');
                        setAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogIn size={16} />
                      <span>{t('nav.signIn')}</span>
                    </Button>
                    <Button 
                      variant="primary" 
                      className="w-full flex items-center justify-center space-x-2"
                      onClick={() => {
                        setAuthModalMode('signup');
                        setAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <UserPlus size={16} />
                      <span>{t('nav.join')}</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full">
                      {t('nav.listProperty')}
                    </Button>
                    <Button variant="primary" className="w-full">
                      {t('nav.scheduleViewing')}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </header>
  );
}