import {
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_START,
} from './actionTypes';
import { APIURLS } from '../helpers/urls';
import { getAuthTokenFromlocalStorage } from '../helpers/util';

export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE_START,
  };
}
export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFail(error) {
  return {
    type: USER_PROFILE_FAIL,
    error,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());
    const url = APIURLS.userProfile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromlocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(userProfileSuccess(data.data.user));
      });
  };
}
