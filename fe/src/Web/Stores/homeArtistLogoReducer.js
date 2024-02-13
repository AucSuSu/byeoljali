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
        console.log("로고 데이터 in reducer : " , state.artistLogo)
      },
    },
  });
  
export default artistLogoSlice.reducer;
export const { getArtistLogo } = artistLogoSlice.actions;