import axios from 'axios';

const API_URL = '/data/timezones.json';

export const fetchTimezones = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
};