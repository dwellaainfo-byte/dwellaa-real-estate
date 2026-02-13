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
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      inquiryType: propertyId ? 'viewing' : 'general',
      propertyId: propertyId || '',
    },
  });

  const inquiryType = watch('inquiryType');

  const inquiryOptions = [
    { value: 'viewing', label: 'Schedule a Viewing', icon: '👁️' },
    { value: 'buying', label: 'Buying Inquiry', icon: '🏠' },
    { value: 'selling', label: 'Selling Property', icon: '💰' },
    { value: 'general', label: 'General Inquiry', icon: '💬' },
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', data);
      
      setIsSubmitted(true);
      reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (show error message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-semibold text-luxury-charcoal mb-2">
            Thank You!
          </h3>
          <p className="text-gray-600 mb-4">
            We've received your inquiry and will get back to you within 24 hours.
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
    <Card className={className}>
      {!compact && (
        <CardHeader>
          <CardTitle level={2}>
            {propertyId ? 'Inquire About This Property' : 'Contact Our Team'}
          </CardTitle>
          {propertyTitle && (
            <p className="text-gray-600 text-sm">
              Property: {propertyTitle}
            </p>
          )}
        </CardHeader>
      )}
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Inquiry Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How can we help you?
            </label>
            <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'} gap-2`}>
              {inquiryOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative cursor-pointer rounded-lg border p-3 text-center hover:border-luxury-gold transition-colors ${
                    inquiryType === option.value
                      ? 'border-luxury-gold bg-luxury-gold/5'
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    {...register('inquiryType')}
                    value={option.value}
                    className="sr-only"
                  />
                  <div className="text-lg mb-1">{option.icon}</div>
                  <div className="text-xs font-medium">{option.label}</div>
                </label>
              ))}
            </div>
            {errors.inquiryType && (
              <p className="text-sm text-red-600 mt-1">{errors.inquiryType.message}</p>
            )}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              {...register('firstName')}
              error={errors.firstName?.message}
              icon={<User />}
              placeholder="John"
            />
            <Input
              label="Last Name"
              {...register('lastName')}
              error={errors.lastName?.message}
              icon={<User />}
              placeholder="Doe"
            />
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              icon={<Mail />}
              placeholder="john@example.com"
            />
            <Input
              label="Phone Number (Optional)"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
              icon={<Phone />}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                {...register('message')}
                rows={compact ? 4 : 6}
                className={`input-luxury pl-10 resize-none ${
                  errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
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
              <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p>
              By submitting this form, you agree to our{' '}
              <a href="/privacy" className="text-luxury-gold hover:underline">
                Privacy Policy
              </a>{' '}
              and consent to being contacted by our team regarding your inquiry.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full"
            size={compact ? 'md' : 'lg'}
          >
            <Send size={18} className="mr-2" />
            {inquiryType === 'viewing' 
              ? 'Schedule Viewing' 
              : inquiryType === 'selling'
              ? 'Get Valuation'
              : 'Send Message'}
          </Button>

          {/* Additional Info */}
          {!compact && (
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-2">
                Prefer to speak directly? Call us at
              </p>
              <a 
                href="tel:+1-555-123-4567"
                className="text-luxury-gold font-semibold hover:text-luxury-darkGold transition-colors"
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