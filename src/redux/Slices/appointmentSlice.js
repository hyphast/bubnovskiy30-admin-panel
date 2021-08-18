import { createSlice } from '@reduxjs/toolkit'

const template = {
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

const initialState = {
  appointments: [
    {
      instructor: null,
      ...template
    },
    {
      instructor: null,
      ...template
    },
    {
      instructor: null,
      ...template
    },
    {
      instructor: null,
      ...template
    },
  ]
}

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.value += 1
    },
    deleteAppointment: (state, action) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { addAppointment, deleteAppointment, incrementByAmount } = appointmentSlice.actions

export default appointmentSlice;