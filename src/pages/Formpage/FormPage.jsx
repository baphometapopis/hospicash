/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../../assets/img/hospicashcoverimage.jpeg";
import { useFormik } from "formik";
import "./Formpage.css";
import Input from "../../components/ui/Input.js";
import { useLocation, useNavigate } from "react-router-dom";
import PlanCard from "../PlanCard.jsx";
import { get_Pincode_Data, get_policy_data } from "../../Api/getFormData.js";
import CustomSelect from "../../components/ui/CustomSelect.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";
import {
  Update_generatePolicy,
  generatePolicy,
} from "../../Api/generatePolicy.js";
import { useDispatch, useSelector } from "react-redux";
import { resetUserData, updateUserData } from "../../Redux/userSlice.js.js";
import moment from "moment";
import { decryptData } from "../../Utils/cryptoUtils.js";
import { getSoldPolicyData } from "../../Api/getSoldPolicyData.js";

export default function FormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan] = useState(location?.state?.selectedPlan);
  const [salutation, setSalutation] = useState([]);
  const [isEndorsment, setIsEndorsment] = useState(
    location?.state?.Action === "Endorsment" ? true : false
  );

  const [nom_relation, setNom_relation] = useState([]);
  const [genderOption, setgenderOption] = useState([]);
  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);
  const userData = useSelector((state) => state.user);
  const [formdata, setFormdata] = useState("");
  const [cityName, setcityName] = useState("");
  const [StateName, setStateName] = useState("");
  const [LoginData, setLoginData] = useState();
  const navigation = useNavigate();
  const submitData = async () => {
    dispatch(updateUserData({ dealer_id: LoginData?.user_details?.id }));

    if (!isEndorsment) {
      const data = await generatePolicy(
        LoginData?.user_details?.id,
        formik.values
      );
      if (data?.status) {
        navigation("/confirmed", { state: { policy_id: data?.policy_id } });

        toast.success(data?.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        dispatch(resetUserData());
      } else {
        toast.error(data?.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } else {
      const data = await Update_generatePolicy(
        LoginData?.user_details?.id,
        formik.values,
        location?.state?.policyID
      );
      if (data?.status) {
        navigation("/confirmed", { state: { policy_id: data?.policy_id } });

        toast.success(data?.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        dispatch(resetUserData());
      } else {
        toast.error(data?.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: userData,

    onSubmit: (values) => {
      if (
        location?.state?.Action === "Endorsment" ||
        location?.state?.Action === "NewPolicy"
      ) {
        submitData();
      } else {
        // dispatch(updateUserData({ StateName: StateName }));
        // dispatch(updateUserData({ cityName: cityName }));

        dispatch(
          updateUserData({
            stateName: StateName,
            cityName: cityName,
          })
        );

        dispatch(updateUserData(formik.values));

        navigation("/plans", { state: { formdata } });
      }
    },
    validate: (values) => {
      const errors = {};

      const validateRequired = (field, message) => {
        if (!values[field]) {
          errors[field] = message;
        } else {
          delete errors[field];
        }
      };
      const validateEmailFormat = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,3}$/;
        return emailRegex.test(email);
      };
      const validateIndanMobileNo = (mobileno) => {
        const mobileRegex = /^[6789]\d{9}$/;
        return mobileRegex.test(mobileno);
      };
      const validatePanNo = (panNo) => {
        const panRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/;
        return panRegex.test(panNo);
      };

      validateRequired("fname", "Required");
      validateRequired("salutation", "Required");
      validateRequired("dob", "Required");
      validateRequired("gender", "Required");
      validateRequired("lname", "Required");
      validateRequired("email", "Required");
      validateRequired("pan_number", "Required");

      validateRequired("mobile_no", "Required");
      validateRequired("addr1", "Required");
      validateRequired("addr2", "Required");
      validateRequired("pincode", "Required");
      validateRequired("city_id", "Required");
      validateRequired("state_id", "Required");
      validateRequired("nominee_full_name", "Required");
      validateRequired("nominee_age", "Required");
      validateRequired("nominee_relation", "Required");
      if (values.email && !validateEmailFormat(values.email)) {
        errors.email = "Invalid email format";
      }

      if (values.mobile_no && !validateIndanMobileNo(values.mobile_no)) {
        errors.mobile_no = "Invalid Mobile Number";
      }
      if (values.pan_number && !validatePanNo(values.pan_number)) {
        errors.pan_number = "Invalid Pan Number";
      }

      if (
        values.pincode?.length === 6 &&
        (values.pincode !== formik.values.pincode ||
          StateName === "" ||
          cityName === "")
      ) {
        // Call your function here
        getPincode(values.pincode);
      }

      if (values.nominee_age < 18 && values.nominee_age !== "") {
        validateRequired("appointee_name", "Required");
        validateRequired("appointee_age", "Required");
        validateRequired("appointee_relation", "Required");
        if (values.appointee_age && values?.appointee_age < 18) {
          errors.appointee_age = "age should be above 18";
        }
      }

      return errors;
    },
  });

  const getPincode = async (pincode) => {
    const data = await get_Pincode_Data(pincode);
    console.log(data?.data?.city_or_village_name);
    if (data?.status) {
      setcityName(data?.data?.city_or_village_name);
      setStateName(data?.data?.state_name);
      formik.setFieldValue("city_id", data?.data?.city_id);
      formik.setFieldValue("state_id", data?.data?.state_id);
    } else {
      formik.setFieldValue("pincode", " ");
      toast.error("Failed to fetch Pincode ", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const getlocalData = useCallback(async () => {
    const data = localStorage.getItem("Acemoney_Cache");
    if (data) {
      const decryptdata = decryptData(data);
      setLoginData(decryptdata);

      //api function if needed or  store in a state
    } else {
      navigate("/");

      toast.error("Session Expired, Login Again", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [navigate]);
  const getFormData = async () => {
    const data = await get_policy_data();
    if (data?.status) {
      setFormdata(data);
      const activeSalutations = data?.salutation_data?.filter(
        (salutation) => salutation.is_active === 1
      );

      setSalutation(activeSalutations);
      const activeGender = data?.genders_data?.filter(
        (gender) => gender.is_active === 1
      );
      setgenderOption(activeGender);
    }
    setNom_relation(data?.nominee_relation_data);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);
  const getEndorsmentDetails = async () => {
    const data = await getSoldPolicyData(
      LoginData?.user_details?.id,
      location?.state?.policyID
    );

    formik.setFieldValue("addr1", data?.data[0].addr1);
    formik.setFieldValue("addr2", data?.data[0].addr2);
    formik.setFieldValue("appointee_age", data?.data[0].appointee_age);
    formik.setFieldValue("appointee_name", data?.data[0].appointee_full_name);
    formik.setFieldValue(
      "appointee_relation",
      Number(data?.data[0].appointee_relation)
    );
    formik.setFieldValue("city_id", data?.data[0].city);
    formik.setFieldValue("state_id", data?.data[0].state);
    formik.setFieldValue("fname", data?.data[0].fname);
    formik.setFieldValue("pincode", data?.data[0].pincode);

    setStateName(data?.data[0].state_name);
    setcityName(data?.data[0].city_name);

    formik.setFieldValue("pan_number", data?.data[0].pan_number);
    formik.setFieldValue("dob", data?.data[0].dob);
    formik.setFieldValue("email", data?.data[0].email);
    formik.setFieldValue("gender", Number(data?.data[0].gender));
    formik.setFieldValue("mobile_no", data?.data[0].mobile_no);
    formik.setFieldValue("nominee_age", data?.data[0].nominee_age);
    formik.setFieldValue("nominee_full_name", data?.data[0].nominee_full_name);
    formik.setFieldValue(
      "nominee_relation",
      Number(data?.data[0].nominee_relation)
    );
    formik.setFieldValue("salutation", Number(data?.data[0].salutation));

    formik.setFieldValue("mname", data?.data[0].mname);
    formik.setFieldValue("lname", data?.data[0].lname);

    // console.log(data?.data[0]);
  };

  useEffect(() => {
    if (location?.state?.Action === "Endorsment") {
      getEndorsmentDetails();
    }
    getFormData();
    getlocalData();
  }, [getlocalData]);

  useEffect(() => {
    if (
      formik.values.pincode?.length === 6 &&
      (StateName === "" || cityName === "")
    ) {
      // Call your function here
      getPincode(formik.values.pincode);
    }
  }, [StateName, cityName]);

  return (
    <>
      <div className="flex flex-col w-full items-center overflow-auto">
        <div className=" -z-10 top-12 w-full">
          <img
            src={coverImage}
            className="w-full h-36 object-cover"
            alt="cover_image"
          />
        </div>
        <div
          // style={{
          //   flexDirection: windowWidth <= "931px" ? "column" : "row",
          // }}
          className="flex flex-col md:flex-row "
        >
          {" "}
          {selectedPlan && (
            <div
              style={{ justifyContent: "center" }}
              className="sticky top-20  mx-6 md:min-w-fit md:w-1/2 h-fit mb-20  -mt-10 md:-mt-20 flex p-2"
            >
              {/* Plans Section */}

              <PlanCard
                key={selectedPlan?.id}
                title={selectedPlan.plan_name}
                data={selectedPlan}
                features={selectedPlan.features}
                price={selectedPlan.total_premium}
                backgroundColor={selectedPlan.backgroundColor}
              />
              {/* End of Plans Section */}
            </div>
          )}
          <div className="mx-6 md:min-w-fit md:w-1/2 bg-white h-full -mt-20 border border-neutral-light rounded mb-20">
            <div className="bg-base-white h-24 border-b border-neutral-light rounded-t p-4">
              <p className="text-2xl">
                {!isEndorsment ? "User Details" : "Update User Details"}
              </p>
              {!isEndorsment && (
                <p>Start punching policy by filling in the User's details</p>
              )}
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/* grid grid-cols-1  lg:grid-cols-4  md:grid-cols-4 */}
              <div className="formContainer gap-y-6 gap-x-6 place-items-center py-8 px-8">
                {salutation && (
                  <CustomSelect
                    id="salutation"
                    name="salutation"
                    label={"Salutation"}
                    options={[
                      ...salutation.map((salutation) => ({
                        value: salutation.id,
                        label: salutation.name,
                      })),
                    ]}
                    disabled={isEndorsment}
                    required
                    placeholder="Select Salutation"
                    value={formik.values.salutation}
                    formik={formik}
                    onChange={(selectedOption) => {
                      formik.setFieldValue("salutation", selectedOption.value);
                    }}
                    showError={false} // Set this prop to control error visibility
                  />
                )}
                <Input
                  {...formik.getFieldProps("fname")}
                  required={true}
                  formik={formik}
                  id="fname"
                  name="fname"
                  type="text"
                  placeholder="Enter your First Name"
                  label="First Name"
                  value={formik.values.fname}
                  capitalize
                  alphabets
                />
                <Input
                  {...formik.getFieldProps("mname")}
                  formik={formik}
                  id="mname"
                  name="mname"
                  type="text"
                  placeholder="Enter your Middle Name"
                  label="Middle Name"
                  value={formik.values.mname}
                  capitalize
                  alphabets
                />
                <Input
                  {...formik.getFieldProps("lname")}
                  formik={formik}
                  id="lname"
                  required={true}
                  name="lname"
                  type="text"
                  placeholder="Enter your Last Name"
                  label="Last Name"
                  value={formik.values.lname}
                  alphabets
                  capitalize
                />
                <Input
                  {...formik.getFieldProps("email")}
                  formik={formik}
                  id="email"
                  name="email"
                  required
                  type="text"
                  placeholder="Enter your email"
                  label="Email"
                  value={formik.values.email}
                />
                <Input
                  {...formik.getFieldProps("mobile_no")}
                  formik={formik}
                  id="mobile_no"
                  name="mobile_no"
                  type="text"
                  placeholder="Enter your Mobile No"
                  label="Mobile No"
                  required={true}
                  value={formik.values.mobile_no}
                  numericOnly
                  maxLength={10}
                />

                {true && (
                  <CustomSelect
                    required
                    id="gender"
                    name="gender"
                    options={
                      genderOption?.map((data) => ({
                        value: data.id,
                        label: data.name,
                      })) || []
                    }
                    label={"Select Gender"}
                    placeholder="Select Gender"
                    value={formik.values.gender}
                    formik={formik}
                    onChange={(selectedOption) => {
                      formik.setFieldValue("gender", selectedOption.value);
                    }}
                    disabled={isEndorsment}
                    showError={false} // Set this prop to control error visibility
                  />
                )}
                <Input
                  {...formik.getFieldProps("pan_number")}
                  formik={formik}
                  id="pan_number"
                  name="pan_number"
                  type="text"
                  placeholder="Enter your Pan Number"
                  label="Pan Number"
                  required={true}
                  value={formik.values.pan_number}
                  alphanumeric
                  maxLength={10}
                  disabled={isEndorsment}
                  capitalize
                />

                {/* <div className="flex flex-col">
                  <label
                    style={{ alignSelf: "flex-start", color: "#686464" }}
                    htmlFor="date"
                  >
                    Date Of Birth
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <DatePicker
                    id="date"
                    selected={
                      formik.values.dob
                        ? moment(formik.values.dob, "YYYY/MM/DD").toDate()
                        : ""
                    }
                    onChange={(date) => {
                      formik.setFieldValue("dob", formatDate(date));
                    }}
                    preventOpenOnFocus={false}
                    autoComplete="false"
                    dateFormat="yyyy/MM/dd"
                    placeholderText="YYYY/MM/DD"
                    className="focus:outline-none border border-[#6D6D6D] px-2 py-1  "
                  />
                </div> */}
                <div className="flex flex-col w-[220px]">
                  <label
                    style={{ alignSelf: "flex-start", color: "#686464" }}
                    htmlFor="date"
                  >
                    Date Of Birth
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    {...formik.getFieldProps("dob")}
                    formik={formik}
                    id="dob"
                    name="dob"
                    type="date"
                    max={moment().subtract(18, "years").format("YYYY-MM-DD")}
                    required={true}
                    placeholder="dob"
                    value={formik.values.dob}
                    disabled={isEndorsment}
                    className="w-full"
                  />
                </div>
                <Input
                  {...formik.getFieldProps("addr1")}
                  formik={formik}
                  id="addr1"
                  name="addr1"
                  type="text"
                  required={true}
                  placeholder="Address1 "
                  label="Address 1"
                  value={formik.values.addr1}
                  capitalize
                />
                <Input
                  {...formik.getFieldProps("addr2")}
                  formik={formik}
                  id="addr2"
                  name="addr2"
                  type="text"
                  required={true}
                  placeholder="Address 2 "
                  label="Address 2"
                  value={formik.values.addr2}
                  capitalize
                />
                <Input
                  {...formik.getFieldProps("pincode")}
                  formik={formik}
                  id="pincode"
                  name="pincode"
                  type="text"
                  placeholder="Pincode"
                  label="Pincode"
                  disabled={isEndorsment}
                  required={true}
                  value={formik.values.pincode}
                  maxLength={6}
                  numericOnly
                />
                <Input
                  {...formik.getFieldProps("city_id")}
                  formik={formik}
                  id="city_id"
                  name="city_id"
                  type="text"
                  placeholder="City"
                  label="City"
                  disabled={true}
                  required={true}
                  value={cityName}
                />
                <Input
                  {...formik.getFieldProps("state_id")}
                  formik={formik}
                  id="state_id"
                  name="state_id"
                  type="text"
                  disabled={true}
                  placeholder="State"
                  label="State"
                  required={true}
                  value={StateName}
                />
                <Input
                  {...formik.getFieldProps("nominee_full_name")}
                  formik={formik}
                  id="nominee_full_name"
                  name="nominee_full_name"
                  type="text"
                  required={true}
                  placeholder="Enter Nominee Name"
                  label="Nominee Full Name"
                  sentences
                  capitalize
                  value={formik.values.nominee_full_name}
                />
                <Input
                  {...formik.getFieldProps("nominee_age")}
                  formik={formik}
                  id="nominee_age"
                  name="nominee_age"
                  type="text"
                  placeholder="Nominee Age"
                  label="Nominee Age"
                  required={true}
                  value={formik.values.nominee_age}
                  maxLength={2}
                  numericOnly
                />
                {true && (
                  <CustomSelect
                    id="nominee_relation"
                    required
                    name="nominee_relation"
                    label={"Nominee Relation"}
                    options={
                      nom_relation?.map((data) => ({
                        value: data.nominee_relation_id,
                        label: data.name,
                      })) || []
                    }
                    placeholder="Select Relation"
                    value={formik.values.nominee_relation}
                    formik={formik}
                    onChange={(selectedOption) => {
                      formik.setFieldValue(
                        "nominee_relation",
                        selectedOption.value
                      );
                    }}
                    showError={false} // Set this prop to control error visibility
                  />
                )}
                {formik.values.nominee_age < 18 &&
                  formik.values.nominee_age !== "" && (
                    <>
                      <Input
                        {...formik.getFieldProps("appointee_name")}
                        formik={formik}
                        id="appointee_name"
                        name="appointee_name"
                        type="text"
                        required={true}
                        placeholder="Enter Appointee Name"
                        label="Appointee Full Name"
                        sentences
                        value={formik.values.appointee_name}
                      />
                      <Input
                        {...formik.getFieldProps("appointee_age")}
                        formik={formik}
                        id="appointee_age"
                        name="appointee_age"
                        type="text"
                        placeholder="Appointee Age"
                        label="Appointee Age"
                        required={true}
                        value={formik.values.appointee_age}
                        numericOnly
                        maxLength={2}
                      />
                      {true && (
                        <CustomSelect
                          id="appointee_relation"
                          required
                          name="appointee_relation"
                          label={"Appointee Relation"}
                          options={
                            nom_relation?.map((data) => ({
                              value: data.nominee_relation_id,
                              label: data.name,
                            })) || []
                          }
                          placeholder="Select Relation"
                          value={formik.values.appointee_relation}
                          formik={formik}
                          onChange={(selectedOption) => {
                            formik.setFieldValue(
                              "appointee_relation",
                              selectedOption.value
                            );
                          }}
                          showError={false} // Set this prop to control error visibility
                        />
                      )}
                    </>
                  )}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 rounded mb-10"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
