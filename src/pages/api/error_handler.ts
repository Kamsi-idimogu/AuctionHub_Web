export function errorHandler(error: any) {
  if (error.name === "AxiosError") {
    if (error.response && error.response.status === 409) {
      return {
        status: error.response.data.status || "failed",
        message: error.response.data.message || "conflict",
        data: null,
      };
    } else {
      // Handle other Axios errors
      return {
        status: error.response.data.status || "failed",
        message: error.response.data.message || "",
        data: null,
      };
    }
  } else {
    // Handle non-Axios errors - Generic errors
    return {
      status: error.response.data.status || "failed",
      message: error.response.data.message || "",
      data: null,
    };
  }
}
