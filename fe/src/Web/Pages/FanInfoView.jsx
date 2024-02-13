import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../Stores/fanInfoReducer';
import useAxios from '../axios';
import FanAuthModal from '../Fan/FanAuthModal';
import NavBar from '../Utils/NavBar';

function FanInfoView() {
  const customAxios = useAxios();
  const userData = useSelector((state) => state.faninfo.data);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfoData();
  }, []);

  const getUserInfoData = async () => {
    const data = await customAxios.get('mypage/').then((res) => {
      return res.data.object;
    });
    dispatch(getUserInfo(data));
  };

  const [localUserData, setLocalUserData] = useState({
    nickname: userData.nickname,
    name: userData.name,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData.profileImageUrl); // 미리보기 URL을 위한 상태
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fileInputRef = useRef(); // 파일 입력을 위한 ref

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalUserData({ ...localUserData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);

      // FileReader를 사용하여 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation(); // 모달 내부 클릭시 이벤트 버블링 방지
  };

  const editUserInfoData = async (data) => {
    await customAxios
      .put('mypage/edit/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('업로드 성공', response.data);
        onClose(); // 모달 닫기
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 413) {
          alert('이미지의 용량을 1MB 이하로 낮춰주세요');
        }
        console.error('Error uploading the image: ', error);
      });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.keys(localUserData).forEach((key) => {
      formData.append(key, localUserData[key]);
    });
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    console.log(formData);
    editUserInfoData(formData); // 서버에 데이터 전송
  };

  return (
    <div>
      <NavBar />
      <div
        className="font-isa text-white min-h-screen bg-black flex flex-col items-center"
        onClick={handleModalContentClick}
      >
        <div className="self-start ml-[150px]">
          <div className="text-[30px] mb-4">[ 프로필 수정 ]</div>
        </div>

        {/* 프로필 내용 */}
        <div className="border-4 border-dark-gray rounded-xl pl-20 pr-20 pt-2 pb-2">
          {/* 이미지와 이름 필드를 가로로 나열하되, 상단 정렬을 위해 별도의 스타일 적용 */}
          <div className="flex items-start justify-start space-x-12">
            {/* 이미지 필드 */}
            <div className="text-center">
              <img
                src={previewUrl || 'path_to_default_image'}
                alt="Profile"
                className="h-[250px] rounded-full object-fill"
              />
              <p
                onClick={() => fileInputRef.current.click()}
                className="mt-2 text-white cursor-pointer hover:text-hot-pink"
              >
                이미지 변경
              </p>
              <input
                type="file"
                name="profileImage"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>

            <div className="flex flex-col ml-12 mt-14 space-y-4">
              {/* 이름 필드 */}
              <div className="flex items-center">
                <p className="text-lg self-center min-w-[70px] text-[23px]">
                  이름
                </p>
                <div className="relative flex-1 ml-2">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={localUserData.name}
                    onChange={handleInputChange}
                    className="block w-full py-2 px-3 bg-dark-gray rounded-xl focus:outline-none focus:bg-hot-pink text-18"
                  />
                  <button
                    onClick={() =>
                      setLocalUserData({ ...localUserData, name: '' })
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-dark-gray rounded-full h-6 w-6 flex items-center justify-center cursor-pointer text-white"
                  >
                    X
                  </button>
                </div>
              </div>
              {/* 닉네임 필드 */}
              <div className="flex items-center">
                <p className="text-lg self-center min-w-[70px] text-[23px]">
                  닉네임
                </p>
                <div className="relative flex-1 ml-2">
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={localUserData.nickname}
                    onChange={(e) =>
                      setLocalUserData({
                        ...localUserData,
                        nickname: e.target.value,
                      })
                    }
                    className="block w-full py-2 px-3 bg-dark-gray rounded-xl text-18 focus:outline-none focus:bg-hot-pink"
                  />
                  <button
                    onClick={() =>
                      setLocalUserData({ ...localUserData, nickname: '' })
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-dark-gray rounded-full h-6 w-6 flex items-center justify-center cursor-pointer text-white"
                  >
                    X
                  </button>
                </div>
              </div>
              {/* 안내 필드 */}
              <div className="text-12 text-dark-gray">
                <p>닉네임은 최소 2자, 최대 10자까지 입력 가능해요</p>
                <p>닉네임은 채팅에 사용해요</p>
              </div>
              <button
                onClick={handleSubmit}
                className="ml-60 bg-hot-pink rounded-xl py-2 hover:bg-opacity-70"
              >
                변경 저장
              </button>
            </div>
          </div>
          {/* 인증 사진 섹션 */}
          <div className="flex items-start ml-[450px]">
            {/* 공지 섹션 */}
            <div className="mr-4 mt-14 text-[20px] text-right">
              {/* 여기에 마진을 추가하여 이미지와 공지 사이의 간격을 조정할 수 있습니다. */}
              <p>변경 횟수</p>
              <p>{userData.changeCount} /4</p>
              <p className="text-[12px] text-dark-gray mt-6">
                팬 사인회 입장 시, 본인 인증에 사용돼요 <br />
                정면을 바라보는 사진(ex. 증명사진)을 추천해요 <br />
                등록은 최대 4번까지 가능해요
              </p>
            </div>

            {/* 인증 사진 이미지 섹션 */}
            <div>
              <p className="text-[24px]">인증 사진 등록</p>
              <img
                src={userData.certificationImageUrl}
                alt="Auth img"
                className="w-[150px] h-auto rounded-md mt-4" // 이미지 크기와 라운드 조정
              />
              <p
                className={`text-15 ml-[35px] mt-4 cursor-pointer hover:text-hot-pink ${userData.changeCount === 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (userData.changeCount < 4) {
                    setShowAuthModal(true);
                  } else {
                    // 최대 변경 횟수에 도달했습니다! 메시지를 띄웁니다.
                    alert('최대 변경 횟수에 도달했습니다!');
                  }
                }}
              >
                이미지 변경
              </p>

              <div>
                {/* 인증사진 수정 모달 */}
                {showAuthModal && (
                  <FanAuthModal
                    userData={userData}
                    onClose={() => setShowAuthModal(false)}
                    // 필요한 경우 다른 props 전달
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FanInfoView;
