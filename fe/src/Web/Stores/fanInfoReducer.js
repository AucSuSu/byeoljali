import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const fanInfoSlice = createSlice({
  name: 'fanInfo',
  initialState: {
    data: '',
  },
  reducers: {
    getUserInfo(state, action) {
      state.data = action.payload;
    },
  },
});

export const { getUserInfo } = fanInfoSlice.actions;
export default fanInfoSlice.reducer;
