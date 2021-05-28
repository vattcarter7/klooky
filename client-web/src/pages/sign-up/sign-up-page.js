import React from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

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
  SignUpButton,
  SignUpInputError
} from './styles/sign-up-page-styles';

import { FormInput, SocialNetworkButton } from '../../components';
import { registerWithEmailAndPassword } from '../../redux/user/user-action';

const validationSchema = Yup.object({
  fullname: Yup.string().required('Full name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Please provide a valid email'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
});

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
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

      <Formik
        initialValues={{
          fullname: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(registerWithEmailAndPassword(values));
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
            <EmailSignUpContainer>
              <EmailSignUpInner>
                <SignUpTitle>SIGN UP</SignUpTitle>
                <SignUpSubTitle>with email and password</SignUpSubTitle>
                <FormInput
                  type='text'
                  name='fullname'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullname}
                  label='Full name'
                />
                {errors.fullname && touched.fullname && (
                  <SignUpInputError>{errors.fullname}</SignUpInputError>
                )}

                <FormInput
                  type='email'
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  label='Email'
                />
                {errors.email && touched.email && (
                  <SignUpInputError>{errors.email}</SignUpInputError>
                )}

                <FormInput
                  type='password'
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  label='Password'
                />
                {errors.password && touched.password && (
                  <SignUpInputError>{errors.password}</SignUpInputError>
                )}

                <FormInput
                  type='password'
                  name='confirmPassword'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  label='Confirm password'
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <SignUpInputError>{errors.confirmPassword}</SignUpInputError>
                )}

                <SignUpButton type='submit' disabled={isSubmitting || !isValid}>
                  SIGN UP
                </SignUpButton>
                <SignInLinkContainer>
                  Already have an account?{' '}
                  <SignInLink to='signin'> Sign in</SignInLink>
                </SignInLinkContainer>
              </EmailSignUpInner>
            </EmailSignUpContainer>
          </form>
        )}
      </Formik>
    </SignUpContainer>
  );
};

export default SignUpPage;
