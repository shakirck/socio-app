import {
  LOGIN_START,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from './actionTypes';
import { APIURLS } from '../helpers/urls';
import { getFormBody } from '../helpers/util';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAIL,
    error: errorMessage,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIURLS.login;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          //TODO:create a dispactch for saing user
          dispatch(loginSuccess(data.data.user));
        } else {
          dispatch(loginFailed(data.message));
        }
      });
  };
}

export function signup(email, password, confirmPassword, name) {
  return (dispatch) => {
    const url = APIURLS.signup;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({
        email,
        password,
        confirm_password: confirmPassword,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data', data);
        if (data.success) {
          //TODO:signup success
          localStorage.setItem('token', data.data.token);
          dispatch(signupSuccess(data.data.user));
          return;
        } else {
          dispatch(signupFailed(data.message));
        }
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}
export function signupFailed(error) {
  return {
    type: SIGNUP_FAIL,
    error,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}
