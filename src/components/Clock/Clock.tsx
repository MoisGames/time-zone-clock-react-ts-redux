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
      </div>
  );
};

export default Clock;