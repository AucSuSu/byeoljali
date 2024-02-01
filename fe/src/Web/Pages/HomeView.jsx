// HomeView.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Reducer 추가
import {
  beforeApplyList,
  afterApplyList,
} from '../Stores/homeApplyListReducer';
import { recentList } from '../Stores/homeRecentReducer';

import List from '../Home/HomeApplyList';
import Carousel from '../Home/Carousel';

//Navbar
import Navbar from '../Utils/NavBar';

const HomeView = () => {
  //redux 적용
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(afterApplyList());
    dispatch(recentList());
  }, [dispatch]);

  return (
    <div>
      <Navbar isFan={true}></Navbar>
      {/* 캐러셀 */}
      <Carousel />
      <button onClick={() => dispatch(beforeApplyList())}>응모전</button>
      <br />
      <button onClick={() => dispatch(afterApplyList())}>응모중</button>
      <h1>응모 리스트</h1>
      <List />
    </div>
  );
};

export default HomeView;
