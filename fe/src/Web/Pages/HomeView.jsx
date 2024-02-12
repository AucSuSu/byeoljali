// HomeView.jsx
import React, { useEffect, useState, useRef } from 'react';
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
  // 아티스트명
  const items = [
    { name: 'Item 1', font: 'Arial, sans-serif' },
    { name: 'Item 2', font: 'Georgia, serif' },
    { name: 'Item 3', font: 'Verdana, sans-serif' },
    { name: 'Item 4', font: 'Courier New, monospace' },
    { name: 'Item 5', font: 'Impact, sans-serif' },
    { name: 'Item 1', font: 'Arial, sans-serif' },
    { name: 'Item 2', font: 'Georgia, serif' },
    { name: 'Item 3', font: 'Verdana, sans-serif' },
    { name: 'Item 4', font: 'Courier New, monospace' },
    { name: 'Item 5', font: 'Impact, sans-serif' },
    { name: 'Item 1', font: 'Arial, sans-serif' },
    { name: 'Item 2', font: 'Georgia, serif' },
    { name: 'Item 3', font: 'Verdana, sans-serif' },
    { name: 'Item 4', font: 'Courier New, monospace' },
    { name: 'Item 5', font: 'Impact, sans-serif' },
    { name: 'Item 1', font: 'Arial, sans-serif' },
    { name: 'Item 2', font: 'Georgia, serif' },
    { name: 'Item 3', font: 'Verdana, sans-serif' },
    { name: 'Item 4', font: 'Courier New, monospace' },
    { name: 'Item 5', font: 'Impact, sans-serif' },
  ];
  const containerRef = useRef(null);

  useEffect(() => {
    loadAfterData();
    loadBeforeData();
    getUserInfoData();

    const container = containerRef.current;

    const scrollInterval = setInterval(() => {
      if (container) {
        console.log('left');
        container.scrollLeft += 1; // 스크롤 간격 조절 가능
      }
    }, 20); // 스크롤 속도 조절 가능

    // 컴포넌트가 언마운트될 때 인터벌을 해제합니다.
    return () => clearInterval(scrollInterval);
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
        <div className="flex items-center p-4 h-40">
          <div
            ref={containerRef}
            className="flex overflow-x-auto p-1 items-center"
          >
            {Array.isArray(items) &&
              items.map((artist, index) => (
                <div //하나의 멤버
                  key={index}
                  onClick={() => select(index, artist)}
                  className="mr-4 inline-block" // inline-block 클래스 추가
                  style={{
                    fontFamily: artist.font,
                  }}
                >
                  <div
                    className="mt-2 text-center text-white"
                    style={{
                      width: '103px',
                      height: '103px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                  >
                    {artist.name}
                  </div>
                </div>
              ))}
          </div>
        </div>

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
