import styled, { css } from 'styled-components/macro';

import { FACEBOOK, GOOGLE, TWITTER } from '../../../constants/colors';

export const SocialNetworkButtonContainer = styled.button`
  width: 230px;
  background-color: black;
  color: white;
  height: 40px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  margin-bottom: 12px;
  &:hover {
    opacity: 1;
  }

  ${(props) =>
    props.facebook &&
    css`
      background: ${FACEBOOK};
    `}

  ${(props) =>
    props.google &&
    css`
      background: ${GOOGLE};
    `}

  ${(props) =>
    props.twitter &&
    css`
      background: ${TWITTER};
    `}
`;
