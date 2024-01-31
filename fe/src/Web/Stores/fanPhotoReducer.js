import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getUserPhoto = createAsyncThunk(
  'axios/getUserPhoto',
  async (arg, { getState }) => {
    try {
      const token = getState().auth.token;
      console.log(token);
      const response = await axios.get(`${BASE_URL}myalbum/`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data.object;
    } catch (error) {
      console.error('내 유저 정보 로드 실패: ', error);
    }
  },
);

const fanPhotoSlice = createSlice({
  name: 'fanInfo',
  initialState: {
    data: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPhoto.pending, (state) => {
        // 요청이 진행 중일 때의 상태 업데이트
      })
      .addCase(getUserPhoto.fulfilled, (state, action) => {
        // 요청이 성공적으로 완료되었을 때의 상태 업데이트
        state.data = action.payload;
        console.log('getUserPhoto 성공:', action.payload);
      })
      .addCase(getUserPhoto.rejected, (state) => {
        // 요청이 실패했을 때의 상태 업데이트
      });
  },
});

export default fanPhotoSlice.reducer;
