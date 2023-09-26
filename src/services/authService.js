import { URL_LOGIN, URL_LOGOUT, URL_LOGIN_GOOGLE } from '../constants/url';
import http from '../utils/http';
const authService = {
  /**
  * 
  * @param {*} body 
  * @returns 
  */
  login(body) {
    return http.post(URL_LOGIN, body);
  },
  logout() {
    return http.post(URL_LOGOUT);
  },
  /**
   * 
   * @param {username, password, confirmPassword, firstName, lastName, email, avatar} body 
   * @returns 
   */
  loginGoogle(body) {
    return http.post(URL_LOGIN_GOOGLE, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
};

export default authService;