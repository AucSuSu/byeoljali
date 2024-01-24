// HomeView.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '../Utils/List';
import Carousel from '../Home/Carousel';
import axios from 'axios';

// Reducer 추가
import { setRecentList } from '../Stores/recentListReducer';

const HomeView = () => {
  //redux 적용
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.applyList.dataList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/mainpage/recent',
        );
        console.log('최근 팬 사인회 정보 로드 성공');
        console.log(response.data.object);
        dispatch(setRecentList(response.data.object));
      } catch (error) {
        console.error('최근 팬 사인회 정보 로드 실패: ', error);
      }

      /*try {
        const response = await axios.get(
          'http://192.168.30.152:5000/mainpage/1',
        );
        dispatch(setDataList(response.data[0].object));
      } catch (error) {
        console.error('팬 사인회 정보 로드 실패: ', error);
      }*/
    };

    fetchData();
  }, [dispatch]);
  return (
    <div>
      <h1>동글이 리스트</h1>
      {/* 캐러셀 */}
      <Carousel />
      <List dataList={dataList[0].object} />
    </div>
  );
};

export default HomeView;
