'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ContactForm as ContactFormType } from '@/types';

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  inquiryType: z.enum(['viewing', 'buying', 'selling', 'general']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  propertyId: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  propertyId?: string;
  propertyTitle?: string;
  className?: string;
  compact?: boolean;
}

export default function ContactForm({ 
  propertyId, 
  propertyTitle, 
  className = '', 
  compact = false 
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      inquiryType: 'general',
      propertyId: propertyId,
    },
  });

  const inquiryType = watch('inquiryType');

  const inquiryOptions = [
    { value: 'viewing', label: 'Schedule a Viewing', icon: '👁' },
    { value: 'buying', label: 'Buying Inquiry', icon: '🏠' },
    { value: 'selling', label: 'Selling Property', icon: '💰' },
    { value: 'general', label: 'General Inquiry', icon: '💬' },
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Send to our API which forwards to dwellaainfo@gmail.com
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error sending your message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Thank You!
          </h3>
          <p className="text-gray-600 mb-4">
            Your inquiry has been sent successfully.
          </p>
          <p className="text-sm text-gray-500">
            {inquiryType === 'viewing' 
              ? 'We\'ll contact you to schedule your viewing.'
              : 'One of our luxury property specialists will reach out soon.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} shadow-xl border-2 border-gray-200`}>
      {!compact && (
        <CardHeader className="bg-blue-50 border-b border-blue-200">
          <CardTitle level={2} className="text-2xl text-blue-900">
            {propertyId ? 'Inquire About This Property' : 'Contact Our Team'}
          </CardTitle>
          {propertyTitle && (
            <p className="text-blue-700 text-sm font-medium mt-2">
              Property: {propertyTitle}
            </p>
          )}
        </CardHeader>
      )}
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Inquiry Type */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <label className="block text-xl font-bold text-blue-900 mb-6">
              How can we help you?
            </label>
            <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'} gap-4`}>
              {inquiryOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative cursor-pointer rounded-xl border-3 p-6 text-center transition-all duration-200 ${
                    inquiryType === option.value
                      ? 'border-blue-500 bg-blue-100 shadow-lg transform scale-105'
                      : 'border-gray-300 bg-white shadow-md hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg'
                  }`}
                >
                  <input
                    type="radio"
                    {...register('inquiryType')}
                    value={option.value}
                    className="sr-only"
                  />
                  <div className="text-3xl mb-3">{option.icon}</div>
                  <div className="text-sm font-bold text-gray-800">{option.label}</div>
                </label>
              ))}
            </div>
            {errors.inquiryType && (
              <p className="text-sm text-red-600 mt-3 font-semibold">{errors.inquiryType.message}</p>
            )}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
              <label htmlFor="firstName" className="block text-lg font-bold text-gray-800 mb-3">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <User className="h-6 w-6 text-blue-500" />
                </div>
                <input
                  id="firstName"
                  {...register('firstName')}
                  placeholder="John"
                  className={`w-full pl-14 pr-4 py-4 text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                    errors.firstName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-red-600 mt-2 font-semibold">{errors.firstName.message}</p>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
              <label htmlFor="lastName" className="block text-lg font-bold text-gray-800 mb-3">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <User className="h-6 w-6 text-blue-500" />
                </div>
                <input
                  id="lastName"
                  {...register('lastName')}
                  placeholder="Doe"
                  className={`w-full pl-14 pr-4 py-4 text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                    errors.lastName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.lastName && (
                <p className="text-sm text-red-600 mt-2 font-semibold">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
              <label htmlFor="email" className="block text-lg font-bold text-gray-800 mb-3">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <Mail className="h-6 w-6 text-blue-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john@example.com"
                  className={`w-full pl-14 pr-4 py-4 text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-2 font-semibold">{errors.email.message}</p>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
              <label htmlFor="phone" className="block text-lg font-bold text-gray-800 mb-3">
                Phone Number <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <Phone className="h-6 w-6 text-blue-500" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-14 pr-4 py-4 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
            <label htmlFor="message" className="block text-lg font-bold text-gray-800 mb-3">
              Message <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-4 left-4 pointer-events-none">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <textarea
                id="message"
                {...register('message')}
                rows={compact ? 4 : 6}
                className={`w-full pl-14 pr-4 py-4 text-lg font-semibold border-2 rounded-lg resize-none focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                  errors.message 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder={
                  inquiryType === 'viewing'
                    ? 'I would like to schedule a viewing for this property. Please let me know your availability.'
                    : inquiryType === 'selling'
                    ? 'I am interested in selling my property. Please provide information about your services.'
                    : 'Please provide more details about your inquiry.'
                }
              />
            </div>
            {errors.message && (
              <p className="text-sm text-red-600 mt-2 font-semibold">{errors.message.message}</p>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-sm text-gray-700 font-medium">
              By submitting this form, you agree to our{' '}
              <a href="/privacy" className="text-blue-600 hover:underline font-semibold">
                Privacy Policy
              </a>{' '}
              and consent to being contacted by our team regarding your inquiry.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xl py-6 px-8 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Message...
              </>
            ) : (
              <>
                <Send size={24} className="mr-3" />
                {inquiryType === 'viewing' 
                  ? 'Schedule Viewing' 
                  : inquiryType === 'selling'
                  ? 'Get Valuation'
                  : 'Send Message'}
              </>
            )}
          </button>

          {/* Additional Info */}
          {!compact && (
            <div className="text-center pt-6 border-t-2 border-gray-200">
              <p className="text-lg text-gray-600 mb-3 font-medium">
                Prefer to speak directly? Call us at
              </p>
              <a 
                href="tel:+1-555-123-4567"
                className="text-blue-600 font-bold text-xl hover:text-blue-700 transition-colors hover:underline"
              >
                +1 (555) 123-4567
              </a>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}