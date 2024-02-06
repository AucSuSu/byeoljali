// HomeView.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import useAxios from '../axios';
// Reducer 추가
import {
  beforeApplyList,
  afterApplyList,
} from '../Stores/homeApplyListReducer';

import { getUserInfo } from '../Stores/fanInfoReducer';

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
    getUserInfoData();
  }, []);

  const getUserInfoData = async () => {
    const data = await customAxios.get('mypage/').then((res) => {
      return res.data.object;
    });
    dispatch(getUserInfo(data));
  };

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

  const handleSearchSubmit = () => {
    if (isApplying) {
      loadAfterData(searchKeyword);
    } else {
      loadBeforeData(searchKeyword);
    }
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

  return (
    <div className="min-h-screen bg-[url('/public/bg.png')] bg-cover bg-center bg-no-repeat font-milk font-bold">
      <Navbar isFan={true}></Navbar>
      {/* 캐러셀 */}
      <Carousel />
      <div className="w-4/5 mx-auto flex flex-col">
        <div className="flex items-center justify-between mt-10 pb-6 ml-10">
          {/* 검색바와 검색 버튼을 담은 컨테이너 */}
          <div className="flex items-center justify-center flex-grow">
            <input
              type="text"
              placeholder="검색 키워드를 입력하세요"
              className="border border-hot-pink border-2 bg-transparent rounded py-2 px-3"
              value={searchKeyword}
              onChange={handleSearchChange}
            />
            <button
              className="ml-2 btn font-bold py-2 px-4 rounded bg-transparent color-hot-pink"
              onClick={handleSearchSubmit}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
          </div>

          {/* 토글 버튼 */}
          <ToggleButton
            type={false}
            isApplying={isApplying}
            toggleApply={handleToggle}
            className="mr-6"
          />
        </div>
        <div className="mt-6">
          <List />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
