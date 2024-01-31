import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../Stores/fanInfoReducer';

import ImgUploadModal from '../Fan/ImgUploadModal';
import FanInfoModal from '../Fan/FanInfoModal';
import NavBar from '../Utils/NavBar';

import './FanInfoView.css';

function FanInfoView() {
  const userData = useSelector((state) => state.faninfo.data);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  console.log(userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData(7));
  }, [dispatch]);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showImgUploadModal, setShowImgUploadModal] = useState(false);

  return (
    <>
      {userData && (
        <div>
          <NavBar isFan={true} />
          <div className="profile-container">
            {/* 유저정보수정모달 */}
            {showEditModal && (
              <FanInfoModal
                userData={userData}
                onClose={() => setShowEditModal(false)}
              />
            )}
            {/* 인증사진 수정 모달 */}
            {showImgUploadModal && (
              <ImgUploadModal
                onClose={() => setShowImgUploadModal(false)}
                // 필요한 경우 다른 props 전달
              />
            )}
            <div className="profile-info-container">
              <div className="profile-avatar-container">
                <img
                  src={userData.profileImageUrl}
                  alt=""
                  className="profile-avatar"
                />
              </div>
              <div className="profile-info">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowEditModal(true)}
                >
                  수정하기
                </button>
                <p>
                  <strong>닉네임: </strong>
                  {userData.nickname}
                </p>

                <p>
                  <strong>이름 : </strong> {userData.name}
                </p>
                <p>
                  <strong>생년월일 : </strong> {userData.birth}
                </p>
                <p>
                  <strong>이메일 : </strong> {userData.email}
                </p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="profile-auth-container">
              <div className="profile-auth">
                <button
                  className="profile-button"
                  onClick={() => setShowImgUploadModal(true)}
                >
                  인증사진 등록하기
                </button>
                <p className="auth-info">대충 4번만 된다는 내용</p>
                <div className="profile-attempt">
                  <img
                    src={userData.certificationImageUrl}
                    alt="auth img"
                    className="auth-avatar"
                  />
                  <h3>{userData.changeCount} / 4</h3>
                </div>
              </div>
              <div className="profile-announce">
                <h1>
                  <strong>옥수수 공지사항</strong>
                </h1>
                <p>치킨 야미야미</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FanInfoView;
