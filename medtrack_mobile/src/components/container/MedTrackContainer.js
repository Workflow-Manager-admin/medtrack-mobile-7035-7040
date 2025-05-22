import React, { useState, useEffect } from 'react';
import ScheduleHeader from '../ui/ScheduleHeader';
import MedicationList from '../ui/MedicationList';
import { addDays, isSameDay } from '../utils/dateUtils';
import { getSampleMedications } from '../utils/medicationUtils';
import '../ui/MedTrack.css';

/**
 * PUBLIC_INTERFACE
 * Main container component for MedTrack Mobile
 * Manages state and functionality for the medication tracking application
 * @returns {JSX.Element} - Rendered component
 */
const MedTrackContainer = () => {
  // State for current date and medications
  const [currentDate, setCurrentDate] = useState(new Date());
  const [medications, setMedications] = useState([]);
  
  // Initialize with sample data
  useEffect(() => {
    // In a real app, this would fetch data from an API or local storage
    setMedications(getSampleMedications());
  }, []);
  
  // Handler for navigating to previous day
  const handlePrevDay = () => {
    setCurrentDate(prev => addDays(prev, -1));
  };
  
  // Handler for navigating to next day
  const handleNextDay = () => {
    setCurrentDate(prev => addDays(prev, 1));
  };
  
  // Handler for toggling medication taken status
  const handleToggleTaken = (medicationId) => {
    setMedications(prevMeds => 
      prevMeds.map(med => 
        med.id === medicationId ? { ...med, taken: !med.taken } : med
      )
    );
  };
  
  // Filter medications for the current date
  // In this example, we're showing the same medications for all days
  // In a real app, each day would have its own medications
  const medicationsForCurrentDay = medications.filter(() => true);
  
  return (
    <div className="med-track-container">
      <ScheduleHeader 
        currentDate={currentDate}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
        medications={medicationsForCurrentDay}
      />
      
      <MedicationList 
        medications={medicationsForCurrentDay}
        onToggleTaken={handleToggleTaken}
      />
      
      <button 
        className="add-med-button"
        aria-label="Add medication"
      >
        +
      </button>
    </div>
  );
};

export default MedTrackContainer;
