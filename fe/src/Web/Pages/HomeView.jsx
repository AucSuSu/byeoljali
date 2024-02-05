// HomeView.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAxios from '../axios';
// Reducer 추가
import {
  beforeApplyList,
  afterApplyList,
} from '../Stores/homeApplyListReducer';

import List from '../Home/HomeApplyList';
import Carousel from '../Home/Carousel';
import ToggleButton from '../Utils/ToggleButton';

//Navbar
import Navbar from '../Utils/NavBar';

const HomeView = () => {
  const customAxios = useAxios();
  //redux 적용
  const dispatch = useDispatch();

  const [isApplying, setIsApplying] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadAfterData(searchKeyword);
  }, []);

  const handleToggle = () => {
    setIsApplying(!isApplying);
    if (isApplying) {
      loadAfterData(searchKeyword);
    } else {
      loadBeforeData(searchKeyword);
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const loadAfterData = async (keyword) => {
    const data = await customAxios
      .get(
        'mainpage?searchKeyword=' + keyword + '&order=register&status=APPLYING',
      )
      .then((res) => {
        return res.data;
      });
    console.log('응모중', data);
    dispatch(afterApplyList(data));
  };

  const loadBeforeData = async (keyword) => {
    const data = await customAxios
      .get(
        'mainpage?searchKeyword=' +
          keyword +
          '&order=register&status=READY_APPLYING',
      )
      .then((res) => {
        return res.data;
      });
    console.log('응모전', data);
    dispatch(beforeApplyList(data));
  };

  const handleSearchSubmit = () => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[url('/public/bg.png')] bg-cover bg-center bg-no-repeat font-milk font-bold">
      <Navbar isFan={true}></Navbar>
      {/* 캐러셀 */}
      <Carousel />
      <div className="flex items-center justify-between mt-4 pb-12 mb-6">
        {/* 검색바와 검색 버튼을 담은 컨테이너 */}
        <div className="flex items-center justify-center flex-grow">
          <input
            type="text"
            placeholder="검색 키워드를 입력하세요"
            className="border border-pink-500 border-2 bg-transparent rounded py-2 px-3"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <button
            className="ml-2 btn font-bold py-2 px-4 rounded border bg-white"
            onClick={handleSearchSubmit}
          >
            검색
          </button>
        </div>

        {/* 토글 버튼 */}
        <ToggleButton
          type={false}
          isApplying={isApplying}
          toggleApply={handleToggle}
        />
      </div>
      <div className="mt-6">
        <List />
      </div>
    </div>
  );
};

export default HomeView;
