import { configureStore, createSlice } from '@reduxjs/toolkit';

interface City {
  id: string; 
  city: string;
  timezone: string;
}


interface ClockState {
  allTimezones: City[];
  selectedCities: SelectedCity[];
}


interface SelectedCity {
  id: string;
  city: string;
  timezone: string;
}


const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    allTimezones: [] as City[],
    selectedCities: [
      { id: 'default', city: 'Москва', timezone: 'Europe/Moscow' }, 
    ] as SelectedCity[],
  },
  reducers: {
    setAllTimezones: (state, action) => {
      state.allTimezones = action.payload;
    },
    addClock: (state) => {
      if (state.selectedCities.length >= 10) return;


      const availableCity = state.allTimezones.find(
        (t: City) => !state.selectedCities.map((c) => c.city).includes(t.city)
      );

      if (availableCity) {
        const newId = `clock_${Date.now()}`;
        state.selectedCities.push({ id: newId, city: availableCity.city, timezone: availableCity.timezone });
      }
    },
    removeClock: (state, action) => {
      if (state.selectedCities.length === 1) return;
      const { id } = action.payload;
      state.selectedCities = state.selectedCities.filter((city) => city.id !== id);
    },
    selectCity: (state, action) => {
      const { id, city } = action.payload;
      const selectedTimezone = state.allTimezones.find((t) => t.city === city)?.timezone || '';
      if (!selectedTimezone) return;

      const targetCity = state.selectedCities.find((c) => c.id === id);
      if (targetCity) {
        targetCity.city = city;
        targetCity.timezone = selectedTimezone;
      }
    },
  },
});


export const { addClock, removeClock, selectCity, setAllTimezones } = clockSlice.actions;


const store = configureStore({
  reducer: {
    clock: clockSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export default store;