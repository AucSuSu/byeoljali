import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3MiLCJleHAiOjE3MDc5NzY1MDQsImZhbklkIjoxfQ.gkVl2-Bnf5fz_siDoYLjsLful2BeiQSQLrXx0dbW9q0',
  },
});

export default tokenSlice.reducer;
