import styled from 'styled-components/macro';

export const SocialNetworkContainer = styled.div`
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

export const SocialNetworkInner = styled.div`
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
  color: white;
  font-size: 23px;
  line-height: 30px;
  margin-bottom: 8px;
  width: 220px;
`;

export const SignInSubTitle = styled.h4`
  margin: -10px 0 0 0;
  color: white;
  margin-bottom: 15px;
  line-height: 30px;
  width: 220px;
`;
