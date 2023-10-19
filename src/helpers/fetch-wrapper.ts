import getConfig from "next/config";

import { userService } from "../services";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};
type HeadersType = {
  'Authorization'?: string;
  'Content-Type'?: string;
};

function request(method: string) {
  console.log('===================================')
  return (url: string, body?: any) => {
    const requestOptions: { method: string, headers: HeadersType, body?: string } = {
      method,
      headers: authHeader(url) as HeadersType,
    };
    if (body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
}

// helper functions

function authHeader(url:any) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  const isLoggedIn = user?.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

async function handleResponse(response:any) {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  // check for error response
  if (!response.ok) {
    if ([401, 403].includes(response.status) && userService.userValue) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      userService.logout();
    }

    // get error message from body or default to response status
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
