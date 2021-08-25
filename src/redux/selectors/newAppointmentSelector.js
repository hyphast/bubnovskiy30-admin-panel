import {createSelector} from 'reselect';

export const getInstructorsSelector = (state) => {
  return state.newAppointment.instructors;
}

export const getAppointmentsSelector = (state) => {
  return state.newAppointment.appointments;
}

export const getIsLoadingsAppointmentsSelector = (state) => {
  return state.newAppointment.isLoading;
}

export const getMessageAppointmentsSelector = (state) => {
  return state.newAppointment.message;
}

export const getErrorAppointmentsSelector = (state) => {
  return state.newAppointment.error;
}

export const getOneAppointmentSelector = () => {
  return createSelector(
    getAppointmentsSelector,
    (_, id) => id,
    (appointments, id) =>
      appointments.filter((appointment) => appointment.instructorId === id))
}