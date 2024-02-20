// Stores/homeDetailListReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//팬 사인회 응모를 위한 디테일한 정보
export const detailList = createAsyncThunk(
  'axios/detailList',
  async (data, { getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + 'mainpage/makeApplyForm/' + data,
        {
          headers: {
            authorization: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('팬 사인회 정보 로드 실패: ', error);
    }
  },
);

const homeDetailListSlice = createSlice({
  name: 'detailList',
  initialState: {
    data: [],
    albumNum: 0,
    fansignId: null,
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
      state.albumNum = num.payload;
    },
    setMemberId: (state, id) => {
      state.memberId = id.payload;
    },
    setFansignId: (state, id) => {
      state.fansignId = id.payload;
    },
  },
  /// extraReducers(반고정) /  builder(유동) / addCase, pending, fulfiled, rejected 고정
  extraReducers: (builder) => {
    builder
      .addCase(detailList.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 성공
        state.data = action.payload;
        state.token = action.payload.key;
      })
      .addCase(detailList.rejected, (state, action) => {
        state.status = 'failed'; // 실패 => 에러 메세지 전달(UX)
        state.error = action.error.message;
      });
  },
});

// 새로운 리듀서 액션 생성자를 내보냅니다.
export const { clearData, setAlbumNum, setMemberId, setFansignId } =
  homeDetailListSlice.actions;
export default homeDetailListSlice.reducer;
