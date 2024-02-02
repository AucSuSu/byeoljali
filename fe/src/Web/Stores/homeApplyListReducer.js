// redux/slices/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const homeApplyListSlice = createSlice({
  name: 'applyList',
  initialState: {
    data: [],
    status: 'idle', // 'idle === 동작 전
    token: null,
    error: null,
  },
  reducers: {
    beforeApplyList(state, action) {
      state.data = action.payload;
      console.log('응모전 데이터 :', state.data);
    },
    afterApplyList(state, action) {
      state.data = action.payload;
      console.log('응모중 데이터 : ', state.data);
    },
  },
  
});

export const { beforeApplyList, afterApplyList } = homeApplyListSlice.actions;
export default homeApplyListSlice.reducer;
