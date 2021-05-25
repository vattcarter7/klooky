import React, { useState } from 'react';

import { FormInput, SocialNetworkButton } from '../../components';

import {
  SignInContainer,
  EmailSignInContainer,
  EmailSignInInner,
  SignInTitle,
  SignInSubTitle,
  SignUpLink,
  SignUpLinkContainer,
  SocialSignInContainer,
  SocialSignInInner,
  ForgotPasswordLink,
  Or,
  SignInButton
} from './styles/sign-in-page-styles';

const SignInPage = ({ googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // emailSignInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInContainer>
      <SocialSignInContainer>
        <SocialSignInInner>
          <SignInTitle social>SIGN IN</SignInTitle>
          <SignInSubTitle social>with social network</SignInSubTitle>
          <SocialNetworkButton
            facebook
            onClick={() => console.log('click on facebook button')}
          >
            <i className='fa fa-facebook fa-fw'></i> Sign in with facebook
          </SocialNetworkButton>
          <SocialNetworkButton google>
            <i className='fa fa-google fa-fw'></i> Sign in with google
          </SocialNetworkButton>
          <SocialNetworkButton twitter>
            <i className='fa fa-twitter fa-fw'></i> Sign in with twitter
          </SocialNetworkButton>
        </SocialSignInInner>
      </SocialSignInContainer>

      <Or>OR</Or>

      <form onSubmit={handleSubmit}>
        <EmailSignInContainer>
          <EmailSignInInner>
            <SignInTitle>SIGN IN</SignInTitle>
            <SignInSubTitle>with email and password</SignInSubTitle>
            <FormInput
              name='email'
              type='email'
              handleChange={handleChange}
              value={email}
              label='email'
              required
            />
            <FormInput
              name='password'
              type='password'
              value={password}
              handleChange={handleChange}
              label='password'
              required
            />

            <SignInButton>SIGN IN</SignInButton>

            <SignUpLinkContainer>
              Don't have an account?{' '}
              <SignUpLink to='signup'> Sign up</SignUpLink>
            </SignUpLinkContainer>
            <br />
            <ForgotPasswordLink to='forgot-password'>
              Forgot your password?
            </ForgotPasswordLink>
          </EmailSignInInner>
        </EmailSignInContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInPage;
