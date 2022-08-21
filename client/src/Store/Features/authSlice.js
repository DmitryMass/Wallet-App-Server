import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.user && JSON.parse(localStorage.user),
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    loginSuccess: (state) => {
      state.user = true;
    },
    logoutUser: (state) => {
      state.user = false;
    },
  },
});

export const { setUser, loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
