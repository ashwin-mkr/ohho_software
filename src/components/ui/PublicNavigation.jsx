import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PublicNavigation = ({ isTransparent = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (isTransparent) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isTransparent]);

  const navigationItems = [
    { label: 'Home', path: '/3d-animated-landing-page', icon: 'Home' },
    { label: 'Contact', path: '/dynamic-contact-form', icon: 'MessageSquare' },
    { label: 'Payment', path: '/secure-payment-processing', icon: 'CreditCard' },
  ];

  const isActive = (path) => location.pathname === path;

  const navClasses = `
    fixed top-0 left-0 right-0 z-nav transition-all duration-300 ease-smooth
    ${isTransparent && !isScrolled 
      ? 'bg-transparent backdrop-blur-nav' :'bg-surface/95 backdrop-blur-nav shadow-nav-light border-b border-border'
    }
  `;

  const logoClasses = `
    text-2xl font-bold transition-colors duration-300 ease-smooth
    ${isTransparent && !isScrolled ? 'text-white' : 'text-primary'}
  `;

  const linkClasses = (active) => `
    px-4 py-2 rounded-md font-medium transition-all duration-150 ease-smooth
    ${active 
      ? 'text-primary bg-primary/10' 
      : isTransparent && !isScrolled
        ? 'text-white/90 hover:text-white hover:bg-white/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
    }
  `;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/3d-animated-landing-page" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className={logoClasses}>OHHO Software</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={linkClasses(isActive(item?.path))}
              >
                {item?.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              md:hidden p-2 rounded-md transition-colors duration-150 ease-smooth
              ${isTransparent && !isScrolled
                ? 'text-white hover:bg-white/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
              }
            `}
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={isMobileMenuOpen ? 'X' : 'Menu'} 
              size={24} 
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-nav border-b border-border shadow-nav z-mobile-menu">
            <div className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-md font-medium transition-all duration-150 ease-smooth
                    ${isActive(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavigation;