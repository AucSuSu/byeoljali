import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modifyMember: { open: false, key: null },
    fansignInfo: { open: false, key: null },
    addFansign: false,
  },
  reducers: {
    handleModifyMember: (state, action) => {
      state.modifyMember.open = !state.modifyMember.open;
      state.modifyMember.key = action.payload;
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

export const { handleModifyMember, handleFansignInfo, handleAddFansign } =
  modalSlice.actions;
export default modalSlice.reducer;
