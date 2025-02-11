// Clock.tsx
import React, { useEffect, useRef } from 'react';
import './Clock.css';

const Clock: React.FC = () => {
  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  const secondHandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const hourRotation = (hours + minutes / 60) * 30;
      const minuteRotation = (minutes + seconds / 60) * 6;
      const secondRotation = seconds * 6;

      if (hourHandRef.current) {
        hourHandRef.current.style.transform = `translateX(-50%) rotate(${hourRotation}deg)`;
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.style.transform = `translateX(-50%) rotate(${minuteRotation}deg)`;
      }
      if (secondHandRef.current) {
        secondHandRef.current.style.transform = `translateX(-50%) rotate(${secondRotation}deg)`;
      }
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="clock">
      <div className="clock-face">
        <div className="hand hour-hand" ref={hourHandRef}></div>
        <div className="hand minute-hand" ref={minuteHandRef}></div>
        <div className="hand second-hand" ref={secondHandRef}></div>
      </div>
    </div>
  );
};

export default Clock;