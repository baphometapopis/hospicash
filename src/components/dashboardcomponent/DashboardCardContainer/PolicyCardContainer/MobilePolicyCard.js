import React from "react";

const MobilePolicyCard = ({ policy }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "#FCD34D",
          color: "#ffffff",
          position: "absolute",
          top: "5px",
          right: "10px",
        };
      case "Success":
        return {
          backgroundColor: "#68D391",
          color: "#ffffff",
          position: "absolute",
          top: "5px",
          right: "10px",
        };
      case "Cancelled":
        return {
          backgroundColor: "#dc143c",
          color: "#ffffff",
          position: "absolute",
          top: "5px",
          right: "10px",
        };
      default:
        return {
          backgroundColor: "#D1D5DB",
          color: "#000000",
          position: "absolute",
          top: "5px",
          right: "10px",
        };
    }
  };

  const statusStyle = getStatusStyle(policy.status);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div
      style={{
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      }}
      className="flex flex-col bg-white  py-4 px-4 rounded-md mb-10 relative"
    >
      <div className="flex flex-col md:flex-row md:justify-between items-start w-full">
        <div className="flex items-center mb-2 md:mb-0">
          <span className="mr-2">{policy.srno}</span>

          <span className="mr-2">#{policy.policy_no}</span>
        </div>
        {/* <div className="flex items-center mb-2 md:mb-0"> */}
        <span style={{ fontSize: "14px" }} className="mr-2">
          Cust Name: {policy.ins_name}
        </span>
        <span style={{ fontSize: "14px" }} className="mr-2 my-2 ">
           Ins Name:{policy.ins_cmp}
        </span>
        {/* </div> */}
        <span className="px-4 rounded-lg" style={statusStyle}>
          {/* {policy.status} */}
        </span>
        <div className="flex items-center mb-2 md:mb-0">
          <span
            style={{
              position: "absolute",
              left: "16px",
              bottom: "5px",
              fontSize: "14px",
            }}
            className="mr-2"
          >
            Plan:{policy.paymentDate}
          </span>

          <span
            style={{
              position: "absolute",
              right: "10px",
              bottom: "5px",
              fontSize: "12px",
            }}
          >
            {formatDate(policy.crt_date)}
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#0089d1",
            width: "100%",
            position: "absolute",
            left: "0px",
            bottom: "-31px",
            borderBottomRightRadius: "4px",
            borderBottomLeftRadius: "4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px",
          }}
        >
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              width: "100%",
              color: "white",
            }}
          >
            Download
          </button>
          <span
            style={{ borderLeft: "1px solid white", height: "20px" }}
          ></span>
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              width: "100%",
              color: "white",
            }}
          >
            Cancel
          </button>
          <span
            style={{ borderLeft: "1px solid white", height: "20px" }}
          ></span>
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              width: "100%",
              color: "white",
            }}
          >
            Endorsement
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePolicyCard;