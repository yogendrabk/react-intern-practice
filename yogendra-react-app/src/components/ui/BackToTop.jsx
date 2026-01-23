import { useEffect, useState } from 'react';

/**
 * BackToTop Component
 * 
 * A floating button that appears when user scrolls down.
 * Clicking it smoothly scrolls back to the top of the page.
 * 
 * USP: Enhances user experience on long pages by providing
 * an easy way to navigate back without manually scrolling.
 * 
 * Uses: useEffect (scroll listener + cleanup), useState (visibility state)
 */
export function BackToTop() {
  // State to track if button should be visible
  // Shows when user scrolls down > 300px from top
  const [isVisible, setIsVisible] = useState(false);

  // Calculate scroll position and toggle visibility
  const handleScroll = () => {
    const scrollY = window.scrollY;
    // Show button after scrolling 300px down
    if (scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Smooth scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth animation instead of instant jump
    });
  };

  // Setup scroll listener and cleanup function
  // This prevents memory leaks by removing listener when component unmounts
  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function: remove listener when component unmounts
    // If we don't remove the listener, it stays in memory even after component is gone
    // and continues to fire - wasting memory and processing power (memory leak)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Defense Q&A: "BackToTop button na scroll listener kasari manage garchau?"
  // Answer: "addEventListener ra removeEventListener use garchau.
  // useEffect ko return function ma cleanup garchau - jab component unmount hunchha,
  // listener remove hunchha. Yestari memory leak bachainchau."

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 animate-fadeIn z-40"
          aria-label="Scroll to top"
          title="Back to top"
        >
          {/* Up arrow SVG icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3-3m0 0l3 3m-3-3v12"
            />
          </svg>
        </button>
      )}
    </>
  );
}
