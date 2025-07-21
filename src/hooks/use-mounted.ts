import { useEffect, useState } from 'react';

/**
 * Custom hook to check if component has mounted on client-side
 * Useful for preventing hydration mismatches in Next.js SSR
 *
 * @returns {boolean} - true if component is mounted on client, false during SSR
 */

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
