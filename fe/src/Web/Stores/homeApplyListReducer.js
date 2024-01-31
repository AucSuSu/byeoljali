// redux/slices/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const applyList = createAsyncThunk(
  'axios/applyList',
  async (arg, { getState }) => {
    try {
      // const token = getState().auth.token;
      const token = getState().token.token;

      const response = await axios.get(
        `${BASE_URL}mainpage?searchKeyword=&order=register&status=READY_APPLYING`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error('팬 사인회 정보 로드 실패: ', error);
    }
  },
);

const homeApplyListSlice = createSlice({
  name: 'applyList',
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
      });
  },
});

export default homeApplyListSlice.reducer;
