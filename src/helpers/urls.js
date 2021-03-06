const APIroot = 'http://codeial.com:8000/api/v2';
export const APIURLS = {
  login: `${APIroot}/users/login`,
  signup: `${APIroot}/users/signup`,
  editProfile: () => `${APIroot}/users/edit`,
  fetchPosts: (page = 1, limit = 25) =>
    `${APIroot}/posts?page=${page}&limit=${limit}`,
  userProfile: (userid) => `${APIroot}/users/${userid}`,
  userFriends: () => `${APIroot}/friendship/fetch_user_friends`,
  addFriend: (userId) =>
    `${APIroot}/friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) =>
    `${APIroot}/friendship/remove_friendship?user_id=${userId}`,
  createNewPost: () => `${APIroot}/posts/create`,
  createComment: () => `${APIroot}/comments/`,
  toggleLike: (id, likeType) =>
    `${APIroot}/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`,
  searchUser: (searchText) => `${APIroot}/users/search?text=${searchText}`,
};
