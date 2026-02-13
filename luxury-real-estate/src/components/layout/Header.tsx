'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Home, Search, Users, Mail, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import LanguageSelector from '@/components/ui/LanguageSelector';
import LocationSearch from '@/components/search/LocationSearch';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('buy');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const propertyTabs = [
    { id: 'buy', name: 'Buy', href: '/properties?type=sale' },
    { id: 'rent', name: 'Rent', href: '/properties?type=rent' },
    { id: 'sell', name: 'Sell', href: '/sell' },
  ];

  const navigation = [
    { name: 'Properties', href: '/properties', icon: Home },
    { name: 'Our Team', href: '/team', icon: Users },
    { name: 'Contact', href: '/contact', icon: Mail },
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
              <Link href="mailto:info@luxuryproperties.com" className="hidden sm:block hover:text-blue-600 transition-colors">
                info@luxuryproperties.com
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
                Luxury Properties
              </h1>
              <p className="text-xs text-gray-500 -mt-1">International</p>
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
            <Button variant="outline" size="sm">
              List Your Property
            </Button>
            <Button variant="primary" size="sm">
              Schedule Viewing
            </Button>
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

      {/* Buy/Rent/Sell Tabs & Search Bar */}
      <div className="border-t border-gray-100 bg-white">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 space-y-4 lg:space-y-0">
            {/* Property Tabs */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {propertyTabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-semibold text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </div>

            {/* Location Search */}
            <div className="flex-1 max-w-2xl lg:ml-8">
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
                <Button variant="outline" className="w-full">
                  List Your Property
                </Button>
                <Button variant="primary" className="w-full">
                  Schedule Viewing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}