import { LOGIN_START } from './actionTypes';
import { APIURLS } from '../helpers/urls';
import { getFormBody } from '../helpers/util';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function login(email, password) {
  return (dispatch) => {
    const url = APIURLS.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'x-ww-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    });
  };
}
