import makeApiRequest from "./apiCaller";

export const getSold_CancelPolicy = async (formdata) => {
  try {
    const body = new URLSearchParams();
    body.append("dealer_id", formdata?.dealer_id);
    body.append("start", formdata?.start);
    body.append("length", formdata?.end);
    body.append("search", "");
    body.append("value", "");
    body.append("policy_type", formdata?.policy_type);

    const result = await makeApiRequest("PolicyDatalist", "POST", body);
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};
