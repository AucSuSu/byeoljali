import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    kakaoAuthorization: null,
    isArtist: null,
    artistId: null,
    status: 'idle', // 'idle === 동작 전
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.tokenRefresh = action.payload.tokenRefresh;
      state.kakaoAuthorization = action.payload.kakaoAuthorization;
      state.isArtist = action.payload.isArtist;
      state.artistId = action.payload.artistId;
    },
    logout(state) {
      state.token = null;
      state.tokenRefresh = null;
      state.isArtist = null;
      state.kakaoAuthorization = null;
      state.artistId = null;
      console.log('로그아웃 했어용');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('success');
        state.token = action.payload.authorization;
        state.tokenRefresh = action.payload['authorization-refresh'];
        state.isArtist = action.payload.isartist;
        state.artistId = action.payload.artistId;
        console.log('로그인 데이터 : ', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('failed');
        Swal.fire({
          icon: 'warning',
          title: '로그인 정보가 틀렸습니다.',
          background: '#222222',
          confirmButtonColor: 'red',
        });
      });
  },
});

export default authSlice.reducer;
export const { setToken, logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const isArtist = (state) => state.auth.isArtist;
export const kakaoAuthorization = (state) => state.auth.kakaoAuthorization;
