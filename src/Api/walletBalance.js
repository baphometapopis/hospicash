import makeApiRequest from "./apiCaller";

export const walletBalance = async (dealer_id) => {
  try {
    const body = new URLSearchParams();
    body.append("dealer_id", dealer_id);

    const result = await makeApiRequest("walletBalances", "POST", body);
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};
