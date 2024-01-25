// HomeApplyList.jsx
// 홈 화면 현재 응모 리스트 출력

import React from 'react';
import ListItem from './HomeApplyListItem';

import { useSelector } from 'react-redux';

const List = (type) => {
  const dataList = useSelector((state) => state.applyList.dataList);
  console.log('응모 목록');
  console.log(dataList);

  return (
    <div>
      {dataList.map((item, index) => (
        <ListItem key={index} data={item} />
      ))}
    </div>
  );
};

export default List;
