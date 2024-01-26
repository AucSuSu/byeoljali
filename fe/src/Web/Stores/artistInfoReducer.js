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

export const addMember = createAsyncThunk(
  'axios/addMember',
  async (payload) => {
    const response = await axios.post(
      `http://localhost:8080/artists/members`,
      payload,
    );
    return response.data;
  },
);

export const modifyMember = createAsyncThunk(
  'axios/modifyArtistInfo',
  async (payload) => {
    const response = await axios.get(
      'http://localhost:8080/artists/apply/1?status=READY_APPLYING',
    );
    return response.data;
  },
);

const artistInfoSlice = createSlice({
  name: 'artistInfo',
  initialState: {
    data1: [],
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
      // addMember
      .addCase(addMember.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; // 데이터 어떻게 갱신? state.data.object.memberlist.push(action.payload.object)
        console.log('데이터:', state.data1);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // modifyMember
      .addCase(modifyMember.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(modifyMember.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(modifyMember.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default artistInfoSlice.reducer;
