import React, { useState } from 'react';

import {
  SignUpContainer,
  SignUpTitle,
  SignInLink,
  SignInLinkContainer,
  SocialSignUpContainer,
  SocialSignUpInner,
  SignUpSubTitle,
  Or,
  EmailSignUpContainer,
  EmailSignUpInner,
  SignUpButton
} from './styles/sign-up-page-styles';

import { FormInput, SocialNetworkButton } from '../../components';

const SignUpPage = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { fullname, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({ fullname, email, password });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignUpContainer>
      <SocialSignUpContainer>
        <SocialSignUpInner>
          <SignUpTitle social>SIGN UP</SignUpTitle>
          <SignUpSubTitle social>with social network</SignUpSubTitle>
          <SocialNetworkButton
            facebook
            onClick={() => console.log('click on facebook button')}
          >
            <i className='fa fa-facebook fa-fw'></i> Sign up with facebook
          </SocialNetworkButton>
          <SocialNetworkButton google>
            <i className='fa fa-google fa-fw'></i> Sign up with google
          </SocialNetworkButton>
          <SocialNetworkButton twitter>
            <i className='fa fa-twitter fa-fw'></i> Sign up with twitter
          </SocialNetworkButton>
        </SocialSignUpInner>
      </SocialSignUpContainer>

      <Or>OR</Or>

      <form onSubmit={handleSubmit}>
        <EmailSignUpContainer>
          <EmailSignUpInner>
            <SignUpTitle>SIGN UP</SignUpTitle>
            <SignUpSubTitle>with email and password</SignUpSubTitle>
            <FormInput
              type='text'
              name='fullname'
              value={fullname}
              onChange={handleChange}
              label='Full name'
              required
            />
            <FormInput
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              label='Email'
              required
            />
            <FormInput
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              label='Password'
              required
            />
            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleChange}
              label='Confirm password'
              required
            />
            <SignUpButton>SIGN UP</SignUpButton>
            <SignInLinkContainer>
              Already have an account?{' '}
              <SignInLink to='signin'> Sign in</SignInLink>
            </SignInLinkContainer>
          </EmailSignUpInner>
        </EmailSignUpContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignUpPage;
