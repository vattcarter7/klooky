import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
  SignInButton,
  SignInInputError
} from './styles/sign-in-page-styles';

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Please provide a valid email'),
  password: Yup.string()
    // .min(8, 'Must be at least 8 characters')
    .required('Password is required')
});

const SignInPage = ({ googleSignInStart }) => {
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

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // dispatch(login(values));
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid
        }) => (
          <form onSubmit={handleSubmit}>
            <EmailSignInContainer>
              <EmailSignInInner>
                <SignInTitle>SIGN IN</SignInTitle>
                <SignInSubTitle>with email and password</SignInSubTitle>
                <FormInput
                  name='email'
                  type='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  label='email'
                />
                {errors.email && touched.email && (
                  <SignInInputError>{errors.email}</SignInInputError>
                )}
                <FormInput
                  name='password'
                  type='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  label='password'
                />
                {errors.password && touched.password && (
                  <SignInInputError>{errors.password}</SignInInputError>
                )}

                <SignInButton type='button' disabled={!isValid || isSubmitting}>
                  {!isSubmitting ? (
                    'SIGN IN'
                  ) : (
                    <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                  )}
                </SignInButton>

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
        )}
      </Formik>
    </SignInContainer>
  );
};

export default SignInPage;
