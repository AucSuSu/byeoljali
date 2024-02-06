import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ListItem from './HomeApplyListItem';

const HomeApplyList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const applyList = useSelector((state) => state.homeapply.data);

  // 현재 페이지에 표시할 아이템 결정
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(applyList?.object)
    ? applyList.object.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // 총 페이지 수 계산
  const totalItems = Array.isArray(applyList?.object)
    ? applyList.object.length
    : 0;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 페이지 이동 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 페이지 버튼 컴포넌트
  const PageButton = ({ isCurrent, pageNumber }) => (
    <button
      onClick={() => paginate(pageNumber)}
      className={`w-2.5 h-2.5 rounded-full mx-1 border-none ${isCurrent ? 'bg-hot-pink' : 'bg-gray'} text-white cursor-pointer focus:outline-none`}
      aria-label={`Go to page ${pageNumber}`}
    />
  );

  return (
    <div>
      <div className="ml-14">
        {Array.isArray(currentItems) &&
          currentItems.map((item, index) => (
            <ListItem key={index} data={item} />
          ))}
      </div>
      <nav>
        <ul className="pagination flex justify-center list-none p-0">
          {pageNumbers.map((number) => (
            <li key={number} className="list-none">
              <PageButton
                pageNumber={number}
                isCurrent={number === currentPage}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HomeApplyList;
