const { fetch, Headers } = require('fetch-ponyfill')();

export default class ApiHelper {
  static createHeaders(overrides = {}) {
    // setup headers
    return new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      ...overrides,
    });
  }

  static get({ path, headers = {}, payload = {} }) {
    let updatedPath = path;

    const keys = Object.keys(payload);
    if (keys.length > 0) {
      const qs = [];
      for (let i = 0; i < keys.length; i += 1) {
        qs.push(`${keys[i]}=${encodeURIComponent(payload[keys[i]])}`);
      }

      updatedPath += `?${qs.join('&')}`;
    }

    return ApiHelper.makeRequest({
      method: 'GET',
      path: updatedPath,
      headers,
    });
  }

  static post({ path, headers = {}, payload = {} }) {
    return ApiHelper.makeRequest({
      method: 'POST',
      path,
      payload,
      headers,
    });
  }

  static put({ path, headers = {}, payload = {} }) {
    return ApiHelper.makeRequest({
      method: 'PUT',
      path,
      payload,
      headers,
    });
  }

  static patch({ path, headers = {}, payload = {} }) {
    return ApiHelper.makeRequest({
      method: 'PATCH',
      path,
      payload,
      headers,
    });
  }

  static delete({ path, headers = {}, payload = {} }) {
    return ApiHelper.makeRequest({
      method: 'DELETE',
      path,
      payload,
      headers,
    });
  }

  static async checkStatus(response) {
    const isOk = response.status >= 200 && response.status < 300;
    const hasError = response.status >= 401; // over 400 is guaranteed to be unhandled
    if (isOk || !hasError) {
      return await response.json();
    }

    // body can only be consumed once, so we only do it here if we are sure that an error occurred
    const content = await response.json();
    const errors = content.errors || [];

    // need to extract content of unexpected error
    const { detail, code } = errors[0] || {};
    const apiError = new ApiError(detail, 400, code);
    throw apiError;
  }

  static makeRequest({ method, path, headers = {}, payload = {} }) {
    const opts = {
      method,
      headers: ApiHelper.createHeaders(headers),
    };

    if (Object.keys(payload).length > 0) {
      opts.body = JSON.stringify(payload);
    }
    return fetch(path, opts).then(ApiHelper.checkStatus);
  }
}
