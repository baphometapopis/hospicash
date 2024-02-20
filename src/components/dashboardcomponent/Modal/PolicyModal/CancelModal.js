import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const CancelModal = ({ isOpen, onClose, data }) => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);

    resetForm();

    onClose();
  };

  const formik = useFormik({
    initialValues: {
      file: null,
      image: null,
      cancelation_reason_type: "",
      comments: "",
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required("File is required"), // validation for file upload
      comments: Yup.string(), // no required validation for textarea
    }),
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: true,
    validate: () => {
      console.log(formik.values, formik.errors);
    },
  });
  const options = [
    { value: "Duplicate Policy", label: "Duplicate Policy" },
    { value: "Others", label: "Others" },
  ];

  return (
    <div
      style={{ zIndex: 100 }}
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className={`fixed inset-0 transition-opacity ${
          isOpen ? "bg-black opacity-75" : "bg-transparent"
        }`}
        aria-hidden="true"
        onClick={onClose}
      ></div>

      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <form onSubmit={formik.handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Cancel Proposal
            </h3>
          </div>

          <div style={{ marginTop: "10px" }}>
            <p>Policy No : {data?.policy_no}</p>
            <p>Insured Name : {data?.ins_name}</p>
          </div>
          <p style={{ marginTop: "10px" }}>Select Cancellation Reason</p>
          <Select
            options={[
              ...(options || []).map((value) => ({
                value: value.value,
                label: value.label,
              })),
            ]}
            placeholder="Select Reason"
            value={formik.values.cancelation_reason_type}
            onChange={(option) =>
              formik.setFieldValue(
                "cancelation_reason_type",
                option?.value || ""
              )
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

          <div className="mt-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload File (Image/PDF)
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf, .png, .jpg, .jpeg"
              onChange={(e) => formik.setFieldValue("file", e.target.files[0])}
            />
            {formik.errors.file && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.file}</p>
            )}
          </div>

          {/* Textarea */}
          <div className="mt-4">
            <label
              htmlFor="comments"
              className="block text-sm font-medium text-gray-700"
            >
              Remarks
            </label>
            <textarea
              id="comments"
              name="comments"
              rows="3"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comments}
            />
            {formik.touched.comments && formik.errors.comments && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.comments}
              </p>
            )}
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
  );
};

export default CancelModal;
