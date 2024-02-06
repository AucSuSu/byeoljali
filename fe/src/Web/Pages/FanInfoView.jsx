import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../Stores/fanInfoReducer';
import useAxios from '../axios';

import FanAuthModal from '../Fan/FanAuthModal';
import FanInfoModal from '../Fan/FanInfoModal';
import NavBar from '../Utils/NavBar';

function FanInfoView() {
  const customAxios = useAxios();
  const userData = useSelector((state) => state.faninfo.data);

  console.log(userData);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfoData();
  }, []);

  const getUserInfoData = async () => {
    const data = await customAxios.get('mypage/').then((res) => {
      return res.data.object;
    });
    dispatch(getUserInfo(data));
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      {userData && (
        <div className="bg-white min-h-screen">
          {' '}
          {/* 배경 이미지와 전체 높이 적용, 글꼴 적용 */}
          <NavBar isFan={true} />
          <div className="profile-container min-h-screen grid grid-cols-2 grid-rows-2">
            {' '}
            {/* 그리드 레이아웃 적용 */}
            {/* 프로필 아바타 섹션 (좌상단) */}
            <div className="flex justify-center items-center p-5 pl-32">
              <img
                src={userData.profileImageUrl}
                alt="Profile avatar"
                className="w-152 h-100 rounded-md hover:border-red-500 hover:border-2" // 이미지 크기와 라운드 조정
                onClick={() => setShowEditModal(true)}
              />
            </div>
            {/* 프로필 정보 섹션 (우상단) */}
            <div className="flex flex-col justify-center items-center p-5 pr-48">
              <div className="flex flex-col self-start divide-y w-full divide-black border-t-4">
                <div className="flex flex-col justify-center self-start h-48 divide-y divide-black px-4">
                  <p className="font-milk text-4xl font-bold ">
                    {userData.nickname}
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="ml-2"
                    >
                      <img src="/editBtn.png" alt="Edit" className="w-6 h-6" />
                    </button>
                  </p>
                  <p className="font-milk text-xl">{userData.name}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full h-48  px-4">
                <div className="w-full h-full bg-pink flex flex-col justify-center items-center rounded-md">
                  <div>
                    <div className="font-milk ">
                      <strong>생일 :</strong>
                      {userData.birth}
                    </div>
                  </div>
                  <p className="font-milk">
                    <strong>이메일 : </strong>
                    {userData.email}
                  </p>
                </div>
              </div>
              <div>
                {/* 유저정보수정모달 */}
                {showEditModal && (
                  <FanInfoModal
                    userData={userData}
                    onClose={() => setShowEditModal(false)}
                  />
                )}
              </div>
            </div>
            {/* 인증사진 섹션 (좌하단) */}
            <div className="flex flex-col justify-start items-center p-5 pl-32">
              <p className="auth-info   my-2 font-milk text-25 font-bold ">
                인증사진 등록하기
              </p>
              <p className="auth-info  my-2 font-milk ">
                인증사진은 최대 4번 등록 가능합니다. 신중히 등록해주세요.
              </p>
              <div className="flex items-center mt-8">
                <img
                  src={userData.certificationImageUrl}
                  alt="Auth img"
                  className="w-64 h-64 rounded-md hover:border-red-500 hover:border-2" // 이미지 크기와 라운드 조정
                  onClick={() => setShowAuthModal(true)}
                />
                <h3 className="text-2xl font-bold ml-2 font-milk self-end pl-4">
                  {userData.changeCount} / 4
                </h3>
              </div>
              <div>
                {/* 인증사진 수정 모달 */}
                {showAuthModal && (
                  <FanAuthModal
                    userData={userData}
                    onClose={() => setShowAuthModal(false)}
                    // 필요한 경우 다른 props 전달
                  />
                )}
              </div>
            </div>
            {/* 공지사항 섹션 (우하단) */}
            <div className="flex flex-col justify-start items-center p-5 pr-48">
              <h1 className="text-2xl font-bold font-milk">옥수수 광고판</h1>

              <div className="w-full h-80 px-4">
                <div className="font-milk w-full h-80 bg-light-gray text-center mt-12">
                  치킨 야미야미
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FanInfoView;
