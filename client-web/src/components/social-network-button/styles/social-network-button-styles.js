import styled, { css } from 'styled-components/macro';

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
      background: #3b5998;
    `}

  ${(props) =>
    props.google &&
    css`
      background: #dd4b39;
    `}

  ${(props) =>
    props.twitter &&
    css`
      background: #55acee;
    `}
`;
