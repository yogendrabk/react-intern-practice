/**
 * formatters.js - Utility Functions for Formatting
 *
 * Centralized formatting functions used across components.
 * Keeps code DRY and consistent.
 *
 * Purpose:
 * - Date formatting for consistency (all dates use same format)
 * - Number formatting with separators/decimals
 * - Text truncation for long content
 * - Initial generation for avatars
 * - Relative time ("2 hours ago")
 */

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type: 'short' | 'long' | 'time'
 * @returns {string}
 *
 * Examples:
 * formatDate(new Date(), 'short') → "Jan 24, 2026"
 * formatDate(new Date(), 'long') → "Wednesday, January 24, 2026"
 * formatDate(new Date(), 'time') → "2:30:45 PM"
 */
export function formatDate(date, format = 'short') {
  const d = new Date(date);

  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  if (format === 'time') {
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  // default 'short'
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date as relative time
 * @param {Date|string} date - Date to format
 * @returns {string}
 *
 * Examples:
 * formatRelativeTime(Date 1 hour ago) → "1 hour ago"
 * formatRelativeTime(Date 30 minutes ago) → "30 minutes ago"
 * formatRelativeTime(Date 2 days ago) → "2 days ago"
 */
export function formatRelativeTime(date) {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  // Fallback to short date format
  return formatDate(d, 'short');
}

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places (default 0)
 * @returns {string}
 *
 * Examples:
 * formatNumber(1000) → "1,000"
 * formatNumber(1234567.89, 2) → "1,234,567.89"
 * formatNumber(42.5, 1) → "42.5"
 */
export function formatNumber(num, decimals = 0) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Truncate text to length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Max length before truncation
 * @returns {string}
 *
 * Examples:
 * truncateText("Hello World", 8) → "Hello W..."
 * truncateText("Short", 20) → "Short" (no truncation)
 * truncateText("The quick brown fox", 12) → "The quick..."
 */
export function truncateText(text, length = 50) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @returns {string}
 *
 * Examples:
 * generateInitials("Yogendra Kumar") → "YK"
 * generateInitials("Alice") → "A"
 * generateInitials("ABC DEF GHI") → "AG"
 */
export function generateInitials(name) {
  if (!name) return '?';

  const parts = name.split(' ').filter(p => p.length > 0);
  if (parts.length === 0) return name.charAt(0).toUpperCase();
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  // First letter of first name + first letter of last name
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Format bytes to human-readable size
 * @param {number} bytes - Size in bytes
 * @returns {string}
 *
 * Examples:
 * formatBytes(1024) → "1.00 KB"
 * formatBytes(1048576) → "1.00 MB"
 * formatBytes(100) → "100 B"
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

/**
 * Format percentage
 * @param {number} value - Number between 0-1 or 0-100
 * @param {boolean} normalize - If true, multiply by 100 (assumes 0-1 input)
 * @returns {string}
 *
 * Examples:
 * formatPercentage(0.85) → "85%"
 * formatPercentage(85, false) → "85%"
 * formatPercentage(0.333) → "33.3%"
 */
export function formatPercentage(value, normalize = true) {
  const percent = normalize ? value * 100 : value;
  return percent.toFixed(1) + '%';
}
