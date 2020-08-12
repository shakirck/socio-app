import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_START,
} from '../actions/actionTypes';

const initialProfileState = {
  user: {},
  error: null,
  success: null,
  inProgress: false,
};
export default function profile(state = initialProfileState, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        success: true,
        user: action.user,
        inProgress: false,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case FETCH_USER_PROFILE_START:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
}
