import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const loadApply = createAsyncThunk('axios/loadApply', async (arg, {getState}) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get(`${BASE_URL}applyPage/0`, {
      headers: {
        Authorization : token,
      }
    });

    return response.data.object;
  } catch (error) {
    console.error('내가 응모한 팬사인회 로드 실패: ', error);
  }
});

export const loadWin = createAsyncThunk('axios/loadWin', async (arg, {getState}) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get(`${BASE_URL}applyPage/1`, {
      headers : {
        Authorization : token,
      }
    });
    return response.data.object;
  } catch (error) {
    console.error('내가 당첨된 팬사인회 로드 실패: ', error);
  }
});

const fanApplyListSlice = createSlice({
  name: 'fanApplyList',
  initialState: {
    data: [{}],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadApply.pending, (state) => {
        // 요청이 진행 중일 때의 상태 업데이트
      })
      .addCase(loadApply.fulfilled, (state, action) => {
        // 요청이 성공적으로 완료되었을 때의 상태 업데이트
        state.data = action.payload;
      })
      .addCase(loadApply.rejected, (state) => {
        // 요청이 실패했을 때의 상태 업데이트
      })
      .addCase(loadWin.pending, (state) => {
        // 요청이 진행 중일 때의 상태 업데이트
      })
      .addCase(loadWin.fulfilled, (state, action) => {
        // 요청이 성공적으로 완료되었을 때의 상태 업데이트
        state.data = action.payload;
      })
      .addCase(loadWin.rejected, (state) => {
        // 요청이 진행 중일 때의 상태 업데이트
      });
  },
});

export default fanApplyListSlice.reducer;
