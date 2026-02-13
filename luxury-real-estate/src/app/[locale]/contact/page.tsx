'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Globe, Award } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { sampleAgents } from '@/data/sampleProperties';

export default function ContactPage() {
  const offices = [
    {
      city: 'Beverly Hills',
      address: '1234 Luxury Lane, Beverly Hills, CA 90210',
      phone: '+1 (310) 555-0123',
      email: 'beverlyhills@luxuryproperties.com',
      hours: 'Mon-Sun: 9:00 AM - 9:00 PM',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    },
    {
      city: 'Manhattan',
      address: '432 Park Avenue, New York, NY 10016',
      phone: '+1 (212) 555-0456',
      email: 'manhattan@luxuryproperties.com',
      hours: 'Mon-Sun: 9:00 AM - 8:00 PM',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
    },
    {
      city: 'Miami Beach',
      address: '789 Ocean Drive, Miami Beach, FL 33139',
      phone: '+1 (305) 555-0789',
      email: 'miami@luxuryproperties.com',
      hours: 'Mon-Sun: 9:00 AM - 9:00 PM',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    },
  ];

  const services = [
    {
      icon: Award,
      title: 'Luxury Property Sales',
      description: 'Expert guidance in buying and selling premium real estate worldwide.',
    },
    {
      icon: Globe,
      title: 'International Relocation',
      description: 'Comprehensive relocation services for global property investments.',
    },
    {
      icon: MapPin,
      title: 'Property Management',
      description: 'Full-service property management for luxury real estate portfolios.',
    },
    {
      icon: Clock,
      title: 'Investment Advisory',
      description: 'Strategic investment advice for luxury real estate opportunities.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle pt-80">
      <div className="container-luxury py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-charcoal mb-6">
            Contact Our Expert Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're buying, selling, or investing in luxury real estate, 
            our experienced professionals are here to provide personalized service 
            tailored to your unique needs.
          </p>
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-luxury-gold mt-1" />
                  <div>
                    <h3 className="font-semibold text-luxury-charcoal">Call Us</h3>
                    <p className="text-gray-600">Available 24/7 for urgent inquiries</p>
                    <a 
                      href="tel:+1-555-123-4567"
                      className="text-luxury-gold font-semibold hover:text-luxury-darkGold transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-luxury-gold mt-1" />
                  <div>
                    <h3 className="font-semibold text-luxury-charcoal">Email Us</h3>
                    <p className="text-gray-600">We'll respond within 24 hours</p>
                    <a 
                      href="mailto:dwellaainfo@gmail.com"
                      className="text-luxury-gold font-semibold hover:text-luxury-darkGold transition-colors"
                    >
                      dwellaainfo@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-luxury-gold mt-1" />
                  <div>
                    <h3 className="font-semibold text-luxury-charcoal">Visit Us</h3>
                    <p className="text-gray-600">
                      1234 Luxury Lane<br />
                      Beverly Hills, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-luxury-gold mt-1" />
                  <div>
                    <h3 className="font-semibold text-luxury-charcoal">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Sunday<br />
                      9:00 AM - 9:00 PM PST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  For urgent property matters outside business hours:
                </p>
                <a 
                  href="tel:+1-555-999-0000"
                  className="text-luxury-gold font-semibold text-lg hover:text-luxury-darkGold transition-colors"
                >
                  +1 (555) 999-0000
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-luxury-charcoal mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive luxury real estate solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} hover className="text-center">
                <CardContent className="pt-8 pb-6">
                  <service.icon className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
                  <h3 className="text-lg font-serif font-semibold text-luxury-charcoal mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-luxury-charcoal mb-4">
              Our Offices
            </h2>
            <p className="text-xl text-gray-600">
              Visit us at any of our luxury real estate locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} hover>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={office.image}
                    alt={`${office.city} office`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <CardContent>
                  <h3 className="text-xl font-serif font-semibold text-luxury-charcoal mb-4">
                    {office.city}
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-luxury-gold mt-0.5" />
                      <span className="text-gray-600">{office.address}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-luxury-gold" />
                      <a 
                        href={`tel:${office.phone}`}
                        className="text-luxury-gold hover:text-luxury-darkGold transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-luxury-gold" />
                      <a 
                        href={`mailto:${office.email}`}
                        className="text-luxury-gold hover:text-luxury-darkGold transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-luxury-gold" />
                      <span className="text-gray-600">{office.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-luxury-charcoal mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleAgents.map((agent) => (
              <Card key={agent.id} hover className="text-center">
                <CardContent className="pt-8">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="96px"
                    />
                  </div>
                  
                  <h3 className="text-xl font-serif font-semibold text-luxury-charcoal mb-2">
                    {agent.name}
                  </h3>
                  
                  <div className="text-luxury-gold font-medium mb-3">
                    {agent.experience} Years Experience
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {agent.bio}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {agent.specialties.slice(0, 2).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-luxury-cream text-luxury-gold text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-center space-x-4 text-sm">
                    <a 
                      href={`tel:${agent.phone}`}
                      className="flex items-center space-x-1 text-luxury-gold hover:text-luxury-darkGold transition-colors"
                    >
                      <Phone size={14} />
                      <span>Call</span>
                    </a>
                    <a 
                      href={`mailto:${agent.email}`}
                      className="flex items-center space-x-1 text-luxury-gold hover:text-luxury-darkGold transition-colors"
                    >
                      <Mail size={14} />
                      <span>Email</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}