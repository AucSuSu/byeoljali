import React, { useState } from 'react';
import ApplyFormModal from './HomeApplyFormModal';

// Reducer 추가
import { useDispatch } from 'react-redux';
import { detailList } from '../Stores/homeListReducer';

const ListItem = ({ data, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //컨트롤러
  const controller = () => {
    console.log('컨트롤러 입장');

    openModal;
  };

  //모달 관리
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //redux 적용
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailList);
    dispatch(detailList);
  }, [dispatch]);

  return (
    <div
      style={{ textAlign: 'center', margin: '10px', display: 'inline-block' }}
    >
      <img
        src={data.posterImageUrl}
        alt={data.title}
        style={{ width: '100px', borderRadius: '50%', cursor: 'pointer' }}
        onClick={controller}
      />
      <p>{data.title}</p>

      <ApplyFormModal
        data={data}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ListItem;
