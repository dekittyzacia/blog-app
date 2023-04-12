import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    isLogged: false,
    user: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
    setUser(state, action) {
      state.user = action.payload
      state.isLogged = Boolean(action.payload)
    },
    logOut(state) {
      state.token = null
      state.isLogged = false
      state.user = null
    },
  },
})

export const { setToken, setUser, logOut } = userSlice.actions
export default userSlice.reducer
