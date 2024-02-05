// HomeView.jsx
import React, { useEffect } from 'react';
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

const HomeView = () => {
  const customAxios = useAxios();
  //redux 적용
  const dispatch = useDispatch();

  const [isApplying, setIsApplying] = useState(true);

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

  return (
    <div className="min-h-screen bg-[url('/public/bg.png')] bg-cover bg-center bg-no-repeat font-milk font-bold">
      <Navbar isFan={true}></Navbar>
      {/* 캐러셀 */}
      <Carousel />
      <ToggleButton
        type={false}
        isApplying={isApplying}
        toggleApply={handleToggle}
      ></ToggleButton>
      <h1>응모 리스트</h1>
      <List />
    </div>
  );
};

export default HomeView;
