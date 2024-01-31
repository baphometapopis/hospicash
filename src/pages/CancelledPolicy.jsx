import React, { useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import SearchIcon from "../assets/Icons/icons8-search-64.png";

import Select from "react-select";
import PolicyCard from "../components/dashboardcomponent/DashboardCardContainer/PolicyCardContainer/PolicyCard";
import MobilePolicyCard from "../components/dashboardcomponent/DashboardCardContainer/PolicyCardContainer/MobilePolicyCard";

export default function CancelledPolicy() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const data = [
    {
      srno: 1,
      policy_no: "POL001",
      policy_duration: "1 year",
      ins_name: "John Doe",
      ins_mobile_no: "123-456-7890",
      ins_cmp: "ABC Ins",
      crt_date: "2024-01-01",
      status: "Success",
    },
    {
      srno: 2,
      policy_no: "POL002",
      policy_duration: "6 months",
      ins_name: "Jane Smith",
      ins_mobile_no: "987-654-3210",
      ins_cmp: "DEF Ins",
      crt_date: "2024-01-02",
      status: "Cancelled",
    },
    {
      srno: 3,
      policy_no: "POL003",
      policy_duration: "2 years",
      ins_name: "Robert Johnson",
      ins_mobile_no: "555-123-7890",
      ins_cmp: "GHI Ins",
      crt_date: "2024-01-03",
      status: "Pending",
    },
    {
      srno: 4,
      policy_no: "POL004",
      policy_duration: "1 year",
      ins_name: "Emily Davis",
      ins_mobile_no: "111-222-3333",
      ins_cmp: "JKL Ins",
      crt_date: "2024-01-04",
      status: "Success",
    },
    {
      srno: 5,
      policy_no: "POL005",
      policy_duration: "6 months",
      ins_name: "Michael Williams",
      ins_mobile_no: "444-555-6666",
      ins_cmp: "MNO Ins",
      crt_date: "2024-01-05",
      status: "Cancelled",
    },
    {
      srno: 6,
      policy_no: "POL006",
      policy_duration: "2 years",
      ins_name: "Sarah Miller",
      ins_mobile_no: "777-888-9999",
      ins_cmp: "PQR Ins",
      crt_date: "2024-01-06",
      status: "Pending",
    },
    {
      srno: 7,
      policy_no: "POL007",
      policy_duration: "1 year",
      ins_name: "James Wilson",
      ins_mobile_no: "222-333-4444",
      ins_cmp: "STU Ins",
      crt_date: "2024-01-07",
      status: "Success",
    },
    {
      srno: 8,
      policy_no: "POL008",
      policy_duration: "6 months",
      ins_name: "Emma Brown",
      ins_mobile_no: "666-777-8888",
      ins_cmp: "VWX Ins",
      crt_date: "2024-01-08",
      status: "Cancelled",
    },
    {
      srno: 9,
      policy_no: "POL009",
      policy_duration: "2 years",
      ins_name: "Oliver White",
      ins_mobile_no: "999-888-7777",
      ins_cmp: "YZX Ins",
      crt_date: "2024-01-09",
      status: "Pending",
    },
    {
      srno: 10,
      policy_no: "POL010",
      policy_duration: "1 year",
      ins_name: "Sophia Taylor",
      ins_mobile_no: "111-555-9999",
      ins_cmp: "ABC Ins",
      crt_date: "2024-01-10",
      status: "Success",
    },
    {
      srno: 11,
      policy_no: "POL011",
      policy_duration: "6 months",
      ins_name: "Daniel Clark",
      ins_mobile_no: "777-222-3333",
      ins_cmp: "DEF Ins",
      crt_date: "2024-01-11",
      status: "Cancelled",
    },
    {
      srno: 12,
      policy_no: "POL012",
      policy_duration: "2 years",
      ins_name: "Eva Turner",
      ins_mobile_no: "555-666-8888",
      ins_cmp: "GHI Ins",
      crt_date: "2024-01-12",
      status: "Pending",
    },
    {
      srno: 13,
      policy_no: "POL013",
      policy_duration: "1 year",
      ins_name: "Gabriel Harris",
      ins_mobile_no: "333-444-5555",
      ins_cmp: "JKL Ins",
      crt_date: "2024-01-13",
      status: "Success",
    },
    {
      srno: 14,
      policy_no: "POL014",
      policy_duration: "6 months",
      ins_name: "Isabella Martin",
      ins_mobile_no: "999-111-2222",
      ins_cmp: "MNO Ins",
      crt_date: "2024-01-14",
      status: "Cancelled",
    },
    {
      srno: 15,
      policy_no: "POL015",
      policy_duration: "2 years",
      ins_name: "Jason Turner",
      ins_mobile_no: "444-555-6666",
      ins_cmp: "PQR Ins",
      crt_date: "2024-01-15",
      status: "Pending",
    },
    {
      srno: 16,
      policy_no: "POL016",
      policy_duration: "1 year",
      ins_name: "Emma Davis",
      ins_mobile_no: "777-888-9999",
      ins_cmp: "STU Ins",
      crt_date: "2024-01-16",
      status: "Success",
    },
    {
      srno: 17,
      policy_no: "POL017",
      policy_duration: "6 months",
      ins_name: "Olivia White",
      ins_mobile_no: "222-333-4444",
      ins_cmp: "VWX Ins",
      crt_date: "2024-01-17",
      status: "Cancelled",
    },
    {
      srno: 18,
      policy_no: "POL018",
      policy_duration: "2 years",
      ins_name: "Liam Turner",
      ins_mobile_no: "666-777-8888",
      ins_cmp: "YZX Ins",
      crt_date: "2024-01-18",
      status: "Pending",
    },
    {
      srno: 19,
      policy_no: "POL019",
      policy_duration: "1 year",
      ins_name: "Ava Brown",
      ins_mobile_no: "999-555-1111",
      ins_cmp: "ABC Ins",
      crt_date: "2024-01-19",
      status: "Pending",
    },
    {
      srno: 20,
      policy_no: "POL020",
      policy_duration: "6 months",
      ins_name: "Logan Taylor",
      ins_mobile_no: "111-222-3333",
      ins_cmp: "DEF Ins",
      crt_date: "2024-01-20",
      status: "Cancelled",
    },
  ];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const [isMobile, setisMobile] = useState(false);

  const options = [
    { value: "Bank A", label: "Bank A" },
    { value: "Bank B", label: "Bank B" },
    { value: "Bank C", label: "Bank C" },
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);
    if (windowWidth <= 768) {
      setisMobile(false);
    } else {
      setisMobile(true);
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="  -z-10 w-full">
        <img
          src={coverImage}
          className="w-full h-36 object-cover"
          alt="cover_image"
        />
      </div>
      {/* <div className=" flex justify-center w-full p-8 mx md:w-[75%] max-w-[95%] bg-white lg:max-h-80 min-h-fit -mt-20 border border-neutral-light rounded mb-4 ">
        <LineChart />
      </div> */}

      <div className="-mt-20 md:w-[75%] w-[95%] mb:px-8 mb-20 bg-white border border-neutral-light rounded">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Cancelled Policy</h1>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "50px",
              marginBottom: "20px",
              marginTop: "5px",
              border: "1px solid",
              // width: "fit-content",
              paddingLeft: "20px",
              marginLeft: "auto",
              zIndex: 5,

              //   boxShadow:
              //     "rgba(0, 137, 209, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            }}
            className=" flex sticky top-12 "
          >
            <div
              style={{ padding: "10px" }}
              className=" flex items-center w-full "
            >
              <input
                style={{ border: 0, outline: "none", width: "120px" }}
                placeholder="transaction ID"
              />
              <div
                style={{ color: "#aaaaaa" }}
                className="border-[0.5px] h-[25px]  mx-4"
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
              <div
                style={{ color: "#aaaaaa" }}
                className="border-[0.5px] h-[25px]  mx-4"
              />
            </div>
            <div
              style={{
                backgroundColor: "#0089d1",
                width: "100px",
                borderTopRightRadius: "50px",
                borderBottomRightRadius: "50px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={SearchIcon}
                className="w-[50px]  object-cover"
                alt="search_image"
              />
            </div>
          </div>

          {isMobile && (
            <div
              style={{
                backgroundColor: "#0089d1",
                padding: "10px",
                zIndex: 4,
              }}
              className="px-4 flex rounded-t item-center justify-between  w-full sticky top-[115px] "
            >
              <span
                style={{
                  width: "8%",
                  textAlign: "center",
                }}
                className="text-white"
              >
                SR No
              </span>
              <span
                style={{
                  width: "15%",
                  textAlign: "center",
                }}
                className="text-white"
              >
                Policy No
              </span>
              <span
                style={{
                  width: "25%",
                  textAlign: "center",
                }}
                className="text-white "
              >
                Customer Name
              </span>
              <span
                style={{
                  width: "10%",
                  textAlign: "center",
                }}
                className="text-white"
              >
                Ins Name
              </span>
              <span
                style={{
                  textAlign: "center",
                  width: "10%",
                }}
                className="text-white w-['10%']"
              >
                Plan
              </span>

              <span
                style={{
                  color: "white",
                  width: "20%",
                  textAlign: "center",
                  marginRight: "100px",
                }}
              >
                Created At
              </span>
            </div>
          )}
          {currentRecords.map((data) => (
            <>
              {isMobile ? (
                <PolicyCard key={data.srno} Policy={data} />
              ) : (
                <MobilePolicyCard key={data.srno} policy={data} />
              )}
            </>
          ))}
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-600">
              Showing {indexOfFirstRecord + 1} to{" "}
              {Math.min(indexOfLastRecord, data.length)} of {data.length}{" "}
              entries
            </span>
            <div className="flex items-center mt-4">
              <span className="text-gray-600 mx-2">
                Page {currentPage} of {Math.ceil(data.length / recordsPerPage)}
              </span>
              <button
                className={`mx-1 p-2 rounded bg-blue-500 text-gray`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className={`mx-1 p-2 rounded bg-blue-500 text-gray`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(data.length / recordsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
