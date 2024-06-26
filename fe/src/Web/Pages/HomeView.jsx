// HomeView.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../Stores/fanInfoReducer';
import useAxios from '../axios';
import Navbar from '../Utils/NavBar';
import HomeApplyList from '../Home/HomeApplyList';
import NewCarousel from '../Home/remake/NewCarousel';

// Reducer 추가
import {
  beforeApplyList,
  afterApplyList,
} from '../Stores/homeApplyListReducer';
import { getArtistLogo } from '../Stores/homeArtistLogoReducer';

const HomeView = () => {
  const [stars, setStars] = useState([]);
  const afterData = useSelector((state) => state.homeapply.afterData); // 응모 중 데이터 redux에서 꺼내기
  const beforeData = useSelector((state) => state.homeapply.beforeData); // 응모 전 데이터 redux에서 꺼내기
  const items = useSelector((state) => state.artistLogo.artistLogo); // 로고 꺼내기
  const [carouselData, setCarouselData] = useState([]); // 캐러셀에 들어갈 데이터를 저장할 곳
  const customAxios = useAxios();
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  // 최초 렌러딩 시 data 불러오기
  useEffect(() => {
    loadAfterData();
    loadBeforeData();
    getUserInfoData();
    getLogoData();
    getCarouselData();

    // 별 가루
    const makeStars = () => {
      const numStars = 200; // 원하는 별의 개수

      const newStars = Array.from({ length: numStars }, (_, index) => ({
        id: index,
        left: Math.random() * 100 + 'vw', // 랜덤한 가로 위치
        top: Math.random() * 100 + 'vh', // 랜덤한 세로 위치
        animationDuration: Math.random() * 1 + 0.5 + 's', // 랜덤한 애니메이션 속도
        textColor: 'yellow',
      }));

      setStars(newStars);
    };

    makeStars();

    // 일정 시간마다 별의 위치를 재설정
    const intervalId = setInterval(() => {
      makeStars();
    }, 5000);

    const container = containerRef.current;
    let isHovered = false;

    const scrollInterval = setInterval(() => {
      if (container && !isHovered) {
        container.scrollLeft += 1; // 스크롤 간격 조절 가능

        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth + -0.3
        ) {
          // 스크롤이 끝에 도달했을 때 처음으로 돌아가기
          container.scrollLeft = 0;
        }
      }
    }, 20); // 스크롤 속도 조절 가능

    // 호버 시 스크롤 멈추기
    container.addEventListener('mouseenter', () => {
      isHovered = true;
    });

    // 호버 해제 시 스크롤 다시 시작
    container.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    // 컴포넌트가 언마운트될 때 인터벌을 해제합니다.
    return () => {
      clearInterval(scrollInterval);
      container.removeEventListener('mouseenter', () => {
        isHovered = true;
      });
      container.removeEventListener('mouseleave', () => {
        isHovered = false;
      });
    };
  }, []);

  const getUserInfoData = async () => {
    const data = await customAxios.get('mypage/').then((res) => {
      return res.data.object;
    });
    dispatch(getUserInfo(data));
  };

  const loadAfterData = async () => {
    const data = await customAxios
      .get('mainpage?searchKeyword=&order=register&status=APPLYING')
      .then((res) => {
        return res.data;
      });
    dispatch(afterApplyList(data));
  };

  const loadBeforeData = async () => {
    const data = await customAxios
      .get('mainpage?searchKeyword=&order=register&status=READY_APPLYING')
      .then((res) => {
        return res.data;
      });
    dispatch(beforeApplyList(data));
  };

  // 로고 가져오기
  const getLogoData = async () => {
    const data = await customAxios.get('artists/logo/').then((res) => {
      return res.data.object;
    });
    dispatch(getArtistLogo(data));
  };

  // 가져온 data 앞에서 8개만 선택하기
  const [sliceAfterItems, setSliceAfterItems] = useState(null);
  const [sliceBeforeItems, setSliceBeforeItems] = useState(null);
  useEffect(() => {
    const makeStars = () => {
      const numStars = 800; // 원하는 별의 개수

      const newStars = Array.from({ length: numStars }, (_, index) => ({
        id: index,
        animationDuration: Math.random() * 1 + 0.5 + 's', // 랜덤한 애니메이션 속도
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
      }));
    };

    makeStars();

    const sliceData = Array.isArray(afterData?.object)
      ? afterData.object.slice(0, 8)
      : [];
    setSliceAfterItems(sliceData);
  }, [afterData]);

  useEffect(() => {
    const sliceData = Array.isArray(beforeData?.object)
      ? beforeData.object.slice(0, 8)
      : [];
    setSliceBeforeItems(sliceData);
  }, [beforeData]);

  // 더보기 시 이동
  const navigate = useNavigate();
  const moveCurrentApplyView = () => {
    navigate('/current-apply');
  };
  const moveCommingSoonView = () => {
    navigate('/comming-soon');
  };

  // 아티스트 상세보기로 이동
  const artistDetail = async (artistId) => {
    navigate('/artist-profile', {
      state: {
        propsData: {
          artistId: artistId,
        },
      },
    });
  };

  // 캐러셀 데이터 가져오기.
  const getCarouselData = async () => {
    const data = await customAxios.get('mainpage/recent').then((res) => {
      return res.data;
    });
    setCarouselData(data.object);
  };

  return (
    <>
      <div
        id="main_container"
        className="relative flex flex-col bg-black font-jamsil overflow-hidden "
      >
        {/* 1. Navbar */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              animationDuration: star.animationDuration,
              zIndex: '0',
            }}
          ></div>
        ))}
        <Navbar />

        {/* 2. Post Carousel */}
        <div className="w-[70%] mx-[15%]">
          <NewCarousel datas={carouselData} />
          {/* <OldCarousel datas={carouselData} /> */}
        </div>

        {/* 3. Current Apply  */}
        <div className="flex items-center justify-center p-4 h-40">
          <div
            ref={containerRef}
            className="flex overflow-hidden p-1 justify-center items-center"
            style={{ width: '100%' }} // 부모 컨테이너의 너비를 100%로 설정
          >
            {Array.isArray(items) &&
              items.map((artist, index) => (
                <div //하나의 멤버
                  key={artist.artistId}
                  onClick={() => artistDetail(artist.artistId)}
                  className="mr-4 inline-block justify-center transition-transform transform-gpu" // inline-block 클래스 추가
                  style={{
                    fontFamily: artist.font,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <div
                    className="mt-2 text-center text-white"
                    style={{
                      width: '103px',
                      height: '103px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      flexDirection: 'column', // 이미지를 세로로 정렬하기 위해 컨테이너의 방향을 column으로 설정
                      display: 'flex', // 이미지 컨테이너를 flex로 설정
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={artist.logoImageUrl}
                      style={{
                        width: '70%',
                        height: '70%',
                      }}
                    ></img>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* 4.Current Apply  */}
        <div>
          <p className="w-[80%] ml-[10%] text-white mt-3 text-35">
            CURRENT APPLY
          </p>
          <button
            onClick={moveCurrentApplyView}
            className=" text-white w-[80%] ml-[10%] mb-2 text-right hover:scale-110 hover:text-hot-pink hover:ml-[6%] "
          >
            더보기 ▶
          </button>
          <HomeApplyList data={sliceAfterItems} status="CurrentApply" />
        </div>

        {/* 5. Comming Soon */}
        <p className="w-[80%] ml-[10%] text-white mt-3 text-35">
          {' '}
          COMMING SOON
        </p>
        <button
          onClick={moveCommingSoonView}
          className=" text-white w-[80%] ml-[10%] mb-2 text-right hover:scale-110 hover:text-hot-pink hover:ml-[6%] "
        >
          더보기 ▶
        </button>
        <HomeApplyList data={sliceBeforeItems} status="CommingSoon" />
      </div>
    </>
  );
};

export default HomeView;
