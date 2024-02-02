import { API_BASE_URL } from "./api_Endpoint";

export const getPaymentRequest = async (data) => {
  console.log(data);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("transaction_no", "23232323");
  urlencoded.append("bank_name", "HDFC Bank");
  urlencoded.append("ifsc_code", "HDFC0001588");
  urlencoded.append("deposit_amount", "10000");
  urlencoded.append("transaction_type", "deposit");
  urlencoded.append("acc_type", "saving");
  urlencoded.append("transaction_date", "2024-01-01");
  urlencoded.append("dealer_bank_trans_id", "");
  urlencoded.append("dealer_id", "1");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  // Returning the fetch promise
  return fetch(`${API_BASE_URL}/generate_payment_request`, requestOptions)
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
