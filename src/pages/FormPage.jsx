import React, { useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/ui/Input";
import { useLocation, useNavigate } from "react-router-dom";
import PlanCard from "./PlanCard";
import { get_Pincode_Data, get_policy_data } from "../Api/getFormData";
import CustomSelect from "../components/ui/CustomSelect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const validationSchema = Yup.object().shape({
  fname: Yup.string().required("Required"),
  middlename: Yup.string(),
  lname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  mobile_no: Yup.string()
    .matches(/^[0-9]+$/, "Must be a number")
    .required("Required"),
  addr1: Yup.string().required("Required"),
  addr2: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  city_id: Yup.string().required("Required"),
  state_id: Yup.string().required("Required"),
  nominee_full_name: Yup.string().required("Required"),
  nominee_age: Yup.number().required("Required").min(1, "Enter Valid Age"),
  // nominee_relation: Yup.string().required("Required"),
});

export default function FormPage() {
  const location = useLocation();

  const [selectedPlan, setSelectedPlan] = useState(
    location?.state?.selectedPlan
  );
  const [salutation, setSalutation] = useState([]);
  const [nom_relation, setNom_relation] = useState([]);
  const [genderOption, setgenderOption] = useState([]);

  const [formdata, setFormdata] = useState("");

  const [cityName, setcityName] = useState("");
  const [StateName, setStateName] = useState("");

  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      salutation: "",
      fname: "",
      middlename: "",
      lname: "",
      email: "",
      mobile_no: "",
      addr1: "",
      addr2: "",
      pincode: "",
      city_id: "",
      state_id: "",
      nominee_full_name: "",
      nominee_age: "",
      nominee_relation: "",
      appointee_name: "",
      appointee_age: "",
      appointee_relation: "",
      gender: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      if (
        location?.state?.Action === "Endorsment" ||
        location?.state?.Action === "NewPolicy"
      ) {
        console.log("Data Submitted Successfully ");
      } else {
        navigation("/plans", { state: { formdata } });
      }
    },
    validate: (values) => {
      // Check if the pincode length is 6
      console.log(values);
      if (
        values.pincode.length === 6 &&
        ((values.state_id === "" && values.city_id === "") ||
          values.pincode !== formik.values.pincode)
      ) {
        // Call your function here
        console.log("calling pincode function ", values.pincode);
        getPincode(values.pincode);
      }

      if (values.salutation) {
        // Call your function here
        console.log(formdata);
        // const nomdata = formdata?.nominee_relation_data?.filter(
        //   (relation) => relation.salutation == values.salutation
        // );
        setNom_relation(formdata?.nominee_relation_data);
      }
    },
  });

  const getPincode = async (pincode) => {
    const data = await get_Pincode_Data(pincode);
    if (data?.status) {
      console.log(data);
      setcityName(data?.data?.city_or_village_name);
      setStateName(data?.data?.state_name);
      formik.setFieldValue("city_id", data?.data?.city_id);
      formik.setFieldValue("state_id", data?.data?.state_id);
    } else {
      toast.error("Failed to fetch Pincode ", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    console.log(data);
  };

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
  };
  useEffect(() => {
    getFormData();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="sticky -z-10 top-12 w-full">
          <img
            src={coverImage}
            className="w-full h-36 object-cover"
            alt="cover_image"
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mx-6 md:min-w-fit md:w-1/2 bg-white h-full -mt-20 border border-neutral-light rounded mb-20">
            <div className="bg-base-white h-24 border-b border-neutral-light rounded-t p-4">
              <p className="text-2xl">User Details</p>
              <p>Start punching policy by filling in the User's details</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1  md:grid-cols-2 gap-y-6 gap-x-6 place-items-center py-8 px-8">
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
                />
                <Input
                  {...formik.getFieldProps("middlename")}
                  formik={formik}
                  id="middlename"
                  name="middlename"
                  type="text"
                  placeholder="Enter your Middle Name"
                  label="Middle Name"
                  value={formik.values.middlename}
                  capitalize
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
                />
                {/* <Input
                  {...formik.getFieldProps("email")}
                  formik={formik}
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  label="Email"
                  value={formik.values.email}
                />  */}
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
                    showError={false} // Set this prop to control error visibility
                  />
                )}
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
                />
                <Input
                  {...formik.getFieldProps("pincode")}
                  formik={formik}
                  id="pincode"
                  name="pincode"
                  type="text"
                  placeholder="Pincode"
                  label="Pincode"
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
                      />
                      <Input
                        {...formik.getFieldProps("appointee_relation")}
                        formik={formik}
                        id="appointee_relation"
                        name="appointee_relation"
                        type="text"
                        placeholder="Appointee Relation"
                        label="Appointee Relation"
                        required={true}
                        value={formik.values.appointee_relation}
                      />
                    </>
                  )}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {selectedPlan && (
            <div className="sticky top-20  mx-6 md:min-w-fit md:w-1/2 h-fit mb-20  -mt-20 flex p-2">
              {/* Plans Section */}

              <PlanCard
                title={selectedPlan.plan_name}
                features={selectedPlan.features}
                price={
                  selectedPlan.policy_premium +
                  selectedPlan.policy_premium_with_gst
                }
                backgroundColor={selectedPlan.backgroundColor}
              />
              {/* End of Plans Section */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
