// redux/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0, // 카운터의 초기 상태
  },
  reducers: {
    increment: (state) => {
      // 카운터 값을 1 증가
      state.value += 1;
    },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
