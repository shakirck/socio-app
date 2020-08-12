import { FETCH_USER_FRIENDS_SUCCESS } from './actionTypes';
import { APIURLS } from '../helpers/urls';
import { getAuthTokenFromlocalStorage } from '../helpers/util';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIURLS.userFriends();
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromlocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.friends, 'DDDDDDDDAAAAAAAAAAATAAAAAAAAAAAA');

        dispatch(fetchUserFriendsSuccess(data.data.friends));
      })
      .catch((error) => {
        console.log(error, '~~~~~~~~~~~~~~~ERROR');
      });
  };
}
export function fetchUserFriendsSuccess(friends) {
  return {
    type: FETCH_USER_FRIENDS_SUCCESS,
    friends,
  };
}
