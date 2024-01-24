import { createSlice } from '@reduxjs/toolkit';

const kakaopayReducer = createSlice({
  name: 'kakaopay',
  initialState: {
    tid: 0, // pay로 얻은 tid값
  },
  reducers: {
    setTid: (state, action) => {
      state.tid = action.payload;
    },
  },
});

export const { setTid } = kakaopayReducer.actions;
export default kakaopayReducer.reducer;
