import React, { useState } from 'react';
import ApplyFormModal from './HomeApplyFormModal';

// Reducer 추가
import { useDispatch } from 'react-redux';
import {
  detailList,
  clearData,
  setFansignId,
} from '../Stores/homeDetailListReducer';

const ListItem = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // 모달 관리
  const openModal = () => {
    // dispatch를 사용하여 detailList 액션을 호출
    dispatch(setFansignId(data.artistfansignId));
    dispatch(detailList(data.artistfansignId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearData()); // data를 빈 배열로 초기화하는 액션을 디스패치
    setIsModalOpen(false);
  };

  return (
    <div
      id="card_container"
      className="bg-slate-900 text-white rounded-md m-1 font-sm transition-all"
    >
      <img
        src={data.posterImageUrl}
        alt={data.title}
        className="mx-auto w-[80%] h-[65%] cursor-pointer rounded-md mt-5 mb-2 transition-all hover:scale-105"
        onClick={() => openModal()}
      />
      <div className="flex text-sm ml-5 mb-2">
        <p className="mr-2 border border-red-500  text-red-500 rounded-md p-1">
          READY
        </p>
        <p className="mr-2 border border-green-500  text-green-500 rounded-md p-1">
          RANDOM
        </p>
      </div>
      <div className="text-sm ml-5 h-[65px]">{data.title}</div>
      <div className="text-sm ml-5 text-hot-pink">
        시작까지 N일 N시간 NN분 NN초
      </div>

      <ApplyFormModal
        fansignId={data.artistfansignId}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        propData={data}
      />
    </div>
  );
};

export default ListItem;
