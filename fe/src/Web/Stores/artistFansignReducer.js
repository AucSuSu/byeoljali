import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getFansignInfo = createAsyncThunk(
  'axios/getFansignInfo',
  async (status, { getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `${BASE_URL}artists/apply?status=${status}`,
        { headers: { authorization: token } },
      );
      return response.data;
    } catch (error) {
      console.error('실패 : ', error);
    }
  },
);

export const createFansign = createAsyncThunk(
  'axios/createFansign',
  async (formData, { getState }) => {
    try {
      console.log('데이터 전송');
      const token = getState().auth.token;
      const response = await axios.post(
        `${BASE_URL}artists/fansign`,
        formData,
        {
          headers: {
            authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('실패 : ', error);
    }
  },
);

export const getFansignDetail = createAsyncThunk(
  'axios/getFansignDetail',
  async (memberfansignId, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(
      console.log(
        'ID : ',
        memberfansignId,
      )`${BASE_URL}memberfansign/${memberfansignId}}`,
      {
        headers: {
          authorization: token,
        },
      },
    );
    return response.data;
  },
);

const artistFansignSlice = createSlice({
  name: 'artistFansign',
  initialState: {
    data: null,
    detail: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getFanSignInfo
      .addCase(getFansignInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFansignInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log('데이터:', state.data);
      })

      // createFansign
      .addCase(createFansign.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createFansign.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })

      // getFansignDetail
      .addCase(getFansignDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFansignDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.detail = action.payload;
        console.log('Detail 데이터:', state.detail);
      });
  },
});

export default artistFansignSlice.reducer;
