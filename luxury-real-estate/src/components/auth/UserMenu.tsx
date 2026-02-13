'use client';

import React, { useState } from 'react';
import { User, Heart, Search, Settings, LogOut, ChevronDown, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const menuItems = [
    { 
      icon: User, 
      label: 'My Profile', 
      href: '/profile',
      description: 'Manage your account'
    },
    { 
      icon: Heart, 
      label: `Saved Properties (${user.favoriteProperties.length})`, 
      href: '/favorites',
      description: 'Your favorite listings'
    },
    { 
      icon: Search, 
      label: `Saved Searches (${user.savedSearches.length})`, 
      href: '/saved-searches',
      description: 'Your search alerts'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/settings',
      description: 'Account preferences'
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user.firstName[0]}{user.lastName[0]}
          </span>
        </div>
        
        {/* User Info - Hidden on mobile */}
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </p>
          {user.agencyName && (
            <p className="text-xs text-gray-500">{user.agencyName}</p>
          )}
        </div>
        
        <ChevronDown 
          size={16} 
          className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.firstName[0]}{user.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  {user.agencyName && (
                    <div className="flex items-center mt-1">
                      <Building2 size={12} className="text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{user.agencyName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}