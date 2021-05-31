import styled, { css } from 'styled-components/macro';

import { BLUE_MEDIUM, GREY_MEDIUM } from '../../../constants/colors';

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 350px;
  height: 250px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`;

export const ForgotPasswordInner = styled.div`
  width: 280px;
  height: 200px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
  text-align: center;
`;

export const Title = styled.h2`
  color: ${GREY_MEDIUM};
  padding-top: 30px;
`;

export const SubTitle = styled.h4`
  margin: -10px 0 0 0;
  color: ${GREY_MEDIUM};
`;

export const SendButton = styled.button`
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

export const InputError = styled.div`
  padding: 0;
  margin-top: -20px;
  float: left;
  font-size: 12px;
  color: red;
`;
