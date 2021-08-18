import { configureStore } from '@reduxjs/toolkit';
import {appointmentSlice} from '../redux/Slices/appointmentSlice';

export const store = configureStore({
  reducer: {
    appointment: appointmentSlice,
  }
});