import { URL_LOGOUT, URL_REFRESH_TOKEN, URL_SERVER } from "@/constants/url";
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
    this.refreshTokenRequest = null;
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
        let accessToken = getAccessTokenFromLS();
        if (accessToken && config.headers) {
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
        // if (url === URL_LOGIN) {
        //   //|| url === URL_REGISTER
        //   const data = response.data;
        //   this.accessToken = data.data.token;
        //   this.refreshToken = data.data.token;
        //   setAccessTokenToLS(this.accessToken);
        //   setRefreshTokenToLS(this.refreshToken);
        //   // setProfileToLS(data.data.user);
        // } else
        if (url === URL_LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";
          clearLS();
        }
        return response;
      },
      (error) => {
        // if (
        //   ![
        //     HttpStatusCode.UnprocessableEntity,
        //     HttpStatusCode.Unauthorized,
        //   ].includes(error.response?.status)
        // ) {
        //   const data = error.response?.data;
        //   const message = data?.message || error.message;
        //   toast.error(message);
        // }

        // if (isAxiosUnauthorizedError(error)) {
        //   const config = error.response?.config || { headers: {}, url: "" };
        //   const { url } = config;

        //   if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
        //     this.refreshTokenRequest =
        //       this.refreshTokenRequest ||
        //       this.handleRefreshToken().finally(() => {
        //         setTimeout(() => {
        //           this.refreshTokenRequest = null;
        //         }, 10000);
        //       });

        //     return this.refreshTokenRequest.then((access_token) => {
        //       return this.instance({
        //         ...config,
        //         headers: { ...config.headers, authorization: access_token },
        //       });
        //     });
        //   }

        //   clearLS();
        //   this.accessToken = "";
        //   this.refreshToken = "";
        //   toast.error(
        //     error.response?.data.data?.message || error.response?.data.message
        //   );
        // }

        return Promise.reject(error);
      },
    );
  }

  async handleRefreshToken() {
    try {
      const res = await this.instance.post(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken,
      });
      const { access_token } = res.data.data;
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
