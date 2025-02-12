import React from 'react';
import './ClockPage.css';
import Clock from '../components/Clock/Clock';

const ClockPage: React.FC = () => {
  return (
    <main className="page-container">
      <Clock />
      <Clock />
      <Clock />
      <Clock />
      <Clock />
      <Clock />
    </main>
  );
};

export default ClockPage;