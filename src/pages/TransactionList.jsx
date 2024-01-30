import React, { useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import SearchIcon from "../assets/Icons/icons8-search-64.png";

import TransactionCard from "../components/dashboardcomponent/DashboardCardContainer/TransactionCard/TransactionCard";
import Select from "react-select";
import MobileTransactionCard from "../components/dashboardcomponent/DashboardCardContainer/TransactionCard/MobileTransactionCard";

export default function TransactionsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const data = [
    {
      srno: 1,
      partyName: "ABC Corp",
      amount: 1000,
      transactionNo: "T123",
      ifscCode: "IFSC123",
      bankName: "Bank A",
      accountNo: "A123",
      paymentDate: "2022-01-23",
      createdAt: "2022-01-23T10:30:00",
      status: "pending",
    },
    {
      srno: 2,
      partyName: "XYZ Inc",
      amount: 1500,
      transactionNo: "T456",
      ifscCode: "IFSC456",
      bankName: "Bank B",
      accountNo: "B456",
      paymentDate: "2022-01-24",
      createdAt: "2022-01-23T11:00:00",
      status: "success",
    },
    {
      srno: 3,
      partyName: "LMN Ltd",
      amount: 1200,
      transactionNo: "T789",
      ifscCode: "IFSC789",
      bankName: "Bank C",
      accountNo: "C789",
      paymentDate: "2022-01-25",
      createdAt: "2022-01-23T12:30:00",
      status: "concile",
    },
    {
      srno: 4,
      partyName: "PQR Co.",
      amount: 800,
      transactionNo: "T101",
      ifscCode: "IFSC101",
      bankName: "Bank D",
      accountNo: "D101",
      paymentDate: "2022-01-26",
      createdAt: "2022-01-23T14:00:00",
      status: "pending",
    },
    {
      srno: 5,
      partyName: "DEF Corp",
      amount: 2000,
      transactionNo: "T202",
      ifscCode: "IFSC202",
      bankName: "Bank E",
      accountNo: "E202",
      paymentDate: "2022-01-27",
      createdAt: "2022-01-23T15:30:00",
      status: "success",
    },
    {
      srno: 6,
      partyName: "GHI Ltd",
      amount: 1700,
      transactionNo: "T303",
      ifscCode: "IFSC303",
      bankName: "Bank F",
      accountNo: "F303",
      paymentDate: "2022-01-28",
      createdAt: "2022-01-23T17:00:00",
      status: "concile",
    },
    {
      srno: 7,
      partyName: "JKL Inc",
      amount: 1300,
      transactionNo: "T404",
      ifscCode: "IFSC404",
      bankName: "Bank G",
      accountNo: "G404",
      paymentDate: "2022-01-29",
      createdAt: "2022-01-23T18:30:00",
      status: "pending",
    },
    {
      srno: 8,
      partyName: "MNO Corp",
      amount: 1800,
      transactionNo: "T505",
      ifscCode: "IFSC505",
      bankName: "Bank H",
      accountNo: "H505",
      paymentDate: "2022-01-30",
      createdAt: "2022-01-23T20:00:00",
      status: "success",
    },
    {
      srno: 9,
      partyName: "RST Ltd",
      amount: 900,
      transactionNo: "T606",
      ifscCode: "IFSC606",
      bankName: "Bank I",
      accountNo: "I606",
      paymentDate: "2022-01-31",
      createdAt: "2022-01-23T21:30:00",
      status: "concile",
    },
    {
      srno: 10,
      partyName: "UVW Co.",
      amount: 1100,
      transactionNo: "T707",
      ifscCode: "IFSC707",
      bankName: "Bank J",
      accountNo: "J707",
      paymentDate: "2022-02-01",
      createdAt: "2022-01-23T23:00:00",
      status: "pending",
    },
    {
      srno: 11,
      partyName: "ZYX Corp",
      amount: 1600,
      transactionNo: "T808",
      ifscCode: "IFSC808",
      bankName: "Bank K",
      accountNo: "K808",
      paymentDate: "2022-02-02",
      createdAt: "2022-01-24T01:00:00",
      status: "success",
    },
    {
      srno: 12,
      partyName: "NOP Ltd",
      amount: 1400,
      transactionNo: "T909",
      ifscCode: "IFSC909",
      bankName: "Bank L",
      accountNo: "L909",
      paymentDate: "2022-02-03",
      createdAt: "2022-01-24T02:30:00",
      status: "concile",
    },
    {
      srno: 13,
      partyName: "QWE Inc",
      amount: 1900,
      transactionNo: "T1010",
      ifscCode: "IFSC1010",
      bankName: "Bank M",
      accountNo: "M1010",
      paymentDate: "2022-02-04",
      createdAt: "2022-01-24T04:00:00",
      status: "pending",
    },
    {
      srno: 14,
      partyName: "ASD Corp",
      amount: 1000,
      transactionNo: "T1111",
      ifscCode: "IFSC1111",
      bankName: "Bank N",
      accountNo: "N1111",
      paymentDate: "2022-02-05",
      createdAt: "2022-01-24T05:30:00",
      status: "success",
    },
    {
      srno: 15,
      partyName: "ZXC Ltd",
      amount: 1200,
      transactionNo: "T1212",
      ifscCode: "IFSC1212",
      bankName: "Bank O",
      accountNo: "O1212",
      paymentDate: "2022-02-06",
      createdAt: "2022-01-24T07:00:00",
      status: "concile",
    },
    {
      srno: 16,
      partyName: "TYU Inc",
      amount: 1500,
      transactionNo: "T1313",
      ifscCode: "IFSC1313",
      bankName: "Bank P",
      accountNo: "P1313",
      paymentDate: "2022-02-07",
      createdAt: "2022-01-24T08:30:00",
      status: "pending",
    },
    {
      srno: 17,
      partyName: "BNM Corp",
      amount: 800,
      transactionNo: "T1414",
      ifscCode: "IFSC1414",
      bankName: "Bank Q",
      accountNo: "Q1414",
      paymentDate: "2022-02-08",
      createdAt: "2022-01-24T10:00:00",
      status: "success",
    },
    {
      srno: 18,
      partyName: "WER Ltd",
      amount: 2000,
      transactionNo: "T1515",
      ifscCode: "IFSC1515",
      bankName: "Bank R",
      accountNo: "R1515",
      paymentDate: "2022-02-09",
      createdAt: "2022-01-24T11:30:00",
      status: "concile",
    },
    {
      srno: 19,
      partyName: "UIO Inc",
      amount: 1700,
      transactionNo: "T1616",
      ifscCode: "IFSC1616",
      bankName: "Bank S",
      accountNo: "S1616",
      paymentDate: "2022-02-10",
      createdAt: "2022-01-24T13:00:00",
      status: "pending",
    },
    {
      srno: 20,
      partyName: "PLK Corp",
      amount: 1300,
      transactionNo: "T1717",
      ifscCode: "IFSC1717",
      bankName: "Bank T",
      accountNo: "T1717",
      paymentDate: "2022-02-11",
      createdAt: "2022-01-24T14:30:00",
      status: "success",
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
          <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
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
                tranx No
              </span>
              <span
                style={{
                  width: "25%",
                  textAlign: "center",
                }}
                className="text-white "
              >
                Bank Name
              </span>
              <span
                style={{
                  width: "10%",
                  textAlign: "center",
                }}
                className="text-white"
              >
                Amount
              </span>
              <span
                style={{
                  textAlign: "center",
                  width: "10%",
                }}
                className="text-white w-['10%']"
              >
                Status
              </span>

              <span
                style={{ textAlign: "center", width: "15%" }}
                className="text-white"
              >
                Payment Date
              </span>
              <span
                style={{ color: "white", width: "20%", textAlign: "center" }}
              >
                Created At
              </span>
            </div>
          )}
          {currentRecords.map((transaction) => (
            <>
              {isMobile ? (
                <TransactionCard
                  key={transaction.srno}
                  transaction={transaction}
                />
              ) : (
                <MobileTransactionCard
                  key={transaction.srno}
                  transaction={transaction}
                />
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
