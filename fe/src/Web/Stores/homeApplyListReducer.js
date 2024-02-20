// redux/slices/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const homeApplyListSlice = createSlice({
  name: 'applyList',
  initialState: {
    beforeData: [],
    afterData: [],
    searchData: [],
    status: 'idle', // 'idle === 동작 전
    token: null,
    error: null,
  },
  reducers: {
    beforeApplyList(state, action) {
      state.beforeData = action.payload;
    },
    afterApplyList(state, action) {
      state.afterData = action.payload;
    },
    searchApplyList(state, action) {
      state.searchData = action.payload;
    },
  },
});

export const { beforeApplyList, afterApplyList, searchApplyList } =
  homeApplyListSlice.actions;
export default homeApplyListSlice.reducer;
