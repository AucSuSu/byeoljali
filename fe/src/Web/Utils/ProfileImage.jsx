// src/Utils/ProfileImage.js

import React from 'react';
import styled from 'styled-components';

const ProfileImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileImage = ({ imageUrl }) => {
  return (
    <ProfileImageContainer>
      <Image src={imageUrl} alt="프로필 이미지" />
    </ProfileImageContainer>
  );
};

export default ProfileImage;
