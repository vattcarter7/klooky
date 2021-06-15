import React from 'react';
import { useSelector } from 'react-redux';

import {
  Container,
  Avatar,
  ProfileLink
} from './styles/profile-sidebar-styles';
import emptyUser from '../../assets/user.png';

const ProfileSidebar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Container>
      <>
        {user && user.avatar ? (
          <Avatar src={user.avatar} />
        ) : (
          <Avatar src={emptyUser} />
        )}
      </>
      {user && user.fullname && <h2>{user.fullname}</h2>}
      <ProfileLink to='/my-profile'>My Profile</ProfileLink>
    </Container>
  );
};

export default ProfileSidebar;
