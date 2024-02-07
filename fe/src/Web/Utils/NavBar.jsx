import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import { isArtist, logout, kakaoAuthorization } from '../Stores/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../axios';

// 로그아웃 API 요청
const customAxios = useAxios();
const dispatch = useDispatch();
const testLogout = () => {
  if (isArtist) {
    customAxios
      .delete(`logout/`)
      .then(() => dispatch(logout()))
      .catch((err) => console.log(err));
  } else {
    customAxios
      .post(`logout/`, {
        headers: {
          'kakao-authorization': kakaoAuthorization,
        },
      })
      .then(() => dispatch(logout()))
      .catch((err) => console.log(err));
  }
};

const NavbarContainer = styled.nav`
  background-color: #fbe8e1;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
`;

const NavbarList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const NavbarItem = styled.li`
  color: #fff;
  margin-top: 15px;
  position: relative;
  margin: 10px;
`;

//NavBar 요소
const NavbarLink = styled(Link)`
  text-decoration: none;
  color: black;
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

  &:hover {
    color: #fff;
    background-color: #ff6d79;

    ${NavbarLink} {
      color: #fff;
    }
  }
`;

const Navbar = ({ isArtist }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setLogout = () => {
    testLogout();
    navigate('/');
  };

  const goFanProfile = () => {
    navigate('/fan-profile');
  };

  const goArtistProfile = () => {
    navigate('/artist-profile');
  };

  const fanProfileImageUrl = useSelector(
    (state) => state.faninfo.data.profileImageUrl,
  );

  const artistProfile = useSelector((state) => state.artistInfo.artistData);

  return (
    <NavbarContainer className="font-bold font-milk pb-8">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2>Logo</h2>
      </Link>
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
              <NavbarLink to="/fan-apply">응모 내역</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink to="/fan-win">당첨 내역</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink to="/fan-photo">내 앨범</NavbarLink>
            </NavbarItem>
            <Dropdown>
              <ProfileImage imageUrl={fanProfileImageUrl} />
              <DropdownContent>
                <DropdownItem onClick={goFanProfile}>프로필 보기</DropdownItem>
                <DropdownItem onClick={setLogout}>로그아웃</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </>
        )}
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
