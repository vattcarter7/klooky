import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { UserDropdownContainer } from './styles/user-dropdown-styles';
import { hideUserDropdown } from '../../redux/user/user-action';
import { useOutsideHandler } from '../../hooks/use-outside';

const DROPDOWN_ITEMS = [
  { icon: 'fa fa-bookmark-o', text: 'Booking', link: '#' },
  { icon: 'fa fa-diamond', text: 'Promotion', link: '#' },
  { icon: 'fa fa-money', text: 'Credit', link: '#' },
  { icon: 'fa fa-gift', text: 'Gift card', link: '#' },
  { icon: 'fa fa-heart-o', text: 'Wishlist', link: '#' },
  { icon: 'fa fa-pencil-square-o', text: 'Reviews', link: '#' },
  { icon: 'fa fa-magic', text: 'Rewards', link: '#' },
  { icon: 'fa fa-sliders', text: 'Setting', link: '#' }
];

const UserDropdownItem = () => {
  return DROPDOWN_ITEMS.map((item) => (
    <div key={item.text}>
      <i className={item.icon}></i> - {item.text}
    </div>
  ));
};

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
    </UserDropdownContainer>
  );
};

export default UserDropdown;
