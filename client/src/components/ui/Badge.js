// === START OF FILE: src/components/ui/Badge.js ===
import React from 'react';
import clsx from 'clsx';

/**
 * Badge component to display status or labels.
 */
const Badge = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={clsx(
        'inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
