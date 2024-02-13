import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../axios';
import styled from 'styled-components';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { searchApplyList } from '../Stores/homeApplyListReducer';
import HomeApplyList from '../Home/HomeApplyList';
//Navbar
import Navbar from '../Utils/NavBar';

// 최상위 컨테이너 스타일 정의
const PageContainer = styled.div`
  background-color: black;
  color: black;
  min-height: 100vh; // 화면 전체 높이
  font-family: 'Big Shoulders Display', cursive; // 예시 폰트, 실제 프로젝트에 맞게 조정 필요
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 8px;
  width: 100%; // 너비를 100%로 설정하여 컨테이너를 꽉 채우도록 함
  background-color: transparent; // 배경색을 투명으로 설정
  border-radius: 9999px; // 둥근 테두리를 적용하여 SearchFieldWrapper와 일치시킴
`;

// SearchFieldWrapper 스타일 컴포넌트를 정의합니다. 이 컴포넌트는 검색 필드와 아이콘을 감싸는 역할을 합니다.
const SearchFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 9999px;
  padding: 4px 8px;
  margin-top: 30px;
  width: 80%; // 전체 컨테이너의 80% 너비를 차지하도록 설정
  max-width: 800px; // 최대 너비를 800px로 설정
  position: relative; // 여기에 추가
`;

// SearchInputContainer 스타일 컴포넌트를 정의합니다.
const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 10px;
`;

// "X" 버튼을 위한 스타일 컴포넌트
const ClearSearchButton = styled.div`
  position: absolute;
  right: 40px; // MagnifyingGlassIcon과 겹치지 않도록 적절한 값으로 조절
  cursor: pointer;
  color: gray; // 아이콘 색상 조절
`;

// SearchResultsContainer 스타일 컴포넌트 정의
const SearchResultsContainer = styled.div`
  width: 80%;
  margin: 0 auto; // 중앙 정렬
  border: 4px solid #333; // 예시 border 색상
  border-radius: 10px;
  padding: 20px; // 내부 여백
  margin-top: 30px; // 상단 여백
`;

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchData = useSelector((state) => state.homeapply.searchData);
  const customAxios = useAxios();
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // SearchPage 컴포넌트가 마운트될 때 검색 결과를 빈 배열로 초기화
    dispatch(searchApplyList([]));

    // 여기에 다른 마운트 시 필요한 로직 추가 가능
  }, [dispatch]);

  const searchAfterData = async () => {
    if (!searchTerm) return; // 검색어가 비어있으면 검색하지 않음
    const data = await customAxios
      .get(
        `mainpage?searchKeyword=${encodeURIComponent(
          searchTerm,
        )}&order=register&status=APPLYING`,
      )
      .then((res) => {
        return res.data;
      });
    console.log('검색어 응모중', data);
    dispatch(searchApplyList(data));
  };

  // 아이콘 클릭 이벤트 핸들러
  const handleIconClick = () => {
    searchAfterData(); // 검색 함수 호출
  };

  // 엔터 키 입력 이벤트 핸들러
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 폼 제출 등의 기본 이벤트 방지
      searchAfterData(); // 검색 함수 호출
    }
  };

  return (
    <PageContainer>
      <div className="bg-black font-jamsil">
        {/* 1. Navbar */}
        <Navbar />
        <SearchInputContainer>
          <SearchFieldWrapper>
            <SearchInput
              type="text"
              placeholder="좋아하는 아티스트를 입력해보세요!"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            {searchTerm && (
              <ClearSearchButton onClick={() => setSearchTerm('')}>
                <XCircleIcon className="w-5 h-5 hover:text-hot-pink" />
              </ClearSearchButton>
            )}
            <MagnifyingGlassIcon
              className="w-6 h-6 hover:text-hot-pink cursor-pointer"
              aria-hidden="true"
              onClick={handleIconClick}
            />
          </SearchFieldWrapper>
        </SearchInputContainer>

        {searchData && searchData.object && searchData.object.length > 0 ? (
          <HomeApplyList
            data={searchData.object}
            status="CurrentApply"
            style="border-4 border-dark-gray rounded-xl mt-[30px] p-[20px]"
          />
        ) : (
          <SearchResultsContainer>
            (
            <div className="text-white text-[30px] text-center pt-[170px] pb-[170px]">
              검색 결과가 없습니다.
            </div>
            )
          </SearchResultsContainer>
        )}
      </div>
    </PageContainer>
  );
}

export default SearchPage;
