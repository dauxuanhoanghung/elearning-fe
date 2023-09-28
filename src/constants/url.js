// SERVER ORIGIN
export const URL_SERVER = "http://localhost:8080";

// #region Authentication
export const URL_LOGIN = "/api/auth/authenticate";
export const URL_LOGOUT = "/logout";
export const URL_REFRESH_TOKEN = "/api/auth/refresh-token";
export const URL_LOGIN_GOOGLE = "/api/auth/login-google";
// #endregion
// #region User API
export const URL_USER = "/api/users/";
export const URL_CURRENT_USER = `${URL_USER}current-user`;
export const URL_REGISTER = `${URL_USER}`;
// #endregion
// #region Course API
export const URL_COURSE = "/api/courses/";
export const URL_CREATE_SECTION = `${URL_COURSE}after-create-course`
export const URL_GET_COURSE_BY_ID = (id) => `${URL_COURSE}${id}`;
export const URL_UPDATE_COURSE = `${URL_COURSE}update`;
export const URL_DELETE_COURSE_BY_ID = (id) => `${URL_COURSE}${id}/delete`;
// #endregion
// #region Course Comment API
export const URL_COURSE_COMMENT = "/api/course-comments/";
// #endregion
// #region Lecture API
export const URL_LECTURE = "/api/lectures/";
export const URL_GET_LECTURE_BY_ID = (id) => `${URL_LECTURE}${id}`;
export const URL_DELETE_LECTURE_BY_ID = (id) => `${URL_LECTURE}${id}/delete`;
// #endregion
// #region Blog API
export const URL_BLOG = "/api/blogs/";
export const URL_GET_BLOG_BY_ID = (id) => `${URL_BLOG}/${id}`;
export const URL_DELETE_BLOG_BY_ID = (id) => `${URL_BLOG}/${id}`;
// #endregion
