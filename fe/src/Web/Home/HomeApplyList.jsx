import React, { useState } from 'react';
import ListItem from './HomeApplyListItem';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// 스타일드 컴포넌트를 사용하여 페이지네이션 버튼 스타일 정의
const PageButton = styled.button`
  width: 20px; // 버튼의 너비 조정
  height: 20px; // 버튼의 높이 조정
  border-radius: 50%; // 동그랗게 만들기
  margin: 0 5px; // 좌우 마진
  border: none; // 테두리 제거
  background-color: ${(props) =>
    props.isCurrent
      ? '#FF6D79'
      : 'gray'}; // 현재 페이지는 hotpink, 나머지는 gray
  color: white; // 글자 색상
  cursor: pointer;

  &:focus {
    outline: none; // 클릭 시 테두리 없앰
  }

  // 숫자 대신 tooltip 혹은 aria-label을 사용하여 접근성 향상 (옵션)
  &:hover {
    background-color: ${(props) =>
      props.isCurrent ? '#FF6D79' : '#bbb'}; // 호버 시 색상 변경
  }
`;

const HomeApplyList = () => {
  const applyList = useSelector((state) => state.homeapply.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applyList?.object.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(applyList?.object.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="ml-14">
        {Array.isArray(currentItems) &&
          currentItems.map((item, index) => (
            <ListItem key={index} data={item} />
          ))}
      </div>
      <nav>
        <ul
          className="pagination"
          style={{
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          {pageNumbers.map((number) => (
            <li key={number} style={{ listStyleType: 'none' }}>
              <PageButton
                onClick={() => paginate(number)}
                isCurrent={number === currentPage}
                aria-label={`Go to page ${number}`} // 접근성 향상을 위한 레이블
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HomeApplyList;
