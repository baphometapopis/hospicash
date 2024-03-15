import { decryptData } from "../Utils/cryptoUtils";
import { API_BASE_URL } from "./api_Endpoint";

const localData = localStorage.getItem("Acemoney_Cache");
const decryptdata = decryptData(localData);
const user_id = decryptdata?.user_details?.id;

export const cancelSoldPolicy = async (data, id) => {
  console.log(data);

  var urlencoded = new FormData();
  urlencoded.append("cancel_remark", data?.comments);
  urlencoded.append("user_id",user_id);

  urlencoded.append("policy_id", id);
  urlencoded.append(
    "cancelation_reason_type",
    data?.cancelation_reason_type?.value
  );
  urlencoded.append("image", data?.file);

  var requestOptions = {
    method: "POST",
    body: urlencoded,
    redirect: "follow",
  };

  // Returning the fetch promise
  return fetch(`${API_BASE_URL}/cancelPolicy`, requestOptions)
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
