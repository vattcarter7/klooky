import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { hideUserDropdown } from '../../redux/user/user-action';
import { UserDropdownContainer } from './styles/user-dropdown-styles';

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

const useOutsideHandler = (ref) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // Hide the user dropdown menu
        setTimeout(() => {
          dispatch(hideUserDropdown());
        }, 250);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, dispatch]);
};

const UserDropdown = () => {
  const wrapperRef = useRef(null);
  useOutsideHandler(wrapperRef);
  return (
    <div ref={wrapperRef}>
      <UserDropdownContainer>
        <UserDropdownItem />
      </UserDropdownContainer>
    </div>
  );
};

export default UserDropdown;
