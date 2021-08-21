import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {appointmentAPI} from '../../API/api';
import {fromUnixTime, getUnixTime, isEqual} from 'date-fns';

const timeTemplate = [
  {
    time: getUnixTime(new Date(1970, 0, 1, 8, 0)),
    free: 3,
  },
  {
    time: getUnixTime(new Date(1970, 0, 1, 9, 30)),
    free: 3,
  },
  {
    time: getUnixTime(new Date(1970, 0, 1, 11, 0)),
    free: 3,
  },
  {
    time: getUnixTime(new Date(1970, 0, 1, 12, 30)),
    free: 3,
  },
  {
    time: getUnixTime(new Date(1970, 0, 1, 14, 30)),
    free: 3,
  },
  {
    time: getUnixTime(new Date(1970, 0, 1, 16, 0)),
    free: 3,
  },
  {
    time: getUnixTime(new Date(1970, 0, 1, 17, 30)),
    free: 3,
  },
  {
    time: getUnixTime(new Date(1970, 0, 1, 18, 30)),
    free: 3,
  },
  {
    time: getUnixTime(new Date(1970, 0, 1, 19, 40)),
    free: 3,
  }
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
  async (date, { dispatch, getState }) => {
    console.log(fromUnixTime(date))
    debugger

    const appointments = getState().newAppointment.appointments;
    const data = await appointmentAPI.setAppointment(date, appointments);
    dispatch(resetAppointmentsData());
    dispatch(getInstructors());

    return data;
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
        times: timeTemplate,
      });
    },
    createAppointmentTime: (state, action) => {
      const appointment = state.appointments.find(app => app.instructorId === action.payload.id);

      appointment.times = [...appointment.times, {time: action.payload.time, free: 3}];

      // appointment.times = appointment.times.sort((x, y) => x[0] - y[0]); //todo sort

    },
    deleteAppointmentTime: (state, action) => {
      const appointment = state.appointments.find(app => app.instructorId === action.payload.id);
      appointment.times = appointment.times.filter(app => !isEqual(app.time, action.payload.time));
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