// redux/slices/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const applyListSlice = createSlice({
  name: 'applyList',
  initialState: {
    dataList: [
      {
        status: 'OK',
        message: '팬싸인회',
        object: [
          {
            artistfansignId: 1,
            title: 'fact check fansign',
            posterImageUrl: 'https://pbs.twimg.com/media/FZuGhtZaMAEMLdh.jpg',
            isApplyed: true,
            status: null,
          },
          {
            artistfansignId: 2,
            title: 'NCT 영웅팬싸인회',
            posterImageUrl:
              'https://i1.sndcdn.com/artworks-HHzS3NMQpYq35RNY-io4p8w-t500x500.jpg',
            isApplyed: false,
            status: 'READY_APPLYING',
          },
        ],
      },
    ],
  },
  reducers: {
    setDataList: (state, action) => {
      state.dataList = action.payload;
    },
  },
});

export default applyListSlice.reducer;
export const { setDataList } = applyListSlice.actions;
