import React, { useEffect, useRef } from 'react';
import './Clock.css';

interface ClockProps {
  city: string;
  timezone: string;
  onCitySelect: (city: string) => void;
  cities: string[];
  allTimezones: { city: string; timezone: string }[];
}

const Clock: React.FC<ClockProps> = ({ city, timezone, onCitySelect, cities, allTimezones }) => {
  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  const secondHandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      if (!timezone) return;

      const now = new Date();
      const targetTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));

      const hours = targetTime.getHours() % 12;
      const minutes = targetTime.getMinutes();
      const seconds = targetTime.getSeconds();

      const hourRotation = (hours + minutes / 60) * 30;
      const minuteRotation = (minutes + seconds / 60) * 6;
      const secondRotation = seconds * 6;

      if (hourHandRef.current) {
        hourHandRef.current.style.transform = `rotate(${hourRotation}deg)`;
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.style.transform = `rotate(${minuteRotation}deg)`;
      }
      if (secondHandRef.current) {
        secondHandRef.current.style.transform = `rotate(${secondRotation}deg)`;
      }
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(intervalId);
  }, [timezone]);

  return (
    <div className="clock-container">
      <div className="clock">
        {Array.from({ length: 12 }, (_, i) => (
          <div className="number" key={i}>
            <span>{i === 0 ? 12 : i}</span>
          </div>
        ))}
        <div className="center-dot"></div>
        <div className="hands-container">
          <div className="hand hour-hand" ref={hourHandRef}></div>
          <div className="hand minute-hand" ref={minuteHandRef}></div>
          <div className="hand second-hand" ref={secondHandRef}></div>
        </div>
      </div>
      <div className="time-display">
        {city && timezone
          ? new Date().toLocaleTimeString('ru-RU', { timeZone: timezone })
          : '--:--:--'}
      </div>

      <div className="city-selector">
        <select
          value={city || ''}
          onChange={(e) => onCitySelect(e.target.value)}
        >
          <option value="" disabled={!!city}>
            -- Выбрать город --
          </option>
          {allTimezones
            .filter((t) => !cities.includes(t.city))
            .map((timezone, index) => (
              <option key={index} value={timezone.city}>
                {timezone.city}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Clock;