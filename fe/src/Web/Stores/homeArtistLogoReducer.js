// redux/slices/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const artistLogoSlice = createSlice({
  name: 'artistLogo',
  initialState: {
    artistLogo: [],
  },
  reducers: {
    getArtistLogo(state, action) {
      state.artistLogo = action.payload;
    },
  },
});

export default artistLogoSlice.reducer;
export const { getArtistLogo } = artistLogoSlice.actions;
