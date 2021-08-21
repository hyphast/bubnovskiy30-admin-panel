import * as axios from "axios";

export const API_URL = 'http://localhost:5000/api'

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(('token'))}`;
  return config;
});

api.interceptors.response.use(config => {
  return config;
}, async error => {
  const originalRequest = error.config;
  if(error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const data = await axios.get(API_URL + '/auth/refresh', {withCredentials: true}).then(response => response.data);
      localStorage.setItem('token', data.accessToken);
      return api.request(originalRequest);
    } catch (e) {
      console.log('Пользователь не авторизован');
    }
  }
  throw error;
});

export const appointmentAPI = {
  getInstructors() {
    return api.get('/instructors').then(response => response.data);
  },
  setAppointment(date, appointments) {
    return api.post('/appointments', {date, appointments}).then(response => response.data);
  }
}
