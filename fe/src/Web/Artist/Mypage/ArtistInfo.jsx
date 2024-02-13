import React, { useEffect, useState } from 'react';
import MemberList from '../Mypage/MemberList.jsx';
import AddMemberModal from '../Modal/AddMemberModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../../Stores/artistInfoReducer.js';
import { useLocation } from 'react-router-dom';
import useAxios from '../../axios.js';
import Loading from '../../Home/Loading.jsx';
import ArtistImgModal from '../Modal/ArtistImgModal.jsx';
import { PlusCircleIcon } from '@heroicons/react/24/solid'; // 솔리드 스타일 아이콘

export default function ArtistInfo() {
  const location = useLocation();

  const artistData = useSelector((state) => state.artistInfo.artistData);
  const { propsData } = location.state || {}; // 여기서 artistId를 꺼내쓰자!!
  const isArtist = useSelector((state) => state.auth.isArtist);
  const [artistCountData, setArtistCountData] = useState('');
  const [daysSinceDebut, setDaysSinceDebut] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
    const fetchData = async () => {
      setIsLoading(true); // 데이터 로딩 시작
      try {
        if (isArtist) {
          await getArtistInfoForArtist();
        } else {
          await getArtistInfoForFan();
        }
      } finally {
        setIsLoading(false); // 데이터 로딩 완료
      }
    };
    fetchData();
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

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen bg-black text-white w-full">
      <div className="flex justify-between">
        {/* 왼쪽 섹션: 아티스트 이미지 */}
        {artistData && (
          <div className="w-full flex flex-col items-center">
            <div className="flex justify-center my-4">
              <img
                className="object-cover rounded-lg w-[600px] h-[380px]"
                src={artistData.object.artistImageUrl}
                alt="Artist"
              />
            </div>
          </div>
        )}

        {/* 오른쪽 섹션: 아티스트 정보*/}
        {artistData && (
          <div className="w-full flex flex-col items-start mr-16 font-jamsil">
            {/* 아티스트 이름 섹션 */}
            <div className="mt-2 flex space-x-5 items-center">
              <div className="flex-grow">
                <h2 className="text-[50px] font-jamsil">
                  {artistData.object.name}
                </h2>
                <p className="text-[30px]">
                  {artistData.object.companyName} Entertainment
                </p>
              </div>
              <div className="flex-shrink-0">
                <img
                  className="object-cover rounded-lg"
                  src={artistData.object.logoImageUrl}
                  alt="Logo"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            </div>

            {/* 팬싸인회 정보 세부 내용 */}
            <div className="w-full">
              {/* 이미지 수정 버튼을 오른쪽에 배치하기 위한 컨테이너 */}
              <div className="flex justify-end">
                {isArtist && (
                  <button
                    onClick={handleOpenArtistImg}
                    className="text-white font-bold rounded hover:bg-gray-700 transition duration-300 hover:text-hot-pink"
                  >
                    Edit Image ▶
                  </button>
                )}
              </div>
              <div className="h-auto border-4 border-dark-gray rounded-xl py-7 pl-10 pr-10 flex justify-between items-center space-x-4 text-[25px]">
                <div className="flex text-center">
                  <div className="">응모전</div>
                  <div className="font-light ml-4">
                    {artistCountData.ready_COUNT}
                  </div>
                </div>
                <div className="text-dark-gray"> | </div>
                <div className="flex text-center">
                  <div className="">응모중</div>
                  <div className="font-light ml-4">
                    {artistCountData.applying_COUNT}
                  </div>
                </div>
                <div className="text-dark-gray"> | </div>
                <div className="flex text-center">
                  <div className="">진행중</div>
                  <div className="font-light ml-4">
                    {artistCountData.fansign_COUNT}
                  </div>
                </div>
              </div>
            </div>

            {/* 아티스트 정보 섹션 */}
            <div className="my-4 mt-8">
              <div className="text-25">
                <div className="flex">
                  <p>데뷔일 : </p>
                  <p className="pl-2 font-light">
                    {artistData.object.debutDate}
                  </p>
                  <p className="pl-4">| </p>
                  <p className="pl-4">D+</p>
                  <p className="font-light">{daysSinceDebut}</p>
                </div>
                <div className="flex">
                  <p>팬덤명 : </p>
                  <p className="pl-2 font-light">
                    {artistData.object.fandomName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 아티스트 이미지 수정 모달 띄웠다 껐다 하려고 */}
        {showArtistImgModal && (
          <ArtistImgModal
            artistImageUrl={artistData.object.artistImageUrl}
            logoImageUrl={artistData.object.logoImageUrl}
            onClose={handleCloseArtistImg}
          />
        )}
        {showAddMemberModal && (
          <AddMemberModal onClose={handleCloseAddMember} />
        )}
      </div>
      {/* 멤버 리스트 섹션 */}
      <div className="max-w-full mx-auto my-4 text-center border-2 border-dark-gray rounded-xl">
        <div className="text-30 mt-2 mb-2 font-jamsil text-white">Members</div>
        <div className="flex flex-wrap justify-center gap-4">
          {artistData.object.memberList.map((member) => (
            <MemberList key={member.memberId} data={member} />
          ))}
          {/* 멤버 추가 버튼 */}
          {/* 멤버 추가 버튼 */}
          {isArtist && (
            <div
              className="m-2.5 mr-8 text-center inline-block cursor-pointer"
              onClick={handleOpenAddMember}
            >
              <PlusCircleIcon className="h-32 w-32 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
