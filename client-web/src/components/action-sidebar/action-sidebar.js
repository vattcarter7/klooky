import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
  ActionSidebarItemContainer,
  Icon
} from './styles/action-sidebar-styles';
import { DROPDOWN_ITEMS } from '../../constants/user-dropdown';

const ActionSidebarItem = () => {
  const history = useHistory();

  const handleClick = (url) => {
    return history.push(`/${url}`);
  };
  return DROPDOWN_ITEMS.map((item) => (
    <ActionSidebarItemContainer
      key={item.text}
      onClick={() => handleClick(item.link)}
    >
      <Icon className={item.icon}></Icon> {item.text}
    </ActionSidebarItemContainer>
  ));
};

const ActionSidebar = () => {
  return (
    <Container>
      <ActionSidebarItem />
    </Container>
  );
};

export default ActionSidebar;
