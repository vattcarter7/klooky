import styled from 'styled-components/macro';

export const UserDropdownContainer = styled.div`
  position: absolute;
  width: 180px;
  height: 320px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  top: 60px;
  right: 10px;
  z-index: 5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

export const LogOutButton = styled.button`
  border: none;
  border-top: 1px solid grey;
  background: white;
  color: #5a5a5a;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  padding-top: 15px;

  &:hover {
    color: black;
  }
`;

export const ArrowUp = styled.div`
  position: absolute;
  top: -5px;
  right: 15px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  border-bottom: 5px solid grey;
  opacity: 0.3;
`;
