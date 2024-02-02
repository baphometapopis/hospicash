import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { getDealerData } from "../../../Api/getDealerData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkTransactionNo } from "../../../Api/checkTransactionNo";
const UserPaymentModal = ({ isOpen, onClose }) => {
  const partyOptions = [
    { value: "Deposit", label: "Deposit" },
    { value: "Withdraw", label: "Withdraw" },
  ];
  const accType = [
    { value: "saving", label: "Saving" },
    { value: "current", label: "current" },
  ];

  const [paymentDate, setPaymentDate] = useState();
  const [istransactionidvalid, setistransactionidvalid] = useState();

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    // Perform payment processing or other logic here

    // Close the modal after
    resetForm();

    onClose();
  };

  const handleAmountChange = (e) => {
    // Allow only numeric input for the deposit_amount field
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    formik.setFieldValue("deposit_amount", numericValue);
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
      transactionType: "",
      dealer_bank_trans_id: "",
      bankIfscCode: "",
      bank_name: "",
      bankAccountNumber: "",
      deposit_amount: "",
      date: null,
    },

    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      const errors = {};
      const validateRequired = (field, message) => {
        if (!values[field]) {
          errors[field] = message;
        } else {
          delete errors[field];
        }
      };

      validateRequired("transactionType", "Required");
      validateRequired("dealer_bank_trans_id", "Required");
      validateRequired("bankIfscCode", "Required");
      validateRequired("bank_name", "Required");
      validateRequired("bankAccountNumber", "Required");
      validateRequired("deposit_amount", "Required");
      validateRequired("date", "Required");

      if (istransactionidvalid) {
        if (istransactionidvalid === "No data found") {
          errors["dealer_bank_trans_id"] = "Transaction Id not Found";
        } else {
          delete errors["dealer_bank_trans_id"];
        }
      }
      console.log(formik.errors);

      return errors;
    },
  });
  const checkNumber = async () => {
    const data = await checkTransactionNo(formik?.values?.dealer_bank_trans_id);
    setistransactionidvalid(data?.message);
    console.log(data);
  };

  const getData = async () => {
    const data = await getDealerData(1);
    if (data?.status) {
      console.log(data);
      formik.setFieldValue("bank_name", data?.data?.bank_name);
      formik.setFieldValue("bankAccountNumber", data?.data?.banck_acc_no);
      formik.setFieldValue("bankIfscCode", data?.data?.banck_ifsc_code);

      setPaymentDate(data);
    } else {
      toast.error(data?.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
                Dealer Payment
              </h3>
            </div>

            <div className="flex gap-10 my-10">
              <div style={{ gap: 26 }} className="flex flex-col">
                <label htmlFor="transactionType">Transaction type : </label>
                <label htmlFor="bank_name">Bank Name :</label>
                <label htmlFor="dealer_bank_trans_id">
                  Bank Account Number :{" "}
                </label>
                <label htmlFor="bankIfscCode"> IFSC Code :</label>
                <div style={{ position: "relative" }}>
                  <label htmlFor="bankAccountNumber">
                    Transaction Number :
                  </label>
                  {console.log(
                    formik.touched.dealer_bank_trans_id,
                    formik.errors.dealer_bank_trans_id
                  )}
                  {istransactionidvalid === "No data found" &&
                    formik.errors.dealer_bank_trans_id && (
                      <p
                        style={{
                          fontSize: "10px",
                          color: "red",
                          position: "absolute",
                        }}
                      >
                        {formik.errors.dealer_bank_trans_id}
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
                  id="dealer_bank_trans_id"
                  name="dealer_bank_trans_id"
                  placeholder="Transaction Number"
                  onChange={(e) => handleTextChange("dealer_bank_trans_id", e)}
                  onBlur={checkNumber}
                  value={formik.values.dealer_bank_trans_id}
                  autoComplete="off"
                  style={{
                    borderColor:
                      formik.touched.dealer_bank_trans_id &&
                      formik.errors.dealer_bank_trans_id
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
                    selected={formik.values.date}
                    onChange={(date) => formik.setFieldValue("date", date)}
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
