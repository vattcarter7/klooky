import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { logOut } from '../../redux/user/user-action';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './styles/header-styles';

const Header = () => {
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/profile'>
          {!loading && user && user.fullname}
        </OptionLink>
        <OptionLink to='/shop'>SHOP</OptionLink>
        <OptionLink to='/contact'>CONTACT</OptionLink>
        {!loading && !isAuthenticated ? (
          <OptionLink to='/signin'>SIGN IN</OptionLink>
        ) : (
          <OptionLink to='/signout' onClick={handleLogout}>
            SIGN OUT
          </OptionLink>
        )}
      </OptionsContainer>
    </HeaderContainer>
  );
};

export default Header;
