import styled from 'styled-components';

import { BLUE_DARK } from '../../../constants/colors';

export const Container = styled.div`
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
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
  }

  &:active {
    color: ${BLUE_DARK};
  }

  &:first-child {
    margin-left: 2px;
  }

  &: nth-child(3) {
    margin-left: -2px;
  }

  &: nth-child(4) {
    margin-left: -1.5px;
  }

  &: nth-child(6) {
    margin-left: 1.5px;
    padding-bottom: 10px;
  }
`;

export const Icon = styled.i`
  font-size: 18px;
  padding: 10px 20px 10px 10px;
`;
