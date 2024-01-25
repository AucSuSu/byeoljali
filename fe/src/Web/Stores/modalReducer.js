import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    addMember: false,
    modifyMember: { open: false, key: null },
    modifyArtist: false,
    fansignInfo: { open: false, key: null },
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
  },
});

export const {
  handleAddMember,
  handleModifyMember,
  handleModifyArtist,
  handleFansignInfo,
} = modalSlice.actions;
export default modalSlice.reducer;
