import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModifyMemberModal from '../Modal/ModifyMemberModal.jsx';
import {
  handleModifyMember,
  handleCloseModifyMember,
} from '../../Stores/modalReducer.js';

export default function MemberList({ data }) {
  const isArtist = useSelector((state) => state.auth.isArtist);
  const dispatch = useDispatch();
  const modifyMember = useSelector((state) => state.modal.modifyMember);

  const openModifyMember = () => {
    if (isArtist) {
      dispatch(handleModifyMember(data.memberId));
    }
  };

  const closeModifyMember = () => {
    dispatch(handleCloseModifyMember(null));
  };

  return (
    <div className="font-jamsil m-2.5 ml-12 text-center inline-block">
      <img
        src={data.profileImageUrl}
        alt={data.name}
        style={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          objectFit: 'cover',
          cursor: 'pointer',
          marginBottom: '7px',
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
