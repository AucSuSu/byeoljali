import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadApply } from '../Stores/fanApplyListReducer';
import useAxios from '../axios';

import FanSignList from '../Fan/FanSignList';

function FanApply() {
  const customAxios = useAxios();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fanapply.data);
  console.log(data);

  useEffect(() => {
    loadApplyData();
  }, []);

  const loadApplyData = async () => {
    const data = await customAxios.get('applyPage/0').then((res) => {
      return res.data.object;
    });
    console.log('내가 응모한 리스트 : ', data);
    dispatch(loadApply(data));
  };

  return (
    <div className="min-h-screen bg-[url('/public/bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="mt-10 ml-16 mr-20">
        <h1 className="text-25 bolder">응모 페이지</h1>
        {data.map((data, index) => (
          <FanSignList key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

export default FanApply;
