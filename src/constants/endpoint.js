const SERVER_HOST = import.meta.env.VITE_SERVER_HOSTNAME;
export const URL_SERVER = `http://${SERVER_HOST}:8080`;

const PREFIX = "/api";

const BASE = {
  auth: `${PREFIX}/auth`,
  users: `${PREFIX}/users`,
  userNotes: `${PREFIX}/user-notes`,
  courses: `${PREFIX}/courses`,
  courseComments: `${PREFIX}/course-comments`,
  favorite: `${PREFIX}/favorites`,
  lectures: `${PREFIX}/lectures`,
  lectureComments: `${PREFIX}/lecture-comments`,
  registration: `${PREFIX}/registration`,
  sections: `${PREFIX}/sections`,
  blogs: `${PREFIX}/blogs`,
  lecturerRegistration: `${PREFIX}/lecturer-registration`,
  stats: `${PREFIX}/stats`,
};

const endpoints = {
  login: `${BASE.auth}/authenticate`,
  logout: "/logout",
  register: `${BASE.auth}/register`,
  refreshToken: `${BASE.auth}/refresh-token`,
  loginGoogle: `${BASE.auth}/login-google`,

  userBase: BASE.users,
  currentUser: `${BASE.users}/current-user`,
  userRegister: BASE.users,
  updateUserInfo: `${BASE.users}/update-info`,
  getTopLectures: `${BASE.users}/top-lecturers`,
  countUsers: `${BASE.users}/count`,

  userNoteBase: BASE.userNotes,
  userNoteByLecture: (lectureId) => `${BASE.userNotes}/${lectureId}/get-note`,
  userNoteDeleteById: (id) => `${BASE.userNotes}/${id}/delete`,

  courseBase: BASE.courses,
  courseTotalPage: `${BASE.courses}/get-total-page`,
  courseMyLearning: `${BASE.courses}/my-learning`,
  courseMyBusiness: `${BASE.courses}/my-business`,
  courseCreateSection: `${BASE.courses}/after-create-course`,
  courseSectionById: (id) => `${BASE.courses}/${id}/get-section`,
  courseSectionLecturesById: (id) =>
    `${BASE.courses}/${id}/get-section-lectures`,
  courseById: (id) => `${BASE.courses}/${id}`,
  courseUpdate: `${BASE.courses}/update`,
  courseDeleteById: (id) => `${BASE.courses}/${id}/delete`,
  courseCriteriaById: (id) => `${BASE.courses}/${id}/get-criteria`,

  getSections: (courseId) => `${BASE.sections}/course/${courseId}`,

  favoriteBase: BASE.favorite, // toggle favorite
  getWishlist: `${BASE.favorite}/get-list`,
  countTotalWishlistPages: `${BASE.favorite}/get-total-page`,
  getFavoriteByCourseId: (courseId) =>
    `${BASE.favorite}/get-favor-by-course-id/${courseId}`,

  courseCountLecturesById: (courseId) =>
    `${BASE.courses}/${courseId}/get-count-lectures`,
  courseCountRegistrationsById: (courseId) =>
    `${BASE.courses}/${courseId}/get-count-registration`,

  courseCommentBase: BASE.courseComments,
  courseCommentById: (courseId) => `${BASE.courseComments}/course/${courseId}`,

  lectureBase: BASE.lectures,
  lectureById: (id) => `${BASE.lectures}/${id}`,
  lectureDeleteById: (id) => `${BASE.lectures}/${id}/delete`,

  lectureCommentBase: BASE.lectureComments,
  lectureCommentById: (lectureId) =>
    `${BASE.lectureComments}/lecture/${lectureId}`,

  registrationBase: BASE.registration,
  registrationInit: (id) => `${BASE.registration}/${id}/get-current-user`,

  blogBase: BASE.blogs,
  blogById: (id) => `${BASE.blogs}/${id}`,
  blogDeleteById: (id) => `${BASE.blogs}/${id}`,

  lecturerRegistrationBase: BASE.lecturerRegistration,
  lecturerRegistrationCurrentUser: `${BASE.lecturerRegistration}/current-user`,
  lecturerRegistrationUpdateById: (id) =>
    `${BASE.lecturerRegistration}/${id}/update`,
  lecturerRegistrationDeleteById: (id) =>
    `${BASE.lecturerRegistration}/${id}/delete`,
  lecturerRegistrationApproveById: (id) =>
    `${BASE.lecturerRegistration}/${id}/approve`,
  lecturerRegistrationReject: `${BASE.lecturerRegistration}/reject`,

  statsBase: BASE.stats,
  statsCourseMostLectures: `${BASE.stats}/get-course-with-most-lectures`,
  statsCourseMostRegistration: `${BASE.stats}/get-course-with-most-registration`,
  statsUserRegisterUntilMonth: `${BASE.stats}/get-user-register-until-month`,
  statsUserRegisterByMonth: `${BASE.stats}/get-number-of-user-by-month`,
  statsUserByRole: `${BASE.stats}/get-count-user-by-role`,
};

export default endpoints;
