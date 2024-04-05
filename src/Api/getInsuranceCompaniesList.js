import makeApiRequest from "./apiCaller";
import { API_BASE_URL } from "./api_Endpoint";

export const get_Insurance_Companies_List = async () => {
  try {
    const result = await makeApiRequest("insurance_companies", "GET");
    const data = JSON.parse(result);
    console.log(data);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};

export const Getpartypaymentdetails = async (id) => {
  var myHeaders = new Headers();

  var urlencoded = new URLSearchParams();
  urlencoded.append("ic_id", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  // Returning the fetch promise
  return fetch(`${API_BASE_URL}/party-payment-details`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // Returning the JSON data
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      // Returning an error object or message if needed
      return { error: "An error occurred while fetching data." };
    });
};
