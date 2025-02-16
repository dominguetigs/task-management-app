import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mode?: 'default' | 'minimal';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mode = 'default', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          mode === 'default' &&
            'h-9 rounded-md border border-input px-3 py-1 text-base shadow-sm focus-visible:ring-1 focus-visible:ring-ring',
          mode === 'minimal' && 'h-auto rounded-none border-0 p-0 m-0 !text-xs shadow-none',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
