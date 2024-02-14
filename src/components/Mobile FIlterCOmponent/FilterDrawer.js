import React from "react";
import { Drawer, Button, Space, Select, DatePicker } from "antd";
const { RangePicker } = DatePicker;

const FilterDrawer = ({ visible, onClose }) => {
  const options = [
    { value: "Bank A", label: "Bank A" },
    { value: "Bank B", label: "Bank B" },
    { value: "Bank C", label: "Bank C" },
  ];
  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Dates:", dates);
    console.log("Formatted Dates:", dateStrings);
  };

  return (
    <Drawer
      title="Filter Options"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <div style={{ padding: "10px" }}>
        <input
          style={{
            border: "1px solid #6d6d6d",
            outline: "none",
            width: "120px",
          }}
          placeholder="transaction ID"
        />
        <Select
          options={options}
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
        <RangePicker
          onChange={handleDateChange}
          allowClear // Show clear button
          bordered="0px solid #ffff"
          style={{
            border: "5px solid #fffff",
            borderRadius: "4px",
            backgroundColor: "white",
          }} // Custom border style
        />
      </div>
      {/* </div> */}
    </Drawer>
  );
};

export default FilterDrawer;
