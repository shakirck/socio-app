import { FETCH_SEARCH_RESULTSSUCCESS } from './actionTypes';
import { APIURLS } from '../helpers/urls';
import { getAuthTokenFromlocalStorage } from '../helpers/util';

export function searchResultSucces(users) {
  return {
    type: FETCH_SEARCH_RESULTSSUCCESS,
    users,
  };
}

export function searchResult(searchText) {
  return (dispatch) => {
    const url = APIURLS.searchUser(searchText);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromlocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Search Data');
        if (data.success) {
          dispatch(searchResultSucces(data.data.users));
        } else {
          dispatch(searchResultSucces([]));
        }
      });
  };
}
