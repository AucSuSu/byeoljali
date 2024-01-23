// HomeView.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '../Utils/List';
import axios from 'axios';

const HomeView = () => {
  //redux 적용
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.applyList.dataList);

  //CORS 에러 발생 - 배포 후 실행할 것!
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.30.152:5000/mainpage/1');
        dispatch(setDataList(response.data[0].object));
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생: ', error);
      }
    };

    fetchData();
  }, [dispatch]);
  */

  return (
    <div>
      <h1>동글이 리스트</h1>
      <List dataList={dataList[0].object} />
    </div>
  );
};

export default HomeView;
