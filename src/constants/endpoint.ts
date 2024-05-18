const SERVER_HOST = import.meta.env.VITE_SERVER_HOSTNAME;
export const URL_SERVER = SERVER_HOST.startsWith("https")
  ? SERVER_HOST
  : `http://${SERVER_HOST}:8080`;

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
  self: `${PREFIX}/self`,
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
  deleteSelf: `${BASE.users}/delete-self`,

  userNoteBase: BASE.userNotes,
  getNotesByLecture: (lectureId: number) =>
    `${BASE.userNotes}/${lectureId}/get-note`,
  updateNote: `${BASE.userNotes}/update`,
  deleteNoteById: (id: number) => `${BASE.userNotes}/${id}/delete`,

  courseBase: BASE.courses,
  courseTotalPage: `${BASE.courses}/get-total-page`,
  countCourse: `${BASE.courses}/count`,
  courseMyLearning: `${BASE.courses}/my-learning`,
  courseMyBusiness: `${BASE.courses}/my-business`,
  courseSectionById: (id: number) => `${BASE.courses}/${id}/get-section`,
  courseById: (id: number) => `${BASE.courses}/${id}`,
  courseUpdate: `${BASE.courses}/update`,
  courseDeleteById: (id: number) => `${BASE.courses}/${id}/delete`,
  courseCriteriaById: (id: number) => `${BASE.courses}/${id}/get-criteria`,

  getSections: (courseId: number) => `${BASE.sections}/course/${courseId}`,
  createSection: BASE.sections,
  createBatchSection: `${BASE.sections}/create-batch`,

  favoriteBase: BASE.favorite, // toggle favorite
  getWishlist: `${BASE.favorite}/get-list`,
  countTotalWishlistPages: `${BASE.favorite}/get-total-page`,
  countWishlist: `${BASE.favorite}/count`,
  getFavoriteByCourseId: (courseId: number) =>
    `${BASE.favorite}/get-favor-by-course-id/${courseId}`,

  courseCountLecturesById: (courseId: number) =>
    `${BASE.courses}/${courseId}/get-count-lectures`,
  courseCountRegistrationsById: (courseId: number) =>
    `${BASE.courses}/${courseId}/get-count-registration`,

  courseCommentBase: BASE.courseComments,
  getCourseCommentById: (courseId: number) =>
    `${BASE.courseComments}/course/${courseId}`,
  deleteCourseCommentById: (id: number) =>
    `${BASE.courseComments}/${id}/delete`,

  lectureBase: BASE.lectures,
  createLecture: BASE.lectures,
  getLectureById: (id: number, courseId: number) =>
    `${BASE.lectures}/${id}/course/${courseId}`,
  deleteLectureById: (id: number) => `${BASE.lectures}/${id}/delete`,

  lectureCommentBase: BASE.lectureComments,
  getLectureCommentById: (lectureId: number) =>
    `${BASE.lectureComments}/lecture/${lectureId}`,
  deleteLectureCommentById: (id: number) =>
    `${BASE.lectureComments}/${id}/delete`,

  registrationBase: BASE.registration,
  getTransactionByEmailAndCourseId: `${BASE.registration}/get-by-email-and-course-id`,
  getInitialRegistration: (id: number) =>
    `${BASE.registration}/${id}/get-current-user`,
  getRegisteredCourses: BASE.registration + "/get-registered-courses",
  payWithVNPay: BASE.vnpay,
  payWithPaypal: BASE.paypal + "/init",
  capturePaypal: BASE.paypal + "/capture",
  countRegistration: `${BASE.registration}/count`,

  changePassword: BASE.self + "/change-password",

  blogBase: BASE.blogs,
  getBlogById: (id: number) => `${BASE.blogs}/${id}`,
  createBlog: BASE.blogs,
  deleteBlogById: (id: number) => `${BASE.blogs}/${id}`,

  lecturerRegistration: BASE.lecturerRegistration,
  lecturerRegistrationCurrentUser: `${BASE.lecturerRegistration}/current-user`,
  updateLecturerRegistrationById: (id: number) =>
    `${BASE.lecturerRegistration}/${id}/update`,
  deleteLecturerRegistrationById: (id: number) =>
    `${BASE.lecturerRegistration}/${id}/delete`,
  approveLecturerRegistrationById: (id: number) =>
    `${BASE.lecturerRegistration}/${id}/approve`,
  rejectLecturerRegistration: `${BASE.lecturerRegistration}/reject`,

  lastLecture: `${BASE.lastLecture}`,
  updateLastLecture: `${BASE.lastLecture}`,
  getLastLectureByCourse: (id: number) => `${BASE.lastLecture}/course/${id}`,

  statsBase: BASE.stats,
  statsCourseMostLectures: `${BASE.stats}/course-with-most-lectures`,
  statsCourseMostRegistration: `${BASE.stats}/course-with-most-registration`,
  statsUserRegisterUntilMonth: `${BASE.stats}/user-register-until-month`,
  statsUserRegisterByMonth: `${BASE.stats}/user-by-month`,
  statsUserByRole: `${BASE.stats}/user-by-role`,
  statsUserInMonthAndTotal: `${BASE.stats}/count-user-in-month-and-total`,
};

export default endpoints;
