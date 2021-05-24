import React, { useState } from 'react';

import { FormInput, CustomButton, SocialNetworkButton } from '../../components';

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
  FormInputContainer,
  ForgotPasswordLink,
  Or
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
          <SignInTitle social>Sign In With Social Network</SignInTitle>
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
            <i class='fa fa-twitter fa-fw'></i> Sign in with twitter
          </SocialNetworkButton>
        </SocialSignInInner>
      </SocialSignInContainer>
      <Or>OR</Or>
      <form onSubmit={handleSubmit}>
        <EmailSignInContainer>
          <EmailSignInInner>
            <SignInTitle>SIGN IN</SignInTitle>
            <SignInSubTitle>with email and password</SignInSubTitle>
            <FormInputContainer>
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
              <CustomButton primary type='submit'>
                {' '}
                Sign in{' '}
              </CustomButton>
            </FormInputContainer>

            <SignUpLinkContainer>
              Don't have an account?{' '}
              <SignUpLink to='signup'> Sign up</SignUpLink>
            </SignUpLinkContainer>
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
