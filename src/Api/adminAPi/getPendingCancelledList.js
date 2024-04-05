import makeApiRequest from "../apiCaller";

export const getPendingPolicyListApi = async (formdata) => {
  try {
    const body = new URLSearchParams();
    body.append("user_id", formdata?.dealer_id);
    body.append("start", formdata?.start);
    body.append("length", formdata?.end);
    body.append("search", formdata.search ?? "");
    body.append("start_date", formdata.start_date ?? "");
    body.append("end_date", formdata.end_date ?? "");

    body.append("value", formdata?.value ?? "");
    body.append("role_type", formdata?.role_type);

    const result = await makeApiRequest("pendingCanlceledList", "POST", body);
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};
