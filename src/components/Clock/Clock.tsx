import React from 'react';
import './Clock.css';

const Clock: React.FC = () => {
  return (
    <div className="clock">
      {Array.from({ length: 12 }, (_, i) => (
        <div className="number" key={i}>
          <span>{i === 0 ? 12 : i}</span>
        </div>
      ))}
      <div className="center-dot"></div>
      <div className="hands-container">
        <div className="hand hour-hand"></div>
        <div className="hand minute-hand"></div>
        <div className="hand second-hand"></div>
      </div>
    </div>
  );
};

export default Clock;