import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadWin } from '../Stores/fanApplyListReducer';
import FanSignList from '../Fan/FanSignList';
import useAxios from '../axios';

function FanWin() {
  const customAxios = useAxios();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fanapply.data);
  console.log(data);

  useEffect(() => {
    loadWinData();
  }, []);

  const loadWinData = async () => {
    const data = customAxios.get('applyPage/1').then((res) => {
      return res.data.object;
    });
    dispatch(loadWin(data));
  };

  return (
    <div>
      <h1>당첨 페이지</h1>
      {data.map((data, index) => (
        <FanSignList key={index} data={data} />
      ))}
    </div>
  );
}

export default FanWin;
