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

  // 조건부 스타일 객체 생성
  const imageStyle = {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '7px',
    cursor: isArtist ? 'pointer' : 'default', // isArtist일 때만 cursor를 pointer로 설정
  };

  return (
    <div className="font-jamsil m-2.5 ml-12 text-center inline-block">
      <img
        src={data.profileImageUrl}
        alt={data.name}
        style={imageStyle} // 스타일 객체 적용
        onClick={isArtist ? openModifyMember : undefined} // isArtist일 때만 onClick 이벤트 핸들러 적용
      />
      <p>{data.name}</p>
      {modifyMember.open && modifyMember.key === data.memberId && (
        <ModifyMemberModal data={data} onClose={closeModifyMember} />
      )}
    </div>
  );
}
