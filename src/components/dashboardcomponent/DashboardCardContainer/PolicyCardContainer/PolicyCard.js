import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CancelModal from "../../Modal/PolicyModal/CancelModal.js";

import Download from "../../../../assets/Icons/icons8-download-64 (2).png";
import Cancel from "../../../../assets/Icons/icons8-cancel-100 (1).png";
import Edit from "../../../../assets/Icons/icons8-edit-64 (2).png";

const PolicyCard = ({ Policy, iscancelled, openCancelModal }) => {
  console.log(Policy, "Policy Card ");
  const truncatedContent = Policy?.cancel_remark;
  const onShowHandler = (instance) => {
    if (instance.props.content !== truncatedContent) {
      instance.setContent(truncatedContent);
    }
  };
  const navigate = useNavigate();

  const handleDownloadPDF = async () => {
    try {
      // console.log(Policy?.pdf_url)
      const pdfUrl = Policy?.pdf_url;
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${Policy?.policy_no}_${Policy?.full_name}.pdf`;

      downloadLink.click();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  // const getStatusStyle = (status) => {
  //   switch (status) {
  //     case "Pending":
  //       return {
  //         backgroundColor: "#FCD34D",
  //         color: "#ffffff",
  //       };
  //     case "Success":
  //       return {
  //         backgroundColor: "#68D391",
  //         color: "#ffffff",
  //       };
  //     case "Cancelled":
  //       return {
  //         backgroundColor: "#dc143c",
  //         color: "#ffffff",
  //       };
  //     default:
  //       return {
  //         backgroundColor: "#D1D5DB",
  //         color: "#000000",
  //       };
  //   }
  // };

  return (
    <div>
      {!iscancelled ? (
        <div className="flex gap-1">
          {Policy?.sold === 1 && (
            <div
              style={{
                fontSize: "14px",
                backgroundColor: "#0089d1",
                color: "#ffff",
                padding: "1px",
              }}
              className="rounded-md cursor-pointer h-fit"
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
                  className="w-[25px] object-center"
                  alt="search_image"
                />
              </Tippy>
            </div>
          )}

          {Policy?.endorse === 1 && (
            <div
              style={{
                fontSize: "14px",
                backgroundColor: "#FCD34D",
                color: "#ffff",
              }}
              onClick={() =>
                navigate("/Form", {
                  state: { Action: "Endorsment", policyID: Policy?.policy_id },
                })
              }
              className="rounded-md cursor-pointer h-fit"
            >
              <Tippy
                content={"Endorsment Proposal"}
                placement="top"
                arrow={true}
                className="rounded-sm text-xs"
              >
                <img
                  src={Edit}
                  className="w-[25px] object-center"
                  alt="search_image"
                />
              </Tippy>
            </div>
          )}

          {Policy?.cancel === 1 && (
            <div
              style={{
                fontSize: "14px",
                backgroundColor: "#dc143c",
                color: "#ffff",
              }}
              className="rounded-md cursor-pointer h-fit"
              onClick={() => openCancelModal(Policy)}
            >
              <Tippy
                content={"Cancel Proposal"}
                placement="top"
                arrow={true}
                className="rounded-sm text-xs"
              >
                <img src={Cancel} className="w-[25px]" alt="search_image" />
              </Tippy>
            </div>
          )}
          {Policy?.sold === 0 &&
            Policy?.endorse === 0 &&
            Policy?.cancel === 0 && <p>No action Provided</p>}
        </div>
      ) : (
        <Tippy
          content={truncatedContent}
          placement="top"
          arrow={true}
          onShow={onShowHandler}
          className="rounded-sm text-xs max-w-96"
        >
          <p style={{ textAlign: "center", width: "10%" }} className="truncate">
            {Policy.cancel_remark}
          </p>
        </Tippy>
      )}
    </div>
  );
};

export default PolicyCard;
