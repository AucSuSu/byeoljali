import { createSlice } from '@reduxjs/toolkit';

const artistInfoSlice = createSlice({
  name: 'artistInfo',
  initialState: {
    artistData: null,
    memberData: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    getInfo(state, action) {
      state.artistData = action.payload;
    },
    addMember(state, action) {
      state.memberData = action.payload;
    },
    modifyMebmer(state, action) {
      state.memberData = action.payload;
    },
  },
});

export default artistInfoSlice.reducer;
export const { getInfo, addMember, modifyMebmer } = artistInfoSlice.actions;
