import React, { useState } from 'react';

/**
 * Tooltip Component
 *
 * Simple tooltip that shows on hover with position relative to parent.
 * Used on chart elements to show values and labels.
 *
 * Props:
 * - text: Tooltip text to display
 * - children: Element to hover over
 * - position: 'top', 'bottom', 'left', 'right' (default: 'top')
 *
 * Usage:
 * <Tooltip text="90% Skills">
 *   <div>Hover me</div>
 * </Tooltip>
 */
export function Tooltip({ text, children, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  // Position classes for tooltip arrow and placement
  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800',
  };

  return (
    <div className="relative inline-block w-full">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="relative"
      >
        {children}

        {/* Tooltip Box */}
        {isVisible && (
          <div
            className={`
              absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg whitespace-nowrap
              transition-opacity duration-200 opacity-100
              ${positionClasses[position]}
            `}
          >
            {text}
            {/* Arrow */}
            <div
              className={`
                absolute w-0 h-0 border-4 border-transparent
                ${arrowClasses[position]}
              `}
            />
          </div>
        )}
      </div>
    </div>
  );
}
