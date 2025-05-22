/**
 * Date utility functions for MedTrack Mobile
 */

/**
 * PUBLIC_INTERFACE
 * Format a date object to a human-readable date string
 * @param {Date} date - Date object to format
 * @returns {string} - Formatted date string (e.g., "Monday, May 22")
 */
export const formatDate = (date = new Date()) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'short', 
    day: 'numeric'
  });
};

/**
 * PUBLIC_INTERFACE
 * Get the current time as a formatted string
 * @returns {string} - Current time string (e.g., "09:30 AM")
 */
export const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

/**
 * PUBLIC_INTERFACE
 * Get a new date by adding or subtracting days from a given date
 * @param {Date} date - Starting date
 * @param {number} days - Number of days to add (positive) or subtract (negative)
 * @returns {Date} - New date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * PUBLIC_INTERFACE
 * Check if two dates represent the same day
 * @param {Date} date1 - First date to compare
 * @param {Date} date2 - Second date to compare
 * @returns {boolean} - True if dates represent the same day
 */
export const isSameDay = (date1, date2) => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
};

/**
 * PUBLIC_INTERFACE
 * Convert a time string (HH:MM AM/PM) to a Date object with current date
 * @param {string} timeString - Time string (e.g., "09:00 AM")
 * @returns {Date} - Date object with the specified time
 */
export const timeStringToDate = (timeString) => {
  const today = new Date();
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  // Convert 12-hour format to 24-hour
  if (period === 'PM' && hours < 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  today.setHours(hours);
  today.setMinutes(minutes);
  today.setSeconds(0);
  
  return today;
};
