import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getArtistInfo = createAsyncThunk(
  'axios/getArtistInfo',
  async (artistId) => {
    const response = await axios.get(
      `http://localhost:5000/artists/${artistId}/`,
    );
    return response.data;
  },
);

export const modifyArtistInfo = createAsyncThunk(
  'axios/modifyArtistInfo',
  async (data) => {
    const response = await axios.get(
      'http://localhost:5000/artists/apply/1?status=READY_APPLYING',
    );
    return response.data;
  },
);

const artistInfoSlice = createSlice({
  name: 'artistInfo',
  initialState: {
    data: {
      object: {
        artistImageUrl: 'hi',
        name: 'bye',
        companyName: 'zz',
        memberList: [],
      },
    },
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtistInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getArtistInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log('데이터:', state.data);
      })
      .addCase(getArtistInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(modifyArtistInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(modifyArtistInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(modifyArtistInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default artistInfoSlice.reducer;
