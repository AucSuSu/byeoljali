import React, { useEffect, useState } from 'react';
import MemberList from '../Mypage/MemberList.jsx';
import AddMemberModal from '../Modal/AddMemberModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../../Stores/artistInfoReducer.js';
import { useLocation } from 'react-router-dom';
import useAxios from '../../axios.js';

import ArtistImgModal from '../Modal/ArtistImgModal.jsx';

export default function ArtistInfo() {
  const location = useLocation();
  const artistData = useSelector((state) => state.artistInfo.artistData);
  const { propsData } = location.state || {}; // 여기서 artistId를 꺼내쓰자!!
  const isArtist = useSelector((state) => state.auth.isArtist);
  const [artistCountData, setArtistCountData] = useState('');
  const [daysSinceDebut, setDaysSinceDebut] = useState('');
  const customAxios = useAxios();
  const dispatch = useDispatch();

  // 데뷔일로부터 경과한 일수를 계산하는 함수
  const calculateDaysSinceDebut = () => {
    if (artistData && artistData.object && artistData.object.debutDate) {
      const debutDate = new Date(artistData.object.debutDate);
      const today = new Date();
      const timeDiff = today - debutDate;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      setDaysSinceDebut(daysDiff);
    }
  };

  const getArtistInfoForFan = async () => {
    const response = await customAxios
      .get(`artists/` + propsData.artistId)
      .then((res) => {
        return res.data;
      });
    dispatch(getInfo(response));
  };

  const getArtistInfoForArtist = async () => {
    const response = await customAxios.get(`artists/`).then((res) => {
      return res.data;
    });
    dispatch(getInfo(response));
  };

  const getArtistCountDataForArtist = async () => {
    const result = await customAxios
      .get('artists/fansignCount/-1')
      .then((res) => {
        setArtistCountData(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getArtistCountDataForFan = async () => {
    const result = await customAxios
      .get('artists/fansignCount/' + propsData.artistId)
      .then((res) => {
        setArtistCountData(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isArtist) {
      // isArtist가 true일 때 실행
      getArtistInfoForArtist();
    } else {
      getArtistInfoForFan(); // isArtist가 false일 때 실행
    }
  }, []);

  // 데뷔일로부터 경과한 일수를 계산하는 함수 실행 부분을 별도의 useEffect로 분리
  // 이거 분리 안하고 위에 넣어주니까 dispatch 달린곳(getArtistInfo) 에서는 artistData가 무한 호출됩니다. 그래서 따로 분리해줬어요.
  useEffect(() => {
    if (isArtist) {
      // isArtist가 true일 때 실행
      getArtistCountDataForArtist();
    } else {
      getArtistCountDataForFan();
    }
    calculateDaysSinceDebut();
  }, [artistData]); // artistData가 변경될 때마다 경과 일수를 다시 계산합니다.

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

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-black text-white w-full">
      {artistData && (
        <div className="w-full lg:w-6/12 p-10 flex flex-col items-center">
          {/* 이미지 섹션 */}
          <div className="flex justify-center my-4">
            <img
              className="object-cover rounded-lg"
              src={artistData.object.artistImageUrl}
              alt="Artist"
            />
          </div>

          {/* 프로필 이미지 수정 버튼 */}
          {isArtist && (
            <button
              onClick={handleOpenArtistImg}
              className="mt-2 py-2 px-4 bg-gray text-white font-bold rounded hover:bg-dark-gray transition duration-300"
            >
              프로필 이미지 수정
            </button>
          )}

          {/* 아티스트 이름 섹션 */}
          <div className="text-center my-4">
            <h2 className="text-60 font-big">{artistData.object.name}</h2>
            <p className="font-ridi font-bold text-25">
              {artistData.object.companyName} Entertainment
            </p>
          </div>
        </div>
      )}

      {/* 오른쪽 섹션: 팬싸인회 정보, 멤버 목록 */}
      {artistData && (
        <div className="w-full lg:w-6/12 p-10 flex flex-col items-start">
          {/* 아티스트 정보 섹션 */}
          <div className="my-4">
            <p className="text-25 font-big">
              Debut : {artistData.object.debutDate} | D+{daysSinceDebut}
            </p>
            <p className="text-25 font-big">
              Fandom : {artistData.object.fandomName}
            </p>
          </div>
          <div className="w-full my-8">
            <div className="text-2xl font-big mb-4">FANSIGN INFO</div>
            <div className="font-big bg-gray h-auto rounded-lg shadow-lg p-5 flex justify-between items-center space-x-4">
              {/* 팬싸인회 정보 세부 내용 */}
              <div className="flex-1 text-center">
                <div className="py-2 rounded-lg text-xl">응모전</div>
                <div className="text-lg text-gray-800 mt-2">
                  {artistCountData.ready_COUNT}
                </div>
              </div>
              <div className="flex-1 text-center">
                <div className="py-2 rounded-lg text-xl ">응모중</div>
                <div className="text-lg text-gray-800 mt-2">
                  {artistCountData.applying_COUNT}
                </div>
              </div>
              <div className="flex-1 text-center">
                <div className="py-2 rounded-lg text-xl">진행중</div>
                <div className="text-lg text-gray-800 mt-2">
                  {artistCountData.fansign_COUNT}
                </div>
              </div>
            </div>
          </div>

          {/* 멤버 박스 섹션 */}
          <div className="w-full my-4">
            <div className="text-30 mb-2 font-big">Member</div>
            <div className="flex flex-wrap justify-center gap-4">
              {artistData.object.memberList.map((member) => (
                <MemberList key={member.memberId} data={member} />
              ))}
              {/* 멤버 추가 버튼 */}
              {isArtist && (
                <div className="m-2.5 ml-12 text-center inline-block">
                  <img
                    src="/addbutton.png"
                    alt="addMember"
                    style={{
                      width: '130px',
                      height: '130px',
                      borderRadius: '50%',
                      border: '2px solid white',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      marginBottom: '7px',
                    }}
                    onClick={handleOpenAddMember}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
