import styled, { css } from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { BLUE_MEDIUM, BLUE_DARK, GREY_MEDIUM } from '../../../constants/colors';

export const SignUpContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 700px;
  height: 500px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`;

export const SocialSignUpContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 350px;
  height: 500px;
  background: url('angkorwat.png');
  background-size: cover;
  background-position: center;
  border-radius: 2px 0 0 2px;
`;

export const SocialSignUpInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 250px;
  width: 250px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 125px;
`;

export const SignUpTitle = styled.h2`
  color: ${GREY_MEDIUM};

  ${(props) =>
    props.social &&
    css`
      color: white;
      font-size: 23px;
      line-height: 30px;
      margin-bottom: 8px;
      width: 220px;
    `}
`;

export const SignUpSubTitle = styled.h4`
  margin: -10px 0 0 0;
  color: ${GREY_MEDIUM};

  ${(props) =>
    props.social &&
    css`
      color: white;
      margin-bottom: 15px;
      line-height: 30px;
      width: 220px;
    `}
`;

export const SignInLinkContainer = styled.div`
  margin-top: 20px;
`;

export const SignInLink = styled(Link)`
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  color: ${BLUE_MEDIUM};
  text-decoration: underline;

  &:hover {
    color: ${BLUE_DARK};
  }
`;

export const Or = styled.div`
  position: absolute;
  top: 230px;
  left: 330px;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  line-height: 40px;
  text-align: center;
`;

export const EmailSignUpContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 350px;
  height: 200px;
  border-radius: 0 2px 2px 0;
  margin-top: 30px;
`;

export const EmailSignUpInner = styled.div`
  width: 280px;
  height: 200px;
  margin-right: auto;
  margin-left: auto;
  margin-top: -30px;
  text-align: center;
`;

export const SignUpButton = styled.button`
  background-color: ${BLUE_MEDIUM};
  height: 40px;
  width: 100%;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.85;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}

  &:hover {
    opacity: 1;
  }
`;

export const SignUpInputError = styled.div`
  padding: 0;
  margin-top: -20px;
  float: left;
  font-size: 12px;
  color: red;
`;
