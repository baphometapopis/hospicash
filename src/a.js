import React, { useState } from "react";
import Download from "../../../../assets/Icons/icons8-download-64 (2).png";
import Cancel from "../../../../assets/Icons/icons8-cancel-100 (1).png";
import Edit from "../../../../assets/Icons/icons8-edit-64 (2).png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CancelModal from "../../Modal/PolicyModal/CancelModal.js";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const PolicyCard = ({ Policy }) => {
  const [isCancelModalOpen, setisCancelModalOpen] = useState(false);
  const navigate = useNavigate();
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#FCD34D", color: "#ffffff", padding: "2px" };
      case "Success":
        return { backgroundColor: "#68D391", color: "#ffffff" };
      case "Cancelled":
        return { backgroundColor: "#dc143c", color: "#ffffff" };
      default:
        return { backgroundColor: "#D1D5DB", color: "#000000" };
    }
  };

  const statusStyle = getStatusStyle(Policy.status);
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
  // const handleDownloadPDF = () => {
  //   // Generate PDF content
  //   const pdfContent = "Sample PDF Content"; // Replace with your PDF content

  //   // Create a new jsPDF instance
  //   const pdf = new jsPDF();

  //   // Add content to the PDF
  //   pdf.text(pdfContent, 10, 10);

  //   // Save the PDF as a Blob
  //   const pdfBlob = pdf.output("blob");

  //   // Create a download link
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = URL.createObjectURL(pdfBlob);
  //   downloadLink.download = "sample.pdf"; // Replace with your desired file name

  //   // Trigger the download
  //   downloadLink.click();
  // };

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
      <div className="flex flex-col md:flex-row md:justify-between items-start w-full">
        <span className="mr-2">{Policy?.srno}</span>

        <span className="mr-2">{Policy?.policy_no}</span>

        <span className="mr-2">{Policy?.policy_duration}</span>

        <span className="mr-2">{Policy?.ins_name}</span>

        <span className="px-4 rounded-lg" style={statusStyle}>
          {Policy?.status}
        </span>

        <span className="mr-2">{Policy?.paymentDate}</span>

        <span>{formatDate(Policy.crt_date)}</span>

        {/* Add the buttons here */}
        <div className="flex gap-1 ">
          <div
            style={{
              fontSize: "14px",
              backgroundColor: "#0089d1",
              color: "#ffff",
              padding: "1px",
            }}
            className="   rounded-md cursor-pointer"
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
            className="   rounded-md cursor-pointer"
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
            className="   rounded-md cursor-pointer"
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
