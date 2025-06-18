// === START OF FILE: src/components/ui/Select.js ===

import React from 'react';
import clsx from 'clsx';

/**
 * Select component for dropdown selections.
 */
const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={clsx(
        'block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

/**
 * SelectTrigger component for the select dropdown trigger.
 */
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

/**
 * SelectValue component to display the selected value.
 */
const SelectValue = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={clsx('text-gray-700', className)}
      {...props}
    >
      {children}
    </span>
  );
});

SelectValue.displayName = 'SelectValue';

/**
 * SelectContent component for the dropdown content.
 */
const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg', className)}
      {...props}
    >
      {children}
    </div>
  );
});

SelectContent.displayName = 'SelectContent';

/**
 * SelectItem component for individual items in the dropdown.
 */
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('px-4 py-2 hover:bg-gray-100 cursor-pointer', className)}
      {...props}
    >
      {children}
    </div>
  );
});

SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
