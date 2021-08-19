import { configureStore } from '@reduxjs/toolkit';
import newAppointmentSlice from './slices/newAppointmentSlice';

export const store = configureStore({
  reducer: {
    newAppointment: newAppointmentSlice,
  }
});