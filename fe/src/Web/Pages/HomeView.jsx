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

const HomeView = () => {
  const afterData = useSelector((state) => state.homeapply.afterData); // 응모 중 데이터 redux에서 꺼내기
  const beforeData = useSelector((state) => state.homeapply.beforeData); // 응모 전 데이터 redux에서 꺼내기
  const customAxios = useAxios();
  const dispatch = useDispatch();
  // 아티스트명
  const items = [
    { name: 'Item 1', font: 'Arial, sans-serif' },
    { name: 'Item 2', font: 'Georgia, serif' },
    { name: 'Item 3', font: 'Verdana, sans-serif' },
    { name: 'Item 4', font: 'Courier New, monospace' },
    { name: 'Item 5', font: 'Impact, sans-serif' },
    { name: 'Item 1', font: 'Arial, sans-serif' },
    { name: 'Item 2', font: 'Georgia, serif' },
    { name: 'Item 3', font: 'Verdana, sans-serif' },
    { name: 'Item 4', font: 'Courier New, monospace' },
    { name: 'Item 5', font: 'Impact, sans-serif' },
    { name: 'Item 1', font: 'Arial, sans-serif' },
    { name: 'Item 2', font: 'Georgia, serif' },
    { name: 'Item 3', font: 'Verdana, sans-serif' },
    { name: 'Item 4', font: 'Courier New, monospace' },
    { name: 'Item 5', font: 'Impact, sans-serif' },
    { name: 'Item 1', font: 'Arial, sans-serif' },
    { name: 'Item 2', font: 'Georgia, serif' },
    { name: 'Item 3', font: 'Verdana, sans-serif' },
    { name: 'Item 4', font: 'Courier New, monospace' },
    { name: 'Item 5', font: 'Impact, sans-serif' },
  ];
  const containerRef = useRef(null);

  // 최초 렌러딩 시 data 불러오기
  useEffect(() => {
    loadAfterData();
    loadBeforeData();
    getUserInfoData();

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
  return (
    <>
      <div id="main_container" className="flex flex-col bg-black font-big">
        {/* 1. Navbar */}
        <Navbar />
        {/* 2. Post Carousel */}
        <div className="w-[80%] mx-[10%]">
          <NewCarousel datas={carouselImage} />
        </div>

        {/* 3. Current Apply  */}
        <div className="flex items-center p-4 h-40">
          <div
            ref={containerRef}
            className="flex overflow-x-auto p-1 items-center"
          >
            {Array.isArray(items) &&
              items.map((artist, index) => (
                <div //하나의 멤버
                  key={index}
                  onClick={() => select(index, artist)}
                  className="mr-4 inline-block" // inline-block 클래스 추가
                  style={{
                    fontFamily: artist.font,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'font-size 0.3s ease', // 글씨 크기 변경 시 부드러운 애니메이션 효과
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.fontSize = '24px'; // 호버 시 글씨 크기 변경
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.fontSize = '16px'; // 호버 해제 시 글씨 크기 원래대로
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
                    }}
                  >
                    {artist.name}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div className="w-[80%] ml-[10%] text-white flex justify-between mb-4 text-18">
            <p> CURRENT APPLY</p>
            <button
              onClick={moveCurrentApplyView}
              className="hover:scale-110 hover:text-hot-pink"
            >
              더보기 ▶
            </button>
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
          <button
            onClick={moveCommingSoonView}
            className="hover:scale-110 hover:text-hot-pink"
          >
            더보기 ▶
          </button>
        </div>
        <HomeApplyList data={sliceBeforeItems} status="CommingSoon" />
      </div>
    </>
  );
};

export default HomeView;
