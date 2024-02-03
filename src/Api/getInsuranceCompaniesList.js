import makeApiRequest from "./apiCaller";

export const get_Insurance_Companies_List = async () => {
  try {
    const result = await makeApiRequest("insurance_companies", "GET");
    const data = JSON.parse(result);
    console.log(data);
    return data;
  } catch (error) {
    // Handle errors
    // console.log(error);
  }
};
