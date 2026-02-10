/**
 * ============================================================================
 * COMPREHENSIVE UTILITIES LIBRARY — utils/index.js
 * ============================================================================
 * 
 * Barrel export for all utility functions used across the application.
 * Organized by category for easy discovery and maintenance.
 * 
 * Purpose:
 * - Keep code DRY by centralizing reusable logic
 * - Provide pure functions with no side effects
 * - Single responsibility per function
 * - Consistent API across functions
 * 
 * Defense Q&A:
 * Q: "Utility library design garda ke ke consider garchau?"
 * A: Key principles for utility library design:
 *    1. Pure functions - no side effects, same input = same output always
 *    2. Single responsibility - each function does ONE thing well
 *    3. No dependencies on state or other modules
 *    4. Well documented with JSDoc comments and examples
 *    5. Organized by category (formatters, validators, array helpers, etc)
 *    6. Export from single barrel export (index.js) for convenience
 *    7. Test each function independently
 *    8. Avoid polymorphic functions - be explicit about what function does
 * 
 * Usage Patterns:
 *   import { formatDate, slugify, groupBy } from '../utils';
 *   import * as utils from '../utils';
 *   
 *   // Use individual functions
 *   formatDate(new Date(), 'short')
 *   utils.slugify('Hello World')
 * ============================================================================
 */

// ============================================================================
// FORMATTERS — Transform data into readable/display formats
// ============================================================================

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - 'short' | 'long' | 'time' (default: 'short')
 * @returns {string}
 * 
 * Examples:
 *   formatDate(new Date(), 'short') → "Jan 24, 2026"
 *   formatDate(new Date(), 'long') → "Wednesday, January 24, 2026"
 *   formatDate(new Date(), 'time') → "2:30:45 PM"
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

  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date as relative time ("2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string}
 * 
 * Examples:
 *   formatRelativeTime(Date 1 hour ago) → "1 hour ago"
 *   formatRelativeTime(Date 2 days ago) → "2 days ago"
 *   formatRelativeTime(Date 5 seconds ago) → "just now"
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

  return formatDate(d, 'short');
}

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string}
 * 
 * Examples:
 *   formatNumber(1000) → "1,000"
 *   formatNumber(1234567.89, 2) → "1,234,567.89"
 *   formatNumber(42.5, 1) → "42.5"
 */
export function formatNumber(num, decimals = 0) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string}
 * 
 * Examples:
 *   formatCurrency(1234.56) → "$1,234.56"
 *   formatCurrency(5000, 'EUR') → "€5,000.00"
 *   formatCurrency(999) → "$999.00"
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Truncate text to max length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Max length before truncation (default: 50)
 * @returns {string}
 * 
 * Examples:
 *   truncateText("Hello World", 8) → "Hello W..."
 *   truncateText("Short", 20) → "Short"
 *   truncateText("The quick brown fox", 12) → "The quick..."
 */
export function truncateText(text, length = 50) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @returns {string}
 * 
 * Examples:
 *   generateInitials("Yogendra Kumar") → "YK"
 *   generateInitials("Alice") → "A"
 *   generateInitials("") → "?"
 */
