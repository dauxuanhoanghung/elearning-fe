import http from "./http";

function delay(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Method GET
 * @param {string} url - the url to make the GET request to
 * @param {Object} [params={}] - the parameters to be included in the request
 * @param {Object} [headers={}] - the headers to be included in the request
 * @returns {Promise} the response data
 */
export async function get(
  url: string,
  params: object = {},
  headers: object = {},
): Promise<any> {
  try {
    const response = await http.get(url, {
      params,
      headers,
    });
    await delay();
    return response.data;
  } catch (error) {
    console.error(`http.get: ${url}`, error);
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
export async function post(url: string, data = {}, config = {}): Promise<any> {
  try {
    const response = await http.post(url, data, config);
    await delay();
    return response.data;
  } catch (error) {
    console.error(`http.post: ${url}`, error);
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
export async function deletes(url: string, data = {}): Promise<any> {
  try {
    const response = await http.delete(url, data);
    await delay();
    return response.data;
  } catch (error) {
    console.error(`http.delete: ${url}`, error);
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
export async function put(url: string, data = {}, config = {}): Promise<any> {
  try {
    const response = await http.put(url, data, config);
    await delay();
    return response.data;
  } catch (error) {
    console.error(`http.put: ${url}`, error);
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
export async function patch(url: string, data = {}, config = {}): Promise<any> {
  try {
    const response = await http.patch(url, data, config);
    await delay(500);
    return response.data;
  } catch (error) {
    console.error(`http.patch: ${url}`, error);
    throw error;
  }
}
