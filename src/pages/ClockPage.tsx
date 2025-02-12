import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Clock from '../components/Clock/Clock';
import './ClockPage.css';
import { fetchTimezones } from '../http/api';
import { addClock, removeClock, setAllTimezones } from '../store/store';
import { RootState } from '../store/store'; 

const ClockPage: React.FC = () => {
  const dispatch = useDispatch();
  const { allTimezones, selectedCities }: { allTimezones: any[], selectedCities: any[] } = useSelector(
    (state: RootState) => state.clock
  );

  useEffect(() => {
    const loadTimezones = async () => {
      try {
        const data = await fetchTimezones();
        dispatch(setAllTimezones(data));
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Не удалось загрузить часовые пояса:', error);
      }
    };
    loadTimezones();
  }, [dispatch]);

  if (!allTimezones.length) {
    return <div className="loading">Загрузка...</div>;
  }

  const handleAddClock = () => {
    dispatch(addClock());
  };

  const handleRemoveClock = () => {
    if (selectedCities.length > 1) {
      const lastCityId = selectedCities[selectedCities.length - 1].id;
      dispatch(removeClock({ id: lastCityId }));
    }
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
        {selectedCities.map((city) => (
          <Clock key={city.id} id={city.id} />
        ))}
      </div>
    </main>
  );
};

export default ClockPage;