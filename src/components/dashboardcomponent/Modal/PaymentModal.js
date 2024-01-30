import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// ... (previous imports)

const PaymentModal = ({ isOpen, onClose }) => {
  const partyOptions = [
    { value: "party1", label: "Party 1" },
    { value: "party2", label: "Party 2" },
  ];

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    // Perform payment processing or other logic here

    // Close the modal after
    resetForm();

    onClose();
  };

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
      partyName: "",
      chequeNo: "",
      bankIfscCode: "",
      bankName: "",
      bankAccountNumber: "",
      amount: "",
      date: null,
    },
    validationSchema: Yup.object({
      partyName: Yup.string().required("Party Name is required"),
      chequeNo: Yup.string().required("Cheque No is required"),
      bankIfscCode: Yup.string().required("Bank IFSC Code is required"),
      bankName: Yup.string().required("Bank Name is required"),
      bankAccountNumber: Yup.string().required(
        "Bank Account Number is required"
      ),
      amount: Yup.number().required("Amount is required"),
      date: Yup.date().required("Date is required"),
    }),
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: true,
    validate: () => {
      // Validate on change and on blur
      console.log(formik.values, formik.errors);
    },
  });

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
                <label htmlFor="partyName">Party Name : </label>
                <label htmlFor="chequeNo">Cheque No : </label>
                <label htmlFor="bankIfscCode">Bank IFSC Code :</label>
                <label htmlFor="bankName">Bank Name :</label>
                <label htmlFor="bankAccountNumber">Bank Account Number :</label>
                <label htmlFor="amount">Amount :</label>
                <label htmlFor="date" className="text-lg">
                  Date :
                </label>{" "}
              </div>

              <div style={{ gap: 15 }} className="flex flex-col ">
                <Select
                  id="partyName"
                  options={[
                    { value: "", label: "Select Party", isDisabled: true }, // Placeholder option
                    ...partyOptions,
                  ]}
                  placeholder="Select Party"
                  value={partyOptions.find(
                    (o) => o.value === formik.values.partyName
                  )}
                  onChange={(option) =>
                    formik.setFieldValue("partyName", option?.value || "")
                  }
                  styles={{
                    control: (provided, state) => ({
                      ...provided,

                      outline: "none", // Remove the outline

                      // Border color when focused
                      borderColor:
                        state.isFocused && !formik.touched.partyName
                          ? "#6D6D6D" // Default border color when focused and not touched
                          : formik.touched.partyName && formik.errors.partyName
                          ? "red" // Border color on error
                          : "#6D6D6D", // Default border color
                    }),
                  }}
                />

                <input
                  type="text"
                  id="chequeNo"
                  name="chequeNo"
                  placeholder="Cheque number"
                  onChange={(e) => handleTextChange("chequeNo", e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.chequeNo}
                  style={{
                    borderColor:
                      formik.touched.chequeNo && formik.errors.chequeNo
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={
                    "border border-solid  rounded px-2 py-1 focus:outline-none"
                  }
                />
                <input
                  type="text"
                  id="bankIfscCode"
                  placeholder="Bank Ifsc Code"
                  name="bankIfscCode"
                  onChange={(e) => handleTextChange("bankIfscCode", e)}
                  onBlur={formik.handleBlur}
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
                  id="bankName"
                  name="bankName"
                  placeholder="Bank Name"
                  onChange={(e) => handleTextChange("bankName", e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.bankName}
                  style={{
                    borderColor:
                      formik.touched.bankName && formik.errors.bankName
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={
                    "border border-solid  rounded px-2 py-1 focus:outline-none"
                  }
                />
                <input
                  type="text"
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  placeholder="Bank Account number"
                  onChange={(e) => handleTextChange("bankAccountNumber", e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.bankAccountNumber}
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
                      formik.touched.date && formik.errors.date
                        ? "red"
                        : "#6D6D6D",
                  }}
                  className={`w-full p-1 border rounded-md focus:outline-none $
                    `}
                >
                  <DatePicker
                    id="date"
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

export default PaymentModal;
