// redux/slices/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const recentList = createAsyncThunk('axios/recentList', async (data) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + 'mainpage/recent',
      data,
    );

    return response.data;
  } catch (error) {
    console.error('최근 팬 사인회 정보 로드 실패: ', error);
  }
});

const homeRecentListSlice = createSlice({
  name: 'recentList',
  initialState: {
    data: [],
    status: 'idle', // 'idle === 동작 전
    token: null,
    error: null,
  },
  reducers: {},
  /// extraReducers(반고정) /  builder(유동) / addCase, pending, fulfiled, rejected 고정
  extraReducers: (builder) => {
    builder
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

export default homeRecentListSlice.reducer;
