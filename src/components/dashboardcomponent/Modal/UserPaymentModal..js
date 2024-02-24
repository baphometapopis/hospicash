import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { getDealerData } from "../../../Api/getDealerData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkTransactionNo } from "../../../Api/checkTransactionNo";
import { getPaymentRequest } from "../../../Api/getPaymentRequest";
import { decryptData } from "../../../Utils/cryptoUtils";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Loader from "../../Loader";

const UserPaymentModal = ({ isOpen, onClose }) => {
  const [LocalData, setLocalData] = useState();
  const navigate = useNavigate();
  const [istransactionidvalid, setistransactionidvalid] = useState();
  const [loading, setLoading] = useState();
  const validateForm = (values) => {
    const errors = {};

    const validateRequired = (field, message) => {
      if (!values[field]) {
        errors[field] = message;
      } else {
        delete errors[field];
      }
    };

    validateRequired("transactionType", "Required");
    validateRequired("transaction_no", "Required");
    validateRequired("bankIfscCode", "Required");
    validateRequired("bank_name", "Required");
    validateRequired("bankAccountNumber", "Required");
    validateRequired("deposit_amount", "Required");
    validateRequired("date", "Required");

    if (!istransactionidvalid && values?.transaction_no !== "") {
      errors["transaction_no"] = "This Transaction No is Already Exist";
    } else {
      delete errors["transaction_no"];
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      transactionType: "",
      transaction_no: "",
      bankIfscCode: "",
      bank_name: "",
      bankAccountNumber: "",
      deposit_amount: "",
      date: null,
    },
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: true,
    validate: validateForm,
  });

  const partyOptions = [
    { value: "Deposit", label: "Deposit" },
    { value: "Withdrawal", label: "Withdrawal" },
  ];

  const accType = [
    { value: "saving", label: "Saving" },
    { value: "current", label: "current" },
  ];

  async function handleSubmit(values, { resetForm }) {
    setLoading(true);
    const data = await getPaymentRequest(LocalData?.user_details?.id, values);
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
      toast.error(
        `${
          data?.message || "Internal Server Error Contact System Administrator"
        }`,
        {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
    }
    setLoading(false);
  }

  function handleAmountChange(e) {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    formik.setFieldValue("deposit_amount", numericValue);
  }

  function handleTextChange(fieldName, e) {
    const sanitizedValue = e.target.value
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toUpperCase();
    formik.setFieldValue(fieldName, sanitizedValue);
  }

  async function checkNumber() {
    const data = await checkTransactionNo(
      LocalData?.user_details?.id,
      formik?.values?.transaction_no
    );
    setistransactionidvalid(data?.status);
  }

  const getLocalData = useCallback(async () => {
    const data = localStorage.getItem("Acemoney_Cache");

    if (data) {
      const decryptdata = decryptData(data);
      setLocalData(decryptdata);

      if (
        formik.values.bank_name === "" ||
        formik.values.bankAccountNumber === "" ||
        formik.values.bankIfscCode === ""
      ) {
        const dealerData = await getDealerData(decryptdata?.user_details?.id);
        if (dealerData?.status) {
          formik.setValues({
            ...formik.values,
            bank_name: dealerData?.data?.bank_name,
            bankAccountNumber: dealerData?.data?.banck_acc_no,
            bankIfscCode: dealerData?.data?.banck_ifsc_code,
          });
        } else {
          toast.error(
            dealerData?.message ||
              "Internal Server Contact System Administrator",
            {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            }
          );
        }
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik.values.bankAccountNumber,
    formik.values.bankIfscCode,
    formik.values.bank_name,
    navigate,
  ]);
  useEffect(() => {
    if (isOpen) {
      getLocalData();
    }
  }, [getLocalData, isOpen]);
  const formatDate = (date) => {
    return moment(date).format("YYYY/MM/DD");
  };
  return (
    <div
      style={{ zIndex: 100 }}
      className={`fixed inset-0 ${isOpen ? "" : "hidden"}`}
    >
      {loading && <Loader />}

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
                Dealer Payment
              </h3>
            </div>

            <div className="flex gap-10 my-10">
              <div style={{ gap: 26 }} className="flex flex-col">
                <label htmlFor="transactionType">Transaction type : </label>
                <label htmlFor="bank_name">Bank Name :</label>
                <label htmlFor="transaction_no">Bank Account Number : </label>
                <label htmlFor="bankIfscCode"> IFSC Code :</label>
                <div style={{ position: "relative" }}>
                  <label htmlFor="bankAccountNumber">
                    Transaction Number :
                  </label>

                  {!istransactionidvalid && formik.errors.transaction_no && (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "red",
                        position: "absolute",
                      }}
                    >
                      {formik.errors.transaction_no}
                    </p>
                  )}
                </div>
                <label htmlFor="acc_type">Account type :</label>
                <label htmlFor="deposit_amount">Amount :</label>
                <label htmlFor="date">Transaction Date :</label>{" "}
              </div>

              <div style={{ gap: 15 }} className="flex flex-col ">
                <Select
                  id="transactionType"
                  autoComplete="off"
                  options={[
                    { value: "", label: "Selct Type", isDisabled: true }, // Placeholder option
                    ...partyOptions,
                  ]}
                  placeholder="Select Type"
                  value={partyOptions.find(
                    (o) => o.value === formik.values.transactionType
                  )}
                  onChange={(option) =>
                    formik.setFieldValue("transactionType", option?.value || "")
                  }
                  styles={{
                    control: (provided, state) => ({
                      ...provided,

                      outline: "none", // Remove the outline

                      // Border color when focused
                      borderColor:
                        state.isFocused && !formik.touched.transactionType
                          ? "#6D6D6D" // Default border color when focused and not touched
                          : formik.touched.transactionType &&
                            formik.errors.transactionType
                          ? "red" // Border color on error
                          : "#6D6D6D", // Default border color
                    }),
                  }}
                />
                <input
                  type="text"
                  id="bank_name"
                  name="bank_name"
                  autoComplete="off"
                  disabled
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
                  disabled
                  type="text"
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  placeholder="Bank Account number"
                  onChange={(e) => handleTextChange("bankAccountNumber", e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.bankAccountNumber}
                  autoComplete="off"
                  style={{
                    borderColor:
                      formik.touched.bankAccountNumber &&
                      formik.errors.bankAccountNumber
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={
                    "border border-solid  rounded px-2 py-1 focus:outline-none"
                  }
                />
                <input
                  type="text"
                  disabled
                  id="bankIfscCode"
                  placeholder="Bank Ifsc Code"
                  name="bankIfscCode"
                  onChange={(e) => handleTextChange("bankIfscCode", e)}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  value={formik.values.bankIfscCode}
                  style={{
                    borderColor:
                      formik.touched.bankIfscCode && formik.errors.bankIfscCode
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={
                    "border border-solid  rounded px-2 py-1 focus:outline-none"
                  }
                />
                <input
                  type="text"
                  id="transaction_no"
                  name="transaction_no"
                  placeholder="Transaction Number"
                  onChange={(e) => handleTextChange("transaction_no", e)}
                  onBlur={checkNumber}
                  value={formik.values.transaction_no}
                  autoComplete="off"
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
                <Select
                  id="acc_type"
                  autoComplete="off"
                  options={[
                    { value: "", label: "account type Type", isDisabled: true }, // Placeholder option
                    ...accType,
                  ]}
                  placeholder="account Type"
                  value={accType.find(
                    (o) => o.value === formik.values.acc_type
                  )}
                  onChange={(option) =>
                    formik.setFieldValue("acc_type", option?.value || "")
                  }
                  styles={{
                    control: (provided, state) => ({
                      ...provided,

                      outline: "none", // Remove the outline

                      // Border color when focused
                      borderColor:
                        state.isFocused && !formik.touched.acc_type
                          ? "#6D6D6D" // Default border color when focused and not touched
                          : formik.touched.acc_type && formik.errors.acc_type
                          ? "red" // Border color on error
                          : "#6D6D6D", // Default border color
                    }),
                  }}
                />
                <input
                  type="text"
                  id="deposit_amount"
                  name="deposit_amount"
                  placeholder="Amount"
                  onChange={handleAmountChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deposit_amount}
                  autoComplete="off"
                  style={{
                    borderColor:
                      formik.touched.deposit_amount &&
                      formik.errors.deposit_amount
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
                      formik.touched.date && formik.errors.date
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={`w-full p-1 border rounded-md focus:outline-none $
                    `}
                >
                  <DatePicker
                    id="date"
                    autoComplete="off"
                    selected={
                      formik.values.date
                        ? moment(formik.values.date, "YYYY/MM/DD").toDate()
                        : ""
                    }
                    onChange={(date) =>
                      formik.setFieldValue("date", formatDate(date))
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

export default UserPaymentModal;
