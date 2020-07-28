const APIroot = 'http://codeial.com:8000/api/v2';
export const APIURLS = {
  login: `${APIroot}/users/login`,
  signup: `${APIroot}/users/signup`,
  fetchPosts: (page = 1, limit = 5) =>
    `${APIroot}/posts?page=${page}&limit=${limit}`,
};
