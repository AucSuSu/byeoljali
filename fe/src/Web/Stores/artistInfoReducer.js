import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const addMember = createAsyncThunk(
  'axios/addMember',
  async (formData, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.post(`${BASE_URL}artists/members`, formData, {
      headers: {
        authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
);

export const modifyMember = createAsyncThunk(
  'axios/modifyArtistInfo',
  async (payload, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.put(
      `${BASE_URL}artists/members/${payload.memberId}`,
      payload.formData,
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

const artistInfoSlice = createSlice({
  name: 'artistInfo',
  initialState: {
    artistData: null,
    memberData: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    getInfo(status, action) {
      status.artistData = action.payload;
      console.log('아티스트 데이터 : ', status.artistData);
    },
  },
  extraReducers: (builder) => {
    builder
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
        console.log('성공했어요', action.payload);
        state.memberData = action.payload;
      })
      .addCase(modifyMember.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('실패했어요 ㅠㅠ', state.error);
      });
  },
});

export default artistInfoSlice.reducer;
export const { getInfo } = artistInfoSlice.actions;
