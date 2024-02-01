import { createSlice} from '@reduxjs/toolkit';

const joinSlice = createSlice({
  name: 'join',
  initialState: {
    fansignData: {},
    testData: {},
    stationData: {},
    status: 'idle', // 'idle === 동작 전
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.tokenRefresh = action.payload.tokenRefresh;
    },
    getFansign(state, action) {
      state.stationData = action.payload;
    },
  }
});

export default joinSlice.reducer;
export const { getFansign } = joinSlice.actions;
