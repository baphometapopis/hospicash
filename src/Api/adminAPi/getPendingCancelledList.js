import makeApiRequest from "../apiCaller";

export const getPendingPolicyListApi = async (formdata) => {
    try {
      const body = new URLSearchParams();
      body.append("user_id", formdata?.dealer_id);
      body.append("start", formdata?.start);
      body.append("length", formdata?.end);
      body.append("search", "");
      body.append("value", "");
      body.append("role_type", formdata?.role_type);
  
      const result = await makeApiRequest("pendingCanlceledList", "POST", body);
      const data = JSON.parse(result);
      return data;
    } catch (error) {
      // Handle errors
      // console.log(error);
    }
  };
  