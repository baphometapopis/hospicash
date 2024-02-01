import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CancelModal from "../../Modal/PolicyModal/CancelModal.js";

import Download from "../../../../assets/Icons/icons8-download-64 (2).png";
import Cancel from "../../../../assets/Icons/icons8-cancel-100 (1).png";
import Edit from "../../../../assets/Icons/icons8-edit-64 (2).png";
const PolicyCard = ({ Policy, iscancelled }) => {
  const truncatedContent = Policy.cancel_remark;

  const onShowHandler = (instance) => {
    // Check if the content is truncated
    if (instance.props.content !== truncatedContent) {
      // Adjust Tippy's content to the truncated version
      instance.setContent(truncatedContent);
    }
  };
  const [isCancelModalOpen, setisCancelModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleDownloadPDF = async () => {
    try {
      const pdfUrl =
        "https://demo.mypolicynow.com/api/api/downloadProposal/quote-00b1773c89649e7143aed4f7e635dff6"; // Replace with your actual PDF URL

      // Fetch the PDF file
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${Policy?.policy_no}_${Policy?.ins_name}.pdf`; // Specify the desired file name

      // Trigger the download
      downloadLink.click();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle error, e.g., display an error message to the user
    }
  };
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "#FCD34D",
          color: "#ffffff",
          padding: "2px",
          width: "fit-content",
          height: "fit-content",
        };
      case "Success":
        return {
          backgroundColor: "#68D391",
          color: "#ffffff",
          width: "fit-content",
          height: "fit-content",
        };
      case "Cancelled":
        return {
          backgroundColor: "#dc143c",
          color: "#ffffff",
          width: "fit-content",
          height: "fit-content",
        };
      default:
        return {
          backgroundColor: "#D1D5DB",
          color: "#000000",
          width: "fit-content",
          height: "fit-content",
        };
    }
  };

  const statusStyle = getStatusStyle(Policy.status);

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
    <div className="flex flex-col bg-white shadow-lg py-4 px-4 rounded-md mb-1">
      <div className="flex  md:flex-row md:justify-between item-center w-full">
        <span style={{ width: "5%", textAlign: "center" }}>{Policy.id}</span>

        <span
          style={{
            textAlign: "center",
            width: "15%",
          }}
        >
          {Policy.policy_no}
        </span>

        <span style={{ textAlign: "center", width: "25%" }}>
          {Policy.full_name}
        </span>

        <span
          style={{
            textAlign: "center",
            width: "10%",
          }}
        >
          {Policy.pan_number || " - "}
        </span>

        <span className="px-4 rounded-lg" style={statusStyle}>
          {Policy.status}
        </span>

        {/* <span
          style={{
            textAlign: "center",
            width: "15%",
          }}
        >
          {Policy.paymentDate}
        </span> */}

        <span
          style={{
            textAlign: "center",
            width: "20%",
          }}
        >
          {" "}
          {formatDate(Policy.created_date)}
        </span>
        {!iscancelled ? (
          <>
            {" "}
            <div className="flex gap-1 ">
              <div
                style={{
                  fontSize: "14px",
                  backgroundColor: "#0089d1",
                  color: "#ffff",
                  padding: "1px",
                }}
                className="   rounded-md cursor-pointer h-fit"
                onClick={handleDownloadPDF}
              >
                <Tippy
                  content={"Download Proposal"}
                  placement="top"
                  arrow={true}
                  className="rounded-sm text-xs"
                >
                  <img
                    src={Download}
                    className="w-[25px]  object-center"
                    alt="search_image"
                  />
                </Tippy>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  backgroundColor: "#FCD34D",
                  color: "#ffff",
                }}
                onClick={() =>
                  navigate("/Form", { state: { Action: "Endorsment" } })
                }
                className="   rounded-md cursor-pointer  h-fit"
              >
                <Tippy
                  content={"Endorsment Proposal"}
                  placement="top"
                  arrow={true}
                  className="rounded-sm text-xs"
                >
                  <img
                    src={Edit}
                    className="w-[25px]  object-center"
                    alt="search_image"
                  />
                </Tippy>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  backgroundColor: "#dc143c",
                  color: "#ffff",
                }}
                className="   rounded-md cursor-pointer  h-fit"
                onClick={() => setisCancelModalOpen(true)}
              >
                <Tippy
                  content={"Cancel Proposal"}
                  placement="top"
                  arrow={true}
                  className="rounded-sm text-xs"
                >
                  <img src={Cancel} className="w-[25px]  " alt="search_image" />
                </Tippy>
              </div>
            </div>
          </>
        ) : (
          <Tippy
            content={truncatedContent}
            placement="top"
            arrow={true}
            onShow={onShowHandler}
            className="rounded-sm text-xs max-w-96"
          >
            <span
              style={{
                textAlign: "center",
                width: "10%",
              }}
              className="truncate"
            >
              {Policy.cancel_remark}
            </span>
          </Tippy>
        )}
      </div>
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setisCancelModalOpen(false)}
        data={Policy}
      />
    </div>
  );
};

export default PolicyCard;
