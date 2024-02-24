// import makeApiRequest from "./apiCaller";

// export const login = async (dealer_code, password, userType) => {
//   try {
//     const body = new URLSearchParams();
//     body.append("username", dealer_code);
//     body.append("password", password);
//     body.append("role_type", userType);

//     const result = await makeApiRequest("login", "POST", body);
//     const data = JSON.parse(result);
//     return data;
//   } catch (error) {
//     // Handle errors
//     // console.log(error);
//   }
// };

import { API_BASE_URL } from "./api_Endpoint";

export const login = async (dealer_code, password, userType) => {
  try {
    // var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("username", dealer_code);
    formdata.append("password", password);
    formdata.append("role_type", userType);

    var requestOptions = {
      method: "POST",
      // headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(`${API_BASE_URL}/login`, requestOptions);
    const result = await response.text();
    console.log(result);

    return JSON.parse(result);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};

// import makeApiRequest from "./apiCaller";

// export const login = async (dealer_code, password, userType) => {
//   try {
//     const body = new URLSearchParams();
//     body.append("username", dealer_code);
//     body.append("password", password);
//     body.append("role_type", userType);

//     const result = await makeApiRequest("login", "POST", body);
//     const data = JSON.parse(result);
//     return data;
//   } catch (error) {
//     // Handle errors
//     // console.log(error);
//   }
// };

export const Globallogin = async (redirection_key) => {
  try {
    // var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("redirection_key", redirection_key);

    var requestOptions = {
      method: "POST",
      // headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(`${API_BASE_URL}/GlobalLogin`, requestOptions);
    const result = await response.text();
    console.log(result);

    return JSON.parse(result);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};
