import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import { logout } from '../Stores/authReducer';
import { useDispatch } from 'react-redux';

const NavbarContainer = styled.nav`
  background-color: #FBE8E1;
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
  position: relative;
  margin : 10px;
`;

const NavbarLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    color: #ffa500;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #333;
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
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const Navbar = ({ isFan }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const profileImageUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpqYJDnLH7XxH1vrI3VCvNq6E5JipsPi5WrqrlMrWqsA&s';

  return (
    <NavbarContainer className='font-bold font-milk pb-8'>
      <h2>Logo</h2>
      <NavbarList>
        
        {isFan ? (
          // Fan일 경우
          <>
            <NavbarItem>
              <NavbarLink  to="/fan-apply">응모 내역</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink to="/fan-win">당첨 내역</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink to="/fan-photo">내 앨범</NavbarLink>
            </NavbarItem>
            <Dropdown>
              <ProfileImage imageUrl={profileImageUrl} />
              <DropdownContent>
                <DropdownItem>
                  <NavbarLink to="/fan-profile">프로필 보기</NavbarLink>
                </DropdownItem>
                <DropdownItem onClick={setLogout}>로그아웃</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </>
        ) : (
          // Artist일 경우
          <>
            <NavbarItem>
              <NavbarLink to="/fansign">응모 관리</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink to="/readyfansign">팬싸 관리</NavbarLink>
            </NavbarItem>
            <Dropdown>
              <ProfileImage imageUrl={profileImageUrl} />
              <DropdownContent>
                <DropdownItem>
                  <NavbarLink to="/artistInfo">프로필 보기</NavbarLink>
                </DropdownItem>
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
