// SERVER ORIGIN
export const URL_SERVER = 'http://localhost:8080';

// #region Authentication
export const URL_LOGIN = '/authenticate';
export const URL_LOGOUT = '/logout';
export const URL_REFRESH_TOKEN = '/refresh-token';
export const URL_LOGIN_GOOGLE = '/login-google';
// #endregion
// #region User API
export const URL_USER = '/api/users/';
export const URL_CURRENT_USER = `${URL_USER}current-user/`;
export const URL_REGISTER = `${URL_USER}register/`;
// #endregion
// #region Course API
export const URL_COURSE = '/api/courses/';
export const URL_GET_COURSE_BY_ID = (id) => `${URL_COURSE}${id}`;
export const URL_UPDATE_COURSE = `${URL_COURSE}update`
export const URL_DELETE_COURSE_BY_ID = (id) => `${URL_COURSE}${id}/delete`;
// #endregion
// #region Course Comment API
export const URL_COURSE_COMMENT = '/api/course-comments/';
// #endregion
// #region Lecture API
export const URL_LECTURE = '/api/lectures/';
// #endregion
// #region Blog API
export const URL_BLOG = '/api/blogs/';
// #endregion