import React, { useState } from 'react';

import { FormInput, CustomButton } from '../../components';

import {
  SignInContainer,
  SignInTitle,
  SignUpLink,
  SignupLinkContainer
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
      <SignInTitle>SIGN IN</SignInTitle>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
      </form>
      <SignupLinkContainer>
        Don't have an accout? <SignUpLink to='signup'> Sign up</SignUpLink>{' '}
        instead
      </SignupLinkContainer>
    </SignInContainer>
  );
};

export default SignInPage;
