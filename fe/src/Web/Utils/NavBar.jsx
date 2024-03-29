import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import { isArtist, logout, kakaoAuthorization } from '../Stores/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import BlinkingText from './BlinkingText';

// Navbar 배경 및 밑줄 주석처리 margin-bottom 추가
const NavbarContainer = styled.nav`
  // background-color: black;
  // border-bottom: 2px solid black;
  position: relative;
  height: 70px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavbarList = styled.ul`
  position: absolute;
  list-style: none;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  right: 10px;
`;

const NavbarItem = styled.li`
  display: flex;
  color: #fff;
  position: relative;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

// Logo 및 Title styled 추가
const NavbarTitle = styled.p`
  color: #fff;
  font-size: 35px;
  cursor: pointer;
`;

//NavBar 요소
const NavbarLink = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  cursor: pointer

  &:hover {
    color: #ff6d79;
    cursor: pointer
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  background: gray;
  display: none;
  position: absolute;
  min-width: 160px;
  z-index: 1;
  top: 100%;
  right: 0;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;

  ${Dropdown}:hover & {
    display: flex;
    flex-direction: column;
  }
`;

const DropdownItem = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
  color: #000;
  cursor: pointer;
  color: #fff;
  &:hover {
    color: #fff;
    background-color: #ff6d79;

    ${NavbarLink} {
      color: #fff;
    }
  }
`;

const Navbar = ({ bgStyle }) => {
  const trueArtist = useSelector((state) => state.auth.isArtist);
  const kakaoAuth = useSelector((state) => state.auth.kakaoAuthorization);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProps, setIsProps] = useState(null);

  useEffect(() => {
    setIsProps(bgStyle);
  }, []);

  // 로그아웃 API 요청
  const customAxios = useAxios();
  const testLogout = () => {
    if (trueArtist) {
      customAxios.delete(`logout/`).then((res) => {
        dispatch(logout());
        navigate('/');
      });
    } else {
      customAxios
        .post(
          `logout/`,
          {},
          {
            headers: {
              'kakao-authorization': kakaoAuth,
            },
          },
        )
        .then(() => {
          dispatch(logout());
          navigate('/');
        });
    }
  };

  const setLogout = () => {
    testLogout();
    navigate('/');
  };

  const goFanProfile = () => {
    navigate('/fan-profile');
    // showEditModal(true);
  };

  const goArtistProfile = () => {
    navigate('/artist-profile');
  };

  const goFanPhoto = () => {
    navigate('/fan-photo');
  };

  const goFanApply = () => {
    navigate('/fan-apply');
  };

  const goFanWin = () => {
    navigate('/fan-win');
  };
  const goHome = () => {
    navigate('/home');
  };

  const fanProfileImageUrl = useSelector(
    (state) => state.faninfo.data.profileImageUrl,
  );

  const artistProfile = useSelector((state) => state.artistInfo.artistData);

  const isArtist = useSelector((state) => state.auth.isArtist);

  const handleSearchIconClick = () => {
    navigate('/search'); // '/search' 경로로 이동
  };

  return (
    <NavbarContainer
      className={`${isProps ? isProps : `bg-black`}  font-jamsil pb-8`}
    >
      <NavbarTitle className="flex justify-center items-center">
        <Link to="/" className="font-hambuger cursor-pointer">
          {' '}
          별자리
        </Link>
        <BlinkingText></BlinkingText>
      </NavbarTitle>
      <NavbarList>
        {isArtist ? (
          // Artist일 경우
          <>
            <NavbarItem>
              <NavbarLink className="cursor-pointer" to="/fansign">
                응모 관리
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink className="cursor-pointer" to="/readyfansign">
                팬싸 관리
              </NavbarLink>
            </NavbarItem>
            {/*  */}
            <Dropdown>
              <img
                src="/Hamburger_icon_white.png"
                style={{
                  width: '30px',
                  height: '30px',
                }}
              />
              <DropdownContent>
                <DropdownItem onClick={goArtistProfile}>
                  <img
                    src={artistProfile?.object.artistImageUrl}
                    alt="profileImg"
                    className="rounded-full h-[70px] w-[70px] mx-auto object-cover"
                  />
                </DropdownItem>
                <DropdownItem onClick={goArtistProfile}>
                  프로필 보기
                </DropdownItem>
                <DropdownItem onClick={setLogout}>로그아웃</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </>
        ) : (
          // Fan일 경우
          <>
            <NavbarItem>
              <button
                onClick={handleSearchIconClick} // 수정된 부분: 함수를 호출하지 않고 함수 자체를 전달
                className="hover:text-hot-pink text-white font-bold rounded"
              >
                <MagnifyingGlassIcon className="h-[30px] w-[30px] border-none cursor-pointer" />
              </button>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink className="cursor-pointer" to="/fan-profile">
                MY PAGE
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <Dropdown>
                {/* <ProfileImage imageUrl={fanProfileImageUrl} /> */}
                <img
                  src="/Hamburger_icon_white.png"
                  className="cursor-pointer"
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                ></img>
                <DropdownContent>
                  <DropdownItem onClick={goFanProfile}>
                    <img
                      src={fanProfileImageUrl}
                      alt="profileImg"
                      className="rounded-full h-[70px] w-[70px] mx-auto object-cover cursor-pointer"
                    />
                  </DropdownItem>
                  <DropdownItem onClick={goFanApply}>응모 내역</DropdownItem>
                  <DropdownItem onClick={goFanWin}>당첨 내역</DropdownItem>
                  <DropdownItem onClick={goFanPhoto}>내 앨범</DropdownItem>
                  <DropdownItem onClick={setLogout}>로그아웃</DropdownItem>
                </DropdownContent>
              </Dropdown>
            </NavbarItem>
          </>
        )}
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
