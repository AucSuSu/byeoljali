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
  const [artistCountData, setArtistCountData] = useState('');
  const customAxios = useAxios();
  const dispatch = useDispatch();

  const getArtistInfo = async () => {
    const response = await customAxios.get(`artists/`).then((res) => {
      return res.data;
    });
    dispatch(getInfo(response));
  };

  const getArtistCountData = async () => {
    const result = customAxios
      .get('artists/fansignCount')
      .then((res) => {
        console.log(res);
        setArtistCountData(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getArtistInfo();
    getArtistCountData();
  }, []);

  // 모달 표시 상태를 관리하는 useState 추가
  const [showArtistImgModal, setShowArtistImgModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  // 모달 열고 닫는 함수들
  const handleOpenArtistImg = () => {
    setShowArtistImgModal(true);
  };

  const handleCloseArtistImg = () => {
    setShowArtistImgModal(false);
  };

  const handleOpenAddMember = () => {
    setShowAddMemberModal(true);
  };

  const handleCloseAddMember = () => {
    setShowAddMemberModal(false);
  };

  // testCode
  const [socketOpen, setSocketOpen] = useState(false);
  const [portNumber, setPortNumber] = useState(1);
  const [name, setName] = useState('susu');
  const testSocket = (e) => {
    e.preventDefault();
    setSocketOpen(!socketOpen);
  };

  return (
    <div className="h-screen flex flex-col font-milk font-bold">
      {/* 아티스트 박스 */}
      <div className="p-5">
        {artistData && (
          <div className="pb-8 flex items-center">
            <div className="m-8 w-300 h-400 overflow-hidden rounded-lg">
              <img
                className="object-cover rounded-lg hover:border-4 hover:border-blue-500 transition duration-300"
                src={artistData.object.artistImageUrl}
                alt="Artist"
                onClick={handleOpenArtistImg}
              />
            </div>
            <div className="w-1/2 pl-8 pt-4 pb-4">
              <div className="ps-2 text-gray-600 text-xs">
                {artistData.object.companyName}
              </div>
              <div className="flex items-center">
                <h3 className="ps-2 text-xl font-semibold ">
                  {artistData.object.name}
                </h3>
              </div>

              <div className="flex items-center justify-between mb-4"></div>
              <div className="bg-pink rounded mt-4 flex justify-center space-x-4  p-5">
                <div className="flex-1 text-center">
                  <p className="py-2 rounded-lg">예정</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {artistCountData.ready_COUNT}
                  </p>
                </div>
                <div className="flex-1 text-center">
                  <p className="py-2 rounded-lg">진행중</p>
                  <p className="text-sm text-gray-600 mt-2 border-l border-r border-gray-300">
                    {artistCountData.applying_COUNT}
                  </p>
                </div>
                <div className="flex-1 text-center">
                  <p className="py-2 rounded-lg">사인회</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {artistCountData.fansign_COUNT}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* 맴버 박스 */}
      <div className="h-[40%]">
        <div className="bar flex items-center mb-4 "></div>

        <div className="flex justify-center pb-2">
          <div className="text-xl border-b-2 ">Member</div>

          <button className="border-b-2 " onClick={handleOpenAddMember}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <div>
          {artistData && (
            <div className="m-3">
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
          onClose={handleCloseArtistImg}
        />
      )}
      {showAddMemberModal && <AddMemberModal onClose={handleCloseAddMember} />}
    </div>
  );
}
