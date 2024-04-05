// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  is_policy_schedule_type: "year",
  dealer_id: "",
  plan_id: "",
  salutation: "",
  fname: "",
  mname: "",
  lname: "",
  email: "",
  mobile_no: "",
  addr1: "",
  addr2: "",
  pincode: "",
  city_id: "",
  cityName: "",
  StateName: "",
  state_id: "",
  nominee_full_name: "",
  nominee_age: "",
  nominee_relation: "",
  appointee_name: "",
  appointee_age: "",
  appointee_relation: "",
  gender: "",
  pan_card_no: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      console.log(action);
      return { ...state, ...action.payload };
    },
    resetUserData: (state) => {
      return { ...initialState };
    },
  },
});

export const { updateUserData, resetUserData } = userSlice.actions;
export default userSlice.reducer;
