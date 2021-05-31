import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import {
  Container,
  ForgotPasswordInner,
  SendButton,
  Title,
  SubTitle,
  InputError
} from './styles/forgot-password-styles';
import { FormInput } from '../../components';
import { forgotPassword, resetMessage } from '../../redux/user/user-action';

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Please provide a valid email')
});

const handleReload = () => {
  window.location.reload();
};

const Success = () => {
  return <h1>success</h1>;
};

const Failure = () => {
  return (
    <div>
      <h1>Failure</h1>
      <p onClick={handleReload}>Retry</p>
    </div>
  );
};

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(resetMessage());
  }, [dispatch]);

  const { isAuthenticated, successMessage, errorMessage } = useSelector(
    (state) => state.user
  );

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  if (successMessage) return <Success />;
  if (errorMessage) return <Failure />;

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(forgotPassword(values));
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
          <Container>
            <ForgotPasswordInner>
              <Title>Forgot password</Title>
              <SubTitle>Enter email</SubTitle>
              <FormInput
                name='email'
                type='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                label='email'
              />
              {errors.email && touched.email && (
                <InputError>{errors.email}</InputError>
              )}

              <SendButton type='submit' disabled={!isValid || isSubmitting}>
                {!isSubmitting || successMessage || errorMessage ? (
                  'SUBMIT'
                ) : (
                  <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                )}
              </SendButton>
            </ForgotPasswordInner>
          </Container>
        </form>
      )}
    </Formik>
  );
};

export default ForgotPasswordPage;
