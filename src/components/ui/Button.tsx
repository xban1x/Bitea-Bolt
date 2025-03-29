import React from 'react';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';

interface ButtonProps extends AriaButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const { buttonProps } = useButton(props, ref as any);

    return (
      <button
        {...buttonProps}
        className={`
          inline-flex items-center justify-center rounded-md font-medium 
          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        ref={ref}
      >
        {props.children}
      </button>
    );
  }
);

Button.displayName = 'Button';