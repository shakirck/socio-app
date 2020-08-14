import {
  UPDATE_POSTS,
  CREATE_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
} from './actionTypes';
import { APIURLS } from '../helpers/urls';
import { func } from 'prop-types';
import { getAuthTokenFromlocalStorage, getFormBody } from '../helpers/util';
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

export function createPostSuccess(post) {
  return {
    type: CREATE_POST,
    post,
  };
}

export function createNewPost(content) {
  return (dispatch) => {
    const url = APIURLS.createNewPost();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromlocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%CREATEPOST');
        if (data.success) {
          dispatch(createPostSuccess(data.data.post));
        }
      });
  };
}
export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIURLS.createComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromlocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

export function addLike(id, likeType, userId) {
  return (dispatch) => {
    const url = APIURLS.toggleLike(id, likeType);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromlocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('LIKEDATAAA', data);

        if (data.success) {
          dispatch(addPostLikeToStore(id, userId));
        }
      });
  };
}

export function addPostLikeToStore(postId, userId) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userId,
  };
}
