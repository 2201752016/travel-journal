import { createSlice } from '@reduxjs/toolkit';

const getInitialAuthState = () => {
  if (typeof window !== 'undefined') {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
      user: localStorage.getItem('email') || null,
    };
  }
  return {
    isAuthenticated: false,
    user: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.email;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('email', action.payload.email);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
