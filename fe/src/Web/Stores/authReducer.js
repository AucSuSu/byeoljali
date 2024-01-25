import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('axios/loginUser', async (data) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/accounts/login/',
      data,
    );

    return response.data;
  } catch (error) {
    throw error; // 실패 시 에러를 던져서 rejected 상태로 전달
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    data: [],
    status: 'idle', // 'idle === 동작 전
    error: null,
  },
  reducers: {},
  /// extraReducers(반고정) /  builder(유동) / addCase, pending, fulfiled, rejected 고정
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'; // 로딩 중 => 로딩 스피너 등 표시(UX)
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 성공
        state.data = action.payload;
        state.token = action.payload.key;
        console.log('데이터', state.data, '토큰', state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'; // 실패 => 에러 메세지 전달(UX)
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const selectToken = (state) => state.auth.token;
