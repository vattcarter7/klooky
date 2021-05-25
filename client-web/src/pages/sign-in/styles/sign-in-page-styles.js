import styled, { css } from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { BLUE_MEDIUM, BLUE_DARK, GREY_MEDIUM } from '../../../constants/colors';

export const SignInContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 700px;
  height: 500px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`;

export const EmailSignInContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 350px;
  height: 500px;
  border-radius: 0 2px 2px 0;
  margin-top: 30px;
`;

export const EmailSignInInner = styled.div`
  width: 280px;
  height: 200px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
  text-align: center;
`;

export const SocialSignInContainer = styled.div`
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

export const SocialSignInInner = styled.div`
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

export const SignInTitle = styled.h2`
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

export const SignInSubTitle = styled.h4`
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

export const SignUpLinkContainer = styled.div`
  margin-top: 20px;
`;

export const SignUpLink = styled(Link)`
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  color: ${BLUE_MEDIUM};

  &:hover {
    color: ${BLUE_DARK};
  }
`;

export const ForgotPasswordLink = styled(Link)`
  margin-right: auto;
  margin-left: auto;
  cursor: pointer;
  color: ${BLUE_MEDIUM};

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

export const SignInButton = styled.button`
  background-color: ${BLUE_MEDIUM};
  height: 40px;
  width: 100%;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }
`;
