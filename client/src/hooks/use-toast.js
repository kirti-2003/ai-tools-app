
// === START OF FILE: src/hooks/use-toast.js ===
import { useCallback } from 'react';

/**
 * Simple toast notification hook.
 * This implementation uses the native browser alert as fallback.
 * For production, consider integrating a toaster library or custom toast system.
 */
export function useToast() {
  /**
   * Show toast notification.
   * @param {Object} options - Toast options
   * @param {string} options.title - Title of the toast
   * @param {string} [options.description] - Description text
   * @param {string} [options.variant] - Variant type ('default', 'destructive', etc.)
   */
  const toast = useCallback(({ title, description, variant }) => {
    // Basic demo - use alert.
    // Replace with actual toast UI in your app.
    let message = title;
    if (description) message += '\n' + description;
    alert(message);
    // Or log for debugging:
    console.log('TOAST:', { title, description, variant });
  }, []);

  return { toast };
}
