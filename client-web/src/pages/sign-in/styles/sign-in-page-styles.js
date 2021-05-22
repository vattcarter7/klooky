import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { MEDIUM_BLUE, DARK_BLUE } from '../../../constants/colors';

export const SignInContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
`;

export const SignInTitle = styled.h2`
  margin: 10px 0 20px 0;
`;

export const SignUpLinkContainer = styled.div`
  padding-top: 20px;
  display: flex;
`;

export const SignUpLink = styled(Link)`
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  color: ${MEDIUM_BLUE};
  text-decoration: underline;

  &:hover {
    color: ${DARK_BLUE};
  }
`;
