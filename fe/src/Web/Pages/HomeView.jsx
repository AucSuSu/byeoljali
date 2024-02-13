// HomeView.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../Stores/fanInfoReducer';
import useAxios from '../axios';
import Navbar from '../Utils/NavBar';
import HomeApplyList from '../Home/HomeApplyList';
import NewCarousel from '../Home/remake/NewCarousel';
import { carouselImage } from '../data';

// Reducer 추가
import {
  beforeApplyList,
  afterApplyList,
} from '../Stores/homeApplyListReducer';
import {
  getArtistLogo
}from '../Stores/homeArtistLogoReducer';

const HomeView = () => {
  const afterData = useSelector((state) => state.homeapply.afterData); // 응모 중 데이터 redux에서 꺼내기
  const beforeData = useSelector((state) => state.homeapply.beforeData); // 응모 전 데이터 redux에서 꺼내기
  const items = useSelector((state) => state.artistLogo.artistLogo); // 로고 꺼내기


  const customAxios = useAxios();
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  // 최초 렌러딩 시 data 불러오기
  useEffect(() => {
    loadAfterData();
    loadBeforeData();
    getUserInfoData();
    getLogoData();

    const container = containerRef.current;
    let isHovered = false;

    const scrollInterval = setInterval(() => {
      if (container && !isHovered) {
        container.scrollLeft += 1; // 스크롤 간격 조절 가능

        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth
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
    console.log('응모중', data);
    dispatch(afterApplyList(data));
  };

  const loadBeforeData = async () => {
    const data = await customAxios
      .get('mainpage?searchKeyword=&order=register&status=READY_APPLYING')
      .then((res) => {
        return res.data;
      });
    console.log('응모전', data);
    dispatch(beforeApplyList(data));
  };

  // 로고 가져오기 
  const getLogoData = async () => {
    const data = await customAxios.get('artists/logo/').then((res) => {
      return res.data.object;
    });
    console.log("데이터 받아오기 : ", data)
    dispatch(getArtistLogo(data))
  };

  // 가져온 data 앞에서 8개만 선택하기
  const [sliceAfterItems, setSliceAfterItems] = useState(null);
  const [sliceBeforeItems, setSliceBeforeItems] = useState(null);
  useEffect(() => {
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
  return (
    <>
      <div id="main_container" className="flex flex-col bg-black font-jamsil">
        {/* 1. Navbar */}
        <Navbar />
        {/* 2. Post Carousel */}
        <div className="w-[80%] mx-[10%]">
          <NewCarousel datas={carouselImage} />
        </div>

        {/* 3. Current Apply  */}
        <div className="flex items-center justify-center p-4 h-40">
          <div
            ref={containerRef}
            className="flex overflow-x-auto p-1 justify-center items-center"
            style={{ width: "100%" }} // 부모 컨테이너의 너비를 100%로 설정
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
                    e.target.style.transform = "scale(1.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
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
                      flexDirection: "column", // 이미지를 세로로 정렬하기 위해 컨테이너의 방향을 column으로 설정
                      display: "flex", // 이미지 컨테이너를 flex로 설정
                      justifyContent: "center"

                    }}
                  >
                    <img src={artist.logoImageUrl}
                    style={{
                      width : '70%',
                      height : '70%'
                    }}></img>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div className="w-[80%] ml-[10%] text-white flex justify-between mb-4 text-18">
            <p> CURRENT APPLYING</p>
            <button onClick={moveCurrentApplyView}>더보기 ▶</button>
          </div>
          <HomeApplyList data={sliceAfterItems} status="CurrentApply" />
        </div>
        {/* 4. Artist 넣어주세요 ~~~~  */}
        <div className="w-[80%] ml-[10%] text-white mb-10">
          아티스트 올 예정
        </div>
        {/* 5. Comming Soon */}
        <div className="w-[80%] ml-[10%] text-white flex justify-between mb-4 text-18">
          <p> COMMING SOON</p>
          <button onClick={moveCommingSoonView}>더보기 ▶</button>
        </div>
        <HomeApplyList data={sliceBeforeItems} status="CommingSoon" />
      </div>
    </>
  );
};


export default HomeView;
