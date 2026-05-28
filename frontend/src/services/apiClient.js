const handleRequest = async (url, method, body = null, options = {}) => {
  const requestConfig = {
    credentials: "include",
    method,
    headers: options.headers || {},
  };

  if (!requestConfig.headers["Content-Type"]) {
    requestConfig.headers["Content-Type"] = "application/json";
  }

  if (!requestConfig.headers["Accept"]) {
    requestConfig.headers["Accept"] = "application/json";
  }

  if (body) {
    requestConfig.body = JSON.stringify(body);
  }

  let finalUrl = url;
  if (options.params) {
    const searchParams = new URLSearchParams(options.params);
    finalUrl += `?${searchParams.toString()}`;
  }

  try {
    const response = await fetch(finalUrl, requestConfig);

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return response.text();
  } catch (error) {
    throw new Error(error.message, { cause: error });
  }
};

export const apiClient = {
  get: (url, options) => handleRequest(url, "GET", null, options),
  post: (url, body, options) => handleRequest(url, "POST", body, options),
  put: (url, body, options) => handleRequest(url, "PUT", body, options),
  patch: (url, body, options) => handleRequest(url, "PATCH", body, options),
  delete: (url, options) => handleRequest(url, "DELETE", null, options),
};
