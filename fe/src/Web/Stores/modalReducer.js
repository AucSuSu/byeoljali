import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modifyMember: { open: false, key: null },
    fansignInfo: null,
    addFansign: false,
  },
  reducers: {
    handleModifyMember: (state, action) => {
      state.modifyMember.open = !state.modifyMember.open;
      state.modifyMember.key = action.payload;
    },
    handleFansignInfo: (state, action) => {
      state.fansignInfo = action.payload;
    },
    handleAddFansign: (state) => {
      state.addFansign = !state.addFansign;
    },
  },
});

export const { handleModifyMember, handleFansignInfo, handleAddFansign } =
  modalSlice.actions;
export default modalSlice.reducer;
