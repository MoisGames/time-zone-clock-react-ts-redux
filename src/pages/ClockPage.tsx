import React, { useEffect, useState } from 'react';
import Clock from '../components/Clock/Clock';
import './ClockPage.css';
import { fetchTimezones } from '../http/api';

const ClockPage: React.FC = () => {
  const [timezones, setTimezones] = useState<any[]>([]);
  const [selectedCities, setSelectedCities] = useState<{ city: string; timezone: string }[]>([
    { city: 'Москва', timezone: 'Europe/Moscow' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimezones = async () => {
      try {
        const data = await fetchTimezones();
        setTimezones(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Не удалось загрузить часовые пояса:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTimezones();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  const handleAddClock = () => {
    if (selectedCities.length >= 10) return;

    const availableTimezones = timezones.filter((t) => !selectedCities.map((c) => c.city).includes(t.city));
    if (availableTimezones.length > 0) {
      setSelectedCities((prev) => [...prev, { city: availableTimezones[0].city, timezone: availableTimezones[0].timezone }]);
    }
  };

  const handleRemoveClock = () => {
    if (selectedCities.length === 1) return;
    setSelectedCities((prev) => prev.slice(0, -1));
  };

  const handleCitySelect = (index: number, city: string) => {
    const selectedTimezone = timezones.find((t) => t.city === city)?.timezone || '';
    if (!selectedTimezone) return;

    const updatedCities = selectedCities.map((c, i) =>
      i === index ? { city, timezone: selectedTimezone } : c
    );
    setSelectedCities(updatedCities);
  };

  return (
    <main className="page-container">

      <div className="clock-controls">
        <button onClick={handleAddClock} disabled={selectedCities.length >= 10}>
          Добавить часы ({selectedCities.length}/10)
        </button>
        <button onClick={handleRemoveClock} disabled={selectedCities.length <= 1}>
          Удалить последние часы
        </button>
      </div>

      <div className="clocks-container">
        {selectedCities.map((cityData, index) => (
          <Clock
            key={index}
            city={cityData.city}
            timezone={cityData.timezone}
            onCitySelect={(city) => handleCitySelect(index, city)}
            cities={selectedCities.map((c) => c.city)}
            allTimezones={timezones}
          />
        ))}
      </div>
    </main>
  );
};

export default ClockPage;