import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_START,
  SIGNUP_FAIL,
  AUTHENTICATE_USER,
  LOGOUT,
  CLEARAUTHSTATE,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
};
export default function (state = initialAuthState, action) {
  switch (action.type) {
    case CLEARAUTHSTATE:
      return {
        ...state,
        error: null,
      };
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
        inProgress: false,
        error: null,
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };

    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
        error: null,
      };

    case LOGOUT:
      return {
        ...state,
        user: {},
        isLoggedin: false,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: false,
      };
    case EDIT_USER_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
