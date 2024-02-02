import React, { useEffect, useState } from 'react';
import MemberList from '../Mypage/MemberList.jsx';
import AddMemberModal from '../Modal/AddMemberModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../../Stores/artistInfoReducer.js';
import useAxios from '../../axios.js';
import Socket from '../../../Openvidu/Socket.js';

import ArtistImgModal from '../Modal/ArtistImgModal.jsx';

export default function ArtistInfo() {
  const artistData = useSelector((state) => state.artistInfo.artistData);
  const customAxios = useAxios();
  const dispatch = useDispatch();

  const getArtistInfo = async () => {
    const response = await customAxios.get(`artists/`).then((res) => {
      return res.data;
    });
    dispatch(getInfo(response));
  };

  useEffect(() => {
    getArtistInfo();
  }, []);

  // 모달 표시 상태를 관리하는 useState 추가
  const [showArtistImgModal, setShowArtistImgModal] = useState(false);

  // 이미지 클릭시 모달을 보여주는 함수
  const handleImageClick = () => {
    setShowArtistImgModal(true);
  };

  const handleCloseModal = () => {
    setShowArtistImgModal(false);
  };

  // testCode
  const [socketOpen, setSocketOpen] = useState(false);
  const [portNumber, setPortNumber] = useState(1);
  const testSocket = (e) => {
    e.preventDefault();
    setSocketOpen(!socketOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      <div>
        <input
          className="border-4"
          type="text"
          value={portNumber}
          onChange={(e) => setPortNumber(e.target.value)}
        />
        <button onClick={testSocket}>소켓 테스트</button>
      </div>
      {socketOpen && <Socket memberFansignId={portNumber} />}
      <div className="p-8 ml-20 mr-20 overflow-y-auto flex-grow-0">
        {artistData && (
          <div className="mb-8 flex items-center">
            <div className="w-1/2 h-1/2 object-cover rounded-lg mb-8">
              <img
                className="w-full h-full object-cover rounded-lg hover:border-4 hover:border-blue-500 transition duration-300"
                src={artistData.object.artistImageUrl}
                alt="Artist"
                onClick={handleImageClick}
              />
            </div>

            <div className="w-1/2 pl-8 pt-4 pb-4">
              <div className="mt-4 text-gray-600 border-t-2 border-gray-900">
                {artistData.object.companyName}
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold mb-4">
                  {artistData.object.name}
                </h3>
                <div className="flex space-x-4">
                  <div className="mb-4">icon1</div>
                  <div className="mb-4">icon2</div>
                  <div className="mb-4">icon3</div>
                </div>
              </div>
              <div className="mt-4 flex justify-center space-x-4 pb-4 border-b border-t border-gray-500">
                <div className="flex-1 text-center">
                  <p className="py-2 rounded-lg">예정</p>
                  <p className="text-sm text-gray-600 mt-2">12</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="py-2 rounded-lg">진행중</p>
                  <p className="text-sm text-gray-600 mt-2 border-l border-r border-gray-300">
                    5
                  </p>
                </div>
                <div className="flex-1 text-center">
                  <p className="py-2 rounded-lg">사인회</p>
                  <p className="text-sm text-gray-600 mt-2">3</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 overflow-y-auto flex-1">
        <div className="bar flex justify-between items-center mb-4 border-b border-black">
          <p className="text-2xl font-bold mx-auto mb-2">Members</p>
          <AddMemberModal className="ml-auto" />
        </div>

        <div>
          {artistData && (
            <div>
              {artistData.object.memberList.map((member) => (
                <MemberList key={member.memberId} data={member} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* 아티스트 이미지 수정 모달 띄웠다 껐다 하려고 */}
      {showArtistImgModal && (
        <ArtistImgModal
          artistImageUrl={artistData.object.artistImageUrl}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
