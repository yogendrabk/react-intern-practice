/*
===================================================
WEEK 3 — DAY 15: JavaScript Modules — Helper Functions
===================================================

Topic: Utility functions for export
- formatCurrency: Format number as currency
- formatDate: Format date for display
- truncateText: Truncate long text
- debounce: Delay function execution
- throttle: Limit function execution frequency

These functions exported using ES6 module syntax.
Imported in day15-modules-dom.html using type="module".

Date: December 26, 2025
===================================================
*/

// ===================================================
// 1. CURRENCY FORMATTER
// ===================================================

export const formatCurrency = (amount, currency = "NPR") => {
    /* 
    Format number as currency string.
    Example: 1500 → "NPR 1,500.00"
    */
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

// ===================================================
// 2. DATE FORMATTER
// ===================================================

export const formatDate = (date, format = 'short') => {
    /*
    Format date for display.
    Formats: 'short' (1/1/2025), 'long' (January 1, 2025)
    */
    const options = {
        short: { month: '2-digit', day: '2-digit', year: 'numeric' },
        long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    };
    
    return new Date(date).toLocaleDateString('en-US', options[format] || options.short);
};

// ===================================================
// 3. TEXT TRUNCATOR
// ===================================================

export const truncateText = (text, maxLength = 50, suffix = "...") => {
    /*
    Truncate long text to max length.
    Example: "This is long text..." → "This is long t..."
    */
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + suffix;
};

// ===================================================
// 4. DEBOUNCE (Delay Execution)
// ===================================================

export const debounce = (func, delay = 300) => {
    /*
    Delay function execution until delay ms pass without call.
    
    Useful for: Search input, resize events, API calls
    Prevent firing too often (every keystroke).
    
    Real world: Search input fire API only after user stop typing 300ms.
    */
    let timeoutId;
    
    return function(...args) {
        // Clear previous timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Set new timeout
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

/*
How debounce work:

User typing: 'a' → timeout set
User typing: 'ab' → timeout cancel, new timeout set
User typing: 'abc' → timeout cancel, new timeout set
User stop (300ms pass) → function execute!

Without debounce: Function fire 3 times (each keystroke)
With debounce: Function fire 1 time (after stop typing)
*/

// ===================================================
// 5. THROTTLE (Limit Execution Frequency)
// ===================================================

export const throttle = (func, delay = 300) => {
    /*
    Limit function execution to once per delay ms.
    
    Useful for: Scroll events, mouse move, window resize
    Prevent function firing too frequently.
    */
    let lastCallTime = 0;
    
    return function(...args) {
        const now = Date.now();
        
        // If enough time pass, execute
        if (now - lastCallTime >= delay) {
            func.apply(this, args);
            lastCallTime = now;
        }
    };
};

/*
How throttle work:

Scroll event fire: t=0 → execute, lastCallTime=0
Scroll event fire: t=50 → skip (50ms < 300ms delay)
Scroll event fire: t=100 → skip (100ms < 300ms delay)
Scroll event fire: t=350 → execute, lastCallTime=350
Scroll event fire: t=400 → skip (50ms < 300ms delay)

Without throttle: Function fire many times (performance issue)
With throttle: Function fire max once per 300ms (efficient!)
*/

// ===================================================
// EXPORT SUMMARY
// ===================================================

/*
Exported functions (5 total):
✓ formatCurrency(amount, currency) → "NPR 1,500.00"
✓ formatDate(date, format) → "January 1, 2025"
✓ truncateText(text, maxLength, suffix) → "Long te..."
✓ debounce(func, delay) → delayed function
✓ throttle(func, delay) → throttled function

Import in HTML:
import { formatCurrency, debounce } from './helpers.js';

Use in code:
const price = formatCurrency(1500); // "NPR 1,500.00"
const search = debounce(handleSearch, 300);
*/
