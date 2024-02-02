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
      console.log('아티스트 데이터 : ', state.artistData);
    },
    addMember(state, action){
      state.memberData = action.payload
      console.log('성공')
    },
    modifyMebmer(state, action){
      state.memberData = action.payload
      console.log('성공')
    }
  }
});

export default artistInfoSlice.reducer;
export const { getInfo, addMember, modifyMebmer } = artistInfoSlice.actions;
