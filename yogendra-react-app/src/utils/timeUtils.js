/**
 * Time Formatting Utilities
 * 
 * Used for displaying timestamps in human-readable format.
 * Import: import { formatRelativeTime, formatDate, formatTime } from '../utils/timeUtils';
 */

/**
 * formatRelativeTime — Convert timestamp to "X minutes/hours/days ago"
 * @param {Date} date — JavaScript Date object
 * @returns {string} — "2 minutes ago", "5 hours ago", "3 days ago", etc.
 * 
 * Example:
 * const timestamp = new Date(Date.now() - 5*60000); // 5 minutes ago
 * formatRelativeTime(timestamp) → "5 minutes ago"
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(date);
  }
}

/**
 * formatDate — Format date as "DD MMM YYYY"
 * @param {Date} date — JavaScript Date object
 * @returns {string} — "15 Mar 2026"
 * 
 * Example:
 * formatDate(new Date('2026-03-15')) → "15 Mar 2026"
 */
export function formatDate(date) {
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  
  return `${day} ${month} ${year}`;
}

/**
 * formatTime — Format time as "HH:MM AM/PM"
 * @param {Date} date — JavaScript Date object
 * @returns {string} — "02:30 PM"
 * 
 * Example:
 * formatTime(new Date('2026-03-15 14:30')) → "02:30 PM"
 */
export function formatTime(date) {
  const d = new Date(date);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // 12-hour format
  const hoursStr = String(hours).padStart(2, '0');
  
  return `${hoursStr}:${minutes} ${ampm}`;
}

/**
 * formatDateTime — Combine date and time "DD MMM YYYY HH:MM AM/PM"
 * @param {Date} date — JavaScript Date object
 * @returns {string} — "15 Mar 2026 02:30 PM"
 */
export function formatDateTime(date) {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export default {
  formatRelativeTime,
  formatDate,
  formatTime,
  formatDateTime,
};
