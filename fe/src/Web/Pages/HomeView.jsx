// HomeView.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Reducer 추가
import { applyList } from '../Stores/homeApplyListReducer';
import { recentList } from '../Stores/homeRecentReducer';

import List from '../Home/HomeApplyList';
import Carousel from '../Home/Carousel';

//Navbar
import Navbar from '../Utils/NavBar';

const HomeView = () => {
  //redux 적용
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(applyList());
    dispatch(recentList());
  }, [dispatch]);

  return (
    <div>
      <Navbar isFan={true}></Navbar>
      <h1>홈</h1>
      {/* 캐러셀 */}
      <Carousel />
      <h1>응모 리스트</h1>
      <List />
    </div>
  );
};

export default HomeView;
