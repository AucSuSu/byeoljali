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
`;

// SearchInputContainer 스타일 컴포넌트를 정의합니다.
const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 10px;
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
            <HomeApplyList data={searchData.object} status="CurrentApply" />
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default SearchPage;
