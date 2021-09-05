import { configureStore } from '@reduxjs/toolkit';
import newAppointmentSlice from './slices/newAppointmentSlice';
import createdAppointmentsSlice from './slices/createdAppointmentsSlice';

export const store = configureStore({
  reducer: {
    newAppointment: newAppointmentSlice,
    createdAppointments: createdAppointmentsSlice,
  },
});

window.__store__ = store;