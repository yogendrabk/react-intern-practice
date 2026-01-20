import React from 'react';

/**
 * Skeleton Loader Component
 * 
 * Animated skeleton placeholder component to show loading state
 * while content is being fetched or rendered.
 * 
 * Features:
 * - Multiple variants: text, circle, rectangle, card
 * - Animated pulse effect for visual feedback
 * - Smooth transition from skeleton to real content
 * 
 * Why use Skeleton loaders?
 * - Better UX than plain "Loading..." text
 * - Shows expected content layout during load
 * - Reduces apparent wait time (psychological)
 * - Professional looking loading state
 * 
 * Defense Q&A:
 * Q: "Skeleton loader kina use garchau? Plain loading text bhandaa better kina chha?"
 * A: Skeleton loaders are better because:
 *    1. Content Preview: Shows what shape/layout to expect (not blank screen)
 *    2. UX Improvement: Users see progress, not just spinner/text
 *    3. Professional: Industry standard in modern apps (Google, Twitter, etc.)
 *    4. Perceived Performance: Feels faster even with same load time
 *    5. Accessibility: Reduces cognitive load — users know what's coming
 *    Plain text like "Loading..." is boring and feels slower.
 */

// Skeleton variant - text lines
export const TextSkeleton = ({ lines = 3, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-200 rounded animate-pulse"
        style={{
          width: i === lines - 1 ? "80%" : "100%",
        }}
      />
    ))}
  </div>
);

// Skeleton variant - user avatar circle
export const CircleSkeleton = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`rounded-full bg-gray-200 animate-pulse ${sizeClasses[size]} ${className}`}
    />
  );
};

// Skeleton variant - rectangular box
export const RectangleSkeleton = ({ width = "100%", height = "100px", className = "" }) => (
  <div
    className={`bg-gray-200 rounded-lg animate-pulse ${className}`}
    style={{ width, height }}
  />
);

// Skeleton variant - entire card (component-like)
export const CardSkeleton = ({ className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 space-y-4 ${className}`}>
    {/* Header area */}
    <div className="space-y-3">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
    </div>

    {/* Content area */}
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
    </div>

    {/* Footer area (button-like) */}
    <div className="pt-4">
      <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
    </div>
  </div>
);

// Skeleton variant - list of items
export const ListSkeleton = ({ count = 5, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200"
      >
        {/* Avatar */}
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
        
        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

// Skeleton variant - table rows
export const TableSkeleton = ({ rows = 5, cols = 4, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    {/* Header row (optional) */}
    <div className="flex gap-4 p-4 bg-gray-100 rounded-lg">
      {Array.from({ length: cols }).map((_, i) => (
        <div
          key={`header-${i}`}
          className="h-4 bg-gray-300 rounded animate-pulse flex-1"
        />
      ))}
    </div>

    {/* Data rows */}
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <div key={`row-${rowIdx}`} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
        {Array.from({ length: cols }).map((_, colIdx) => (
          <div
            key={`col-${colIdx}`}
            className="h-4 bg-gray-200 rounded animate-pulse flex-1"
          />
        ))}
      </div>
    ))}
  </div>
);

/**
 * Main Skeleton Wrapper Component
 * Renders appropriate skeleton based on variant prop
 * 
 * Usage:
 * <Skeleton variant="card" />
 * <Skeleton variant="text" lines={4} />
 * <Skeleton variant="circle" size="lg" />
 * <Skeleton variant="list" count={8} />
 */
export const Skeleton = ({ 
  variant = "text", 
  ...props 
}) => {
  switch (variant) {
    case "text":
      return <TextSkeleton {...props} />;
    case "circle":
      return <CircleSkeleton {...props} />;
    case "rectangle":
      return <RectangleSkeleton {...props} />;
    case "card":
      return <CardSkeleton {...props} />;
    case "list":
      return <ListSkeleton {...props} />;
    case "table":
      return <TableSkeleton {...props} />;
    default:
      return <TextSkeleton />;
  }
};

export default Skeleton;
