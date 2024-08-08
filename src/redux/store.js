import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import userLoggedReducer from './slices/userLoggedSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    userLogged: userLoggedReducer,
  },
});
