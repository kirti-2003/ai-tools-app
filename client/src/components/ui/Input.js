// === START OF FILE: src/components/ui/Input.js ===
import React from 'react';
import clsx from 'clsx';

/**
 * Input component for text input fields.
 */
const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx(
        'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
