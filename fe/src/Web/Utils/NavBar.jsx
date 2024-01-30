// src/Utils/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';

const NavbarContainer = styled.nav`
  background-color: #888;
  height: 40px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const NavbarItem = styled.li`
  color: #fff;
  margin-top: 15px;
`;

const NavbarLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;

  &:hover {
    color: #ffa500;
  }
`;

const fixNavbar = {
  position: 'sticky',
  top: 0,
  width: '100%',
  zIndex: 1000,
};

const Navbar = ({ isFan }) => {
  const profileImageUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpqYJDnLH7XxH1vrI3VCvNq6E5JipsPi5WrqrlMrWqsA&s';

  return (
    <NavbarContainer style={fixNavbar}>
      <h2>Logo</h2>
      <NavbarList>
        <NavbarItem>
          {/* 로고 이미지로 변경 */}
          <NavbarLink to="/">홈</NavbarLink>
        </NavbarItem>
        {/* 팬 */}
        {isFan && (
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
            <NavbarItem>
              <NavbarLink to="/fan-profile">
                <ProfileImage imageUrl={profileImageUrl} />
              </NavbarLink>
            </NavbarItem>
          </>
        )}
        {/* 아티스트 */}
        {!isFan && (
          <>
            <NavbarItem>
              <NavbarLink to="/readyfansign">응모 관리</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink to="/fansign">팬싸 관리</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink to="/artistInfo">
                <ProfileImage imageUrl={profileImageUrl} />
              </NavbarLink>
            </NavbarItem>
          </>
        )}
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
