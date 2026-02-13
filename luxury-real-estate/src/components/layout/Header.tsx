'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Search, Users, Mail, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Properties', href: '/properties', icon: Home },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Our Team', href: '/team', icon: Users },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg backdrop-blur-sm' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-luxury rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-serif font-bold text-luxury-charcoal">
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
                className="flex items-center space-x-2 text-gray-600 hover:text-luxury-gold transition-colors duration-200 font-medium"
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="tel:+1-555-123-4567"
              className="flex items-center space-x-2 text-gray-600 hover:text-luxury-gold transition-colors"
            >
              <Phone size={18} />
              <span className="font-medium">+1 (555) 123-4567</span>
            </Link>
            <Button variant="primary" size="sm">
              Schedule Viewing
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-luxury-gold transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100">
            <div className="py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-luxury-gold hover:bg-gray-50 transition-all duration-200 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              
              <div className="px-4 pt-4 border-t border-gray-100 space-y-3">
                <Link 
                  href="tel:+1-555-123-4567"
                  className="flex items-center space-x-3 text-gray-600 hover:text-luxury-gold transition-colors"
                >
                  <Phone size={20} />
                  <span className="font-medium">+1 (555) 123-4567</span>
                </Link>
                <Button variant="primary" size="sm" className="w-full">
                  Schedule Viewing
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}