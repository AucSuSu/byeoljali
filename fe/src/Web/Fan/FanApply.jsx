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
    <>
      <div className="w-[80%] ml-[10%]">
        <div className="flex items-center justify-between mt-6 mb-6">
          <div>
            <div className="text-3xl bolder mb-2">응모 내역 확인</div>
            <div className="text-dark-gray">
              {data.length} 개의 당첨 내역을 보유 하고 있습니다.
            </div>
          </div>
        </div>
      </div>
      <div className="w-[86%] ml-[7%]">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 border-2 border-dark-gray rounded-md">
          {data.map((data, index) => (
            <FanSignList key={index} data={data} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FanApply;
