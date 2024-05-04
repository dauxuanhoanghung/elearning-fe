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
  paypal: `${PREFIX}/paypal`,
  vnpay: `${PREFIX}/vnpay`,
  sections: `${PREFIX}/sections`,
  blogs: `${PREFIX}/blogs`,
  blogComments: `${PREFIX}/blog-comments`,
  lecturerRegistration: `${PREFIX}/lecturer-registration`,
  stats: `${PREFIX}/stats`,
  lastLecture: `${PREFIX}/last-lectures`,
};

const endpoints = {
  login: `${BASE.auth}/authenticate`,
  logout: "/logout",
  register: `${BASE.auth}/register`,
  refreshToken: `${BASE.auth}/refresh-token`,
  loginGoogle: `${BASE.auth}/login-google`,

  userBase: BASE.users,
  getAllUsers: `${BASE.users}`,
  currentUser: `${BASE.users}/current-user`,
  userRegister: BASE.users,
  updateUserInfo: `${BASE.users}/update-info`,
  getTopLectures: `${BASE.users}/top-lecturers`,
  countUsers: `${BASE.users}/count`,

  userNoteBase: BASE.userNotes,
  getNotesByLecture: (lectureId) => `${BASE.userNotes}/${lectureId}/get-note`,
  updateNote: `${BASE.userNotes}/update`,
  deleteNoteById: (id) => `${BASE.userNotes}/${id}/delete`,

  courseBase: BASE.courses,
  courseTotalPage: `${BASE.courses}/get-total-page`,
  countCourse: `${BASE.courses}/count`,
  courseMyLearning: `${BASE.courses}/my-learning`,
  courseMyBusiness: `${BASE.courses}/my-business`,
  courseSectionById: (id) => `${BASE.courses}/${id}/get-section`,
  courseById: (id) => `${BASE.courses}/${id}`,
  courseUpdate: `${BASE.courses}/update`,
  courseDeleteById: (id) => `${BASE.courses}/${id}/delete`,
  courseCriteriaById: (id) => `${BASE.courses}/${id}/get-criteria`,

  getSections: (courseId) => `${BASE.sections}/course/${courseId}`,
  createSection: BASE.sections,
  createBatchSection: `${BASE.sections}/create-batch`,

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
  getCourseCommentById: (courseId) =>
    `${BASE.courseComments}/course/${courseId}`,
  deleteCourseCommentById: (id) => `${BASE.courseComments}/${id}/delete`,

  lectureBase: BASE.lectures,
  createLecture: BASE.lectures,
  getLectureById: (id, courseId) => `${BASE.lectures}/${id}/course/${courseId}`,
  deleteLectureById: (id) => `${BASE.lectures}/${id}/delete`,

  lectureCommentBase: BASE.lectureComments,
  getLectureCommentById: (lectureId) =>
    `${BASE.lectureComments}/lecture/${lectureId}`,
  deleteLectureCommentById: (id) => `${BASE.lectureComments}/${id}/delete`,

  registrationBase: BASE.registration,
  getInitialRegistration: (id) => `${BASE.registration}/${id}/get-current-user`,
  getRegisteredCourses: BASE.registration + "/get-registered-courses",
  payWithVNPay: BASE.vnpay,
  payWithPaypal: BASE.paypal + "/init",
  capturePaypal: BASE.paypal + "/capture",
  countRegistration: `${BASE.registration}/count`,

  blogBase: BASE.blogs,
  getBlogById: (id) => `${BASE.blogs}/${id}`,
  deleteBlogById: (id) => `${BASE.blogs}/${id}`,

  lecturerRegistration: BASE.lecturerRegistration,
  lecturerRegistrationCurrentUser: `${BASE.lecturerRegistration}/current-user`,
  updateLecturerRegistrationById: (id) =>
    `${BASE.lecturerRegistration}/${id}/update`,
  deleteLecturerRegistrationById: (id) =>
    `${BASE.lecturerRegistration}/${id}/delete`,
  approveLecturerRegistrationById: (id) =>
    `${BASE.lecturerRegistration}/${id}/approve`,
  rejectLecturerRegistration: `${BASE.lecturerRegistration}/reject`,

  lastLecture: `${BASE.lastLecture}`,
  updateLastLecture: `${BASE.lastLecture}`,

  statsBase: BASE.stats,
  statsCourseMostLectures: `${BASE.stats}/course-with-most-lectures`,
  statsCourseMostRegistration: `${BASE.stats}/course-with-most-registration`,
  statsUserRegisterUntilMonth: `${BASE.stats}/user-register-until-month`,
  statsUserRegisterByMonth: `${BASE.stats}/user-by-month`,
  statsUserByRole: `${BASE.stats}/user-by-role`,
  statsUserInMonthAndTotal: `${BASE.stats}/count-user-in-month-and-total`,
};

export default endpoints;
