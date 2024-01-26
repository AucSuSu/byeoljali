import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('axios/loginUser', async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/login', data);

    return response.headers;
  } catch (error) {
    throw error; // 실패 시 에러를 던져서 rejected 상태로 전달
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    tokenRefresh: null,
    data: [],
    status: 'idle', // 'idle === 동작 전
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.tokenRefresh = action.payload.tokenRefresh;
    },
  },
  /// extraReducers(반고정) /  builder(유동) / addCase, pending, fulfiled, rejected 고정
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'; // 로딩 중 => 로딩 스피너 등 표시(UX)
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 성공
        state.token = action.payload.authorization;
        state.tokenRefresh = action.payload['authorization-refresh'];
        console.log(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'; // 실패 => 에러 메세지 전달(UX)
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const selectToken = (state) => state.auth.token;
export const { setToken } = authSlice.actions;
