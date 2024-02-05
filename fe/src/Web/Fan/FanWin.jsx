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
    const data = await customAxios.get('applyPage/1').then((res) => {
      return res.data.object;
    });
    console.log('내가 당첨된 리스트 : ', data);
    dispatch(loadWin(data));
  };

  return (
    <div className="mt-12 ml-24 mr-14 font-milk font-bold">
      <div className="flex items-center justify-between pb-12 mb-6">
        <div>
          <div className="text-3xl bolder mb-2">당첨 내역 확인</div>
          <div className="border-t-2"></div>
          <div className="pt-2">
            팬싸인회는 시작 30분 전부터 입장 가능합니다
          </div>
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

export default FanWin;
