import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {appointmentAPI} from '../../API/api';
import {isEqual} from 'date-fns';

export const getInstructors = createAsyncThunk(
  'newAppointment/getInstructors',
  async () => {
    const data = await appointmentAPI.getInstructors();

    return data;
  }
)

export const getTimeTemplate = createAsyncThunk(
  'newAppointment/getTimeTemplate',
  async () => {
    let data = await appointmentAPI.getTimeTemplate();

    return data;
  }
)

export const resetAppointments = createAsyncThunk(
  'newAppointment/resetAppointments',
  async (_, { dispatch }) => {
    dispatch(resetAppointmentsData());
    dispatch(getInstructors());
    dispatch(getTimeTemplate());
  }
)

export const setAppointments = createAsyncThunk(
  'newAppointment/setAppointments',
  async (date, { dispatch, getState }) => {
    const appointments = getState().newAppointment.appointments;
    const data = await appointmentAPI.setAppointment(date, appointments);
    dispatch(resetAppointments());

    return data;
  }
)

const initialState = {
  appointments: [],
  instructors: [],
  timeTemplate: [],
  isLoading: false,
  error: null,
}

const newAppointmentSlice = createSlice({
  name: 'newAppointment',
  initialState,
  reducers: {
    setIsInstructorSelected: (state, action) => {
      const instructor = state.instructors.find(inst => inst._id === action.payload.id);
      instructor.isSelected = action.payload.isSelected;

      const instructors = state.instructors;
      state.instructors = instructors
        .filter(item => item.isSelected)
        .concat(instructors.filter(item => !item.isSelected));
    },
    addAppointment: (state, action) => {
      state.appointments.push({
        instructorId: action.payload.id,
        times: state.timeTemplate,
      });
    },
    createAppointmentTime: (state, action) => {
      const appointment = state.appointments.find(app => app.instructorId === action.payload.id);

      appointment.times = [...appointment.times, {time: action.payload.time, free: 3}];

      // appointment.times = appointment.times.sort((x, y) => x[0] - y[0]); //todo sort

      // const sortable = Object.entries(appointment.times)
      //   .sort(([,a],[,b]) => a.time - b.time)
      //   .reduce((r, [k, v]) => ({ ...r, [k.time]: v.time, [k.free]: v.free }), {});

      // appointment.times = sortable;
    },
    deleteAppointmentTime: (state, action) => {
      const appointment = state.appointments.find(app => app.instructorId === action.payload.id);
      appointment.times = appointment.times.filter(app => !isEqual(app.time, action.payload.time));
    },
    resetAppointmentsData: (state) => {
      state.appointments = [];
      state.instructors = [];
      state.timeTemplate = [];
    }
  },
  extraReducers: {
    [getInstructors.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getInstructors.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.instructors = action.payload.map(item => {
        return {...item, isSelected: false}
      })
    },
    [getTimeTemplate.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getTimeTemplate.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.timeTemplate = action.payload.map(item => {
        return {time: +new Date(item.time), free: 3}
      })
    },
  },
});

export const { setIsInstructorSelected, addAppointment,
               deleteAppointmentTime, createAppointmentTime,
               resetAppointmentsData,
} = newAppointmentSlice.actions;

export default newAppointmentSlice.reducer;