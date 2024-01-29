import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFanSignInfo = createAsyncThunk(
  'axios/getFanSignInfo',
  async (payload) => {
    const response = await axios.get(
      `http://localhost:8080/artists/apply/${payload.artistId}?status=${payload.status}`,
    );
    return response.data;
  },
);

export const createFansign = createAsyncThunk(
  'axios/createFansign',
  async (formData, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.post(
      'http://localhost:8080/artists/fansign/1', // {artistId}
      formData,
      {
        headers: {
          authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },
);

export const getFansignDetail = createAsyncThunk(
  'axios/getFansignDetail',
  async (memberfansignId) => {
    const response = await axios.get(
      `http://localhost:8080/memberfansign/${memberfansignId}}`,
    );
    return response.data;
  },
);

const artistFansignSlice = createSlice({
  name: 'artistFansign',
  initialState: {
    data: [],
    detail: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getFanSignInfo
      .addCase(getFanSignInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFanSignInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log('데이터:', state.data);
      })
      .addCase(getFanSignInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // createFansign
      .addCase(createFansign.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createFansign.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log('데이터:', state.data);
      })
      .addCase(createFansign.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // getFansignDetail
      .addCase(getFansignDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFansignDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log('데이터:', state.data);
      })
      .addCase(getFansignDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default artistFansignSlice.reducer;
