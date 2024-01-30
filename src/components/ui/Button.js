// Button.js

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({ onClick, label, type, variant, className }) => {
  const buttonClass = classNames(
    "px-3 py-1 font-medium rounded-sm w-full mt-4",
    {
      "bg-primary text-white active:bg-primary-darkest": variant === "primary",
      "bg-secondary text-white active:bg-secondary-darkest": variant === "secondary",
      "bg-transparent text-primary active:bg-primary-lightest": variant === "ghost"
    },
    className
  );
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "ghost"]),
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  variant: "primary",
};

export default Button;
