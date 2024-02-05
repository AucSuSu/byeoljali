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
    <div className="mt-12 ml-24 mr-14 font-milk font-bold">
      <div className="flex items-center justify-between pb-12 mb-6">
        <div>
          <div className="text-3xl bolder mb-2">응모 내역 확인</div>
          <div className="border-t-2"></div>
        </div>
      </div>
      <div>
        {data.map((data, index) => (
          <FanSignList
            key={index}
            data={data}
            className="flex-auto w-64 h-64"
          />
        ))}
      </div>
    </div>
  );
}

export default FanApply;
