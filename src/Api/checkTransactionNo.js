import { API_BASE_URL } from "./api_Endpoint";

export const checkTransactionNo = async (id, data) => {
  console.log(data);
  var myHeaders = new Headers();

  var urlencoded = new URLSearchParams();
  urlencoded.append("transaction_no", data);
  urlencoded.append("dealer_id", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  // Returning the fetch promise
  return fetch(`${API_BASE_URL}/checkExistTransactionNO`, requestOptions)
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

export const Approve_Dealer_Transaction = async (id, data) => {
  console.log(data, "Approve_Dealer_Transaction");
  var myHeaders = new Headers();

  var urlencoded = new URLSearchParams();
  urlencoded.append("dealer_bank_tran_id", data?.dealer_bank_tran_id);
  urlencoded.append("dealer_id", data?.dealer_id);
  urlencoded.append("amount", data?.deposit_amount);
  urlencoded.append("transaction_type", data?.transaction_type);
  urlencoded.append("user_id", id);
  urlencoded.append("approval_status", "approve");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  // Returning the fetch promise
  return fetch(`${API_BASE_URL}/approveDealer`, requestOptions)
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
