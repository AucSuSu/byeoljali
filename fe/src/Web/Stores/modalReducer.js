import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    addMember: false,
    modifyMember: { open: false, key: null },
    modifyArtist: false,
    fansignInfo: { open: false, key: null },
    addFansign: false,
  },
  reducers: {
    handleAddMember: (state) => {
      state.addMember = !state.addMember;
    },
    handleModifyMember: (state, action) => {
      state.modifyMember.open = !state.modifyMember.open;
      state.modifyMember.key = action.payload;
    },
    handleModifyArtist: (state) => {
      state.modifyArtist = !state.modifyArtist;
    },
    handleFansignInfo: (state, action) => {
      state.fansignInfo.open = !state.fansignInfo.open;
      state.fansignInfo.key = action.payload;
    },
    handleAddFansign: (state) => {
      state.addFansign = !state.addFansign;
    },
  },
});

export const {
  handleAddMember,
  handleModifyMember,
  handleModifyArtist,
  handleFansignInfo,
  handleAddFansign,
} = modalSlice.actions;
export default modalSlice.reducer;
