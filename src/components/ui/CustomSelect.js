import React from "react";
import Select from "react-select";
import classNames from "classnames";

const CustomSelect = ({
  id,
  name,
  options,
  value,
  formik,
  placeholder,
  className,
  onChange,
  label,
  required,
  showError, // New prop to conditionally show/hide error
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      "& .css-1u9des2-indicatorSeparator": {
        display: "none",
      },
      outline: "none", // Remove the outline
      borderColor:
        state.isFocused && !formik.touched[name]
          ? "#6D6D6D"
          : formik.touched[name] && formik.errors[name]
          ? "red"
          : "#6D6D6D",
      width: "220px", // Set the desired width

      height: "10px", // Set the desired height
      borderRadius: 4, // Remove the border radius
    }),
    input: (provided) => ({
      ...provided,
      display: "none", // Hide the search input
    }),
  };

  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div
      className="flex flex-col"
      style={{ alignItems: "center", position: "relative" }}
    >
      {label && (
        <label
          style={{ alignSelf: "flex-start", color: "#686464" }}
          htmlFor={id}
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <Select
        id={id}
        name={name}
        className={classNames("custom-select", className)}
        options={options}
        placeholder={placeholder || "Select..."}
        value={options.find((o) => o.value === value)}
        onChange={(selectedOption) => {
          formik.setFieldValue(name, selectedOption?.value || "");
          if (onChange) {
            onChange(selectedOption);
          }
        }}
        styles={customStyles}
      />
      {showError && hasError && (
        <p
          style={{
            fontSize: "12px",
            position: "absolute",
            bottom: "-16px",
            alignSelf: "flex-start",
            color: "red",
          }}
        >
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
