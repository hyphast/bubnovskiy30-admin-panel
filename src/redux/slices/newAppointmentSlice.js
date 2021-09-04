import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {appointmentAPI} from '../../API/api';
import {isEqual} from 'date-fns';

export const initializeNewAppointments = createAsyncThunk(
  'newAppointment/initializeNewAppointments',
  async (date, {dispatch, rejectWithValue}) => {
    try {
      const instructors = dispatch(getInstructors());
      const timeTemplate = dispatch(getTimeTemplate());

      return Promise.all([instructors, timeTemplate]).then(() => dispatch(initializeData()));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
)

export const getInstructors = createAsyncThunk(
  'newAppointment/getInstructors',
  async () => {
    const data = await appointmentAPI.getInstructors();

    return data;
  },
)

export const getTimeTemplate = createAsyncThunk(
  'newAppointment/getTimeTemplate',
  async () => {
    let data = await appointmentAPI.getTimeTemplate();

    return data;
  },
)

export const resetAppointments = createAsyncThunk(
  'newAppointment/resetAppointments',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      dispatch(resetAppointmentsData());
      const instructors = dispatch(getInstructors());
      const timeTemplate = dispatch(getTimeTemplate());

      return Promise.all([instructors, timeTemplate]).then(() => dispatch(initializeData()));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
)

export const createAppointment = createAsyncThunk(
  'newAppointment/createAppointment',
  async (date, {dispatch, getState, rejectWithValue}) => {
    try {
      const appointments = getState().newAppointment.appointments;
      debugger
      const data = await appointmentAPI.createAppointment(date, appointments);
      dispatch(resetAppointments());

      return data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
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
      initializeData: (state) => {
        state.timeTemplate.map(item => {
          state.appointments.push({
            time: item.time,
            instructors: [],
            patients: [],
            patientsNumber: null,
            free: 0,
          })
        })
      },
      addInstructor: (state, action) => {
        state.timeTemplate.forEach(t => {
          const appointment = state.appointments.find(app => app.time === t.time);
          if (appointment) {
            appointment.instructors = [...appointment.instructors,
              {
                instructorId: action.payload.id,
                instructorName: action.payload.name,
              },
            ]
          } else {
            state.appointments.push({
              time: t.time,
              instructors: [
                {
                  instructorId: action.payload.id,
                  instructorName: action.payload.name,
                },
              ],
              patients: null,
              patientsNumber: null,
              free: 3,
            })
          }
        })

        state.appointments = state.appointments.sort((a, b) => a.time - b.time);
      },
      createAppointmentTime: (state, action) => {
        const appointment = state.appointments.find(app => app.time === action.payload.time);

        if (appointment) {
          appointment.instructors =
            [...appointment.instructors, {instructorId: action.payload.id, instructorName: action.payload.name}];
        } else {
          state.appointments.push({
            time: action.payload.time,
            instructors: [{instructorId: action.payload.id, instructorName: action.payload.name}],
            patients: null,
            patientsNumber: null,
            free: 3,
          })
        }

        state.appointments = state.appointments.sort((a, b) => a.time - b.time);
      },
      deleteAppointmentTime: (state, action) => {
        const appointment = state.appointments.find(app => app.time === action.payload.time);

        appointment.instructors = appointment.instructors.filter(inst => inst.instructorId !== action.payload.id);

        if (!appointment.instructors.length) {
          state.appointments = state.appointments.filter(item => item.time !== action.payload.time);
        }
        // appointment.times = appointment.times.filter(app => !isEqual(app.time, action.payload.time));
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
      },
    },
    extraReducers: {
      [initializeNewAppointments.pending]:
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      [initializeNewAppointments.fulfilled]:
        (state) => {
          state.isLoading = false;
        },
      [initializeNewAppointments.rejected]:
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      [getInstructors.fulfilled]:
        (state, action) => {
          state.instructors = action.payload.map(item => {
            return {...item, isSelected: false}
          })
        },
      [getTimeTemplate.fulfilled]:
        (state, action) => {
          state.isLoading = false;
          state.timeTemplate = action.payload.map(item => {
            return {time: +new Date(item.time)}
          })
        },
      [createAppointment.pending]:
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      [createAppointment.fulfilled]:
        (state) => {
          state.isLoading = false;
          state.message = 'Запись была добавлена';
        },
      [createAppointment.rejected]:
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      [resetAppointments.pending]:
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      [resetAppointments.fulfilled]:
        (state) => {
          state.isLoading = false;
        },
      [resetAppointments.rejected]:
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
    }
});

export const {
  setIsInstructorSelected, initializeData, addInstructor,
  deleteAppointmentTime, createAppointmentTime, resetAppointmentsData,
  resetMessage, resetError,
} = newAppointmentSlice.actions;

export default newAppointmentSlice.reducer;