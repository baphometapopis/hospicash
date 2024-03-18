import makeApiRequest from "../apiCaller";

export const getEndorsmentPendingListApi = async (formdata) => {
  try {
    const body = new URLSearchParams();

    body.append("user_id", formdata?.dealer_id);
    body.append("start", formdata?.start);
    body.append("length", formdata?.end);
    body.append("search", formdata.search ?? "");
    body.append("start_date", formdata.start_date ?? "");
    body.append("end_date", formdata.end_date ?? "");

    body.append("value", formdata?.value ?? "");
    body.append("endorsement_status", formdata?.policy_type);
    body.append("user_type", formdata?.user_type);

    const result = await makeApiRequest("PolicyDatalist", "POST", body);
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};
