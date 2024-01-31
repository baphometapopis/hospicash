import makeApiRequest from "./apiCaller";

export const login = async (dealer_code, password) => {
  try {
    const body = new URLSearchParams();
    body.append("dealer_code", dealer_code);
    body.append("password", password);

    const result = await makeApiRequest("login", "POST", body);
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};
