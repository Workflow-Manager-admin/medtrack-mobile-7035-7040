/**
 * Utility functions for medication management
 */

import { getCurrentTime, timeStringToDate } from './dateUtils';

/**
 * PUBLIC_INTERFACE
 * Get the status of a medication based on scheduled time and taken status
 * @param {Object} medication - Medication object with time and taken status
 * @returns {string} - Status: "upcoming", "due", "overdue", or "taken"
 */
export const getMedicationStatus = (medication) => {
  if (medication.taken) {
    return 'taken';
  }

  const now = new Date();
  const medicationTime = timeStringToDate(medication.time);
  
  // Calculate time difference in minutes
  const diffMs = medicationTime - now;
  const diffMinutes = Math.round(diffMs / 60000);
  
  if (diffMinutes > 30) {
    return 'upcoming';
  } else if (diffMinutes >= -30) {
    return 'due';
  } else {
    return 'overdue';
  }
};

/**
 * PUBLIC_INTERFACE
 * Group medications by their status
 * @param {Array} medications - List of medication objects
 * @returns {Object} - Object with medications grouped by status
 */
export const groupMedicationsByStatus = (medications) => {
  return medications.reduce((groups, medication) => {
    const status = getMedicationStatus(medication);
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(medication);
    return groups;
  }, {});
};

/**
 * PUBLIC_INTERFACE
 * Count medications by status
 * @param {Array} medications - List of medication objects
 * @returns {Object} - Counts of medications by status
 */
export const countMedicationsByStatus = (medications) => {
  const grouped = groupMedicationsByStatus(medications);
  return Object.keys(grouped).reduce((counts, status) => {
    counts[status] = grouped[status].length;
    return counts;
  }, {});
};

/**
 * PUBLIC_INTERFACE
 * Generate sample medication data for testing
 * @returns {Array} - Array of sample medications
 */
export const getSampleMedications = () => {
  return [
    {
      id: 1,
      name: 'Amoxicillin',
      dosage: '500mg',
      time: '08:00 AM',
      instructions: 'Take with food',
      taken: false
    },
    {
      id: 2,
      name: 'Lisinopril',
      dosage: '10mg',
      time: '09:00 AM',
      instructions: 'Take before breakfast',
      taken: false
    },
    {
      id: 3,
      name: 'Metformin',
      dosage: '1000mg',
      time: '01:00 PM',
      instructions: 'Take with lunch',
      taken: false
    },
    {
      id: 4,
      name: 'Atorvastatin',
      dosage: '20mg',
      time: '08:00 PM',
      instructions: 'Take in the evening',
      taken: false
    }
  ];
};

/**
 * PUBLIC_INTERFACE
 * Calculate percentage of medications taken for the day
 * @param {Array} medications - List of medication objects
 * @returns {number} - Percentage of medications taken (0-100)
 */
export const calculateCompletionPercentage = (medications) => {
  if (!medications || medications.length === 0) {
    return 0;
  }
  
  const takenCount = medications.filter(med => med.taken).length;
  return Math.round((takenCount / medications.length) * 100);
};
