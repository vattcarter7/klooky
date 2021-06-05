import React from 'react';

import { UserDropdownItemContainer, Icon } from './styles/user-dropdown-styles';
import { DROPDOWN_ITEMS } from '../../constants/user-dropdown';

const UserDropdownItem = () => {
  return DROPDOWN_ITEMS.map((item) => (
    <UserDropdownItemContainer key={item.text}>
      <Icon className={item.icon}></Icon> {item.text}
    </UserDropdownItemContainer>
  ));
};

export default UserDropdownItem;
