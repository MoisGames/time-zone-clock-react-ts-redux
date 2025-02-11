import React from 'react';
import '../styles/globals.css';
import Clock from '../components/Clock/Clock';

const ClockPage: React.FC = () => {
  return (
    <div className="clock-container">
      <Clock />
    </div>
  );
};

export default ClockPage;