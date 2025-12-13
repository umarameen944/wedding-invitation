import React, { useEffect, useState } from 'react';
import {FaTimes, FaCode} from 'react-icons/fa';

export default function UmarAmeenCredit() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`umar-credit-chip ${isExiting ? 'exiting' : ''}`}>
      <div className="credit-chip-content">
        <FaCode className="chip-icon" />
        <span className="chip-text">
          by <span className="chip-name">Umar Ameen</span>
        </span>
        <button 
          onClick={handleClose}
          className="chip-close"
          aria-label="Close credit"
        >
          <FaTimes className="close-icon" />
        </button>
      </div>
    </div>
  );
}