/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decryptData } from "../../../Utils/cryptoUtils";
import { useNavigate } from "react-router-dom";
import { get_ICPaymentRequest } from "../../../Api/getICpaymentRequestApi";

const PaymentModal = ({ isOpen, onClose, icList }) => {
  const [insuranceList, setinsuranceCompaniesList] = useState([]);
  const [LocalData, setLocalData] = useState();
  const navigate = useNavigate();
  async function handleSubmit(values, { resetForm }) {
    const data = await get_ICPaymentRequest(
      LocalData?.user_details?.id,
      values
    );
    if (data?.status) {
      toast.success(data?.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      onClose();
      resetForm();
    } else {
      console.log(data);
      toast.error(`${data?.message}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  const getlocalData = useCallback(async () => {
    const data = localStorage.getItem("Acemoney_Cache");
    if (data) {
      const decryptdata = decryptData(data);
      setLocalData(decryptdata);

      // api function if needed or store in a state
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
  }, [setLocalData, navigate]);

  const handleAmountChange = (e) => {
    // Allow only numeric input for the amount field
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    formik.setFieldValue("amount", numericValue);
  };

  const handleTextChange = (fieldName, e) => {
    // Convert lowercase letters to uppercase and disallow special characters
    const sanitizedValue = e.target.value
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toUpperCase();
    formik.setFieldValue(fieldName, sanitizedValue);
  };

  const formik = useFormik({
    initialValues: {
      ic_id: "",
      transaction_no: "",
      ifsc_code: "",
      bank_name: "",
      account_no: "",
      amount: "",
      payment_date: null,
    },
    validationSchema: Yup.object({
      ic_id: Yup.string().required("Party Name is required"),
      transaction_no: Yup.string().required("Cheque No is required"),
      ifsc_code: Yup.string().required("Bank IFSC Code is required"),
      bank_name: Yup.string().required("Bank Name is required"),
      account_no: Yup.string().required("Bank Account Number is required"),
      amount: Yup.number().required("Amount is required"),
      payment_date: Yup.date().required("Date is required"),
    }),
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: true,
    validate: () => {
      // Validate on change and on blur
      console.log(formik.values, formik.errors);
    },
  });

  const formatDate = (date) => {
    return moment(date).format("YYYY/MM/DD");
  };
  useEffect(() => {
    if (icList) {
      setinsuranceCompaniesList(icList);
    }
    getlocalData();
  }, [getlocalData, icList, setinsuranceCompaniesList]);

  return (
    <div
      style={{ zIndex: 100 }}
      className={`fixed inset-0 ${isOpen ? "" : "hidden"}`}
    >
      {/* Dark, transparent overlay */}
      <div
        className={`fixed inset-0 transition-opacity ${
          isOpen ? "bg-black opacity-75" : "bg-transparent"
        }`}
        aria-hidden="true"
        onClick={onClose}
      ></div>

      <div className="flex items-center justify-center h-fit px-4 text-center">
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Payment Information
              </h3>
            </div>

            <div className="flex gap-10 my-10">
              <div style={{ gap: 26 }} className="flex flex-col">
                <label htmlFor="ic_id">Insurance Name : </label>
                <label htmlFor="transaction_no">Transaction No : </label>
                <label htmlFor="ifsc_code">Bank IFSC Code :</label>
                <label htmlFor="bank_name">Bank Name :</label>
                <label htmlFor="account_no">Bank Account Number :</label>
                <label htmlFor="amount">Amount :</label>
                <label htmlFor="payment_date" className="text-lg">
                  Date :
                </label>{" "}
              </div>

              <div style={{ gap: 15 }} className="flex flex-col ">
                <Select
                  id="ic_id"
                  options={[
                    ...(icList || []).map((salutation) => ({
                      value: salutation.id,
                      label: salutation.name,
                    })),
                  ]}
                  placeholder="Select Party"
                  value={icList?.find((o) => o.value === formik.values.ic_id)}
                  onChange={(option) =>
                    formik.setFieldValue("ic_id", option?.value || "")
                  }
                  styles={{
                    control: (provided, state) => ({
                      ...provided,

                      outline: "none", // Remove the outline

                      // Border color when focused
                      borderColor:
                        state.isFocused && !formik.touched.ic_id
                          ? "#6D6D6D" // Default border color when focused and not touched
                          : formik.touched.ic_id && formik.errors.ic_id
                          ? "red" // Border color on error
                          : "#6D6D6D", // Default border color
                    }),
                  }}
                />

                <input
                  type="text"
                  id="transaction_no"
                  name="transaction_no"
                  placeholder="Transaction number"
                  onChange={(e) => handleTextChange("transaction_no", e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.transaction_no}
                  style={{
                    borderColor:
                      formik.touched.transaction_no &&
                      formik.errors.transaction_no
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={
                    "border border-solid  rounded px-2 py-1 focus:outline-none"
                  }
                />
                <input
                  type="text"
                  id="ifsc_code"
                  placeholder="Bank Ifsc Code"
                  name="ifsc_code"
                  onChange={(e) => handleTextChange("ifsc_code", e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.ifsc_code}
                  style={{
                    borderColor:
                      formik.touched.ifsc_code && formik.errors.ifsc_code
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={
                    "border border-solid  rounded px-2 py-1 focus:outline-none"
                  }
                />
                <input
                  type="text"
                  id="bank_name"
                  name="bank_name"
                  placeholder="Bank Name"
                  onChange={(e) => handleTextChange("bank_name", e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.bank_name}
                  style={{
                    borderColor:
                      formik.touched.bank_name && formik.errors.bank_name
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={
                    "border border-solid  rounded px-2 py-1 focus:outline-none"
                  }
                />
                <input
                  type="text"
                  id="account_no"
                  name="account_no"
                  placeholder="Bank Account number"
                  onChange={(e) => handleTextChange("account_no", e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.account_no}
                  style={{
                    borderColor:
                      formik.touched.account_no && formik.errors.account_no
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={
                    "border border-solid  rounded px-2 py-1 focus:outline-none"
                  }
                />
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  onChange={handleAmountChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  style={{
                    borderColor:
                      formik.touched.amount && formik.errors.amount
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={
                    "border border-solid  rounded px-2 py-1 focus:outline-none"
                  }
                />
                <div
                  style={{
                    borderColor:
                      formik.touched.payment_date && formik.errors.payment_date
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={`w-full p-1 border rounded-md focus:outline-none $
                    `}
                >
                  <DatePicker
                    id="payment_date"
                    selected={
                      formik.values.payment_date
                        ? moment(
                            formik.values.payment_date,
                            "YYYY/MM/DD"
                          ).toDate()
                        : ""
                    }
                    onChange={(payment_date) =>
                      formik.setFieldValue(
                        "payment_date",
                        formatDate(payment_date)
                      )
                    }
                    dateFormat="yyyy/MM/dd"
                    placeholderText="YYYY/MM/DD"
                    className="focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4  flex  justify-around">
              <button
                type="submit"
                style={{
                  backgroundColor: "#0089d1",
                  padding: "4px",
                  borderRadius: 5,
                  color: "white",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
