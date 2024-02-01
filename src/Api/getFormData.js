import makeApiRequest from "./apiCaller";

export const get_policy_data = async () => {
  try {
    const body = new URLSearchParams();
    body.append("dealer_id", "1");

    const result = await makeApiRequest("get_policy_data", "POST", body);
    const data = JSON.parse(result);
    console.log(data);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};

export const get_Pincode_Data = async (pincode) => {
  console.log(pincode);
  try {
    const body = new URLSearchParams();
    body.append("pincode", pincode);

    const result = await makeApiRequest(
      "get_city_state_by_pincode",
      "POST",
      body
    );
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};
