import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import { isArtist, logout, kakaoAuthorization } from '../Stores/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Navbar 배경 및 밑줄 주석처리 margin-bottom 추가
const NavbarContainer = styled.nav`
  // background-color: #fbe8e1;
  // border-bottom: 2px solid black;
  margin-bottom: 40px;
  height: 70px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items:center;
`;

const NavbarItem = styled.li`
  color: #fff;
  margin-top: 15px;
  position: relative;
  margin: 10px;
  justify-content: center;
`;

// Logo 및 Title styled 추가
const NavbarLogo = styled(Link)`
  color: #fff;
  margin-top: 15px;
  position: relative;
  margin: 10px;
`;
const NavbarTitle = styled.p`
  color: #fff;
  margin-top: 15px;
  position: relative;
  margin: 10px;
  margin-left: 200px;
  font-size: 30px;
`;

//NavBar 요소
const NavbarLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: bold;

  &:hover {
    color: #ff6d79;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  min-width: 160px;
  z-index: 1;
  top: 100%;
  right: 0;
  flex-direction: column;
  align-items:center;

  ${Dropdown}:hover & {
    display: flex;
    flex-direction: column;
  }
`;

const DropdownItem = styled.div`
  padding: 10px;
  color: #000;
  background-color: #fff;
  cursor: pointer;
  align-self:center;

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

  // 로그아웃 API 요청
  const customAxios = useAxios();
  const testLogout = () => {
    if (trueArtist) {
      customAxios
        .delete(`logout/`)
        .then((res) => {
          console.log('로그아웃 데이터 : ', res);
          dispatch(logout());
          navigate('/');
        })
        .catch((err) => console.log(err));
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
        })
        .catch((err) => console.log(err));
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
  }


  const goFanApply = () => {
    navigate('/fan-apply');
  }


  const goFanWin = () => {
    navigate('/fan-win');
  }



  const fanProfileImageUrl = useSelector(
    (state) => state.faninfo.data.profileImageUrl,
  );

  const artistProfile = useSelector((state) => state.artistInfo.artistData);

  const isArtist = useSelector((state) => state.auth.isArtist);

  const handleSearchIconClick = () => {
    navigate('/search'); // '/search' 경로로 이동
  };

  return (
    <NavbarContainer className={`${bgStyle} font-bold font-milk pb-8`}>
      <NavbarLogo to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src="/logo.png" className="w-[45px] h-[45px]" />
      </NavbarLogo>
      <NavbarTitle> 별자리 </NavbarTitle>
      <NavbarList>
        {isArtist ? (
          // Artist일 경우
          <>
            <NavbarItem>
              <NavbarLink to="/fansign">응모 관리</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink to="/readyfansign">팬싸 관리</NavbarLink>
            </NavbarItem>
            <Dropdown>
              {artistProfile && (
                <ProfileImage imageUrl={artistProfile.object.artistImageUrl} />
              )}

              <DropdownContent>
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
                className="hover:text-hot-pink text-white font-bold py-2 px-4 rounded"
              >
                <MagnifyingGlassIcon className="h-6 w-6 border-none" />
              </button>
            </NavbarItem>
            <NavbarItem>
              <button
                onClick={handleSearchIconClick} // 수정된 부분: 함수를 호출하지 않고 함수 자체를 전달
                className="hover:text-hot-pink text-white font-bold py-2 px-4 rounded"
              >
                <MagnifyingGlassIcon className="h-6 w-6 border-none" />
              </button>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink to="/fan-profile">MY PAGE</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <Dropdown>
              {/* <ProfileImage imageUrl={fanProfileImageUrl} /> */}
              <img src='/Hamburger_icon_white.png'
              style={{
                width : "30px",
                height : "30px"
              }}></img>
                <DropdownContent>
                  <DropdownItem onClick={goFanProfile}><ProfileImage imageUrl={fanProfileImageUrl} /></DropdownItem>
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
