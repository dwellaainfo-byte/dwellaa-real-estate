'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Award, Users, TrendingUp, Star } from 'lucide-react';
import { Property, Testimonial } from '@/types';
import { sampleProperties, sampleTestimonials } from '@/data/sampleProperties';
import PropertyCard from '@/components/property/PropertyCard';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import ContactForm from '@/components/forms/ContactForm';
import { formatPrice } from '@/lib/utils';

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        // In a real app, this would be API calls
        setFeaturedProperties(sampleProperties.filter(p => p.featured));
        setTestimonials(sampleTestimonials);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = [
    { label: 'Properties Sold', value: '2,500+', icon: Award },
    { label: 'Happy Clients', value: '1,200+', icon: Users },
    { label: 'Cities Worldwide', value: '50+', icon: MapPin },
    { label: 'Years Experience', value: '20+', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen pt-52">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop"
            alt="Luxury oceanfront estate"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto section-padding">
          <h1 className="hero-text mb-6 animate-fade-in">
            Discover Extraordinary
            <br />
            <span className="text-gradient">Luxury Properties</span>
          </h1>
          
          <p className="subtitle-text mb-8 animate-fade-in animation-delay-200">
            From exclusive oceanfront estates to prestigious penthouses,
            find your perfect luxury home with our curated collection of 
            the world's finest properties.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
            <Button size="lg" variant="primary">
              <Link href="/properties" className="flex items-center">
                Explore Properties
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-luxury-charcoal">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 animate-fade-in animation-delay-600">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                <div className="text-2xl font-serif font-bold">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dwellaa Brand Section */}
      <section className="py-20 bg-white">
        <div className="container-luxury">
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-medium text-gray-600 mb-6">Powered By</h2>
              <div className="flex justify-center">
                <Image 
                  src="/dwellaa-logo.jpg"
                  alt="Dwellaa - Next-Gen Property Platform"
                  width={600}
                  height={200}
                  className="h-32 w-auto object-contain hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed">
                Experience the future of luxury real estate with Dwellaa's revolutionary platform. 
                Our cutting-edge technology connects you with the world's most exclusive properties 
                through an intuitive, next-generation interface designed for discerning clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-luxury-charcoal mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked exclusive listings that represent the pinnacle of luxury living
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <PropertyCard property={property} featured={false} />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg">
                  <Link href="/properties" className="flex items-center">
                    View All Properties
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-luxury-charcoal mb-6">
                Why Choose Luxury Properties International?
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-luxury-gold rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-2">Exclusive Access</h3>
                    <p className="text-gray-600">
                      Gain access to off-market properties and exclusive listings before they hit the public market.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-luxury-gold rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-2">Expert Team</h3>
                    <p className="text-gray-600">
                      Our certified luxury specialists have decades of experience in high-end real estate markets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-luxury-gold rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-2">Global Network</h3>
                    <p className="text-gray-600">
                      With offices in 50+ cities worldwide, we provide comprehensive international real estate services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=700&fit=crop"
                alt="Luxury property consultation"
                width={600}
                height={700}
                className="rounded-lg shadow-luxury"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-lg shadow-luxury-lg">
                <div className="text-2xl font-serif font-bold text-luxury-gold">$2.5B+</div>
                <div className="text-gray-600">Total Sales Volume</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-luxury-charcoal mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our satisfied clients about their luxury property journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                hover 
                className={`animate-slide-up animation-delay-${index * 200}`}
              >
                <CardContent className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                  
                  <div className="flex items-center justify-center space-x-3">
                    {testimonial.client.image && (
                      <Image
                        src={testimonial.client.image}
                        alt={testimonial.client.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    )}
                    <div className="text-left">
                      <div className="font-semibold text-luxury-charcoal">
                        {testimonial.client.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.client.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-luxury-charcoal">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <h2 className="text-4xl font-serif font-bold mb-6">
                Ready to Find Your Dream Property?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our luxury property specialists are here to help you discover the perfect home.
                Whether you're buying, selling, or investing, we provide personalized service
                tailored to your unique needs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-luxury-gold rounded-full" />
                  <span>Exclusive off-market listings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-luxury-gold rounded-full" />
                  <span>Personal property consultant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-luxury-gold rounded-full" />
                  <span>Virtual and in-person tours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-luxury-gold rounded-full" />
                  <span>Comprehensive market analysis</span>
                </div>
              </div>
            </div>

            <ContactForm compact />
          </div>
        </div>
      </section>
    </div>
  );
}