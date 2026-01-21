import { useRef, useState, useEffect } from 'react';

/**
 * useIntersectionObserver Hook
 *
 * Custom hook that wraps the IntersectionObserver API.
 * Allows detecting when an element enters or leaves the viewport.
 *
 * Returns:
 * - ref: React ref to attach to the element you want to observe
 * - isVisible: boolean indicating if element is visible in viewport
 *
 * Usage:
 * const [ref, isVisible] = useIntersectionObserver();
 * return <div ref={ref}>{isVisible && "Element is visible!"}</div>
 *
 * Why IntersectionObserver?
 * - Better performance than scroll event listeners (native browser API)
 * - Automatically unobserves when component unmounts
 * - Can trigger animations when user scrolls element into view
 * - Essential for lazy loading images, infinite scroll, analytics
 *
 * Defense Q&A:
 * Q: "IntersectionObserver bhanne ke ho? Scroll animation kasari garchau bina scroll event listener?"
 * A: IntersectionObserver is a browser API that:
 *    1. Watches when elements enter/leave viewport (not scroll events)
 *    2. More efficient: browser handles it natively (faster than JavaScript)
 *    3. API automatically calculates intersection ratios (% visible)
 *    4. Can throttle automatically with options
 *    5. Perfect for: lazy loading, scroll animations, "read more" triggers
 *    Example: When skill bar enters viewport, animate it from 0% to target value
 */

export function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create default options
    const defaultOptions = {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px', // No margin
      ...options,
    };

    // Create observer callback
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, defaultOptions);

    // Start observing
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible];
}

export default useIntersectionObserver;
