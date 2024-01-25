import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FansignModal from './FansignModal.jsx';
import { handleFansignInfo } from '../Stores/modalReducer.js';

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
        src={data.profileImageUrl}
        alt={data.title}
        style={{ width: '100px', borderRadius: '50%', cursor: 'pointer' }}
        onClick={openModifyMember}
      />
      <p>{data.title}</p>
      <p>{data.memberName}</p>
      {fansignInfo.open && fansignInfo.key === data.artistFansignId && (
        <FansignModal data={data} />
      )}
    </div>
  );
}
