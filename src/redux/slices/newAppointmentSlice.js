import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {appointmentAPI} from '../../API/api';
import {getUnixTime, isEqual} from 'date-fns';

const timeTemplate = [
  [getUnixTime(new Date(1970, 0, 1, 8, 0)), 3],
  [getUnixTime(new Date(1970, 0, 1, 9, 30)), 3],
  [getUnixTime(new Date(1970, 0, 1, 11, 0)), 3],
  [getUnixTime(new Date(1970, 0, 1, 12, 30)), 3],
  [getUnixTime(new Date(1970, 0, 1, 14, 30)), 3],
  [getUnixTime(new Date(1970, 0, 1, 16, 0)), 3],
  [getUnixTime(new Date(1970, 0, 1, 17, 30)), 3],
  [getUnixTime(new Date(1970, 0, 1, 18, 30)), 3],
  [getUnixTime(new Date(1970, 0, 1, 19, 40)), 3],
];

export const getInstructors = createAsyncThunk(
  'newAppointment/getInstructors',
  async () => {
    const data = await appointmentAPI.getInstructors();

    return data;
  }
)

export const resetAppointments = createAsyncThunk(
  'newAppointment/resetAppointments',
  async (_, { dispatch }) => {
    dispatch(resetAppointmentsData());
    dispatch(getInstructors());
  }
)

export const setAppointments = createAsyncThunk(
  'newAppointment/setAppointments',
  async (_, { dispatch }) => {
    dispatch(resetAppointmentsData());
    dispatch(getInstructors());
  }
)


const initialState = {
  appointments: [],
  instructors: [],
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
        time: timeTemplate,
      });
    },
    createAppointmentTime: (state, action) => {
      const appointment = state.appointments.find(app => app.instructorId === action.payload.id);

      appointment.time = [...appointment.time, [action.payload.time, 3]];

      appointment.time = appointment.time.sort((x, y) => x[0] - y[0]);

    },
    deleteAppointmentTime: (state, action) => {
      const appointment = state.appointments.find(app => app.instructorId === action.payload.id);
      appointment.time = appointment.time.filter(app => !isEqual(app[0], action.payload.time));
    },
    resetAppointmentsData: (state) => {
      state.appointments = [];
      state.instructors = [];
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
  },
});

export const { setIsInstructorSelected, addAppointment,
               deleteAppointmentTime, createAppointmentTime,
               resetAppointmentsData,
} = newAppointmentSlice.actions;

export default newAppointmentSlice.reducer;