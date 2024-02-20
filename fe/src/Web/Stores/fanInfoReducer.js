import { createSlice } from '@reduxjs/toolkit';

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
