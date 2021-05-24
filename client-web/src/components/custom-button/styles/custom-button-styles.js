import styled, { css } from 'styled-components/macro';
import { BLUE_MEDIUM } from '../../../constants/colors';

const buttonStyles = css`
  background-color: black;
  ${(props) =>
    props.primary &&
    css`
      background: ${BLUE_MEDIUM};
      color: black;
    `}
  ${(props) =>
    props.facebook &&
    css`
      background: ${BLUE_MEDIUM};
      color: white;
      min-width: 250px;
      font-size: 14px;
    `}
  color: white;
  border: none;
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;
  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

const googleSignInStyles = css`
  background-color: #db4a39;
  min-width: 250px;
  font-size: 14px;
  color: white;
  &:hover {
    background-color: #db4a40;
    border: none;
  }
`;

const getButtonStyles = ({ isGoogleSignIn, inverted }) => {
  if (isGoogleSignIn) {
    return googleSignInStyles;
  }

  return inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  ${getButtonStyles}
`;
