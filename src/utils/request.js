import http from "./http";

/**
 * Method GET
 * @param url
 * @param params
 * @param headers
 * @returns { Promise }
 */
export async function get(url, params = {}, headers = {}) {
  try {
    const response = await http.get(url, {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("http.get: ", error);
    throw error;
  }
}

/**
 * Method POST
 * @param url
 * @param data
 * @param config = { headers: {} }
 * @returns { Promise }
 */
export async function post(url, data = {}, config = {}) {
  try {
    const response = await http.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error("http.post: ", error);
    throw error;
  }
}

/**
 * Method DELETE
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
export async function deletes(url, data = {}, config = {}) {
  try {
    const response = await http.delete(url, data, config);
    return response.data;
  } catch (error) {
    console.error("http.delete: ", error);
    throw error;
  }
}

/**
 * Method PUT
 * @param url
 * @param data
 * @param config
 * @returns { Promise }
 */
export async function put(url, data = {}, config = {}) {
  try {
    const response = await http.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error("http.put: ", error);
    throw error;
  }
}

/**
 * Method PATCH
 * @param url
 * @param data
 * @param config
 * @returns { Promise }
 */
export async function patch(url, data = {}, config = {}) {
  try {
    const response = await http.patch(url, data, config);
    return response.data;
  } catch (error) {
    console.error("http.patch: ", error);
    throw error;
  }
}
