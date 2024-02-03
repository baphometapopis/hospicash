import React, { useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import PieChart from "../components/dashboardcomponent/PieChart";
import { MyDropzoneComponent } from "../components/dashboardcomponent/FileDropZone";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { fileUpload } from "../Api/fileUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState();
  const [isuploadError, setisuploadError] = useState(false);
  const [showUpload, setshowUpload] = useState(true);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileSelect = (file) => {
    console.log("Selected file:", file);
    setSelectedFile(file);

    setisuploadError(false);

    // setSelectedFile(file)
  };
  const handleDownload = async () => {
    try {
      const pdfUrl =
        "https://media.githubusercontent.com/media/datablist/sample-csv-files/main/files/organizations/organizations-100.csv"; // Provide the actual URL of the PDF file

      // Fetch the PDF file
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `hospicashSample.csv`; // Specify the desired file name

      // Trigger the download
      downloadLink.click();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const sendFile = async () => {
    setshowUpload(false);

    const data = await fileUpload(selectedFile);
    if (data?.status) {
      setisuploadError(false);
      toast.success(data?.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.error("File Upload Failed", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setisuploadError(true);
    }
    setshowUpload(true);
  };

  useEffect(() => {}, [showUpload]);
  return (
    <div className="flex flex-col w-full items-center">
      <div className="sticky -z-10 top-12 w-full">
        <img
          src={coverImage}
          className="w-full h-36 object-cover"
          alt="cover_image"
        />
      </div>
      <div
        style={{ height: "fit-content" }}
        className="justify-around	 lg:flex  min-w-fit   w-full p-8 mx md:w-[85%] max-w-[95%] bg-white lg:max-h-96 min-h-fit -mt-20 border border-neutral-light rounded mb-4 "
      >
        <PieChart />
        <Box className="min-w- h-[320px] bg-white border border-neutral-light rounded">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
          >
            <Tab label="Year" value={1} />
            <Tab label="Month" value={2} />
          </Tabs>

          <Box p={2}>
            {activeTab === 1 ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <div
                  style={{
                    backgroundColor: "#0089d1",

                    cursor: "pointer",
                    width: "80%",

                    textAlign: "center",
                    color: "white",
                  }}
                  className={` h-fit tab ${
                    activeTab === 2 ? "active-tab" : ""
                  } py-1 rounded`}
                  onClick={() => {
                    setActiveTab(2);
                    navigate("/form");
                  }}
                >
                  Yearly Proposal
                </div>
              </Box>
            ) : (
              <Box>
                <MyDropzoneComponent onFileSelect={handleFileSelect} />

                <Box
                  display="flex"
                  flexDirection="row"
                  gap={2}
                  marginRight={2}
                  marginLeft={2}
                >
                  {selectedFile && !isuploadError && showUpload && (
                    <Button
                      onClick={sendFile}
                      className={"w-fit"}
                      type="submit"
                      label="Upload"
                      variant="primary"
                      // Add onClick handler for the "Upload" button if needed
                    />
                  )}
                  {isuploadError && (
                    <>
                      <Button
                        onClick={handleDownload}
                        className={"w-fit"}
                        type="submit"
                        label="sample"
                        variant="primary"
                        // Add onClick handler for the "Upload" button if needed
                      />
                      <Button
                        className={"w-fit"}
                        type="submit"
                        label="Download"
                        variant="secondary"
                        // Add onClick handler for the "Download" button if needed
                      />
                    </>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </div>
      {/* <div className=" flex justify-center	md:w-[75%] w-[95%] px-8  overflow-x-scroll	 bg-white  border border-neutral-light rounded ">
        <DataTable data={data} />
      </div> */}
    </div>
  );
}
