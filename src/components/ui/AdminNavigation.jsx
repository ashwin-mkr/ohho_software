import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminNavigation = ({ userRole = 'admin', notifications = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [systemHealth, setSystemHealth] = useState('healthy');
  const location = useLocation();

  useEffect(() => {
    // Simulate system health monitoring
    const healthCheck = setInterval(() => {
      const statuses = ['healthy', 'warning', 'error'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setSystemHealth(randomStatus);
    }, 30000); // Check every 30 seconds

    return () => clearInterval(healthCheck);
  }, []);

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/admin-dashboard-analytics', 
      icon: 'BarChart3',
      description: 'Analytics & KPIs'
    },
    { 
      label: 'Users', 
      path: '/user-management-panel', 
      icon: 'Users',
      description: 'User Management'
    },
    { 
      label: 'System', 
      path: '/system-logs-monitor', 
      icon: 'Activity',
      description: 'Logs & Monitoring',
      badge: systemHealth !== 'healthy'
    },
  ];

  const isActive = (path) => location.pathname === path;

  const getHealthColor = () => {
    switch (systemHealth) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getHealthIcon = () => {
    switch (systemHealth) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-nav bg-surface border-b border-border shadow-nav-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/admin-dashboard-analytics" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-2xl font-bold text-primary">OHHO Admin</span>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`
                    relative px-4 py-2 rounded-md font-medium transition-all duration-150 ease-smooth
                    ${isActive(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }
                  `}
                  title={item?.description}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                    {item?.badge && (
                      <div className={`w-2 h-2 rounded-full ${getHealthColor()?.replace('text-', 'bg-')}`} />
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* System Health Indicator */}
              <div className={`flex items-center space-x-2 ${getHealthColor()}`} title={`System status: ${systemHealth}`}>
                <Icon name={getHealthIcon()} size={16} />
                <span className="text-sm font-medium capitalize">{systemHealth}</span>
              </div>

              {/* Notifications */}
              {notifications > 0 && (
                <div className="relative">
                  <Icon name="Bell" size={20} className="text-text-secondary" />
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications > 9 ? '9+' : notifications}
                  </span>
                </div>
              )}

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <button
                  onClick={handleLogout}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-150 ease-smooth"
                  title="Logout"
                >
                  <Icon name="LogOut" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-nav bg-surface border-b border-border shadow-nav-light">
          <div className="flex items-center justify-between h-16 px-4">
            <Link to="/admin-dashboard-analytics" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold text-primary">OHHO</span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150 ease-smooth"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-mobile-menu bg-black/50 backdrop-blur-sm">
            <div className="fixed top-16 left-0 right-0 bg-surface border-b border-border shadow-nav">
              <div className="px-4 py-4 space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-md font-medium transition-all duration-150 ease-smooth
                      ${isActive(item?.path)
                        ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={item?.icon} size={20} />
                      <div>
                        <div>{item?.label}</div>
                        <div className="text-xs text-muted-foreground">{item?.description}</div>
                      </div>
                    </div>
                    {item?.badge && (
                      <div className={`w-2 h-2 rounded-full ${getHealthColor()?.replace('text-', 'bg-')}`} />
                    )}
                  </Link>
                ))}

                {/* Mobile User Actions */}
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className={`flex items-center space-x-2 ${getHealthColor()}`}>
                      <Icon name={getHealthIcon()} size={16} />
                      <span className="text-sm font-medium capitalize">System: {systemHealth}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-smooth"
                    >
                      <Icon name="LogOut" size={18} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Tab Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-nav bg-surface border-t border-border shadow-nav">
          <div className="flex items-center justify-around py-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-all duration-150 ease-smooth
                  ${isActive(item?.path)
                    ? 'text-primary' :'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                <div className="relative">
                  <Icon name={item?.icon} size={20} />
                  {item?.badge && (
                    <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getHealthColor()?.replace('text-', 'bg-')}`} />
                  )}
                </div>
                <span className="text-xs font-medium">{item?.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavigation;