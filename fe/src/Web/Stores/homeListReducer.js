// redux/slices/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const recentList = createAsyncThunk('axios/recentList', async (data) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/mainpage/recent',
      data,
    );

    return response.data;
  } catch (error) {
    console.error('최근 팬 사인회 정보 로드 실패: ', error);
  }
});

export const applyList = createAsyncThunk('axios/applyList', async (data) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/mainpage/1?searchKeyword=&order=register&status=READY_APPLYING',
      data,
    );

    return response.data;
  } catch (error) {
    console.error('팬 사인회 정보 로드 실패: ', error);
  }
});

//팬 사인회 응모를 위한 디테일한 정보
export const detailList = createAsyncThunk('axios/detailList', async (data) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/mainpage/makeApplyForm/',
      data,
    );

    return response.data;
  } catch (error) {
    console.error('팬 사인회 정보 로드 실패: ', error);
  }
});

const homeListSlice = createSlice({
  name: 'homeList',
  initialState: {
    status: 'idle', // 'idle === 동작 전
    token: null,
    error: null,
  },
  reducers: {},
  /// extraReducers(반고정) /  builder(유동) / addCase, pending, fulfiled, rejected 고정
  extraReducers: (builder) => {
    builder
      .addCase(applyList.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 성공
        console.log('팬 사인회 정보 로드 성공');
        state.data = action.payload;
        state.token = action.payload.key;
        console.log('데이터', state.data, '토큰', state.token);
      })
      .addCase(applyList.rejected, (state, action) => {
        state.status = 'failed'; // 실패 => 에러 메세지 전달(UX)
        state.error = action.error.message;
      })
      .addCase(recentList.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 성공
        console.log('최근 등록 팬 사인회 정보 로드 성공');
        state.data = action.payload;
        state.token = action.payload.key;
        console.log('데이터', state.data, '토큰', state.token);
      })
      .addCase(recentList.rejected, (state, action) => {
        state.status = 'failed'; // 실패 => 에러 메세지 전달(UX)
        state.error = action.error.message;
      });
  },
});

export default homeListSlice.reducer;
