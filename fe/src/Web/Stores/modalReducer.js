import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    addMember: false,
    modifyMember: false,
    modifyArtist: false,
  },
  reducers: {
    handleAddMember: (state) => {
      state.addMember = !state.addMember;
    },
    handleModifyMember: (state) => {
      state.modifyMember = !state.modifyMember;
    },
    handleModifyArtist: (state) => {
      state.modifyArtist = !state.modifyArtist;
    },
  },
});

export const { handleAddMember, handleModifyMember, handleModifyArtist } =
  modalSlice.actions;
export default modalSlice.reducer;
