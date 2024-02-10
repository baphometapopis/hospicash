import makeApiRequest from "./apiCaller";

export const login = async (dealer_code, password, userType) => {
  try {
    const body = new URLSearchParams();
    body.append("username", dealer_code);
    body.append("password", password);
    body.append("role_type", userType);

    const result = await makeApiRequest("login", "POST", body);
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};
