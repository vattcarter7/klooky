import axios from 'axios';

import { AUTH_URL } from '../../constants/url';
import {
  USER_LOADED,
  AUTH_FAIL,
  LOGOUT_USER,
  FORGOT_PASSWORD_SENT_FAIL,
  FORGOT_PASSWORD_SENT_SUCCESS,
  RESET_MESSAGE
} from './user-types';

export const registerWithEmailAndPassword =
  ({ fullname, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({
      fullname,
      login_email: email,
      login_password: password
    });

    try {
      const res = await axios.post(`${AUTH_URL}/email/register`, body, config);
      dispatch({
        type: USER_LOADED,
        payload: res.data.user
      });
    } catch (err) {
      console.log(err);

      dispatch({
        type: AUTH_FAIL
      });
    }
  };

export const loginWithEmailAndPassword =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({
      login_email: email,
      login_password: password
    });

    try {
      const res = await axios.post(`${AUTH_URL}/email/login`, body, config);
      dispatch({
        type: USER_LOADED,
        payload: res.data.user
      });
    } catch (err) {
      console.log('Watch Here: ', err);

      dispatch({
        type: AUTH_FAIL
      });
    }
  };

export const verifyAuth = () => async (dispatch) => {
  try {
    const res = await axios.get(`${AUTH_URL}/me`);
    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    });
  } catch (err) {
    dispatch({ type: AUTH_FAIL });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await axios.get(`${AUTH_URL}/logout`);
    dispatch({ type: LOGOUT_USER });
  } catch (error) {
    dispatch({ type: AUTH_FAIL });
  }
};

export const forgotPassword =
  ({ email }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({
        login_email: email
      });
      const res = await axios.post(`${AUTH_URL}/forgot-password`, body, config);
      // console.log(res.data);
      dispatch({
        type: FORGOT_PASSWORD_SENT_SUCCESS,
        payload:
          res.data.successMessage || 'SUCCESS: please check your mail inbox'
      });
    } catch (err) {
      dispatch({
        type: FORGOT_PASSWORD_SENT_FAIL,
        payload:
          err.response.data.errMessage || 'FAIL: please check your email again'
      });
    }
  };

export const resetMessage = () => (dispatch) => {
  dispatch({ type: RESET_MESSAGE });
};
