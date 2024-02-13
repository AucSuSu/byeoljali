import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddMemberModal from '../Modal/AddMemberModal.jsx';

export default function MemberList() {
  const dispatch = useDispatch();
  const modifyMember = useSelector((state) => state.modal.modifyMember);

  const openAddMember = () => {
    dispatch(handleModifyMember(data.memberId));
  };

  const closeModifyMember = () => {
    dispatch(handleCloseModifyMember(null));
  };

  return (
    <div className="font-jamsil">
      <div className="m-2.5 ml-12 text-center inline-block">
        <img
          src="/addbutton.webp"
          alt="addMember"
          style={{
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
          onClick={openAddMember}
        />
        {modifyMember.open && modifyMember.key === data.memberId && (
          <ModifyMemberModal data={data} onClose={closeModifyMember} />
        )}
      </div>
    </div>
  );
}
