import React from 'react';
import { getMedicationStatus } from '../utils/medicationUtils';
import './MedTrack.css';

/**
 * PUBLIC_INTERFACE
 * Component to display a single medication item
 * @param {Object} props - Component props
 * @param {Object} props.medication - Medication object
 * @param {Function} props.onToggleTaken - Handler for toggling taken status
 * @returns {JSX.Element} - Rendered component
 */
const MedicationItem = ({ medication, onToggleTaken }) => {
  const status = getMedicationStatus(medication);
  
  return (
    <div className={`med-item ${medication.taken ? 'taken' : ''}`}>
      <div className="med-item-details">
        <div className="med-item-name">
          <span className={`status-indicator status-${status}`}></span>
          {medication.name}
        </div>
        <div className="med-item-info">
          <span>{medication.dosage}</span>
          <span>{medication.time}</span>
        </div>
        {medication.instructions && (
          <div className="med-item-instructions">
            {medication.instructions}
          </div>
        )}
      </div>
      <div className="med-item-actions">
        <button 
          className={`take-button ${medication.taken ? 'taken' : ''}`}
          onClick={() => onToggleTaken(medication.id)}
          aria-label={medication.taken ? "Mark as not taken" : "Mark as taken"}
        >
          {medication.taken ? "✓" : ""}
        </button>
      </div>
    </div>
  );
};

export default MedicationItem;
