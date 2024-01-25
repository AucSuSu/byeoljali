// HomeView.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Reducer 추가
import { applyList, recentList } from '../Stores/homeListReducer';

import List from '../Utils/List';
import Carousel from '../Home/Carousel';

//Navbar
import Navbar from '../Utils/NavBar';

const HomeView = () => {
  //redux 적용
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(applyList);
    dispatch(recentList);
  }, []);

  return (
    <div>
      <Navbar isFan={true}></Navbar>

      <h1>동글이 리스트</h1>
      {/* 캐러셀 */}
      <Carousel />
      <List />
    </div>
  );
};

export default HomeView;
