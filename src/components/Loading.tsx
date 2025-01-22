import React from 'react';

interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'gray' | 'green' | 'red' | 'purple';
}

export default function Loading({ 
  variant = 'spinner',
  size = 'md',
    color = 'purple'
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    green: 'border-green-500',
    red: 'border-red-500',
    purple: 'border-purple-500'
  };

  const dotColorClasses = {
    blue: 'bg-blue-500',
    gray: 'bg-gray-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  };

  const renderSpinner = () => (
    <div className={`animate-spin rounded-full border-4 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`} />
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      <div className={`${dotColorClasses[color]} rounded-full animate-bounce ${size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4'}`} style={{ animationDelay: '0s' }} />
      <div className={`${dotColorClasses[color]} rounded-full animate-bounce ${size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4'}`} style={{ animationDelay: '0.2s' }} />
      <div className={`${dotColorClasses[color]} rounded-full animate-bounce ${size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4'}`} style={{ animationDelay: '0.4s' }} />
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} ${dotColorClasses[color]} rounded-full animate-pulse opacity-75`} />
  );

  const renderBars = () => (
    <div className="flex space-x-1">
      <div className={`${dotColorClasses[color]} animate-pulse ${size === 'sm' ? 'h-4 w-1' : size === 'md' ? 'h-8 w-1.5' : 'h-12 w-2'}`} style={{ animationDelay: '0s' }} />
      <div className={`${dotColorClasses[color]} animate-pulse ${size === 'sm' ? 'h-4 w-1' : size === 'md' ? 'h-8 w-1.5' : 'h-12 w-2'}`} style={{ animationDelay: '0.2s' }} />
      <div className={`${dotColorClasses[color]} animate-pulse ${size === 'sm' ? 'h-4 w-1' : size === 'md' ? 'h-8 w-1.5' : 'h-12 w-2'}`} style={{ animationDelay: '0.4s' }} />
    </div>
  );

  const variants = {
    spinner: renderSpinner,
    dots: renderDots,
    pulse: renderPulse,
    bars: renderBars
  };

  return (
    <div className="flex items-center justify-center p-4">
      {variants[variant]()}
    </div>
  );
}