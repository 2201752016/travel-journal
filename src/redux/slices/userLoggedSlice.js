import { createSlice } from '@reduxjs/toolkit';

const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
