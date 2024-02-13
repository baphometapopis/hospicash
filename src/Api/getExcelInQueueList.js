import { API_BASE_URL } from "./api_Endpoint";

export const get_Excel_InQueue_List = async (id, status) => {
  console.log(id, "get_Excel_InQueue_List");
  var myHeaders = new Headers();

  var urlencoded = new URLSearchParams();
  urlencoded.append("dealer_id", id);
  urlencoded.append("status", status);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/UsersUploadexcelDataList`,
      requestOptions
    );

    if (!response.ok) {
      // Throw an error for non-successful responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    // Returning an error object or message if needed
    return { error: "An error occurred while fetching data." };
  }
};
