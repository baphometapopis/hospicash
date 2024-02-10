// PolicyCardRenderer.js
import React from "react";
import PolicyCard from "./DashboardCardContainer/PolicyCardContainer/PolicyCard";

const PolicyCardRenderer = (props) => {
  const { data } = props;
  const { Policy, iscancelled } = data;

  return <PolicyCard Policy={Policy} iscancelled={iscancelled} />;
};

export default PolicyCardRenderer;
