import makeApiRequest from "./apiCaller";

export const getDealerTransactionList = async (formdata) => {
  console.log(formdata);
  try {
    const body = new URLSearchParams();
    body.append("dealer_id", formdata?.dealer_id);
    body.append("start", formdata?.start);
    body.append("length", formdata?.end);
    body.append("search", "");
    body.append("value", "");

    const result = await makeApiRequest(
      "dealer_transaction_data",
      "POST",
      body
    );
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};
