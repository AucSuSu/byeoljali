import { createSlice } from '@reduxjs/toolkit';

const fanPhotoSlice = createSlice({
  name: 'fanInfo',
  initialState: {
    data: '',
  },
  reducers: {
    getUserPhoto(state, action) {
      state.data = action.payload;
    },
  },
});
export const { getUserPhoto } = fanPhotoSlice.actions;
export default fanPhotoSlice.reducer;
