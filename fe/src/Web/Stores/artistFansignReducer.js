import { createSlice } from '@reduxjs/toolkit';

const artistFansignSlice = createSlice({
  name: 'artistFansign',
  initialState: {
    data: { object: [] },
    connectedData: null,
    detail: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    getFansignInfo(state, action) {
      state.data = action.payload;
    },
    getConnectedInfo(state, action) {
      state.connectedData = action.payload;
    },
    fansignDetail(state, action) {
      state.detail = action.payload;
    },
  },
});

export default artistFansignSlice.reducer;
export const { getFansignInfo, getConnectedInfo, fansignDetail } =
  artistFansignSlice.actions;
