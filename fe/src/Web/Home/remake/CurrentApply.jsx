// HomeView.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../../axios';
import Navbar from '../../Utils/NavBar';
import HomeApplyList from '../HomeApplyList';
// Reducer 추가
import { afterApplyList } from '../../Stores/homeApplyListReducer';

const HomeView = () => {
  const afterData = useSelector((state) => state.homeapply.afterData);
  const customAxios = useAxios();
  const dispatch = useDispatch();
  const currentRef = useRef();

  useEffect(() => {
    console.log(
      currentRef.current.scrollTop,
      '확인용 : ',
      currentRef.current.scrollHeight,
      currentRef.current.scrollTop,
    );
    currentRef.current.scrollTop = 0;
  }, []);

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

  const bgStyle = 'bg-white bg-opacity-20 h-full';
  return (
    <>
      <div
        ref={currentRef}
        id="main_container"
        className="flex flex-col font-jamsil overflow-y-auto"
      >
        {/* 1. Navbar */}
        <div
          className=" relative h-[400px] bg-cover"
          style={{ backgroundImage: "url('/bg3.png')" }}
        >
          {/* inset-0 부모 요소 기준으로 위치 설정(영역전체) */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <Navbar bgStyle={bgStyle} className="relative z-10" />
          <p
            className="absolute bottom-0 ml-[10%] text-white text-35 "
            style={{ letterSpacing: '3px', wordSpacing: '5px' }}
          >
            CURRENT APPLY
          </p>
        </div>
        {/* 2. Current Apply  */}
        <div className="bg-black py-10">
          <HomeApplyList data={afterData.object} status="CurrentApply" />
        </div>
      </div>
    </>
  );
};

export default HomeView;
