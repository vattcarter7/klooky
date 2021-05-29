import React from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { FormInput, SocialNetwork } from '../../components';
import { loginWithEmailAndPassword } from '../../redux/user/user-action';

import {
  SignInContainer,
  EmailSignInContainer,
  EmailSignInInner,
  SignInTitle,
  SignInSubTitle,
  SignUpLink,
  SignUpLinkContainer,
  ForgotPasswordLink,
  Or,
  SignInButton,
  SignInInputError
} from './styles/sign-in-page-styles';

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Please provide a valid email'),
  password: Yup.string().required('Password is required')
});

const SignInPage = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <SignInContainer>
      <SocialNetwork />

      <Or>OR</Or>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          dispatch(loginWithEmailAndPassword(values));
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

                <SignInButton type='submit' disabled={!isValid || isSubmitting}>
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
