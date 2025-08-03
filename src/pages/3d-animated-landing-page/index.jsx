import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicNavigation from '../../components/ui/PublicNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import all components
import ThreeJSCanvas from './components/ThreeJSCanvas';
import AnimatedLogo from './components/AnimatedLogo';
import TypewriterTagline from './components/TypewriterTagline';
import ServicesGrid from './components/ServicesGrid';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import MusicController from './components/MusicController';

const ThreeDAnimatedLandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    // Handle scroll for parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <PublicNavigation isTransparent={true} />
      {/* Three.js Background Canvas */}
      <ThreeJSCanvas isVisible={isLoaded} />
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full animate-spin mx-auto">
              <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">OHHO Software</h2>
              <p className="text-blue-200/80">Initializing 3D Experience...</p>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 relative">
          {/* Parallax Background Elements */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>

          <div className="text-center space-y-12 max-w-6xl mx-auto">
            {/* Animated Logo */}
            <AnimatedLogo isVisible={isLoaded} />

            {/* Typewriter Tagline */}
            <TypewriterTagline delay={3000} />

            {/* Hero CTAs */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-1000 ${
              isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              <Link to="/dynamic-contact-form">
                <Button
                  variant="default"
                  size="xl"
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-2xl hover:shadow-blue-500/25"
                  iconName="Rocket"
                  iconPosition="left"
                >
                  Get Started
                </Button>
              </Link>
              
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                iconName="Play"
                iconPosition="left"
              >
                View Our Work
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex flex-col items-center space-y-2 animate-bounce">
                <span className="text-blue-200/60 text-sm">Scroll to explore</span>
                <Icon name="ChevronDown" size={20} className="text-cyan-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesGrid />

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Case Studies Section */}
        <CaseStudiesSection />

        {/* Footer */}
        <footer className="py-16 px-6 lg:px-8 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">O</span>
                  </div>
                  <span className="text-xl font-bold text-white">OHHO Software</span>
                </div>
                <p className="text-blue-200/70 text-sm leading-relaxed">
                  Transforming businesses through innovative technology solutions and cutting-edge digital experiences.
                </p>
                <div className="flex space-x-4">
                  {['Github', 'Linkedin', 'Twitter', 'Mail']?.map((social, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
                      aria-label={social}
                    >
                      <Icon name={social} size={16} className="text-blue-200" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Services</h3>
                <ul className="space-y-2 text-sm text-blue-200/70">
                  <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Web Development</a></li>
                  <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Mobile Apps</a></li>
                  <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Cloud Solutions</a></li>
                  <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">AI Integration</a></li>
                  <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Cybersecurity</a></li>
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Company</h3>
                <ul className="space-y-2 text-sm text-blue-200/70">
                  <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">About Us</a></li>
                  <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Blog</a></li>
                  <li><a href="#" className="hover:text-cyan-300 transition-colors duration-200">Case Studies</a></li>
                  <li><Link to="/dynamic-contact-form" className="hover:text-cyan-300 transition-colors duration-200">Contact</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
                <div className="space-y-3 text-sm text-blue-200/70">
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={14} className="text-cyan-400" />
                    <span>hello@ohhosoftware.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={14} className="text-cyan-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-cyan-400" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-blue-200/60 text-sm">
                © {new Date()?.getFullYear()} OHHO Software. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-blue-200/60">
                <a href="#" className="hover:text-cyan-300 transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-cyan-300 transition-colors duration-200">Terms of Service</a>
                <a href="#" className="hover:text-cyan-300 transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
      {/* Music Controller */}
      <MusicController />
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`
          fixed bottom-6 left-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm 
          border border-white/20 rounded-full flex items-center justify-center 
          transition-all duration-300 hover:scale-110 z-40
          ${scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
        aria-label="Scroll to top"
      >
        <Icon name="ArrowUp" size={20} className="text-white" />
      </button>
    </div>
  );
};

export default ThreeDAnimatedLandingPage;