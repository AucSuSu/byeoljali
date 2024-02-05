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
    loadAfterData();
  }, []);

  const handleToggle = () => {
    setIsApplying(!isApplying);
    if (isApplying) {
      loadAfterData();
    } else {
      loadBeforeData();
    }
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

  const getUserSearchResult = async (keyword) => {
    const data = await customAxios
      .get(
        'mainpage?searchKeyword=' + keyword + '&order=register&status=APPLYING',
      )
      .then((res) => {
        return res.data;
      });
    console.log('응모전', data);
    dispatch(getUserSearchResult(data));
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = () => {
    getUserSearchResult(searchKeyword);
  };

  return (
    <div className="min-h-screen bg-[url('/public/bg.png')] bg-cover bg-center bg-no-repeat font-milk font-bold">
      <Navbar isFan={true}></Navbar>
      {/* 캐러셀 */}
      <Carousel />
      <div className="flex items-center justify-between mt-4 pb-12 mb-6">
        <input
          type="text"
          placeholder="검색 키워드를 입력하세요"
          className="input border border-pink border-2 bg-transparent rounded w-24 py-2 px-3"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
        <button
          className="w-40 btn font-bold py-2 px-4 rounded border bg-white mr-12"
          onClick={handleSearchSubmit}
        >
          검색
        </button>
        <ToggleButton
          type={false}
          isApplying={isApplying}
          toggleApply={handleToggle}
        ></ToggleButton>
      </div>
      <div className="mt-6">
        <List />
      </div>
    </div>
  );
};

export default HomeView;
