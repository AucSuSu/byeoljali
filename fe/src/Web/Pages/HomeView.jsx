// HomeView.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../Stores/fanInfoReducer';
import useAxios from '../axios';
import Navbar from '../Utils/NavBar';
import HomeApplyList from '../Home/HomeApplyList';
import NewCarousel from '../Home/remake/NewCarousel';
import { carouselImage } from '../data';

// Reducer 추가
import {
  beforeApplyList,
  afterApplyList,
} from '../Stores/homeApplyListReducer';

const HomeView = () => {
  const afterData = useSelector((state) => state.homeapply.afterData); // 응모 중 데이터 redux에서 꺼내기
  const beforeData = useSelector((state) => state.homeapply.beforeData); // 응모 전 데이터 redux에서 꺼내기
  const customAxios = useAxios();
  const dispatch = useDispatch();

  // 최초 렌러딩 시 data 불러오기
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

  // 가져온 data 앞에서 8개만 선택하기
  const [sliceAfterItems, setSliceAfterItems] = useState(null);
  const [sliceBeforeItems, setSliceBeforeItems] = useState(null);
  useEffect(() => {
    const sliceData = Array.isArray(afterData?.object)
      ? afterData.object.slice(0, 8)
      : [];
    setSliceAfterItems(sliceData);
  }, [afterData]);

  useEffect(() => {
    const sliceData = Array.isArray(beforeData?.object)
      ? beforeData.object.slice(0, 8)
      : [];
    setSliceBeforeItems(sliceData);
  }, [beforeData]);

  // 더보기 시 이동
  const navigate = useNavigate();
  const moveCurrentApplyView = () => {
    navigate('/current-apply');
  };
  const moveCommingSoonView = () => {
    navigate('/comming-soon');
  };
  return (
    <>
      <div id="main_container" className="flex flex-col bg-black font-big">
        {/* 1. Navbar */}
        <Navbar />

        {/* 2. Post Carousel */}
        <div className="w-[80%] mx-[8.5%]">
          <NewCarousel datas={carouselImage} />
        </div>

        {/* 3. Current Apply  */}
        <div>
          <div className="w-[80%] ml-[10%] text-white flex justify-between mb-4 text-18">
            <p> CURRENT APPLY</p>
            <button onClick={moveCurrentApplyView}>더보기 ▶</button>
          </div>
          <HomeApplyList data={sliceAfterItems} status="CurrentApply" />
        </div>

        {/* 4. Artist 넣어주세요 ~~~~  */}
        <div className="w-[80%] ml-[10%] text-white mb-10">
          아티스트 올 예정
        </div>

        {/* 5. Comming Soon */}
        <div className="w-[80%] ml-[10%] text-white flex justify-between mb-4 text-18">
          <p> COMMING SOON</p>
          <button onClick={moveCommingSoonView}>더보기 ▶</button>
        </div>
        <HomeApplyList data={sliceBeforeItems} status="CommingSoon" />
      </div>
    </>
  );
};

export default HomeView;
