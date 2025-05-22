import React from 'react';
import MedicationItem from './MedicationItem';
import { groupMedicationsByStatus } from '../utils/medicationUtils';
import './MedTrack.css';

/**
 * PUBLIC_INTERFACE
 * Component to display a list of medications grouped by status
 * @param {Object} props - Component props
 * @param {Array} props.medications - List of medications
 * @param {Function} props.onToggleTaken - Handler for toggling taken status
 * @returns {JSX.Element} - Rendered component
 */
const MedicationList = ({ medications = [], onToggleTaken }) => {
  // Group medications by status
  const groupedMeds = groupMedicationsByStatus(medications);
  
  // Define section order and labels
  const sections = [
    { key: 'overdue', label: 'Overdue' },
    { key: 'due', label: 'Due Now' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'taken', label: 'Taken' }
  ];

  if (medications.length === 0) {
    return (
      <div className="empty-state">
        <p>No medications scheduled for this day</p>
      </div>
    );
  }

  return (
    <div className="med-list">
      {sections.map(section => {
        const sectionMeds = groupedMeds[section.key] || [];
        
        if (sectionMeds.length === 0) {
          return null;
        }
        
        return (
          <div className="med-section" key={section.key}>
            <div className="section-header">{section.label}</div>
            {sectionMeds.map(med => (
              <MedicationItem 
                key={med.id} 
                medication={med} 
                onToggleTaken={onToggleTaken} 
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default MedicationList;
