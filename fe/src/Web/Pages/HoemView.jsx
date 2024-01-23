// Home.jsx
import React from 'react';
import List from '../Util/List';

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

const Home = () => {
  return (
    <div>
      <h1>동글이 리스트</h1>
      <List dataList={dataList} />
    </div>
  );
};

export default Home;
