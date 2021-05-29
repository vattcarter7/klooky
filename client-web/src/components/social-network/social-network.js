import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { SocialNetworkButton } from '../../components';
import {
  SocialNetworkContainer,
  SocialNetworkInner,
  SignInTitle,
  SignInSubTitle
} from './styles/social-network-styles';

import { AUTH_FAIL, USER_LOADED } from '../../redux/user/user-types';
import { AUTH_URL } from '../../constants/url';

const SocialNetwork = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const fetchAuthUser = async (socialNetwork) => {
    const response = await axios
      .get(`${AUTH_URL}/social-network-profile/${socialNetwork}`, {
        withCredentials: true
      })
      .catch((err) => {
        dispatch({ type: AUTH_FAIL });
        history.push('/login/error');
      });

    if (response && response.data.user) {
      dispatch({ type: USER_LOADED, payload: response.data.user });
      history.push('/dashboard');
    }
  };

  const redirectToSocialNetwork = async (socialNetwork) => {
    const windowSize = {
      width: 500,
      height: 600
    };
    const windowLocation = {
      left:
        window.screen.availLeft +
        window.screen.availWidth / 2 -
        windowSize.width / 2,
      top:
        window.screen.availTop +
        window.screen.availHeight / 2 -
        windowSize.height / 2
    };
    let timer;
    const socailLoginUrl = `http://localhost:4000/api/auth/${socialNetwork}`;
    const newWindow = window.open(
      socailLoginUrl,
      '_blank',
      'width=' +
        windowSize.width +
        ', height=' +
        windowSize.height +
        ', left=' +
        windowLocation.left +
        ', top=' +
        windowLocation.top
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated");
          fetchAuthUser(socialNetwork);
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <SocialNetworkContainer>
      <SocialNetworkInner>
        <SignInTitle>CONNECT</SignInTitle>
        <SignInSubTitle>with social network</SignInSubTitle>
        <SocialNetworkButton
          facebook
          onClick={() => redirectToSocialNetwork('facebook')}
        >
          <i className='fa fa-facebook fa-fw'></i> Connect with facebook
        </SocialNetworkButton>
        <SocialNetworkButton
          google
          onClick={() => redirectToSocialNetwork('google')}
        >
          <i className='fa fa-google fa-fw'></i> Connect with google
        </SocialNetworkButton>
        <SocialNetworkButton
          twitter
          onClick={() => redirectToSocialNetwork('twitter')}
        >
          <i className='fa fa-twitter fa-fw'></i> Connect with twitter
        </SocialNetworkButton>
      </SocialNetworkInner>
    </SocialNetworkContainer>
  );
};

export default SocialNetwork;
