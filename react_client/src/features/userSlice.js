import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  email: '',
  name: '',
  is_patient:'',
  is_doctor:'',
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.name = action.payload.name
      state.is_patient = action.payload.is_patient
      state.is_doctor = action.payload.is_doctor
    },
    unSetUserInfo: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.name = action.payload.name
      state.is_patient = action.payload.is_patient
      state.is_doctor = action.payload.is_doctor
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo, unSetUserInfo } = userSlice.actions

export default userSlice.reducer