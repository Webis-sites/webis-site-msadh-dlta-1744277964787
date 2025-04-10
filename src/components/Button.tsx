import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { Spinner } from './Spinner';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-70 rtl:text-right',
  {
    variants: {
      variant: {
        primary: 
          'bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:brightness-110 active:shadow-inner active:brightness-90 active:scale-[0.98]',
        secondary: 
          'bg-secondary text-white shadow-lg shadow-secondary/30 hover:shadow-secondary/40 hover:brightness-110 active:shadow-inner active:brightness-90 active:scale-[0.98]',
        outline: 
          'border-2 border-primary text-primary bg-white/10 backdrop-blur-sm hover:bg-primary/10 active:bg-primary/20 active:scale-[0.98]',
        text: 
          'text-primary hover:bg-primary/10 active:bg-primary/20 active:scale-[0.98]',
        glass: 
          'bg-white/20 backdrop-blur-md border border-white/30 text-primary shadow-lg hover:bg-white/30 active:bg-white/40 active:scale-[0.98]',
        neumorphic: 
          'bg-gray-100 text-primary shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-pressed active:scale-[0.98]',
      },
      size: {
        small: 'text-xs px-3 py-1.5 h-8',
        medium: 'text-sm px-4 py-2 h-10',
        large: 'text-base px-5 py-2.5 h-12',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      fullWidth: false,
    },
  }
);

export interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant, 
    size, 
    fullWidth, 
    isLoading = false, 
    disabled = false, 
    leftIcon, 
    rightIcon, 
    className, 
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
        dir="rtl"
        aria-busy={isLoading}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
            <Spinner className="w-5 h-5" />
          </span>
        )}
        
        <span className={cn('flex items-center gap-2', isLoading ? 'opacity-0' : '')}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

// Spinner component for the loading state
function Spinner({ className }: { className?: string }) {
  return (
    <svg 
      className={cn('animate-spin', className)} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Utility function for merging class names
// Create a file at ../utils/cn.ts with this content:
/*
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
*/