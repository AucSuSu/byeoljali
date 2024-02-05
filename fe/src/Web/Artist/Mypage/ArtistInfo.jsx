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
  const [name, setName] = useState('susu');
  const testSocket = (e) => {
    e.preventDefault();
    setSocketOpen(!socketOpen);
  };

  return (
    <div className="h-screen flex flex-col font-milk font-bold">
      {/* <div>
        <label>번호</label>
        <input
          className="border-4"
          type="text"
          value={portNumber}
          onChange={(e) => setPortNumber(e.target.value)}
        />
        <label>이름</label>
        <input
          className="border-4"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={testSocket}>소켓 테스트</button>
      </div>
      {socketOpen && <Socket memberFansignId={portNumber} name={name} />} */}
      <div className="p-5 h-[1/2*full]">
        {artistData && (
          <div className="pb-8 flex items-center">
            <div className="w-1/2 m-7 object-cover rounded-lg mb-8">
              <img
                className="object-cover rounded-lg hover:border-4 hover:border-blue-500 transition duration-300"
                src={artistData.object.artistImageUrl}
                alt="Artist"
                onClick={handleImageClick}
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

      <div className="flex-1">
        <div className="bar flex justify-between items-center mb-4 ">
          <div className="text-2xl font-bold mx-auto border-b p-2">
            <p className=""> Members </p>
          </div>
          <AddMemberModal className="ml-auto" />
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
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
