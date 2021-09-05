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

export const getCreatedAppointmentsSelector = (state) => {
  return state.createdAppointments.appointments;
}

export const getIsLoadingsCreatedAppointmentsSelector = (state) => {
  return state.createdAppointments.isLoading;
}


export const getInstructorTime = () => {
  return createSelector(
    getAppointmentsSelector,
    (_, id) => id,
    (appointments, id) => {
      const apps = appointments.filter(appointment => {
        return appointment.instructors.find(item => item.instructorId === id)
      });
      return apps.map(item => item.time);
    }
  )
}