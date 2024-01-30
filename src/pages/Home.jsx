import React, { useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import PieChart from "../components/dashboardcomponent/PieChart";
import { MyDropzoneComponent } from "../components/dashboardcomponent/FileDropZone";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="sticky -z-10 top-12 w-full">
        <img
          src={coverImage}
          className="w-full h-36 object-cover"
          alt="cover_image"
        />
      </div>
      <div className="justify-around	 lg:flex    w-full p-8 mx md:w-[75%] max-w-[95%] bg-white lg:max-h-80 min-h-fit -mt-20 border border-neutral-light rounded mb-4 ">
        {/* This is container 1{" "} */}
        {/* <div style={{width:'80%',marginBottom:'12px',minHeight:'80%'}}> */}
        <PieChart />
        {/* </div> */}
        <Box className="min-w-44 min-h-fit bg-white border border-neutral-light rounded">
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
                    navigate('/form')
                  }}
                >
                  Yearly Proposal
                </div>
              </Box>
            ) : (
              <Box>
                <MyDropzoneComponent />

                <Box
                  display="flex"
                  flexDirection="row"
                  gap={2}
                  marginRight={2}
                  marginLeft={2}
                >
                  <Button
                    className={"w-fit"}
                    type="submit"
                    label="Upload"
                    variant="primary"
                    // Add onClick handler for the "Upload" button if needed
                  ></Button>
                  <Button
                    className={"w-fit"}
                    type="submit"
                    label="Download"
                    variant="secondary"
                    // Add onClick handler for the "Download" button if needed
                  ></Button>
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
