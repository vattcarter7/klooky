import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { BLUE_LIGHT, BLUE_MEDIUM } from '../../../constants/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 220px;
  background: white;
  padding: 15px;
  margin-bottom: 2px;
`;

export const Avatar = styled.img`
  margin-right: auto;
  margin-left: auto;
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;

export const ProfileLink = styled(Link)`
  color: ${BLUE_MEDIUM};

  &:hover {
    color: ${BLUE_LIGHT};
  }
`;
