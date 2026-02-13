import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Footer() {
  const quickLinks = [
    { name: 'Properties for Sale', href: '/properties' },
    { name: 'Properties for Rent', href: '/properties?type=rent' },
    { name: 'Luxury Estates', href: '/properties?category=estate' },
    { name: 'Penthouses', href: '/properties?category=penthouse' },
    { name: 'Waterfront Properties', href: '/properties?feature=waterfront' },
  ];

  const services = [
    { name: 'Property Valuation', href: '/services/valuation' },
    { name: 'Investment Advisory', href: '/services/investment' },
    { name: 'Property Management', href: '/services/management' },
    { name: 'Relocation Services', href: '/services/relocation' },
    { name: 'Market Analysis', href: '/services/analysis' },
  ];

  const locations = [
    { name: 'Beverly Hills', href: '/locations/beverly-hills' },
    { name: 'Manhattan', href: '/locations/manhattan' },
    { name: 'Miami Beach', href: '/locations/miami-beach' },
    { name: 'Aspen', href: '/locations/aspen' },
    { name: 'Hamptons', href: '/locations/hamptons' },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/luxuryproperties' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/luxuryproperties' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/luxuryproperties' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/luxuryproperties' },
  ];

  return (
    <footer className="bg-luxury-charcoal text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container-luxury py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Stay Informed About Exclusive Properties
            </h3>
            <p className="text-gray-300 mb-8">
              Be the first to know about new luxury listings, market insights, and exclusive events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-300"
              />
              <Button variant="primary" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold">Luxury Properties</h2>
                <p className="text-gray-400 text-sm">International</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              For over two decades, we have been the premier destination for luxury real estate, 
              connecting discerning clients with exceptional properties worldwide.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={18} className="text-luxury-gold" />
                <span>1234 Luxury Lane, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={18} className="text-luxury-gold" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={18} className="text-luxury-gold" />
                <span>dwellaainfo@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Properties</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-luxury-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href} 
                    className="text-gray-300 hover:text-luxury-gold transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Locations</h3>
            <ul className="space-y-3 mb-6">
              {locations.map((location) => (
                <li key={location.name}>
                  <Link 
                    href={location.href} 
                    className="text-gray-300 hover:text-luxury-gold transition-colors duration-200"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-200">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-luxury-gold transition-colors duration-200"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Luxury Properties International. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-luxury-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-luxury-gold transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-luxury-gold transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}