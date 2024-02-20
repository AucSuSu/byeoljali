import { createSlice } from '@reduxjs/toolkit';

const fanApplyListSlice = createSlice({
  name: 'fanApplyList',
  initialState: {
    data: [],
  },
  reducers: {
    loadApply(state, action) {
      state.data = action.payload;
    },
    loadWin(state, action) {
      state.data = action.payload;
    },
  },
});

export const { loadApply, loadWin } = fanApplyListSlice.actions;
export default fanApplyListSlice.reducer;
