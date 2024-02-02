import React, { useEffect } from 'react';

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

  if (Array.isArray(photoData)) {
    // photoData is an array, safe to use .map()
    return (
      <div>
        <NavBar isFan={true} />
        {/* 검색창+검색버튼 / 결제전 결제후 토글 */}
        <div className="search-and-filter">
          <div className="search-container">
            <input
              type="text"
              placeholder="검색 키워드를 입력하세요"
              value={searchKeyword}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearchSubmit}>검색</button>
          </div>
          <div className="pay-status-toggle">
            <select value={payStatus} onChange={handlePayStatusChange}>
              <option value="all">모두 보기</option>
              <option value="paid">결제 완료</option>
              <option value="unpaid">결제 전</option>
            </select>
          </div>
        </div>
        {/* 사진 컴포넌트 리스트 */}
        {photoData.map((data, index) => (
          <FanPhoto key={index} data={data} />
        ))}
      </div>
    );
  } else {
    // Handle the case when photoData is not an array
    return <div>Loading or No photos available...</div>;
  }
}

export default FanPhotoView;
