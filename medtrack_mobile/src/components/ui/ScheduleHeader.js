import React from 'react';
import { formatDate } from '../utils/dateUtils';
import './MedTrack.css';

/**
 * PUBLIC_INTERFACE
 * Component to display the current date and navigation controls
 * @param {Object} props - Component props
 * @param {Date} props.currentDate - Current date to display
 * @param {Function} props.onPrevDay - Handler for previous day button
 * @param {Function} props.onNextDay - Handler for next day button
 * @param {Array} props.medications - List of medications for the day
 * @returns {JSX.Element} - Rendered component
 */
const ScheduleHeader = ({ currentDate, onPrevDay, onNextDay, medications = [] }) => {
  // Calculate completion percentage
  const takenCount = medications.filter(med => med.taken).length;
  const totalCount = medications.length;
  const completionPercentage = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  return (
    <div className="schedule-header">
      <div className="date-nav">
        <button onClick={onPrevDay}>&lt;</button>
        <h2 className="date-display">{formatDate(currentDate)}</h2>
        <button onClick={onNextDay}>&gt;</button>
      </div>
      
      <div className="progress-container">
        <div className="progress-label">
          <span>Daily Progress</span>
          <span>{`${takenCount} of ${totalCount} taken`}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionPercentage}%` }}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={completionPercentage}
            role="progressbar"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleHeader;
