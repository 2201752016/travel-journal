import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!(typeof window !== 'undefined' && localStorage.getItem('token')),
  user: (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'))) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
