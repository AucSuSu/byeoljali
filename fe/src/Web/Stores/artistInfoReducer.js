import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getArtistInfo = createAsyncThunk(
  'axios/getArtistInfo',
  async (artistId) => {
    const response = await axios.get(
      `http://localhost:8080/artists/${artistId}/`,
    );
    return response.data;
  },
);

export const getFanSignInfo = createAsyncThunk(
  'axios/getFanSignInfo',
  async (payload) => {
    const response = await axios.get(
      `http://localhost:8080/artists/apply/1?status=${payload}`,
    );
    return response.data;
  },
);

export const modifyArtistInfo = createAsyncThunk(
  'axios/modifyArtistInfo',
  async () => {
    const response = await axios.get(
      'http://localhost:8080/artists/apply/1?status=READY_APPLYING',
    );
    return response.data;
  },
);

const artistInfoSlice = createSlice({
  name: 'artistInfo',
  initialState: {
    data1: {
      status: 'OK',
      message: '아티스트 조회 팬싸인회',
      object: [
        {
          artistFansignId: 7,
          memberFansignId: 10,
          title: '엔믹스 2024',
          memberName: '지우',
          posterImageUrl: 'posterImage',
          status: 'READY_APPLYING',
          startApplyTime: '2024-03-01T12:00:00',
          endApplyTime: '2024-03-02T12:00:00',
          startFansignTime: '2024-03-10T12:00:00',
        },
        {
          artistFansignId: 7,
          memberFansignId: 11,
          title: '엔믹스 2024',
          memberName: '규진',
          posterImageUrl: 'posterImage',
          status: 'READY_APPLYING',
          startApplyTime: '2024-03-01T12:00:00',
          endApplyTime: '2024-03-02T12:00:00',
          startFansignTime: '2024-03-10T12:00:00',
        },
        {
          artistFansignId: 6,
          memberFansignId: 8,
          title: '엔믹스 팬싸인회',
          memberName: '지우',
          posterImageUrl: 'posterImage',
          status: 'READY_APPLYING',
          startApplyTime: '2025-01-01T12:00:00',
          endApplyTime: '2025-01-02T12:00:00',
          startFansignTime: '2025-01-10T12:00:00',
        },
        {
          artistFansignId: 6,
          memberFansignId: 9,
          title: '엔믹스 팬싸인회',
          memberName: '규진',
          posterImageUrl: 'posterImage',
          status: 'READY_APPLYING',
          startApplyTime: '2025-01-01T12:00:00',
          endApplyTime: '2025-01-02T12:00:00',
          startFansignTime: '2025-01-10T12:00:00',
        },
      ],
    },
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
      // getArtistInfo
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
      // getFanSignInfo
      .addCase(getFanSignInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFanSignInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data1 = action.payload;
        console.log('데이터:', state.data1);
      })
      .addCase(getFanSignInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // modifyArtistInfo
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
