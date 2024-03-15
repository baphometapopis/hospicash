import { API_BASE_URL } from "./api_Endpoint";

export const getFilterListApi = async (id) => {
    var myHeaders = new Headers();
  
    var urlencoded = new URLSearchParams();
    // urlencoded.append("ic_id", id);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
  
    // Returning the fetch promise
    return fetch(`${API_BASE_URL}/get_filter`, requestOptions)
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