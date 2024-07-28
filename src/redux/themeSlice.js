import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
