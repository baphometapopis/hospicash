import React from "react";
import classNames from "classnames";

const Input = ({
  id,
  name,
  type,
  value,
  formik,
  placeholder,
  className,
  onInputChange,
  label,
  maxLength,
  required,
  alphanumeric,
  capitalize,
  numericOnly,
  disabled,
  alphabets,
  removeError, // New prop to conditionally show/hide error
}) => {
  const classes = classNames(
    `px-3 py-1 placeholder-neutral-dark border border-neutral-dark rounded-sm focus:outline-none focus:border focus:border-primary`,
    className
  );

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
      <input
        id={id}
        name={name}
        className={classes}
        type={type}
        value={capitalize ? value.toUpperCase() : value}
        placeholder={placeholder || "Type Here..."}
        disabled={disabled}
        maxLength={maxLength || 25} // Add maxLength attribute for character limitation
        onChange={(e) => {
          if (numericOnly) {
            //allow
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }
          if (alphabets) {
            e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
          }
          if (alphanumeric) {
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
          }

          formik.handleChange(e);
          if (onInputChange) {
            onInputChange(e.target.value);
          }
        }}
      />
      {!removeError && hasError && (
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

export default Input;
