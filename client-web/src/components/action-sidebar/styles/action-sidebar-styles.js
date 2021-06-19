import styled from 'styled-components';

import { BLUE_DARK, GREY_LIGHT_EXTRA } from '../../../constants/colors';

export const Container = styled.div`
  height: 340px;
  display: flex;
  flex-direction: column;
  background-color: white;
  line-height: 50px;
`;

export const ActionSidebarItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  opacity: 0.7;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    opacity: 1;
    background: ${GREY_LIGHT_EXTRA};
  }

  &:active {
    color: ${BLUE_DARK};
  }
`;

export const Icon = styled.i`
  font-size: 18px;
  padding: 10px 20px 10px 10px;
  width: 50px;
`;
