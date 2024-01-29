// Stores/homeDetailListReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//팬 사인회 응모를 위한 디테일한 정보
export const detailList = createAsyncThunk('axios/detailList', async (data) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/mainpage/makeApplyForm/' + data,
    );

    return response.data;
  } catch (error) {
    console.error('팬 사인회 정보 로드 실패: ', error);
  }
});

export const applyForm = createAsyncThunk(
  'axios/applyForm',
  async (id, data) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/mainpage/mainpage/' + id,
        data,
      );

      return response.data;
    } catch (error) {
      console.error('팬 사인회 응모 실패: ', error);
    }
  },
);

const homeDetailListSlice = createSlice({
  name: 'detailList',
  initialState: {
    data: [],
    albumNum: 0,
    memberId: null,
    status: 'idle', // 'idle === 동작 전
    token: null,
    error: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = []; // data를 빈 배열로 초기화
    },
    setAlbumNum: (state, num) => {
      state.albumNum = num;
    },
    setMemberId: (state, id) => {
      state.memberId = id;
    },
  },
  /// extraReducers(반고정) /  builder(유동) / addCase, pending, fulfiled, rejected 고정
  extraReducers: (builder) => {
    builder
      .addCase(detailList.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 성공
        console.log('팬 사인회 디테일 정보 로드 성공');
        state.data = action.payload;
        state.token = action.payload.key;
        console.log('데이터', state.data, '토큰', state.token);
      })
      .addCase(detailList.rejected, (state, action) => {
        state.status = 'failed'; // 실패 => 에러 메세지 전달(UX)
        state.error = action.error.message;
      });
  },
});

// 새로운 리듀서 액션 생성자를 내보냅니다.
export const { clearData, setAlbumNum, setMemberId, setFormData } =
  homeDetailListSlice.actions;
export default homeDetailListSlice.reducer;
