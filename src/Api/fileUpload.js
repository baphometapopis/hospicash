import { API_BASE_URL } from "./api_Endpoint";

export const fileUpload = async (file) => {
  try {
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("transaction_file", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${API_BASE_URL}/uploadTransaction`,
      requestOptions
    );
    const result = await response.text();
    console.log(result);

    return JSON.parse(result);
  } catch (error) {
    // Handle errors
    console.log(error);
  }
};
