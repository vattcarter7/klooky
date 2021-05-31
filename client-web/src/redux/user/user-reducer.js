import {
  USER_LOADED,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_FAIL,
  LOGOUT_USER,
  FORGOT_PASSWORD_SENT_FAIL,
  FORGOT_PASSWORD_SENT_SUCCESS,
  RESET_MESSAGE
} from './user-types';

const INITIAL_STATE = {
  isAuthenticated: null,
  loading: true,
  user: null,
  successMessage: null,
  errorMessage: null
};
const userReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        successMessage: null,
        errorMessage: null
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        successMessage: null,
        errorMessage: null
      };
    case FORGOT_PASSWORD_SENT_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        successMessage: null,
        errorMessage: payload
      };
    case FORGOT_PASSWORD_SENT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        successMessage: payload,
        errorMessage: null
      };
    case RESET_MESSAGE:
      return {
        ...state,
        successMessage: null,
        errorMessage: null
      };
    default:
      return state;
  }
};

export default userReducer;
