import { API_BASE_URL } from "./api_Endpoint";

export const ApproveDealerTransaction = async (id, data) => {
  console.log(id, data, "dsdsdsdsdsdsd");

  var myHeaders = new Headers();

  var urlencoded = new URLSearchParams();
  urlencoded.append("dealer_bank_tran_id", data?.bank_transaction_no);
  urlencoded.append("dealer_id", data?.dealer_id);
  urlencoded.append("amount", data?.deposit_amount);
  urlencoded.append("user_id", id);

  urlencoded.append("transaction_type", data?.transaction_type);
  urlencoded.append("approval_status", "approved");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/approveDealer`,
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
