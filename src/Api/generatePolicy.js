import { API_BASE_URL } from "./api_Endpoint";

export const generatePolicy = (id, data) => {
  console.log(id, data);
  var myHeaders = new Headers();
  var urlencoded = new URLSearchParams();
  urlencoded.append("dealer_id", id);
  urlencoded.append("plan_id", data?.plan_id);
  urlencoded.append("salutation", data?.salutation);
  urlencoded.append("first_name", data?.fname);
  urlencoded.append("middel_name", data?.mname);
  urlencoded.append("last_name", data?.lname);
  urlencoded.append("mobile_no", data?.mobile_no);
  urlencoded.append("gender", data?.gender);
  urlencoded.append("dob", data?.dob);
  urlencoded.append("addr1", data?.addr1);
  urlencoded.append("addr2", data?.addr2);
  urlencoded.append("pincode", data?.pincode);
  urlencoded.append("nominee_full_name", data?.nominee_full_name);
  urlencoded.append("nominee_relation", data?.nominee_relation);
  urlencoded.append("nominee_age", data?.nominee_age);
  urlencoded.append("appointee_full_name", data?.appointee_name);
  urlencoded.append("appointee_relation", data?.appointee_relation);
  urlencoded.append("appointee_age", data?.appointee_age);
  urlencoded.append("state_id", data?.state_id);
  urlencoded.append("city_id", data?.city_id);
  urlencoded.append("is_policy_schedule_type", data?.is_policy_schedule_type);
  urlencoded.append("email", data?.email);
  urlencoded.append("pan_number", data?.pan_number);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  // Returning the fetch promise
  return fetch(`${API_BASE_URL}/generated_policy_data`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // Returning the JSON data
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      // Returning an error object or message if needed
      return { error: "An error occurred while fetching data." };
    });
};

export const Update_generatePolicy = (id, data) => {
  console.log(id, data);
  var myHeaders = new Headers();
  var urlencoded = new URLSearchParams();
  urlencoded.append("dealer_id", id);
  // urlencoded.append("plan_id", data?.plan_id);
  urlencoded.append("salutation", data?.salutation);
  urlencoded.append("first_name", data?.fname);
  urlencoded.append("middel_name", data?.mname);
  urlencoded.append("last_name", data?.lname);
  urlencoded.append("mobile_no", data?.mobile_no);
  urlencoded.append("gender", data?.gender);
  urlencoded.append("dob", data?.dob);
  urlencoded.append("addr1", data?.addr1);
  urlencoded.append("addr2", data?.addr2);
  urlencoded.append("pincode", data?.pincode);
  urlencoded.append("nominee_full_name", data?.nominee_full_name);
  urlencoded.append("nominee_relation", data?.nominee_relation);
  urlencoded.append("nominee_age", data?.nominee_age);
  urlencoded.append("appointee_name", data?.appointee_name);
  urlencoded.append("appointee_relation", data?.appointee_relation);
  urlencoded.append("appointee_age", data?.appointee_age);
  urlencoded.append("state_id", data?.state_id);
  urlencoded.append("city_id", data?.city_id);
  // urlencoded.append("is_policy_schedule_type", data?.is_policy_schedule_type);
  urlencoded.append("email", data?.email);
  urlencoded.append("pan_number", data?.pan_number);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  // Returning the fetch promise
  return fetch(`${API_BASE_URL}/generated_policy_data`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // Returning the JSON data
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      // Returning an error object or message if needed
      return { error: "An error occurred while fetching data." };
    });
};
