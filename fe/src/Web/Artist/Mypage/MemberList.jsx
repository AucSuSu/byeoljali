import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModifyMemberModal from '../Modal/ModifyMemberModal.jsx';
import {
  handleModifyMember,
  handleCloseModifyMember,
} from '../../Stores/modalReducer.js';

export default function MemberList({ data }) {
  console.log(data);
  const dispatch = useDispatch();
  const modifyMember = useSelector((state) => state.modal.modifyMember);

  const openModifyMember = () => {
    dispatch(handleModifyMember(data.memberId));
  };

  const closeModifyMember = () => {
    dispatch(handleCloseModifyMember(null));
  };

  return (
    <div
      style={{ textAlign: 'center', margin: '10px', display: 'inline-block' }}
    >
      <img
        src={data.profileImageUrl}
        alt={data.name}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
        onClick={openModifyMember}
      />
      <p>{data.name}</p>
      {modifyMember.open && modifyMember.key === data.memberId && (
        <ModifyMemberModal data={data} onClose={closeModifyMember} />
      )}
    </div>
  );
}
