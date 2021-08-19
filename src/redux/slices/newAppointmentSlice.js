import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {appointmentAPI} from '../../API/api';

const timeTemplate = {
  '08:00': 3,
  '09:30': 3,
  '11:00': 3,
  '12:30': 3,
  '14:30': 3,
  '16:00': 3,
  '17:30': 3,
  '18:30': 3,
  '19:40': 3,
}

export const getInstructors = createAsyncThunk(
  'newAppointment/getInstructors',
  async () => {
    const data = await appointmentAPI.getInstructors();

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
        instructor: action.payload.id,
        ...timeTemplate,
      });
    },
    deleteAppointmentTime: (state, action) => {
      // state.value -= 1
    },
    createAppointmentTime: (state, action) => {
      // state.value += action.payload
    },

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

export const { setIsInstructorSelected, addAppointment } = newAppointmentSlice.actions;

export default newAppointmentSlice.reducer;