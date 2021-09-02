import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {appointmentAPI} from '../../API/api';
import {isEqual} from 'date-fns';

export const initializeNewAppointments = createAsyncThunk(
  'newAppointment/initializeNewAppointments',
  async (date, { dispatch, rejectWithValue }) => {
    try {
      const instructors = dispatch(getInstructors());
      const timeTemplate = dispatch(getTimeTemplate());

      return Promise.all([instructors, timeTemplate]);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
)

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
  async (_, { dispatch, rejectWithValue}) => {
    try {
      dispatch(resetAppointmentsData());
      const instructors = dispatch(getInstructors());
      const timeTemplate = dispatch(getTimeTemplate());

      return Promise.all([instructors, timeTemplate]);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
)

export const setAppointments = createAsyncThunk(
  'newAppointment/setAppointments',
  async (date, { dispatch, getState, rejectWithValue }) => {
    try {
      const appointments = getState().newAppointment.appointments;
      const data = await appointmentAPI.setAppointment(date, appointments);
      dispatch(resetAppointments());

      return data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
)

const initialState = {
  appointments: [],
  instructors: [],
  timeTemplate: [],
  isLoading: false,
  error: '',
  message: '',
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
        instructorName: action.payload.name,
        times: state.timeTemplate,
      });
    },
    createAppointmentTime: (state, action) => {
      const appointment = state.appointments.find(app => app.instructorId === action.payload.id);

      appointment.times = [...appointment.times, {time: action.payload.time, free: 3}];

      appointment.times = appointment.times.sort((a, b) => a.time - b.time);
    },
    deleteAppointmentTime: (state, action) => {
      const appointment = state.appointments.find(app => app.instructorId === action.payload.id);
      appointment.times = appointment.times.filter(app => !isEqual(app.time, action.payload.time));
    },
    resetAppointmentsData: (state) => {
      state.appointments = [];
      state.instructors = [];
      state.timeTemplate = [];
    },
    resetMessage: (state) => {
      state.message = '';
    },
    resetError: (state) => {
      state.error = '';
    }
  },
  extraReducers: {
    [initializeNewAppointments.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [initializeNewAppointments.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [initializeNewAppointments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getInstructors.fulfilled]: (state, action) => {
      state.instructors = action.payload.map(item => {
        return {...item, isSelected: false}
      })
    },
    [getTimeTemplate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.timeTemplate = action.payload.map(item => {
        return {time: +new Date(item.time), free: 3}
      })
    },
    [setAppointments.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [setAppointments.fulfilled]: (state) => {
      state.isLoading = false;
      state.message = 'Запись была добавлена';
    },
    [setAppointments.rejected]:(state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [resetAppointments.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [resetAppointments.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [resetAppointments.rejected]:(state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
});

export const { setIsInstructorSelected, addAppointment,
               deleteAppointmentTime, createAppointmentTime,
               resetAppointmentsData, resetMessage, resetError,
} = newAppointmentSlice.actions;

export default newAppointmentSlice.reducer;