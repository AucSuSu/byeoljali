// redux/slices/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const recentListSlice = createSlice({
  name: 'recentList',
  initialState: {
    recentList: [],
  },
  reducers: {
    setRecentList: (state, action) => {
      state.recentList = action.payload;
      console.log('recentList 업데이트 완료');
    },
  },
});

export default recentListSlice.reducer;
export const { setRecentList } = recentListSlice.actions;
