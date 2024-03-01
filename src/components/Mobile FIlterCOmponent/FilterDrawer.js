import React, { useState } from "react";
import { Drawer, Select, DatePicker } from "antd";
const { RangePicker } = DatePicker;

const FilterDrawer = ({ visible, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "transaction_no", label: "Transaction No" },
    { value: "status", label: "Status" },
    { value: "transaction_type", label: "Transaction Type" },
  ];
  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Dates:", dates);
    console.log("Formatted Dates:", dateStrings);
  };
  const [inputValue, setInputValue] = useState("");
  const [isTextboxEnabled, setIsTextboxEnabled] = useState(false);
  const handleOptionChange = (selectedOption) => {
    console.log(selectedOption)
    setSelectedOption(selectedOption);
    setIsTextboxEnabled(true); // Enable text box when an option is selected
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Drawer
      title="Filter Options"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <div style={{ padding: "10px" }}>
        <div className="py-2">
          <label
            htmlFor="bank"
            style={{ alignSelf: "flex-start", color: "#686464" }}
          >
            Select Option:{" "}
          </label>
          <Select
            className="w-full h-[40px]"
            options={options}
            onChange={handleOptionChange}
            placeholder="select Options"
            styles={{
              option: (provided) => ({
                ...provided,
                zIndex: 9999, // Set your desired z-index value
              }),
              control: (provided) => ({
                ...provided,
                border: "none", // Remove the border
                outline: "none", // Remove the outline
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#0089d1", // Set the arrow color to blue
              }),
            }}

            // other props as needed
          />
        </div>
        <div>
          <label
            htmlFor="myInput"
            style={{ alignSelf: "flex-start", color: "#686464" }}
          >
            Search :
          </label>{" "}
          <br />
          <input
            type="text"
            id="myInput"
            value={inputValue}
            onChange={handleInputChange}
            className="     ` h-[40px] px-3 py-1 placeholder-neutral-dark w-full  border border-neutral-dark rounded-md focus:outline-none focus:border focus:border-primary`,
            "
            placeholder={
              isTextboxEnabled ? `search ${selectedOption}` : "select Options"
            }
          />
        </div>

        <div className="py-2">
          <label
            htmlFor="bank"
            style={{ alignSelf: "flex-start", color: "#686464" }}
          >
            Select Date Range:{" "}
          </label>
          <RangePicker
            onChange={handleDateChange}
            allowClear // Show clear button
            bordered="0px solid #ffff"
            style={{
              border: "5px solid #fffff",
              borderRadius: "4px",
              backgroundColor: "white",
              width: "100%",
              height: "40px",
            }} // Custom border style
          />
        </div>
        <div
          className="my-8"
          style={{
            backgroundColor: "#0089d1",
            padding: "5px",
            borderRadius: 4,

            textAlign: "center",
            color: "white",
          }}
        >
          Add Filter
        </div>
      </div>
      {/* </div> */}
    </Drawer>
  );
};

export default FilterDrawer;
