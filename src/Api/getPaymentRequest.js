import moment from "moment";
import { API_BASE_URL } from "./api_Endpoint";

export const getPaymentRequest = async (id, data) => {
  console.log(data?.dealer_bank_trans_id);
  const date = moment(data?.date).format("YYYY/MM/DD");
  console.log(date);
  var myHeaders = new Headers();

  var urlencoded = new URLSearchParams();
  urlencoded.append("transaction_no", data?.transaction_no);
  urlencoded.append("bank_name", data?.bank_name);
  urlencoded.append("ifsc_code", data?.bankIfscCode);
  urlencoded.append("deposit_amount", data?.deposit_amount);
  urlencoded.append("transaction_type", data?.transactionType);
  urlencoded.append("acc_type", data?.acc_type);
  urlencoded.append("transaction_date", date);
  urlencoded.append("dealer_bank_trans_id", "");
  urlencoded.append("dealer_id", id);

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

