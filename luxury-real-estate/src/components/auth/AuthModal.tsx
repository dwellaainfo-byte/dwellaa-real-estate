'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User, Building2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    agencyName: '',
    phone: '',
    keepSignedIn: false,
    acceptTerms: false
  });

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (mode === 'signin') {
        await login(formData.email, formData.password);
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          agencyName: formData.agencyName,
          phone: formData.phone,
        });
      }
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    setIsLoading(true);
    console.log(`${provider} login`);
    // TODO: Implement social login
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-auto my-4 bg-white rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto" style={{ marginTop: 'max(1rem, calc(50vh - 400px))', marginBottom: '1rem' }}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building2 size={24} />
            </div>
            <h2 className="text-xl font-bold mb-2">
              {mode === 'signin' ? 'Welcome Back' : 'Join Our Network'}
            </h2>
            <p className="text-sm text-blue-100">
              {mode === 'signin' 
                ? 'Sign in to save searches and favorite properties.' 
                : 'Create your agency profile and start saving properties.'
              }
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Social Login Buttons */}
          <div className="space-y-2 mb-4">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign {mode === 'signin' ? 'in' : 'up'} with Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Sign {mode === 'signin' ? 'in' : 'up'} with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agency Name
                  </label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.agencyName}
                      onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Real Estate Agency"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.keepSignedIn}
                  onChange={(e) => setFormData({ ...formData, keepSignedIn: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Keep Me Signed In</span>
              </label>

              {mode === 'signup' && (
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    By submitting this form, I acknowledge that I accept the{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>{' '}
                    and <a href="/terms" className="text-blue-600 hover:underline">Terms of Use</a>.
                  </span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-3"
              disabled={isLoading || (mode === 'signup' && !formData.acceptTerms)}
            >
              {isLoading ? 'Please wait...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </Button>

            {/* Forgot Password */}
            {mode === 'signin' && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              {mode === 'signin' ? "New to the site?" : "Already have an account?"}
            </p>
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="mt-1 text-sm font-medium text-blue-600 hover:underline"
            >
              {mode === 'signin' ? 'Sign Up for an Account' : 'Sign In'}
            </button>
          </div>

          {/* reCAPTCHA Notice */}
          <p className="mt-4 text-xs text-gray-500 text-center">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a>{' '}
            and <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
          </p>
        </div>
      </div>
    </div>
  );
}