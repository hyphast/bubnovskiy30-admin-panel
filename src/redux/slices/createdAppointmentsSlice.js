import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createdAppointmentsAPI} from '../../API/api';

export const getCreatedAppointments = createAsyncThunk(
  'createdAppointments/getCreatedAppointments',
  async (_, {rejectWithValue}) => {
    try {
      const data = await createdAppointmentsAPI.getCreatedAppointments();

      return data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
)

const initialState = {
  appointments: [],
  isLoading: false,
  error: '',
  message: '',
}

const createdAppointmentsSlice = createSlice({
  name: 'createdAppointments',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = '';
    },
    resetError: (state) => {
      state.error = '';
    },
  },
  extraReducers: {
    [getCreatedAppointments.pending]:
      (state) => {
        state.isLoading = true;
        state.error = null;
      },
    [getCreatedAppointments.fulfilled]:
      (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      },
    [getCreatedAppointments.rejected]:
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
  }
});

export const {resetMessage, resetError} = createdAppointmentsSlice.actions;

export default createdAppointmentsSlice.reducer;