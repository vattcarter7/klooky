import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { UserDropdownItemContainer, Icon } from './styles/user-dropdown-styles';
import { DROPDOWN_ITEMS } from '../../constants/user-dropdown';
import { hideUserDropdown } from '../../redux/user/user-action';

const UserDropdownItem = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (url) => {
    dispatch(hideUserDropdown());
    return history.push(`/${url}`);
  };

  return DROPDOWN_ITEMS.map((item) => (
    <UserDropdownItemContainer
      key={item.text}
      onClick={() => handleClick(item.link)}
    >
      <Icon className={item.icon}></Icon> {item.text}
    </UserDropdownItemContainer>
  ));
};

export default UserDropdownItem;
