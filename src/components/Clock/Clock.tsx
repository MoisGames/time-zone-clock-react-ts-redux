import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Clock.css';
import { selectCity } from '../../store/store';
import { RootState } from '../../store/store';

interface ClockProps {
  id: string;
}

const Clock: React.FC<ClockProps> = ({ id }) => {
  const dispatch = useDispatch();
  const { allTimezones, selectedCities } = useSelector(
    (state: RootState) => state.clock
  );

  const currentCity = selectedCities.find((city) => city.id === id);

  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  const secondHandRef = useRef<HTMLDivElement>(null);

  const updateClock = () => {
    if (!currentCity?.timezone) return '--:--:--';

    const now = new Date();
    const targetTime = new Date(now.toLocaleString('en-US', { timeZone: currentCity.timezone }));

    const hours = targetTime.getHours() % 12;
    const minutes = targetTime.getMinutes();
    const seconds = targetTime.getSeconds();
    const milliseconds = targetTime.getMilliseconds();

    const hourRotation = (hours + minutes / 60 + seconds / 3600) * 30;
    const minuteRotation = (minutes + seconds / 60 + milliseconds / 60000) * 6;
    const secondRotation = (seconds + milliseconds / 1000) * 6;

    if (hourHandRef.current) {
      hourHandRef.current.style.transform = `rotate(${hourRotation}deg)`;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.style.transform = `rotate(${minuteRotation}deg)`;
    }
    if (secondHandRef.current) {
      secondHandRef.current.style.transform = `rotate(${secondRotation}deg)`;
    }

    return targetTime.toLocaleTimeString('ru-RU');
  };

  const [currentTime, setCurrentTime] = React.useState<string>(() =>
    currentCity?.timezone ? updateClock() || '--:--:--' : '--:--:--'
  );

  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      setCurrentTime(updateClock() || '--:--:--');
      animationFrameId = requestAnimationFrame(tick);
    };

    if (currentCity?.timezone) {
      tick();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentCity?.timezone]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    dispatch(selectCity({ id, city: selectedCity }));
  };

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
      <div className="time-display">{currentTime}</div>
      <div className="city-selector">
        <select
          value={currentCity?.city || ''}
          onChange={handleCityChange}
        >
          <option value="" disabled={!!currentCity?.city}>
            -- Выбрать город --
          </option>
          {allTimezones
            .filter((timezone) =>
              !selectedCities
                .filter((c) => c.id !== id)
                .map((c) => c.city)
                .includes(timezone.city)
            )
            .map((timezone) => (
              <option key={timezone.id} value={timezone.city}>
                {timezone.city}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Clock;