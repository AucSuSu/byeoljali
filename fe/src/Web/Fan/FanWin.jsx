import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadWin } from '../Stores/fanApplyListReducer';
import { useNavigate } from 'react-router-dom';
import FanSignList from '../Fan/FanSignList';
import useAxios from '../axios';

function FanWin() {
  const customAxios = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <>
      <div className="w-[80%] ml-[10%]">
        <div className="flex items-center justify-between mt-6 mb-6">
          <div>
            <div className="font-big text-40 bolder mb-2 text-white">
              당첨 내역
            </div>
            <div className="font-big text-25 text-dark-gray">
              {data.length} 개의 당첨 내역을 보유 하고 있습니다.
            </div>
            <div className="font-big text-25 pt-2 text-dark-gray">
              팬싸인회는 시작 30분 전부터 입장 가능합니다
            </div>
          </div>
        </div>
      </div>
      <div className="w-[86%] ml-[7%]">
        {data.length === 0 ? (
          <div className="flex flex-col justify-center items-center px-16 py-32 border-4 border-deep-dark rounded-lg text-white font-big text-35">
            <div>당첨 내역이 없습니다</div>
            <div
              className="text-25 text-hot-pink cursor-pointer hover:scale-110 transition-transform ease-in-out duration-500"
              onClick={goToHome}
            >
              응모 하러 가기
            </div>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 border-4 border-deep-dark rounded-lg">
            {data.map((data, index) => (
              <FanSignList key={index} data={data} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FanWin;
