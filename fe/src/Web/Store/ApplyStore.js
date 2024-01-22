// store.js
import { createStore } from 'redux';

const UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM';

export const updateListItem = (newData) => ({
  type: UPDATE_LIST_ITEM,
  payload: newData,
});

const dataList = [
  {
    imageUrl: 'https://pbs.twimg.com/media/FZuGhtZaMAEMLdh.jpg',
    altText: 'Image 1',
    text: '치이카와',
  },
  {
    imageUrl:
      'https://i1.sndcdn.com/artworks-HHzS3NMQpYq35RNY-io4p8w-t500x500.jpg',
    altText: 'Image 2',
    text: '하치와레',
  },
  {
    imageUrl:
      'https://media.bunjang.co.kr/product/229825363_1_1689440675_w360.jpg',
    altText: 'Image 3',
    text: '우사기',
  },
];

const initialState = {
  listItemData: dataList,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST_ITEM:
      return {
        ...state,
        listItemData: action.payload,
      };
    default:
      return state;
  }
};

const ApplyStore = createStore(rootReducer);

export default ApplyStore;
