import endpoints from "@/constants/endpoint";
import { URL_SERVER } from "@/constants/url";
import axios from "axios";
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
} from "./auth";

class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.isRefreshToken = false;
    this.requestsToRefresh = [];
    this.instance = axios.create({
      baseURL: `${URL_SERVER}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // send cookie headers
    });
    /** Request, gắn token vào headers */
    this.instance.interceptors.request.use(
      async (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (Boolean(accessToken) && config.headers) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    /** Response */
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === endpoints.logout) {
          this.accessToken = "";
          this.refreshToken = "";
          clearLS();
        }
        return response;
      },
      (error) => {
        const { response, config } = error;
        // if (response?.status === 401) {
        //   if (!this.isRefreshToken) {
        //     this.isRefreshToken = true;
        //     this.handleRefreshToken()
        //       .then(({ accessToken }) => {
        //         this.requestsToRefresh.forEach((callback) => {
        //           callback(accessToken);
        //         });
        //       })
        //       .catch((error) => {
        //         this.requestsToRefresh.forEach((cb) => cb(null));
        //       })
        //       .finally(() => {
        //         this.isRefreshToken = false;
        //         this.requestsToRefresh = [];
        //       });
        //   }
        //   // 3. Setup callback to change token in headers authorization
        //   return new Promise((resolve, reject) => {
        //     this.requestsToRefresh.push((token) => {
        //       if (token) {
        //         // Reset access_token for another request behind
        //         config.headers.Authorization = `Bearer ${token}`;
        //         resolve(this.instance(config));
        //       }
        //       reject(error);
        //     });
        //   });
        // }
        return Promise.reject(error);
      },
    );
  }

  async handleRefreshToken() {
    try {
      const res = await this.instance.post(endpoints.refreshToken, {
        refreshToken: localStorage.getItem("refresh_token"),
      });
      const { access_token } = res.data;
      setAccessTokenToLS(access_token);
      this.accessToken = access_token;
      return access_token;
    } catch (error) {
      clearLS();
      this.accessToken = "";
      this.refreshToken = "";
      throw error;
    }
  }
}

const http = new Http().instance;
export default http;
