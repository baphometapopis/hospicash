import React, { useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import SearchIcon from "../assets/Icons/icons8-search-64.png";
import Total from "../assets/Icons/icons8-rupee-64.png";
import Pending from "../assets/Icons/icons8-pending-50.png";
import Success from "../assets/Icons/icons8-card-payment-80.png";
import concile from "../assets/Icons/icons8-rupees-64.png";

import LineChart from "../components/dashboardcomponent/TransactionChart";
import TransactionCard from "../components/dashboardcomponent/DashboardCardContainer/TransactionCard/TransactionCard";
import Select from "react-select";

export default function Transactions() {
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

  const options = [
    { value: "Bank A", label: "Bank A" },
    { value: "Bank B", label: "Bank B" },
    { value: "Bank C", label: "Bank C" },
  ];
  const cardsData = [
    {
      icon: Total,
      title: "Total",
      value: "1000",
      bgColor: "#78c8cf",
    },
    {
      icon: Pending,
      title: "Pending",
      value: "50",
      bgColor: "#5888e8",
    },
    {
      icon: Success,
      title: "Success",
      value: "900",
      bgColor: "#e06f7f",
    },
    {
      icon: concile,
      title: "Coincile",
      value: "20",
      bgColor: "#f5c149",
    },
  ];
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="  -z-10 w-full">
        <img
          src={coverImage}
          className="w-full h-36 object-cover"
          alt="cover_image"
        />
      </div>
      <div className=" flex justify-center w-full p-8 mx md:w-[75%] max-w-[95%] bg-white lg:max-h-80 min-h-fit -mt-20 border border-neutral-light rounded mb-4 ">
        <LineChart />
      </div>
      <div className=" flex md:flex-row  flex-wrapflex-col justify-between 	md:w-[75%] w-[95%] 	 mb-5  gap-2">
        {/* Map through the data and render a Card for each item */}
        {cardsData.map((data, index) => (
          <div className={`relative w-1/2 lg:w-1/4 h-fit`}>
            <div
              style={{ backgroundColor: data.bgColor }}
              className={`rounded-lg p-4`}
            >
              <h3
                style={{ zIndex: 2, position: "relative" }}
                className="text-white  "
              >
                {data.title}
              </h3>

              <img
                src={data.icon}
                alt={data.title}
                className="w-16 h-16 mx-auto mb-4 "
                style={{ position: "absolute", right: 5, bottom: -10 }}
              />
              <p className="text-white text-xl ">{data.value}</p>
            </div>
          </div>
        ))}
      </div>

  
    </div>
  );
}
