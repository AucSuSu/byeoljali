import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadApply = createAsyncThunk('axios/loadApply');

export const loadWin = createAsyncThunk();

const fanApplyListSlice = createSlice({
  name: 'fanApplyList',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase;
  },
});
