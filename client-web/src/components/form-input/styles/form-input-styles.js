import styled, { css } from 'styled-components/macro';

import { GREY_LIGHT, GREY_MEDIUM, BLACK_DARK } from '../../../constants/colors';

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${BLACK_DARK};
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: 25px 0;
  input[type='password'] {
    letter-spacing: 0.2em;
  }
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: ${GREY_MEDIUM};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${GREY_MEDIUM};
  margin: 0;
  &:focus {
    outline: none;
  }
  &:focus ~ label {
    ${shrinkLabelStyles}
  }
  ${(props) =>
    props.backgroundGrey &&
    css`
      background: ${GREY_LIGHT};
    `}
`;

export const FormInputLabel = styled.label`
  color: ${GREY_MEDIUM};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  &.shrink {
    ${shrinkLabelStyles}
  }
`;
