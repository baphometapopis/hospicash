import React from "react";
import classNames from "classnames";

const InputDatePicker = ({
  id,
  name,
  value,
  formik,
  placeholder,
  className,
  onChange,
  label,
  required,
  disabled,
  removeError,
}) => {
  const classes = classNames(
    ` placeholder-neutral-dark border border-neutral-dark rounded-sm focus:outline-none focus:border focus:border-primary`,
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
        type="date"
        value={value}
        style={{ width: "137%", height: "35px",color:'black',backgroundColor:'red' }}
        placeholder={'YYYY/MM/DD'}
        
        disabled={disabled}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
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

export default InputDatePicker;
