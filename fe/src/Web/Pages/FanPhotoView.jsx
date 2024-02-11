import React, { useEffect, useState } from 'react';

import FanPhoto from '../Fan/FanPhoto';
import { useSelector, useDispatch } from 'react-redux';

import { getUserPhoto } from '../Stores/fanPhotoReducer';
import useAxios from '../axios';
import NavBar from '../Utils/NavBar';

function FanPhotoView() {
  const customAxios = useAxios();
  // axios.get으로 유저의 인생네컷을 모두 받았다고 가정\
  const photoData = useSelector((state) => state.fanphoto.data);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserAllPhotoData();
  }, []);

  const getUserAllPhotoData = async () => {
    const data = await customAxios
      .get('myalbum?searchKeyword&payOrNot')
      .then((res) => {
        console.log('내 모든 인생네컷 조회 성공', res.data);
        return res.data.object;
      });
    dispatch(getUserPhoto(data));
  };

  const getUserSearchPhotoData = async (searchWord) => {
    const data = await customAxios
      .get(`myalbum?searchKeyword=${searchWord}&payOrNot`)
      .then((res) => {
        console.log(
          '내 검색키워드 :',
          searchWord,
          '인생네컷 조회 성공 :',
          res.data,
        );
        return res.data.object;
      });
    dispatch(getUserPhoto(data));
  };

  const getUserPayedPhotoData = async (payStatus) => {
    const data = await customAxios
      .get(`myalbum?searchKeyword&payOrNot=${payStatus}`)
      .then((res) => {
        console.log(
          '내 결제여부 :',
          payStatus,
          '인생네컷 조회 성공 :',
          res.data,
        );
        return res.data.object;
      });
    dispatch(getUserPhoto(data));
  };

  // css용 임시 데이터

  const [searchKeyword, setSearchKeyword] = useState('');
  const [payStatus, setPayStatus] = useState(null); // 'Y' 또는 'N'

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = () => {
    getUserSearchPhotoData(searchKeyword);
  };

  const handlePayStatusChange = (e) => {
    const status = e.target.value; // 'all', 'Y', 'N'
    setPayStatus(status);
    if (status === 'Y' || status === 'N') {
      getUserPayedPhotoData(status);
    } else {
      getUserAllPhotoData(); // 모든 사진을 다시 불러옵니다.
    }
  };

  // 엔터로 검색하는 기능
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // form 제출을 방지하여 페이지가 새로고침되는 것을 막습니다.
      handleSearchSubmit();
    }
  };

  if (Array.isArray(photoData)) {
    return (
      <>
        <div className="w-[80%] ml-[10%]">
          <NavBar />
          <div className="mt-12 ml-24 mr-14 font-milk font-bold">
            <div className="flex items-center justify-between mt-6 mb-6">
              <div>
                <div className="text-3xl bolder mb-2 text-white">내 앨범</div>
                <div className="text-dark-gray">
                  {photoData.length} 개의 당첨 내역을 보유 하고 있습니다.
                </div>
                <div className="pt-2 text-dark-gray">
                  구매 후 사진 열람 / 다운로드가 가능합니다
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <input
                  type="text"
                  placeholder="검색 키워드를 입력하세요"
                  className="input border rounded w-full py-2 px-3"
                  value={searchKeyword}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="w-auto btn font-bold pr-2 rounded  "
                  onClick={handleSearchSubmit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
                <select
                  className="select border rounded py-2 px-3"
                  value={payStatus || ''}
                  onChange={handlePayStatusChange}
                >
                  <option value="">모두 보기</option>
                  <option value="Y">결제 완료</option>
                  <option value="N">결제 전</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-[86%] ml-[7%]">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 border-2 border-dark-gray rounded-md">
              {data.map((data, index) => (
                <FanPhoto key={index} data={data} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    // Handle the case when photoData is not an array
    return <div>Loading or No photos available...</div>;
  }
}

export default FanPhotoView;
