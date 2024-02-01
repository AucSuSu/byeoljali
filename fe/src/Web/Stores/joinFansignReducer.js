import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const joinFansign = createAsyncThunk(
  'axios/joinFansign',
  async (memberFansignId, { getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `${BASE_URL}fan/fansigns/enterFansign/${memberFansignId}`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw error; // 실패 시 에러를 던져서 rejected 상태로 전달
    }
  },
);

// 테스트용
export const joinFansignTest = createAsyncThunk(
  'axios/joinFansignTest',
  async (memberFansignId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/fan/fansigns/enterFansign/${memberFansignId}`,
      );
      return response.data;
    } catch (error) {
      throw error; // 실패 시 에러를 던져서 rejected 상태로 전달
    }
  },
);

export const joinStation = createAsyncThunk(
  'axios/joinStation',
  async (memberFansignId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/fan/fansigns/enterwaiting/1`,
      );
      return response.data;
    } catch (error) {
      throw error; // 실패 시 에러를 던져서 rejected 상태로 전달
    }
  },
);

const joinSlice = createSlice({
  name: 'join',
  initialState: {
    fansignData: {},
    testData: {},
    stationData: {},
    status: 'idle', // 'idle === 동작 전
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.tokenRefresh = action.payload.tokenRefresh;
    },
    getFansign(state, action) {
      state.stationData = action.payload;
    },
  },
  /// extraReducers(반고정) /  builder(유동) / addCase, pending, fulfiled, rejected 고정
  extraReducers: (builder) => {
    builder
      .addCase(joinFansign.pending, (state) => {
        state.status = 'loading'; // 로딩 중 => 로딩 스피너 등 표시(UX)
      })
      .addCase(joinFansign.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 성공
        state.fansignData = action.payload;
        console.log('성공 : ', action.payload);
      })
      .addCase(joinFansign.rejected, (state, action) => {
        state.status = 'failed'; // 실패 => 에러 메세지 전달(UX)
        state.error = action.error.message;
        console.log('실패 : ', state.error);
      })

      //
      .addCase(joinFansignTest.pending, (state) => {
        state.status = 'loading'; // 로딩 중 => 로딩 스피너 등 표시(UX)
      })
      .addCase(joinFansignTest.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 성공
        state.fansignData = action.payload.object;
        console.log('성공 : ', action.payload.object);
      })
      .addCase(joinFansignTest.rejected, (state, action) => {
        state.status = 'failed'; // 실패 => 에러 메세지 전달(UX)
        state.error = action.error.message;
        console.log('실패 : ', state.error);
      });
  },
});

export default joinSlice.reducer;
export const { getFansign } = joinSlice.actions;
