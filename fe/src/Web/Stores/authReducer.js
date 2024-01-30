import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginUser = createAsyncThunk('axios/loginUser', async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}login`, data);

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
    isArtist: null,
    status: 'idle', // 'idle === 동작 전
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.tokenRefresh = action.payload.tokenRefresh;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.authorization;
        state.tokenRefresh = action.payload['authorization-refresh'];
        state.isArtist = action.payload.isartist;
        console.log('로그인 데이터 : ', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const selectToken = (state) => state.auth.token;
export const { setToken } = authSlice.actions;
