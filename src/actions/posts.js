import { UPDATE_POSTS } from './actionTypes';
import { APIURLS } from '../helpers/urls';
export function fetchPosts() {
  return (dispatch) => {
    const url = APIURLS.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(upadePosts(data.data.posts));
      });
  };
}

export function upadePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
