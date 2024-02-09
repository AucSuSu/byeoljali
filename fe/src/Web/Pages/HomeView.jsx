// HomeView.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../axios';
// Reducer 추가
import {
  beforeApplyList,
  afterApplyList,
} from '../Stores/homeApplyListReducer';
import { getUserInfo } from '../Stores/fanInfoReducer';
import TestHome from '../Home/remake/TesetHome';
import HomeApplyList from '../Home/HomeApplyList';
//Navbar
import Navbar from '../Utils/NavBar';

const HomeView = () => {
  const afterData = useSelector((state) => state.homeapply.afterData);
  const beforeData = useSelector((state) => state.homeapply.beforeData);
  const customAxios = useAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    loadAfterData();
    loadBeforeData();
    getUserInfoData();
  }, []);

  const getUserInfoData = async () => {
    const data = await customAxios.get('mypage/').then((res) => {
      return res.data.object;
    });
    dispatch(getUserInfo(data));
  };

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
    <>
      <div id="main_container" className="flex flex-col bg-black">
        {/* 1. Navbar */}
        <Navbar />

        {/* 2. Post Carousel */}
        <TestHome />

        {/* 3. Current Apply  */}
        <div>
          <div className="w-[80%] ml-[10%] text-white flex justify-between mb-4">
            <h1 className=" bold text-18"> CURRENT APPLY</h1>
            <button>더보기 ▶</button>
          </div>
          <HomeApplyList data={afterData} status="CurrentApply" />
        </div>

        {/* 4. Artist 넣어주세요 ~~~~  */}
        <div className="w-[80%] ml-[10%] text-white mb-10">
          아티스트 올 예정
        </div>

        {/* 5. Comming Soon */}
        <div className="w-[80%] ml-[10%] text-white flex justify-between mb-4">
          <h1 className=" bold text-18"> COMMING SOON</h1>
          <button>더보기 ▶</button>
        </div>
        <HomeApplyList data={beforeData} status="CommingSoon" />
      </div>
    </>
  );
};

export default HomeView;
