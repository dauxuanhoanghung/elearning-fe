import { URL_LOGIN, URL_LOGOUT } from '../constant/url';
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
  }
};

export default authService;