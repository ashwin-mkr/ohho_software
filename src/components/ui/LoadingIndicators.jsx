import React from 'react';
import Icon from '../AppIcon';

const LoadingIndicators = ({ 
  variant = 'default', 
  size = 'md', 
  message = 'Loading...', 
  progress = null,
  showIcon = true 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  // Spinner Loading
  if (variant === 'spinner') {
    return (
      <div className="flex flex-col items-center space-y-3">
        <div className={`${sizeClasses?.[size]} animate-spin`}>
          <Icon name="Loader2" className="text-primary" />
        </div>
        {message && (
          <p className={`${textSizeClasses?.[size]} text-text-secondary font-medium`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Dots Loading
  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          {[0, 1, 2]?.map((i) => (
            <div
              key={i}
              className={`${sizeClasses?.[size]} bg-primary rounded-full animate-pulse`}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
        {message && (
          <p className={`${textSizeClasses?.[size]} text-text-secondary font-medium`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Progress Bar Loading
  if (variant === 'progress') {
    return (
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <p className={`${textSizeClasses?.[size]} text-text-primary font-medium`}>
            {message}
          </p>
          {progress !== null && (
            <span className={`${textSizeClasses?.[size]} text-text-secondary font-medium`}>
              {Math.round(progress)}%
            </span>
          )}
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300 ease-smooth"
            style={{ width: `${progress || 0}%` }}
          />
        </div>
      </div>
    );
  }

  // Skeleton Loading
  if (variant === 'skeleton') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>
    );
  }

  // 3D Scene Loading (for Three.js)
  if (variant === '3d') {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 p-8">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="Box" size={24} className="text-primary animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-text-primary">Initializing 3D Experience</p>
          <p className="text-sm text-text-secondary">Loading models and textures...</p>
        </div>
        {progress !== null && (
          <div className="w-64">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Progress</span>
              <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div
                className="bg-gradient-to-r from-primary to-accent h-1 rounded-full transition-all duration-300 ease-smooth"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Payment Processing Loading
  if (variant === 'payment') {
    return (
      <div className="flex flex-col items-center space-y-4 p-6">
        <div className="relative">
          <div className="w-12 h-12 border-3 border-success/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-12 h-12 border-3 border-transparent border-t-success rounded-full animate-spin" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="CreditCard" size={20} className="text-success" />
          </div>
        </div>
        <div className="text-center space-y-1">
          <p className="font-semibold text-text-primary">Processing Payment</p>
          <p className="text-sm text-text-secondary">Please do not close this window</p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="Shield" size={14} className="text-success" />
          <span>Secure transaction in progress</span>
        </div>
      </div>
    );
  }

  // Admin Data Loading
  if (variant === 'admin') {
    return (
      <div className="flex items-center space-y-3 p-4">
        <div className="flex items-center space-x-3">
          <div className={`${sizeClasses?.[size]} animate-spin`}>
            <Icon name="RefreshCw" className="text-primary" />
          </div>
          <div className="space-y-1">
            <p className={`${textSizeClasses?.[size]} text-text-primary font-medium`}>
              {message}
            </p>
            <p className="text-xs text-text-secondary">Fetching latest data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Default Loading
  return (
    <div className="flex items-center space-x-3">
      {showIcon && (
        <div className={`${sizeClasses?.[size]} animate-spin`}>
          <Icon name="Loader2" className="text-primary" />
        </div>
      )}
      <p className={`${textSizeClasses?.[size]} text-text-secondary font-medium`}>
        {message}
      </p>
    </div>
  );
};

export default LoadingIndicators;