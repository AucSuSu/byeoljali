import { createSlice } from '@reduxjs/toolkit';

const artistFansignSlice = createSlice({
  name: 'artistFansign',
  initialState: {
    data: null,
    detail: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    getFansignInfo(state, action) {
      state.data = action.payload;
      console.log('데이터:', state.data);
    },
    fansignDetail(state, action) {
      state.detail = action.payload;
      console.log('데이터 : ', state.detail);
    },
  },
});

export default artistFansignSlice.reducer;
export const { getFansignInfo, fansignDetail } = artistFansignSlice.actions;
