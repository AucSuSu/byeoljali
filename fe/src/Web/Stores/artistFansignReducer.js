import { createSlice } from '@reduxjs/toolkit';

const artistFansignSlice = createSlice({
  name: 'artistFansign',
  initialState: {
    data: null,
    connectedData: null,
    detail: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    getFansignInfo(state, action) {
      state.data = action.payload;
      console.log('Fansign 데이터: ', state.data);
    },
    getConnectedInfo(state, action) {
      state.connectedData = action.payload;
      console.log('connected 데이터 : ', state.data);
    },
    fansignDetail(state, action) {
      state.detail = action.payload;
      console.log('데이터 : ', state.detail);
    },
  },
});

export default artistFansignSlice.reducer;
export const { getFansignInfo, getConnectedInfo, fansignDetail } =
  artistFansignSlice.actions;
