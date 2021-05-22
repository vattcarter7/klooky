import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { MEDIUM_BLUE, DARK_BLUE } from '../../../constants/colors';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin-right: auto;
  margin-left: auto;
`;

export const SignUpTitle = styled.h2`
  margin: 10px 0;
`;

export const SignInLinkContainer = styled.div`
  padding: 20px 0;
  display: flex;
`;

export const SignInLink = styled(Link)`
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  color: ${MEDIUM_BLUE};
  text-decoration: underline;

  &:hover {
    color: ${DARK_BLUE};
  }
`;