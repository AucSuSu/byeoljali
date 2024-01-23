// redux/reducers.js
const initialState = {
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
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_LIST':
      return {
        ...state,
        dataList: action.payload,
      };
    default:
      return state;
  }
};
