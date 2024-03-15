import { API_BASE_URL } from "../api_Endpoint";

export const policyCountByDayApi = async (id, role_type) => {
  var myHeaders = new Headers();

  var urlencoded = new URLSearchParams();

  urlencoded.append("user_id", id);

  urlencoded.append("user_type", role_type);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/PolicycountByDay`,
      requestOptions
    );

    if (!response.ok) {
      // Throw an error for non-successful responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    // Returning an error object or message if needed
    return { error: "An error occurred while fetching data." };
  }
};

export const totalPendingTransactionRequestApi = async (id, role_type) => {
  var myHeaders = new Headers();

  var urlencoded = new URLSearchParams();

  urlencoded.append("user_id", id);

  urlencoded.append("user_type", role_type);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/Totalpendingrequest`,
      requestOptions
    );

    if (!response.ok) {
      // Throw an error for non-successful responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    // Returning an error object or message if needed
    return { error: "An error occurred while fetching data." };
  }
};

export const policyCountByMonthApi = async (id, role_type) => {
  var myHeaders = new Headers();

  var urlencoded = new URLSearchParams();

  urlencoded.append("user_id", id);

  urlencoded.append("user_type", role_type);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/PolicycountByMonth`,
      requestOptions
    );

    if (!response.ok) {
      // Throw an error for non-successful responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    // Returning an error object or message if needed
    return { error: "An error occurred while fetching data." };
  }
};

export const countSoldCancelPolicyApi = async (id, role_type) => {
  var myHeaders = new Headers();

  var urlencoded = new URLSearchParams();

  urlencoded.append("user_id", id);

  urlencoded.append("user_type", role_type);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/CountPolicySoldCancel`,
      requestOptions
    );

    if (!response.ok) {
      // Throw an error for non-successful responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    // Returning an error object or message if needed
    return { error: "An error occurred while fetching data." };
  }
};
