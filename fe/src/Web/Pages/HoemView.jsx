// HomeView.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Reducer 추가
import { setRecentList } from '../Stores/recentListReducer';
import { setDataList } from '../Stores/applyListReducer';

import List from '../Utils/List';
import Carousel from '../Home/Carousel';
import axios from 'axios';

//Navbar
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../Utils/NavBar';

const Home = () => <h2>홈 페이지</h2>;
const About = () => <h2>소개 페이지</h2>;
const Contact = () => <h2>문의 페이지</h2>;

const HomeView = () => {
  //redux 적용
  const dispatch = useDispatch();

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

      try {
        const response = await axios.get(
          'http://localhost:5000/mainpage/1?searchKeyword=&order=register&status=READY_APPLYING',
        );
        console.log('팬 사인회 정보 로드 성공');
        console.log(response.data.object);
        dispatch(setDataList(response.data.object));
      } catch (error) {
        console.error('팬 사인회 정보 로드 실패: ', error);
      }
    };

    fetchData();
  }, [dispatch]);
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
