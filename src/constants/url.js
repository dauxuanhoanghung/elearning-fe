// SERVER ORIGIN
const SERVER_HOST = import.meta.env.VITE_SERVER_HOSTNAME;
export const URL_SERVER = `http://${SERVER_HOST}:8080`;

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
export const URL_USER_UPDATE_INFO = `${URL_USER}update-info`;
// #endregion

// #region User API
export const URL_USER_NOTE = "/api/user-notes/";
export const URL_GET_NOTE_BY_LECTURE = (lectureId) =>
  `${URL_USER_NOTE}${lectureId}/get-note`;
export const URL_DELETE_NOTE_BY_ID = (id) => `${URL_USER_NOTE}${id}/delete`;
// #endregion

// #region Course API
export const URL_COURSE = "/api/courses/";
export const URL_TOTAL_COURSE_PAGE = `${URL_COURSE}get-total-course-page`;
export const URL_MY_BUSINESS_COURSES = `${URL_COURSE}my-business`;
export const URL_CREATE_SECTION = `${URL_COURSE}after-create-course`;
export const URL_GET_SECTION_BY_COURSE_ID = (id) =>
  `${URL_COURSE}${id}/get-section`;
export const URL_GET_SECTION_LECTURES_BY_COURSE_ID = (id) =>
  `${URL_COURSE}${id}/get-section-lectures`;
export const URL_GET_COURSE_BY_ID = (id) => `${URL_COURSE}${id}`;
export const URL_UPDATE_COURSE = `${URL_COURSE}update`;
export const URL_DELETE_COURSE_BY_ID = (id) => `${URL_COURSE}${id}/delete`;
export const URL_GET_CRITERIA_BY_ID = (id) => `${URL_COURSE}${id}/get-criteria`;
export const URL_FAVOR = `/api/favorite/`;
export const URL_GET_FAVORITE_COURSES = `${URL_FAVOR}get-favorite-courses`;
export const URL_GET_COUNT_LECTURES_BY_COURSE_ID = (courseId) =>
  `${URL_COURSE}${courseId}/get-count-lectures`;
export const URL_GET_COUNT_REGISTRATIONS_BY_COURSE_ID = (courseId) =>
  `${URL_COURSE}${courseId}/get-count-registration`;
// #endregion

// #region Course Comment API
export const URL_COURSE_COMMENT = "/api/course-comments/";
export const URL_GET_COMMENT_BY_COURSE_ID = (courseId) =>
  `${URL_COURSE_COMMENT}course/${courseId}`;
// #endregion

// #region Lecture API
export const URL_LECTURE = "/api/lectures/";
export const URL_GET_LECTURE_BY_ID = (id) => `${URL_LECTURE}${id}`;
export const URL_DELETE_LECTURE_BY_ID = (id) => `${URL_LECTURE}${id}/delete`;
// #endregion

// #region Course Comment API
export const URL_LECTURE_COMMENT = "/api/lecture-comments/";
export const URL_GET_COMMENT_BY_LECTURE_ID = (lectureId) =>
  `${URL_LECTURE_COMMENT}lecture/${lectureId}`;
// #endregion

// #region Registration - Transaction
export const URL_REGISTRATION = "/api/registration/";
export const URL_REGISTRATION_INIT = (id) =>
  `${URL_REGISTRATION}${id}/get-current-user`;

// #region Blog API
export const URL_BLOG = "/api/blogs/";
export const URL_GET_BLOG_BY_ID = (id) => `${URL_BLOG}/${id}`;
export const URL_DELETE_BLOG_BY_ID = (id) => `${URL_BLOG}/${id}`;
// #endregion

// #region
export const URL_LECTURER_REGISTRATION = `/api/lecturer-registration/`;
export const URL_GET_LECTURER_FORM_BY_CURRENT_USER = `${URL_LECTURER_REGISTRATION}current-user`;
export const URL_UPDATE_LECTURER_FORM_BY_CURRENT_USER = (id) =>
  `${URL_LECTURER_REGISTRATION}${id}/update`;
export const URL_DELETE_LECTURER_FORM_BY_ID = (id) =>
  `${URL_LECTURER_REGISTRATION}${id}/delete`;
export const URL_LECTURER_APRROVAL = (id) =>
  `${URL_LECTURER_REGISTRATION}${id}/approve`;
export const URL_LECTURER_REJECT = `${URL_LECTURER_REGISTRATION}reject`;

// #region Stats API
const URL_STATS = "/api/stats/";
export const URL_GET_COURSE_WITH_MOST_LECTURES = `${URL_STATS}get-course-with-most-lectures`;
export const URL_GET_COURSE_WITH_MOST_REGISTRATION = `${URL_STATS}get-course-with-most-registration`;
export const URL_GET_USER_REGISTER_UNTIL_MONTH = `${URL_STATS}get-user-register-until-month`;
export const URL_GET_USER_REGISTER_BY_MONTH = `${URL_STATS}get-number-of-user-by-month`;
export const URL_GET_USER_BY_ROLE = `${URL_STATS}get-count-user-by-role`;
