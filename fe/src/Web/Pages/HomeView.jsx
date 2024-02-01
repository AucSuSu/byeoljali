// HomeView.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAxios from '../axios';
// Reducer 추가
import {
  beforeApplyList,
  afterApplyList,
} from '../Stores/homeApplyListReducer';
// import { recentList } from '../Stores/homeRecentReducer';

import List from '../Home/HomeApplyList';
import Carousel from '../Home/Carousel';

//Navbar
import Navbar from '../Utils/NavBar';

const HomeView = () => {
  const customAxios = useAxios();
  //redux 적용
  const dispatch = useDispatch();

  useEffect(() => {
    loadAfterData();
  }, []);

  const loadAfterData = async () => {
    const data = await customAxios
      .get('mainpage?searchKeyword=&order=register&status=APPLYING')
      .then((res) => {
        return res.data;
      });
    console.log('응모중', data);
    dispatch(afterApplyList(data));
  };

  const loadBeforeData = async () => {
    const data = await customAxios
      .get('mainpage?searchKeyword=&order=register&status=READY_APPLYING')
      .then((res) => {
        return res.data;
      });
    console.log('응모전', data);
    dispatch(beforeApplyList(data));
  };

  return (
    <div>
      <Navbar isFan={true}></Navbar>
      {/* 캐러셀 */}
      <Carousel />
      <button onClick={loadBeforeData}>응모전</button>
      <br />
      <button onClick={loadAfterData}>응모중</button>
      <h1>응모 리스트</h1>
      <List />
    </div>
  );
};

export default HomeView;
