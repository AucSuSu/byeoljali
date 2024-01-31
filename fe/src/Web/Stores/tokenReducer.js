import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3MiLCJleHAiOjE3MDY3NjQ0OTgsImZhbklkIjoxfQ.FXsJvpQdLHdRSX0W_PzoWw9181IxstAblAh8tbSG86g',
  },
});

export default tokenSlice.reducer;
