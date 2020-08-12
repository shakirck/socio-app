import {
  FETCH_USER_FRIENDS_SUCCESS,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from './actionTypes';
import { APIURLS } from '../helpers/urls';
import { getAuthTokenFromlocalStorage } from '../helpers/util';
import { func } from 'prop-types';

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

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
