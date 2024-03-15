import { API_BASE_URL } from "./api_Endpoint";

export const getActivityLogsApi = async (id,role_type,today) => {
    var myHeaders = new Headers();
  
    var urlencoded = new URLSearchParams();
    urlencoded.append("user_id", id);
    urlencoded.append("role_type", role_type);
    urlencoded.append("from_date", today);
    urlencoded.append("to_date", today);


  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
  
    // Returning the fetch promise
    return fetch(`${API_BASE_URL}/activitylogs`, requestOptions)
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