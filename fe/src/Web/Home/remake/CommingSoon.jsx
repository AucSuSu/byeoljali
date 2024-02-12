// HomeView.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../../axios';
import Navbar from '../../Utils/NavBar';
import HomeApplyList from '../HomeApplyList';
// Reducer 추가
import { beforeApplyList } from '../../Stores/homeApplyListReducer';

const HomeView = () => {
  const beforeData = useSelector((state) => state.homeapply.beforeData);
  const customAxios = useAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    loadBeforeData();
  }, []);

  const loadBeforeData = async () => {
    const data = await customAxios
      .get('mainpage?searchKeyword=&order=register&status=READY_APPLYING')
      .then((res) => {
        return res.data;
      });
    console.log('응모전', data);
    dispatch(beforeApplyList(data));
  };

  const bgStyle = 'bg-white bg-opacity-80';
  return (
    <>
      <div id="main_container" className="flex flex-col font-big">
        {/* 1. Navbar */}
        <div
          className=" relative h-[400px] bg-cover "
          style={{ backgroundImage: "url('/bgImg.png')" }}
        >
          {/* inset-0 부모 요소 기준으로 위치 설정(영역전체) */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <Navbar bgStyle={bgStyle} className="relative z-10" />
          <p
            className="absolute bottom-2 ml-[10%] text-white text-30"
            style={{ letterSpacing: '3px', wordSpacing: '5px' }}
          >
            COMMING SOON
          </p>
        </div>
        {/* 2. Comming Soon  */}
        <div className="bg-black pt-5">
          <HomeApplyList data={beforeData.object} status="CurrentApply" />
        </div>
      </div>
    </>
  );
};

export default HomeView;
