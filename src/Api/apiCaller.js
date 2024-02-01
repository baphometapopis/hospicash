// import { getHeaders } from "./apiService";
import { API_BASE_URL } from "./api_Endpoint";

const makeApiRequest = (endpoint, method = "GET", body = null) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const requestOptions = {
    method: method.toUpperCase(),
    // headers: getHeaders(),
    body,
    redirect: "follow",
  };

  return fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result; // You can return the result or process it further
    })
    .catch((error) => {
      // Do nothing or handle the error in a different way if needed
      console.log(error);
    });
};

export default makeApiRequest;