export function generateInitials(name) {
  if (!name || name.length === 0) return '?';

  const parts = name.split(' ').filter(p => p.length > 0);
  if (parts.length === 0) return name.charAt(0).toUpperCase();
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Format bytes to human-readable size
 * @param {number} bytes - Size in bytes
 * @returns {string}
 * 
 * Examples:
 *   formatBytes(1024) → "1.00 KB"
 *   formatBytes(1048576) → "1.00 MB"
 *   formatBytes(100) → "100 B"
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

/**
 * Format percentage
 * @param {number} value - Number between 0-1 or 0-100
 * @param {boolean} normalize - If true, multiply by 100 (default: true)
 * @returns {string}
 * 
 * Examples:
 *   formatPercentage(0.85) → "85%"
 *   formatPercentage(85, false) → "85%"
 *   formatPercentage(0.333) → "33.3%"
 */
export function formatPercentage(value, normalize = true) {
  const percent = normalize ? value * 100 : value;
  return percent.toFixed(1) + '%';
}

// ============================================================================
// VALIDATORS — Check if data meets requirements
// ============================================================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 * 
 * Examples:
 *   validateEmail("user@example.com") → true
 *   validateEmail("invalid-email") → false
 *   validateEmail("") → false
 */
export function validateEmail(email) {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate phone number (basic)
 * @param {string} phone - Phone number to validate
 * @returns {boolean}
 * 
 * Examples:
 *   validatePhone("9841234567") → true
 *   validatePhone("+977 9841234567") → true
 *   validatePhone("123") → false
 */
export function validatePhone(phone) {
  if (!phone) return false;
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10;
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean}
 * 
 * Examples:
 *   validateURL("https://example.com") → true
 *   validateURL("http://google.com") → true
 *   validateURL("invalid-url") → false
 */
export function validateURL(url) {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} { isValid: boolean, strength: 'weak' | 'fair' | 'strong' }
 * 
 * Requirements:
 * - Minimum 8 characters
 * - One uppercase letter
 * - One lowercase letter
 * - One number
 * - One special character for strong
 * 
 * Examples:
 *   validatePassword("Pass123!")
 *   → { isValid: true, strength: 'strong' }
 */
export function validatePassword(password) {
  if (!password) return { isValid: false, strength: 'weak' };

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  let strength = 'weak';
  let isValid = false;

  if (isLongEnough && hasUppercase && hasLowercase && hasNumber) {
    strength = hasSpecial ? 'strong' : 'fair';
    isValid = true;
  }

  return { isValid, strength };
}

// ============================================================================
// ARRAY HELPERS — Common array operations
// ============================================================================

/**
 * Group array items by a key or function
 * @param {array} arr - Array to group
 * @param {string|function} keyOrFn - Key name or function to group by
 * @returns {object} Object with grouped items
 * 
 * Examples:
 *   groupBy([{type:'A',val:1},{type:'A',val:2},{type:'B',val:3}], 'type')
 *   → { A: [{type:'A',val:1}, {type:'A',val:2}], B: [{type:'B',val:3}] }
 */
export function groupBy(arr, keyOrFn) {
  const isFunction = typeof keyOrFn === 'function';

  return arr.reduce((groups, item) => {
    const key = isFunction ? keyOrFn(item) : item[keyOrFn];
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});
}

/**
 * Sort array by a property
 * @param {array} arr - Array to sort
 * @param {string} key - Property to sort by
 * @param {string} order - 'asc' | 'desc' (default: 'asc')
 * @returns {array}
 * 
 * Examples:
 *   sortBy([{name:'Charlie'}, {name:'Alice'}, {name:'Bob'}], 'name')
 *   → [{name:'Alice'}, {name:'Bob'}, {name:'Charlie'}]
 */
export function sortBy(arr, key, order = 'asc') {
  const sorted = [...arr].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

/**
 * Get unique items from array by property
 * @param {array} arr - Array to filter
 * @param {string} key - Property to check for uniqueness (optional)
 * @returns {array}
 * 
 * Examples:
 *   uniqueBy([1, 2, 2, 3, 1], undefined) → [1, 2, 3]
 *   uniqueBy([{id:1,name:'A'},{id:2,name:'B'},{id:1,name:'C'}], 'id')
 *   → [{id:1,name:'A'},{id:2,name:'B'}]
 */
export function uniqueBy(arr, key) {
  if (!key) return [...new Set(arr)];

  const seen = new Set();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

/**
 * Split array into chunks
 * @param {array} arr - Array to chunk
 * @param {number} size - Size of each chunk
 * @returns {array}
 * 
 * Examples:
 *   chunk([1,2,3,4,5,6,7], 3) → [[1,2,3], [4,5,6], [7]]
 *   chunk(['a','b','c'], 2) → [['a','b'], ['c']]
 */
export function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flatten nested array
 * @param {array} arr - Array to flatten
 * @param {number} depth - Levels to flatten (default: Infinity)
 * @returns {array}
 * 
 * Examples:
 *   flatten([1, [2, 3], [4, [5, 6]]]) → [1, 2, 3, 4, 5, 6]
 *   flatten([1, [2, [3, [4]]]], 1) → [1, 2, [3, [4]]]
 */
export function flatten(arr, depth = Infinity) {
  if (depth === 0) return arr;

  return arr.reduce((flat, item) => {
    return Array.isArray(item)
      ? [...flat, ...flatten(item, depth - 1)]
      : [...flat, item];
  }, []);
}

// ============================================================================
// OBJECT HELPERS — Common object operations
// ============================================================================

/**
 * Deep merge objects (non-mutating)
 * @param {object} target - Target object
 * @param {object} source - Source object to merge
 * @returns {object} Merged object
 * 
 * Examples:
 *   deepMerge({a: 1, b: {c: 2}}, {b: {d: 3}})
 *   → {a: 1, b: {c: 2, d: 3}}
 */
export function deepMerge(target, source) {
  const output = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        output[key] = deepMerge(output[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }

  return output;
}

/**
 * Pick specific properties from object
 * @param {object} obj - Object to pick from
 * @param {array} keys - Keys to pick
 * @returns {object}
 * 
 * Examples:
 *   pick({a: 1, b: 2, c: 3}, ['a', 'c']) → {a: 1, c: 3}
 */
export function pick(obj, keys) {
  return keys.reduce((result, key) => {
    if (key in obj) result[key] = obj[key];
    return result;
  }, {});
}

/**
 * Omit specific properties from object
 * @param {object} obj - Object to omit from
 * @param {array} keys - Keys to omit
 * @returns {object}
 * 
 * Examples:
 *   omit({a: 1, b: 2, c: 3}, ['b']) → {a: 1, c: 3}
 */
export function omit(obj, keys) {
  const keySet = new Set(keys);
  return Object.keys(obj).reduce((result, key) => {
    if (!keySet.has(key)) result[key] = obj[key];
    return result;
  }, {});
}

/**
 * Flatten nested object keys
 * @param {object} obj - Object to flatten
 * @param {string} prefix - Prefix for nested keys (default: '')
 * @returns {object}
 * 
 * Examples:
 *   flattenObject({a: 1, b: {c: 2, d: {e: 3}}})
 *   → {a: 1, 'b.c': 2, 'b.d.e': 3}
 */
export function flattenObject(obj, prefix = '') {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(result, flattenObject(obj[key], fullKey));
      } else {
        result[fullKey] = obj[key];
      }
    }
  }

  return result;
}

// ============================================================================
// STRING HELPERS — Common string operations
// ============================================================================

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string}
 * 
 * Examples:
 *   capitalize("hello world") → "Hello world"
 *   capitalize("JAVASCRIPT") → "JAVASCRIPT"
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert string to slug format
 * @param {string} str - String to slugify
 * @returns {string}
 * 
 * Examples:
 *   slugify("Hello World!") → "hello-world"
 *   slugify("React JS Tutorial") → "react-js-tutorial"
 */
export function slugify(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Highlight/highlight text in string
 * @param {string} text - Text to highlight in
 * @param {string} highlight - Text to highlight
 * @returns {string}
 * 
 * Examples:
 *   highlight("Hello World", "World") → "Hello <mark>World</mark>"
 */
export function highlight(text, highlightText) {
  if (!text || !highlightText) return text;

  const regex = new RegExp(`(${highlightText})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Repeat string N times
 * @param {string} str - String to repeat
 * @param {number} count - Number of times to repeat
 * @returns {string}
 * 
 * Examples:
 *   repeat("ab", 3) → "ababab"
 *   repeat("*", 5) → "*****"
 */
export function repeat(str, count) {
  return str.repeat(Math.max(0, count));
}

/**
 * Pad string to length
 * @param {string} str - String to pad
 * @param {number} length - Target length
 * @param {string} char - Character to pad with (default: ' ')
 * @returns {string}
 * 
 * Examples:
 *   padString("5", 3, "0") → "005"
 *   padString("hello", 10, ".") → "hello....."
 */
export function padString(str, length, char = ' ') {
  return str + char.repeat(Math.max(0, length - str.length));
}

// ============================================================================
// DEFAULT EXPORT — All utilities accessible via * import
// ============================================================================

export default {
  // Formatters
  formatDate,
  formatRelativeTime,
  formatNumber,
  formatCurrency,
  truncateText,
  generateInitials,
  formatBytes,
  formatPercentage,

  // Validators
  validateEmail,
  validatePhone,
  validateURL,
  validatePassword,

  // Array Helpers
  groupBy,
  sortBy,
  uniqueBy,
  chunk,
  flatten,

  // Object Helpers
  deepMerge,
  pick,
  omit,
  flattenObject,

  // String Helpers
  capitalize,
  slugify,
  highlight,
  repeat,
  padString,
};
