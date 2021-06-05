import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import emptyUser from '../../assets/user.png';
import { showUserDropdown } from '../../redux/user/user-action';

import { UserDropdown } from '../../components';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  Avatar
} from './styles/header-styles';

const Header = () => {
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated, userDropdown } = useSelector(
    (state) => state.user
  );

  const handleShowUserDropdown = () => {
    setTimeout(() => {
      dispatch(showUserDropdown());
    }, 250);
  };

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/shop'>SHOP</OptionLink>
        {!loading && !isAuthenticated ? (
          <OptionLink to='/signin'>SIGN IN</OptionLink>
        ) : (
          <>
            <OptionLink to='#' onClick={handleShowUserDropdown}>
              {user && user.avatar ? (
                <Avatar src={user.avatar} />
              ) : (
                <Avatar src={emptyUser} />
              )}
            </OptionLink>
            {userDropdown && <UserDropdown />}
          </>
        )}
      </OptionsContainer>
    </HeaderContainer>
  );
};

export default Header;
