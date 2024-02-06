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

  // css용 임시 코드
  // const userData = {
  //   nickname: 'nickname',
  //   name: 'name',
  //   birth: 'birth',
  //   email: 'email@gamil.com',
  //   profileImageUrl:
  //     'data:image/jpeg;base64,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',
  //   certificationImageUrl:
  //     'data:image/jpeg;base64,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',
  //   changeCount: 0,
  // };

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
                <div className="w-full h-full bg-pink flex flex-col justify-center items-center">
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
