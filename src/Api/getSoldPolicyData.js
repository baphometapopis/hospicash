import { API_BASE_URL } from "./api_Endpoint";

export const getSoldPolicyData = async (dealer_id, policy_id) => {
  console.log(dealer_id, policy_id);
  try {
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("dealer_id", dealer_id);
    formdata.append("policy_id", policy_id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${API_BASE_URL}/GetSoldPolicyData`,
      requestOptions
    );
    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};
