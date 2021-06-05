import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { UserDropdownItem } from '../../components';
import {
  UserDropdownContainer,
  LogOutButton
} from './styles/user-dropdown-styles';
import { hideUserDropdown } from '../../redux/user/user-action';
import { useOutsideHandler } from '../../hooks/use-outside';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const handleHideUserDropdown = () => {
    dispatch(hideUserDropdown());
  };

  // hide user dropdown in 200ms when click outside element
  useOutsideHandler(wrapperRef, handleHideUserDropdown, 200);

  return (
    <UserDropdownContainer ref={wrapperRef}>
      <UserDropdownItem />
      <LogOutButton>Log out</LogOutButton>
    </UserDropdownContainer>
  );
};

export default UserDropdown;
