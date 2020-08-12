import {
  LOGIN_START,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  AUTHENTICATE_USER,
  LOGOUT,
  CLEARAUTHSTATE,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
} from './actionTypes';
import { APIURLS } from '../helpers/urls';
import { getFormBody, getAuthTokenFromlocalStorage } from '../helpers/util';

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
          localStorage.setItem('token', data.data.token);

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
          dispatch(signupSuccess(data.data.user));
          return;
        } else {
          dispatch(signupFailed(data.message));
        }
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
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

export function clearAuthState() {
  return {
    type: CLEARAUTHSTATE,
  };
}

export function editUserSuccess(user) {
  return {
    type: EDIT_USER_SUCCESS,
    user,
  };
}

export function editUserFail(error) {
  return {
    type: EDIT_USER_FAIL,
    error,
  };
}

export function editUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = APIURLS.editProfile();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromlocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('PROFILE EDIT', data);
        if (data.success) {
          dispatch(editUserSuccess(data.data.user));
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return;
        }

        dispatch(editUserFail(data.message));
      });
  };
}
