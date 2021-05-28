import React from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { FormInput, SocialNetworkButton } from '../../components';
import { loginWithEmailAndPassword } from '../../redux/user/user-action';

import { AUTH_FAIL, USER_LOADED } from '../../redux/user/user-types';
import { AUTH_URL } from '../../constants/url';

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

const SignInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const fetchAuthUser = async () => {
    const response = await axios
      .get(`${AUTH_URL}/profile`, { withCredentials: true })
      .catch((err) => {
        console.log('Not properly authenticated');
        dispatch({ type: AUTH_FAIL });
        history.push('/login/error');
      });

    if (response && response.data.user) {
      console.log('User: ', response.data.user);
      dispatch({ type: USER_LOADED, payload: response.data.user });
      history.push('/dashboard');
    }
  };

  const redirectToGoogleSSO = async () => {
    let timer;
    const googleLoginURL = `http://localhost:4000/api/auth/google`;
    const newWindow = window.open(
      googleLoginURL,
      '_blank',
      'width=500,height=600'
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated");
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <SignInContainer>
      <SocialSignInContainer>
        <SocialSignInInner>
          <SignInTitle social>SIGN IN</SignInTitle>
          <SignInSubTitle social>with social network</SignInSubTitle>
          <SocialNetworkButton facebook>
            <i className='fa fa-facebook fa-fw'></i> Sign in with facebook
          </SocialNetworkButton>
          <SocialNetworkButton google onClick={redirectToGoogleSSO}>
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
          console.log(values);
          dispatch(loginWithEmailAndPassword(values));
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

                <SignInButton type='submit' disabled={!isValid || isSubmitting}>
                  SIGN IN
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
