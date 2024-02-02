import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const getUserData = createAsyncThunk(
//   'axios/getUserData',
//   async (arg, { getState }) => {
//     try {
//       // const token = getState().auth.token;
//       const token = getState().token.token;

//       console.log(token);
//       const response = await axios.get(`${BASE_URL}mypage/`, {
//         headers: {
//           Authorization: token,
//         },
//       });
//       return response.data.object;
//     } catch (error) {
//       console.error('내 유저 정보 로드 실패: ', error);
//     }
//   },
// );

// export const editUserData = createAsyncThunk(
//   'axios/editUserData',
//   async (data, { getState, rejectWithValue }) => {
//     try {
//       // const token = getState().auth.token;
//       const token = getState().token.token;

//       const response = await axios.put(
//         `${BASE_URL}mypage/edit/profile`,
//         data.formData,
//         {
//           headers: {
//             Authorization: token,

//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       );
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

const fanInfoSlice = createSlice({
  name: 'fanInfo',
  initialState: {
    data: '',
  },
  reducers: {
    getUserInfo(state, action) {
      state.data = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getUserData.pending, (state) => {
  //       // 요청이 진행 중일 때의 상태 업데이트
  //     })
  //     .addCase(getUserData.fulfilled, (state, action) => {
  //       // 요청이 성공적으로 완료되었을 때의 상태 업데이트
  //       state.data = action.payload;
  //     })
  //     .addCase(getUserData.rejected, (state) => {
  //       // 요청이 실패했을 때의 상태 업데이트
  //     })
  //     .addCase(editUserData.fulfilled, (state, action) => {
  //       // 데이터 업데이트 성공시 상태 업데이트
  //       state.data = { ...state.data, ...action.payload };
  //     })
  //     .addCase(editUserData.rejected, (state, action) => {
  //       // 데이터 업데이트 실패시 에러 상태 업데이트
  //       state.error = action.payload;
  //     });
  // },
});

export const { getUserInfo } = fanInfoSlice.actions;
export default fanInfoSlice.reducer;
