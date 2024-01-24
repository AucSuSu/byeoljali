import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    addMember: false,
    modifyMember: { open: false, key: null },
    modifyArtist: false,
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
  },
});

export const { handleAddMember, handleModifyMember, handleModifyArtist } =
  modalSlice.actions;
export default modalSlice.reducer;
