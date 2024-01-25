// redux/slices/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const applyListSlice = createSlice({
  name: 'applyList',
  initialState: {
    dataList: [],
  },
  reducers: {
    setDataList: (state, action) => {
      state.dataList = action.payload;
    },
  },
});

export default applyListSlice.reducer;
export const { setDataList } = applyListSlice.actions;
