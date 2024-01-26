import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FansignModal from '../Modal/FansignModal.jsx';
import { handleFansignInfo } from '../../Stores/modalReducer.js';

export default function MemberList({ data }) {
  const dispatch = useDispatch();
  const fansignInfo = useSelector((state) => state.modal.fansignInfo);

  const openModifyMember = () => {
    dispatch(handleFansignInfo(data.artistFansignId));
  };

  return (
    <div
      style={{ textAlign: 'center', margin: '10px', display: 'inline-block' }}
    >
      <img
        src={data.posterImageUrl}
        alt={data.title}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
        onClick={openModifyMember}
      />
      <p>{data.title}</p>
      <p>{data.memberName}</p>
      {fansignInfo.open && fansignInfo.key === data.artistFansignId && (
        <FansignModal />
      )}
    </div>
  );
}
