import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { UserDropdownItem } from '../../components';
import {
  UserDropdownContainer,
  ArrowUp,
  LogOutButton
} from './styles/user-dropdown-styles';
import { hideUserDropdown, logOut } from '../../redux/user/user-action';
import { useOutsideHandler } from '../../hooks/use-outside';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const handleHideUserDropdown = () => {
    dispatch(hideUserDropdown());
  };
  const handleLogout = () => {
    dispatch(hideUserDropdown());
    dispatch(logOut());
  };

  // hide user dropdown in 200ms when click outside element
  useOutsideHandler(wrapperRef, handleHideUserDropdown, 200);

  return (
    <UserDropdownContainer ref={wrapperRef}>
      <UserDropdownItem />
      <LogOutButton onClick={handleLogout}>Log out</LogOutButton>
      <ArrowUp />
    </UserDropdownContainer>
  );
};

export default UserDropdown;
