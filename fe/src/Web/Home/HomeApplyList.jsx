// HomeApplyList.jsx
// 홈 화면 현재 응모 리스트 출력
import React from 'react';
import ListItem from './HomeApplyListItem';
import { useSelector } from 'react-redux';

const List = (type) => {
  // useSelector를 사용하여 applyList 상태 전체를 가져옴
  const applyList = useSelector((state) => state.homeapply.data);
  console.log(applyList);
  // applyList.data 배열을 사용하여 리스트 아이템 렌더링
  return (
    <div>
      <div>
        {Array.isArray(applyList?.object) &&
          applyList.object.map((item, index) => (
            <ListItem key={index} data={item} type={type} />
          ))}
      </div>
    </div>
  );
};

export default List;
