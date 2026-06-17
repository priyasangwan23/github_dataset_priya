import React from 'react';

export const Spinner = ({ message = 'Loading datasets...' }) => {
  return (
    <div className="loading-wrapper" id="loading-spinner">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default Spinner;
