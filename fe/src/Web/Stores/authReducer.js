import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { auth: false },
  reducers: {
    login(state) {
      state.auth = true;
    },
    logout(state) {
      state.auth = false;
    },
  },
});

export default authSlice.reducer;
export const authAction = authSlice.actions;
