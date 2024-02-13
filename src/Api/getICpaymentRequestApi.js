import moment from "moment";
import { API_BASE_URL } from "./api_Endpoint";

export const get_ICPaymentRequest = async (id, data) => {
    console.log(data?.dealer_bank_trans_id);
    const date = moment(data?.date).format("YYYY/MM/DD");
    console.log(date);
  
    var myHeaders = new Headers();

    var urlencoded = new URLSearchParams();
    urlencoded.append("transaction_no", data?.transaction_no);
    urlencoded.append("bank_name", data?.bank_name);
    urlencoded.append("ifsc_code", data?.ifsc_code);
    urlencoded.append("amount", data?.amount);
    urlencoded.append("account_no", data?.account_no);
    urlencoded.append("payment_date", data?.payment_date);
    urlencoded.append("ic_id", data.ic_id);
    urlencoded.append("dealer_id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/icpaymentprocess`, requestOptions);

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
