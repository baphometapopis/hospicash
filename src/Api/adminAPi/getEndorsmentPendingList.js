import { decryptData } from "../../Utils/cryptoUtils";
import makeApiRequest from "../apiCaller";
const localData = localStorage.getItem("Acemoney_Cache");
const decryptdata = decryptData(localData);
const user_id = decryptdata?.user_details?.id;

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
    body.append("endorsement_status", "pending");
    body.append("user_type", formdata?.user_type);

    const result = await makeApiRequest("PolicyEndorsementlist", "POST", body);
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};

export const getEndorsementDetails = async (id) => {
  try {
    const body = new URLSearchParams();

    body.append("endorse_id", id);

    const result = await makeApiRequest("FetchEndorsementById", "POST", body);
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};

export const updateEndorsmentStatus = async (id, status, remarks) => {
  try {
    const formdata = new FormData();
    formdata.append("endorse_id", id);

    formdata.append("endorsement_status", status);
    formdata.append("remark", remarks);
    formdata.append("user_id", user_id);
    const result = await makeApiRequest(
      "updateEndorsementstatus",
      "POST",
      formdata
    );
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};
