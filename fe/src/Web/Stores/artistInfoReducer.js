import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getArtistInfo = createAsyncThunk(
  'axios/getArtistInfo',
  async () => {
    const response = await axios.get(
      'http://localhost:5000/artists/apply/1?status=READY_APPLYING',
      // {
      //   headers: {
      //     'Content-Type': `application/json;charset=UTF-8`,
      //     Accept: 'application/json',
      //     'Access-Control-Allow-Origin': `http://localhost:3000`,
      //     'Access-Control-Allow-Credentials': 'true',
      //   },
      // },
    );
    return response.data;
  },
);

export const modifyArtistInfo = createAsyncThunk(
  'axios/modifyArtistInfo',
  async () => {
    const response = await axios.get('url');
    return response.data;
  },
);

const artistInfoSlice = createSlice({
  name: 'artistInfo',
  initialState: {
    data: [],
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
