import React, { useCallback, useEffect, useState } from "react";
import addicon1 from "../../src/assets/Icons/icons8-address-50.png";
import email from "../../src/assets/Icons/icons8-email-50.png";
import phone from "../../src/assets/Icons/icons8-phone-64.png";
import "./Home.css";
import moment from "moment";
import { Skeleton, Timeline } from "antd";
import { decryptData } from "../Utils/cryptoUtils";
import RadialBarChart from "../components/dashboardcomponent/DashboardCardContainer/Charts/RadialBarChart";
import DateTimeChart from "../components/dashboardcomponent/DashboardCardContainer/Charts/DateTimeChart";
import Total from "../assets/Icons/icons8-rupee-64.png";
import Pending from "../assets/Icons/icons8-pending-50.png";
import Success from "../assets/Icons/icons8-card-payment-80.png";
import CompanyBarChart from "../components/dashboardcomponent/DashboardCardContainer/Charts/companybarchart";
import SparklineChart from "../components/dashboardcomponent/DashboardCardContainer/Charts/AdminChart1";
import { getActivityLogsApi } from "../Api/getActivityLogs";
import {
  countSoldCancelPolicyApi,
  policyCountByDayApi,
  policyCountByMonth,
  policyCountByMonthApi,
  totalPendingTransactionRequestApi,
} from "../Api/DashBoardApi/policyCountByDay";
import { getDefaultMonthCount, getMonthName } from "../Utils/getMonthname";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";
export default function Home() {
  const [activityLogs, setactivityLogs] = useState([]);

  const [LoginData, setLoginData] = useState();
  const [cardsData, setcardsData] = useState();
  const [isgetpolicyCountloading, setisgetpolicyCountloading] = useState(false);

  const [isgetActivitylogloading, setisgetActivitylogloading] = useState(false);
  const [isgetPolicySoldCancel, setIsgetPolicySoldCancel] = useState(false);

  const [isgetpolicyCountByMonthloading, setisgetpolicyCountByMonthloading] =
    useState(false);

  const [policyCountByMonth, setpolicyCountByMonth] = useState();
  const [totalpendingtransaction, settotalpendingtransaction] = useState();

  const [PolicySoldCancelCount, setPolicySoldCancelCount] = useState();

  // daily policyCount  Api Call cardsData
  const getpolicyCount = async (id, role_type) => {
    setisgetpolicyCountloading(true);
    const apires = await policyCountByDayApi(id, role_type);
    const transformedData = apires?.data?.map((item) => {
      let icon = "";
      let title = "";
      let bgColor = "";
      let total = "";
      switch (item.policy_status) {
        case "sold":
          bgColor = "#78c8cf";
          icon = Total;

          title = "Success";
          total = item.total.toString();

          break;
        case "pending":
          icon = Pending;

          title = "Pending";
          total = item.total.toString();
          bgColor = "#5888e8";

          break;
        case "reject":
          icon = Success;

          title = "Rejected";
          total = item.total.toString();
          bgColor = "#e06f7f";

          break;
        default:
          title = "Unknown";
      }

      return {
        icon: icon,

        title: title,
        value: total,
        bgColor: bgColor,
      };
    });

    setcardsData(transformedData);
    setisgetpolicyCountloading(false);
  };

  const getTotalPendingTransactionCount = async (id, role_type) => {
    setisgetpolicyCountloading(true);
    const apires = await totalPendingTransactionRequestApi(id, role_type);
    settotalpendingtransaction(apires?.data[0]?.total);
    setisgetpolicyCountloading(false);
  };

  //RadialBar chart  Api Call
  const getPolicySoldCancel = async (id, role_type) => {
    setIsgetPolicySoldCancel(true);
    const apires = await countSoldCancelPolicyApi(id, role_type);

    const transformedData = apires?.data?.map((item) => {
      let title = "";
      let total = "";
      switch (item.policy_status) {
        case "SOLD":
          title = "Success";
          total = item.total.toString() ?? 0;

          break;
        case "CANCELED":
          total = item.total.toString() ?? 0;
          title = "Cancelled";

          break;

        default:
          title = "Unknown";
      }

      return {
        title: title,
        value: total,
      };
    });
    setPolicySoldCancelCount(transformedData);

    setIsgetPolicySoldCancel(false);
  };

  //barlineChart Api Call
  const getpolicyCountByMonth = async (id, role_type) => {
    setisgetpolicyCountByMonthloading(true);
    const apires = await policyCountByMonthApi(id, role_type);

    const transformedData = apires.data.reduce((result, item) => {
      const monthName = getMonthName(item.monthnumber);
      const total = item.total;

      result[monthName] = total.toString();
      return result;
    }, getDefaultMonthCount());
    setpolicyCountByMonth(transformedData);
    setisgetpolicyCountByMonthloading(false);
  };

  const getActivityLogs = useCallback(
    async (id, roleType) => {
      setisgetActivitylogloading(true);
      const today = moment().format("yyyy-MM-DD");
      const activityRes = await getActivityLogsApi(id, roleType, today);
      setactivityLogs(activityRes?.data);
      setisgetActivitylogloading(false);
    },
    [setactivityLogs]
  );

  const getLocalData = useCallback(async () => {
    const localData = localStorage.getItem("Acemoney_Cache");

    if (localData !== null || localData !== undefined) {
      const decryptdata = decryptData(localData);
      getActivityLogs(
        decryptdata?.user_details?.id,
        decryptdata?.user_details?.role_type
      );
      getTotalPendingTransactionCount(
        decryptdata?.user_details?.id,
        decryptdata?.user_details?.role_type
      );
      getPolicySoldCancel(
        decryptdata?.user_details?.id,
        decryptdata?.user_details?.role_type
      );

      getpolicyCount(
        decryptdata?.user_details?.id,
        decryptdata?.user_details?.role_type
      );
      getpolicyCountByMonth(
        decryptdata?.user_details?.id,
        decryptdata?.user_details?.role_type
      );
      setLoginData(decryptdata?.user_details);
    }
  }, [getActivityLogs, setLoginData]);

  const mapDataToTimelineItems = () => {
    return activityLogs
      ?.map((item, index) => {
        if (item.details !== null) {
          return {
            label: moment(item?.created_at).format("DD MMM YYYY h:mmA"),
            children: item.details,
            // className: item.admin_name !== null ? "red" : "",
          };
        }
        return null;
      })
      .filter(Boolean); // Filter out null entries
  };
  useEffect(() => {
    getLocalData();
  }, [getLocalData]);
  return (
    <div className="flex  w-full   flex-col h-[calc(100vh-48px)] ">
      <div className="dashboard-container ">
        {LoginData?.admin_role === "admin_master" ? (
          <div className="grid-item item1Admin">
            <div className="item1Admin-left text-center">
              <span style={{ fontSize: "75px", color: "#494F55" }}>
                {totalpendingtransaction}
              </span>
              <p>Toatal Pending Transaction</p>
            </div>
            <div className="item1Admin-left text-center">
              <p style={{ fontSize: "75px", color: "#494F55" }}>
                {totalpendingtransaction}
              </p>
              <p> Total Approved Transaction</p>

              {/* <SparklineChart title={"Success"} /> */}
            </div>{" "}
          </div>
        ) : (
          <div
            style={{
              boxShadow:
                "rgba(149, 157, 165, 0.2) 0px 8px 24px;    transition: background-color 0.3s ease, transform 0.3s ease" /* Smooth transition for background color and transform */,
            }}
            className="grid-item item1"
          >
            <h2>Name : {LoginData?.dealer_name}</h2>
            <h2>PanCard No : {LoginData?.pan_no}</h2>
            <div className="flex  items-center">
              <span>
                <img src={phone} className="w-6 pr-2" alt="email" />
              </span>{" "}
              {LoginData?.mobile}
            </div>
            <div className="flex  items-center">
              <span>
                <img src={email} className="w-6 pr-2 h-4" alt="email" />
              </span>{" "}
              {LoginData?.email}
            </div>
            <div className="flex  items-center">
              <span>
                <img
                  src={addicon1}
                  className="w-6 pr-2 h-4"
                  alt="address icon"
                />
              </span>{" "}
              {LoginData?.add1} {LoginData?.add2} {LoginData?.location}{" "}
              {LoginData?.state} {LoginData?.pin_code}
            </div>
          </div>
        )}
        <div className="grid-item item2">
          {LoginData?.admin_role !== "admin_master" && (
            <div className="item2-left">
              {isgetPolicySoldCancel ? (
                <Skeleton.Button
                  active
                  size="large"
                  shape="square"
                  block={true}
                  style={{ height: "350px" }}
                />
              ) : (
                <RadialBarChart data={PolicySoldCancelCount} />
              )}
            </div>
          )}

          <div
            className={`item2-right p-3  ${
              LoginData?.admin_role === "admin_master"
                ? "col-span-2 bg-white"
                : "col-span-1"
            }  `}
          >
            {LoginData?.admin_role === "admin_master" ? (
              <CompanyBarChart />
            ) : (
              <>
                {!isgetpolicyCountloading ? (
                  <div
                    style={{
                      height: "100%",
                    }}
                  >
                    {cardsData?.map((data, index) => (
                      <div className={`relative   w-full py-2`}>
                        <div
                          style={{
                            backgroundColor: data.bgColor,
                            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          }}
                          className={`rounded-lg p-4 h-[70%]`}
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
                            style={{
                              position: "absolute",
                              right: 5,
                              bottom: -10,
                            }}
                          />
                          <p className="text-white text-xl ">{data.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      width: "100%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Skeleton.Button
                      active
                      size="large"
                      shape="square"
                      block={true}
                      style={{ height: "80px" }}
                    />
                    <Skeleton.Button
                      active
                      size="large"
                      shape="square"
                      block={true}
                      style={{ height: "80px" }}
                    />
                    <Skeleton.Button
                      active
                      size="large"
                      shape="square"
                      block={true}
                      style={{ height: "80px" }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="grid-item item3">
          <div className=" flex  flex-col justify-center 	  h-full	   gap-4 p-3  overflow-hidden">
            {isgetActivitylogloading ? (
              <Skeleton.Button
                active
                size="large"
                shape="square"
                block={true}
                style={{ height: "500px" }}
              />
            ) : (
              <>
                <p className="text-center">TimeLine Series</p>

                <>
                  <Timeline
                    className="hide-scrollbar"
                    mode={"left"}
                    style={{
                      alignSelf: "flex-end",
                      width: "100%",
                      height: "100%",
                      overflow: "auto", // Change from "scroll" to "auto"
                      paddingTop: "10px",
                    }}
                    items={mapDataToTimelineItems()}
                  />
                </>
              </>
            )}
          </div>
        </div>
        <div style={{ zIndex: 1 }} className="grid-item item4">
          {!isgetpolicyCountByMonthloading ? (
            <DateTimeChart data={policyCountByMonth} />
          ) : (
            <>
              <Skeleton.Button
                active
                size="large"
                shape="square"
                block={true}
                style={{ height: "100px" }}
              />
              <Skeleton.Button
                active
                size="large"
                shape="square"
                block={true}
                style={{ height: "80px" }}
              />{" "}
              <Skeleton.Button
                active
                size="large"
                shape="square"
                block={true}
                style={{ height: "80px" }}
              />{" "}
              <Skeleton.Button
                active
                size="large"
                shape="square"
                block={true}
                style={{ height: "80px" }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
