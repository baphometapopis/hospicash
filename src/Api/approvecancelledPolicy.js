import { API_BASE_URL } from "./api_Endpoint";

export const Approve_cancelled_Pending_Policy = async (id, data, role) => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("policy_id", data?.policy_id);
    urlencoded.append("role_type", role);
    urlencoded.append("user_id", id);
  
    var requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
    };
  
    // Returning the fetch promise
    return fetch(`${API_BASE_URL}/approveCancelledPolicy`, requestOptions)
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
  