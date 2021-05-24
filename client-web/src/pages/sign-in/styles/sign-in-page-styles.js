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
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
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
  opacity: 0.7;
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

export const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 290px;
  justify-content: center;
`;

export const SignInTitle = styled.h1`
  margin: 10px 0 20px 0;

  color: ${GREY_MEDIUM};
  ${(props) =>
    props.social &&
    css`
      color: white;
      font-size: 23px;
    `}
`;

export const SignInSubTitle = styled.h4`
  margin: 10px 0 20px 0;
  color: ${GREY_MEDIUM};
`;

export const SignUpLinkContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const SignUpLink = styled(Link)`
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  color: ${BLUE_MEDIUM};

  &:hover {
    color: ${BLUE_DARK};
  }
`;

export const ForgotPasswordLink = styled(Link)`
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 25px;
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
  background: #ddd;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  line-height: 40px;
  text-align: center;
`;
