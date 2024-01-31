import makeApiRequest from "./apiCaller";

export const generatePolicy = async (formdata) => {
  console.log(formdata);
  debugger;
  try {
    const body = new URLSearchParams();
    body.append("dealer_id", formdata?.dealer_id);
    body.append("plan_id", formdata?.plan_id);
    body.append("salutation", formdata?.salutation);
    body.append("fname", formdata?.fname);
    body.append("lname", formdata?.lname);
    body.append("mobile_no", formdata?.mobile_no);
    body.append("gender", formdata?.gender);
    body.append("dob", formdata?.dob);
    body.append("addr1", formdata?.addr1);
    body.append("addr2", formdata?.addr2);
    body.append("pincode", formdata?.pincode);
    body.append("nominee_full_name", formdata?.nominee_full_name);
    body.append("nominee_relation", formdata?.nominee_relation);
    body.append("nominee_age", formdata?.nominee_age);
    body.append("state_id", formdata?.state_id);
    body.append("city_id", formdata?.city_id);
    body.append("is_policy_schedule_type", formdata?.is_policy_schedule_type);

    const result = await makeApiRequest("generated_policy_data", "POST", body);
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};
