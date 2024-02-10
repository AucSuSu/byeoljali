import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../axios';
import styled from 'styled-components';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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

// SearchInput 스타일 컴포넌트를 정의합니다. 이 컴포넌트는 검색 입력 필드에 스타일을 적용합니다.
const SearchInput = styled.input`
  flex: 1; // Flex 아이템이 컨테이너 내에서 가능한 많은 공간을 차지하도록 설정
  border: none; // 테두리 없음
  outline: none; // 포커스 아웃라인 제거
  padding: 8px; // 내부 여백
  width: 400px;
`;

// SearchFieldWrapper 스타일 컴포넌트를 정의합니다. 이 컴포넌트는 검색 필드와 아이콘을 감싸는 역할을 합니다.
const SearchFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white; // 배경색 설정
  border-radius: 9999px; // 둥근 테두리
  padding: 4px 8px; // 패딩
  margin-top: 30px;
`;

// SearchInputContainer 스타일 컴포넌트를 정의합니다.
const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 20px;
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
    searchAfterData();
  }, []);

  const searchAfterData = async () => {
    if (!searchTerm) return; // 검색어가 비어있으면 검색하지 않음
    const data = await customAxios
      .get(
        'mainpage?searchKeyword=' +
          searchTerm +
          '&order=register&status=APPLYING',
      )
      .then((res) => {
        return res.data;
      });
    console.log('검색어 응모중', data);
    dispatch(searchApplyList(data));
  };

  // 아이콘 클릭 이벤트 핸들러 수정
  const handleIconClick = () => {
    searchAfterData(); // 검색 함수 호출
  };

  return (
    <PageContainer>
      <div className="bg-black font-big">
        {/* 1. Navbar */}
        <Navbar />
        <SearchInputContainer>
          <SearchFieldWrapper>
            <SearchInput
              type="text"
              placeholder="좋아하는 아티스트를 입력해보세요!"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <MagnifyingGlassIcon
              className="w-6 h-6 hover:text-hot-pink cursor-pointer"
              aria-hidden="true"
              onClick={handleIconClick}
            />
          </SearchFieldWrapper>
        </SearchInputContainer>

        {/* 검색 결과 출력 */}
        <div className="mt-8">
          {searchData && (
            <HomeApplyList data={searchData} status="CurrentApply" />
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default SearchPage;
