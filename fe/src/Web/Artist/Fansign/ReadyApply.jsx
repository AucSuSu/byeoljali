import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFansignInfo } from '../../Stores/artistFansignReducer.js';
import FansignList from './FansignList.jsx';
import useAxios from '../../axios.js';
export default function ReadyApply({ handleAddFansign }) {
  const fansignList = useSelector((state) => state.artistFansign.data);
  const customAxios = useAxios();

  const dispatch = useDispatch();
  const getFansign = async () => {
    const response = await customAxios
      .get(`artists/apply?status=${status}`)
      .then((res) => {
        return res.data;
      });
    dispatch(getFansignInfo(response));
  };

  const status = 'READY_APPLYING';

  useEffect(() => {
    getFansign();
  }, []);

  return (
    <>
      {fansignList.object.length === 0 ? (
        <>
          <div className="flex flex-col justify-center items-center px-16 py-32 border-4 border-deep-dark rounded-lg text-white font-jamsil text-35">
            <div>팬싸 내역이 없습니다</div>
            <div
              className="text-25 text-hot-pink cursor-pointer hover:scale-110 transition-transform ease-in-out duration-500"
              onClick={handleAddFansign}
            >
              팬사인회 개설하기
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 border-4 border-deep-dark rounded-lg mb-8">
            {fansignList.object.map((data, index) => (
              <FansignList key={index} data={data} status={data.status} />
            ))}
          </div>
          <div className="h-8"></div>
        </>
      )}
    </>
  );
}
