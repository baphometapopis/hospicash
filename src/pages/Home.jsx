import React, { useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import PieChart from "../components/dashboardcomponent/PieChart";
import { MyDropzoneComponent } from "../components/dashboardcomponent/FileDropZone";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import addicon1 from "../../src/assets/Icons/icons8-address-50.png";
import email from "../../src/assets/Icons/icons8-email-50.png";
import phone from "../../src/assets/Icons/icons8-phone-64.png";
import "./Home.css";
import { fileUpload } from "../Api/fileUpload";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decryptData } from "../Utils/cryptoUtils";
import { maskMiddle } from "../Utils/maskCharacter";
import RadialBarChart from "../components/dashboardcomponent/DashboardCardContainer/Charts/RadialBarChart";
import LineChart from "../components/dashboardcomponent/TransactionChart";
import DateTimeChart from "../components/dashboardcomponent/DashboardCardContainer/Charts/DateTimeChart";
import Total from "../assets/Icons/icons8-rupee-64.png";
import Pending from "../assets/Icons/icons8-pending-50.png";
import Success from "../assets/Icons/icons8-card-payment-80.png";
import concile from "../assets/Icons/icons8-rupees-64.png";
export default function Home() {
  const [selectedFile, setSelectedFile] = useState();
  const [isuploadError, setisuploadError] = useState(false);
  const [showUpload, setshowUpload] = useState(true);
  const [LoginData, setLoginData] = useState();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const sampledata = [
    {
      id: 1,
      policy_no: "OBB0000000101",
      full_name: "amityadav",
      pan_number: null,
      created_date: "2019-07-22 16:29:27",
      pdf_url: "",
    },
    {
      id: 2,
      policy_no: "OBB0000000102",
      full_name: "darshansyadav",
      pan_number: null,
      created_date: "2019-07-22 16:58:40",
      pdf_url: "",
    },
    {
      id: 3,
      policy_no: "OBB0000000163",
      full_name: "amityadav",
      pan_number: null,
      created_date: "2019-07-25 18:03:25",
      pdf_url: "",
    },
    {
      id: 4,
      policy_no: "OBB0000000677",
      full_name: "sushantasdfgd",
      pan_number: null,
      created_date: "2019-10-03 17:59:38",
      pdf_url: "",
    },
    {
      id: 5,
      policy_no: "OBB0000000678",
      full_name: "amityadav",
      pan_number: null,
      created_date: "2019-10-03 18:08:28",
      pdf_url: "",
    },
    {
      id: 6,
      policy_no: "OBB0000000717",
      full_name: "sushantasdfgg",
      pan_number: null,
      created_date: "2019-11-02 16:13:09",
      pdf_url: "",
    },
    {
      id: 7,
      policy_no: "OBB0000000718",
      full_name: "sushantasdf",
      pan_number: null,
      created_date: "2019-11-02 16:41:34",
      pdf_url: "",
    },
    {
      id: 8,
      policy_no: "OBB0000000719",
      full_name: "MoutushiSen",
      pan_number: null,
      created_date: "2019-11-02 17:08:00",
      pdf_url: "",
    },
    {
      id: 9,
      policy_no: "OBB0000000720",
      full_name: "MoutushiSen",
      pan_number: null,
      created_date: "2019-11-02 17:12:54",
      pdf_url: "",
    },
    {
      id: 10,
      policy_no: "OBB0000001124",
      full_name: "poonampoonam",
      pan_number: null,
      created_date: "2019-12-02 19:37:20",
      pdf_url: "",
    },
    {
      id: 11,
      policy_no: "OBB0000001126",
      full_name: "testtest",
      pan_number: null,
      created_date: "2019-12-03 11:26:20",
      pdf_url: "",
    },
    {
      id: 12,
      policy_no: "OBB0000001127",
      full_name: "testtest",
      pan_number: null,
      created_date: "2019-12-03 11:41:28",
      pdf_url: "",
    },
    {
      id: 13,
      policy_no: "OBB0000001428",
      full_name: "testtest",
      pan_number: null,
      created_date: "2019-12-26 12:35:38",
      pdf_url: "",
    },
    {
      id: 14,
      policy_no: "OBB0000001648",
      full_name: "testtest",
      pan_number: null,
      created_date: "2020-01-14 14:29:44",
      pdf_url: "",
    },
    {
      id: 15,
      policy_no: "OBB0000001650",
      full_name: "ANNNNNKAAAAAA",
      pan_number: null,
      created_date: "2020-01-14 14:52:23",
      pdf_url: "",
    },
    {
      id: 16,
      policy_no: "OBB0000001655",
      full_name: "aaaaakkkkk",
      pan_number: null,
      created_date: "2020-01-15 12:20:08",
      pdf_url: "",
    },
    {
      id: 17,
      policy_no: "OBB0000001656",
      full_name: "snehalkanfade",
      pan_number: null,
      created_date: "2020-01-15 12:23:54",
      pdf_url: "",
    },
    {
      id: 18,
      policy_no: "OBB0000001657",
      full_name: "gfggkanfade",
      pan_number: null,
      created_date: "2020-01-15 12:28:14",
      pdf_url: "",
    },
    {
      id: 19,
      policy_no: "OBB0000001662",
      full_name: "testtest",
      pan_number: null,
      created_date: "2020-01-16 11:15:30",
      pdf_url: "",
    },
    {
      id: 20,
      policy_no: "OBB0000001671",
      full_name: "testingtest",
      pan_number: null,
      created_date: "2020-01-16 14:57:10",
      pdf_url: "",
    },
    {
      id: 21,
      policy_no: "OBB0000002437",
      full_name: "AKSHAYKULSHRESTHA",
      pan_number: null,
      created_date: "2020-07-01 15:49:49",
      pdf_url: "",
    },
    {
      id: 22,
      policy_no: "OBB0000002438",
      full_name: "kjhlklhl",
      pan_number: null,
      created_date: "2020-07-03 11:31:59",
      pdf_url: "",
    },
    {
      id: 23,
      policy_no: "OBB0000002480",
      full_name: "AMARAMAR",
      pan_number: null,
      created_date: "2020-07-03 18:14:53",
      pdf_url: "",
    },
    {
      id: 24,
      policy_no: "OBB0000002481",
      full_name: "AMARAMAR",
      pan_number: null,
      created_date: "2020-07-03 18:17:03",
      pdf_url: "",
    },
    {
      id: 25,
      policy_no: "OBB0000002482",
      full_name: "AMARAMAR",
      pan_number: null,
      created_date: "2020-07-03 18:19:14",
      pdf_url: "",
    },
    {
      id: 26,
      policy_no: "OBB0000002483",
      full_name: "AMARAMAR",
      pan_number: null,
      created_date: "2020-07-03 18:23:52",
      pdf_url: "",
    },
    {
      id: 27,
      policy_no: "OBB0000002484",
      full_name: "AMARAMAR",
      pan_number: null,
      created_date: "2020-07-03 18:23:54",
      pdf_url: "",
    },
    {
      id: 28,
      policy_no: "OBB0000002485",
      full_name: "AMARAMAR",
      pan_number: null,
      created_date: "2020-07-03 18:25:41",
      pdf_url: "",
    },
    {
      id: 29,
      policy_no: "OBB0000002486",
      full_name: "AMARAMAR",
      pan_number: null,
      created_date: "2020-07-03 18:27:55",
      pdf_url: "",
    },
    {
      id: 30,
      policy_no: "OBB0000002487",
      full_name: "AMARAMAR",
      pan_number: null,
      created_date: "2020-07-03 18:28:05",
      pdf_url: "",
    },
    {
      id: 31,
      policy_no: "OBB0000002488",
      full_name: "AMARAMAR",
      pan_number: null,
      created_date: "2020-07-03 18:29:03",
      pdf_url: "",
    },
    {
      id: 32,
      policy_no: "OBB0000002776",
      full_name: "Amarthombare",
      pan_number: null,
      created_date: "2020-07-29 01:14:51",
      pdf_url: "",
    },
    {
      id: 33,
      policy_no: "OBB0000002777",
      full_name: "Amarthombare",
      pan_number: null,
      created_date: "2020-07-29 01:43:03",
      pdf_url: "",
    },
    {
      id: 34,
      policy_no: "OBB0000002780",
      full_name: "Balasahebthombare",
      pan_number: null,
      created_date: "2020-07-29 17:51:14",
      pdf_url: "",
    },
    {
      id: 35,
      policy_no: "OBB0000002781",
      full_name: "PANDURANGAGLAVE",
      pan_number: null,
      created_date: "2020-07-29 18:30:01",
      pdf_url: "",
    },
    {
      id: 36,
      policy_no: "OBB0000002782",
      full_name: "PANDURANGAGLAVE",
      pan_number: null,
      created_date: "2020-07-29 18:39:43",
      pdf_url: "",
    },
    {
      id: 37,
      policy_no: "OBB0000002783",
      full_name: "Balasahebthombare",
      pan_number: null,
      created_date: "2020-07-29 18:43:05",
      pdf_url: "",
    },
    {
      id: 38,
      policy_no: "OBB0000002784",
      full_name: "PANDURANGAGLAVE",
      pan_number: null,
      created_date: "2020-07-29 18:47:11",
      pdf_url: "",
    },
    {
      id: 39,
      policy_no: "OBB0000002785",
      full_name: "Balasahebthombare",
      pan_number: null,
      created_date: "2020-07-29 18:52:56",
      pdf_url: "",
    },
    {
      id: 40,
      policy_no: "OBB0000003678",
      full_name: "Amarthombare",
      pan_number: null,
      created_date: "2020-09-21 13:55:39",
      pdf_url: "",
    },
    {
      id: 41,
      policy_no: "OBB0000003679",
      full_name: "AmarTHombare",
      pan_number: null,
      created_date: "2020-09-21 13:57:00",
      pdf_url: "",
    },
    {
      id: 42,
      policy_no: "OBB0000003689",
      full_name: "PANDURANGAGLAVE",
      pan_number: null,
      created_date: "2020-09-21 16:13:45",
      pdf_url: "",
    },
    {
      id: 43,
      policy_no: "OBB0000004025",
      full_name: "Amarthombare",
      pan_number: null,
      created_date: "2020-10-15 21:13:57",
      pdf_url: "",
    },
    {
      id: 44,
      policy_no: "OBB0000004027",
      full_name: "Amarthombare",
      pan_number: null,
      created_date: "2020-10-16 11:07:17",
      pdf_url: "",
    },
    {
      id: 45,
      policy_no: "OBB0000006287",
      full_name: "amarthombare",
      pan_number: null,
      created_date: "2021-01-12 14:42:43",
      pdf_url: "",
    },
    {
      id: 46,
      policy_no: "OBB0000006494",
      full_name: "ASDJDAS",
      pan_number: null,
      created_date: "2021-01-21 13:29:32",
      pdf_url: "",
    },
    {
      id: 47,
      policy_no: "OBB0000006495",
      full_name: "asdhdasjhdg",
      pan_number: null,
      created_date: "2021-01-21 13:30:39",
      pdf_url: "",
    },
    {
      id: 48,
      policy_no: "OBB0000006496",
      full_name: "asdjcajdgast",
      pan_number: null,
      created_date: "2021-01-21 13:32:39",
      pdf_url: "",
    },
    {
      id: 49,
      policy_no: "OBB0000006497",
      full_name: "adnsiudsya",
      pan_number: null,
      created_date: "2021-01-21 13:35:29",
      pdf_url: "",
    },
    {
      id: 50,
      policy_no: "OBB0000006498",
      full_name: "AmarThombare",
      pan_number: null,
      created_date: "2021-01-21 14:14:55",
      pdf_url: "",
    },
    {
      id: 51,
      policy_no: "OBB0000018177",
      full_name: "SUSHANTROKADE",
      pan_number: "BLBPR8421D",
      created_date: "2022-09-08 18:05:27",
      pdf_url: "",
    },
    {
      id: 52,
      policy_no: "OBB0000018177",
      full_name: "SUSHANTROKADE",
      pan_number: "BLBPR8421D",
      created_date: "2022-09-08 18:05:27",
      pdf_url: "",
    },
    {
      id: 53,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:24:21",
      pdf_url: "",
    },
    {
      id: 54,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:25:05",
      pdf_url: "",
    },
    {
      id: 55,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:25:30",
      pdf_url: "",
    },
    {
      id: 56,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:26:05",
      pdf_url: "",
    },
    {
      id: 57,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:26:15",
      pdf_url: "",
    },
    {
      id: 58,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:26:32",
      pdf_url: "",
    },
    {
      id: 59,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:27:30",
      pdf_url: "",
    },
    {
      id: 60,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:27:50",
      pdf_url: "",
    },
    {
      id: 61,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:28:56",
      pdf_url: "",
    },
    {
      id: 62,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:30:31",
      pdf_url: "",
    },
    {
      id: 63,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:30:45",
      pdf_url: "",
    },
    {
      id: 64,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:31:06",
      pdf_url: "",
    },
    {
      id: 65,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:31:55",
      pdf_url: "",
    },
    {
      id: 66,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:34:23",
      pdf_url: "",
    },
    {
      id: 67,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:34:45",
      pdf_url: "",
    },
    {
      id: 68,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:35:01",
      pdf_url: "",
    },
    {
      id: 69,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:35:35",
      pdf_url: "",
    },
    {
      id: 70,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:37:00",
      pdf_url: "",
    },
    {
      id: 71,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:38:05",
      pdf_url: "",
    },
    {
      id: 72,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:38:18",
      pdf_url: "",
    },
    {
      id: 73,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:38:44",
      pdf_url: "",
    },
    {
      id: 74,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:40:22",
      pdf_url: "",
    },
    {
      id: 75,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:41:22",
      pdf_url: "",
    },
    {
      id: 76,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:41:50",
      pdf_url: "",
    },
    {
      id: 77,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 02:41:56",
      pdf_url: "",
    },
    {
      id: 78,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:03:39",
      pdf_url: "",
    },
    {
      id: 79,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:03:44",
      pdf_url: "",
    },
    {
      id: 80,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:03:48",
      pdf_url: "",
    },
    {
      id: 81,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:14:48",
      pdf_url: "",
    },
    {
      id: 82,
      policy_no: "OBB0000018177/1",
      full_name: "dd",
      pan_number: null,
      created_date: "2024-02-01 16:15:04",
      pdf_url: "",
    },
    {
      id: 83,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:28:14",
      pdf_url: "",
    },
    {
      id: 84,
      policy_no: "OBB0000018177/2",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:29:44",
      pdf_url: "",
    },
    {
      id: 85,
      policy_no: "OBB0000018177/3",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:29:47",
      pdf_url: "",
    },
    {
      id: 86,
      policy_no: "OBB0000018177/4",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:37:58",
      pdf_url: "",
    },
    {
      id: 87,
      policy_no: "OBB0000018177/5",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:41:36",
      pdf_url: "",
    },
    {
      id: 88,
      policy_no: "OBB0000018177/6",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:44:50",
      pdf_url: "",
    },
    {
      id: 89,
      policy_no: "OBB0000018177/7",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:45:14",
      pdf_url: "",
    },
    {
      id: 90,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:46:05",
      pdf_url: "",
    },
    {
      id: 91,
      policy_no: "OBB0000018177/2",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:54:23",
      pdf_url: "",
    },
    {
      id: 92,
      policy_no: "OBB0000018177/3",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 16:55:34",
      pdf_url: "",
    },
    {
      id: 93,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 17:40:16",
      pdf_url: "",
    },
    {
      id: 94,
      policy_no: "OBB0000018177/2",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 17:53:31",
      pdf_url: "",
    },
    {
      id: 95,
      policy_no: "OBB0000018177/1",
      full_name: "BharathPalani",
      pan_number: null,
      created_date: "2024-02-01 17:55:45",
      pdf_url: "",
    },
    {
      id: 96,
      policy_no: "OBB0000018177/2",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 17:56:48",
      pdf_url: "",
    },
    {
      id: 97,
      policy_no: "OBB0000018177/1",
      full_name: "BharathPalani",
      pan_number: null,
      created_date: "2024-02-01 18:08:43",
      pdf_url: "",
    },
    {
      id: 98,
      policy_no: "OBB0000018177/2",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 18:09:30",
      pdf_url: "",
    },
    {
      id: 99,
      policy_no: "OBB0000018177/3",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 18:10:10",
      pdf_url: "",
    },
    {
      id: 100,
      policy_no: "OBB0000018177/4",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 18:12:58",
      pdf_url: "",
    },
    {
      id: 101,
      policy_no: "OBB0000018177/1",
      full_name: "BharathPalani",
      pan_number: null,
      created_date: "2024-02-01 18:15:40",
      pdf_url: "",
    },
    {
      id: 102,
      policy_no: "OBB0000018177/2",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 18:16:01",
      pdf_url: "",
    },
    {
      id: 103,
      policy_no: "OBB0000018177/1",
      full_name: "BharathPalani",
      pan_number: null,
      created_date: "2024-02-01 18:19:20",
      pdf_url: "",
    },
    {
      id: 104,
      policy_no: "OBB0000018177/1",
      full_name: "BharathPalani",
      pan_number: null,
      created_date: "2024-02-01 18:19:26",
      pdf_url: "",
    },
    {
      id: 105,
      policy_no: "OBB0000018177/1",
      full_name: "BharathPalani",
      pan_number: null,
      created_date: "2024-02-01 18:19:55",
      pdf_url: "",
    },
    {
      id: 106,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 18:26:19",
      pdf_url: "",
    },
    {
      id: 107,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-01 18:29:25",
      pdf_url: "",
    },
    {
      id: 108,
      policy_no: "OBB0000018177/2",
      full_name: "BHARAThPALANI",
      pan_number: null,
      created_date: "2024-02-01 18:31:51",
      pdf_url: "",
    },
    {
      id: 109,
      policy_no: "OBB0000018177/3",
      full_name: "BHARAThPALANi",
      pan_number: null,
      created_date: "2024-02-01 18:33:01",
      pdf_url: "",
    },
    {
      id: 110,
      policy_no: "OBB0000018177/4",
      full_name: "BHARAThPALANi",
      pan_number: null,
      created_date: "2024-02-01 18:33:14",
      pdf_url: "",
    },
    {
      id: 111,
      policy_no: "OBB0000018177/5",
      full_name: "BHARAThPALANi",
      pan_number: null,
      created_date: "2024-02-02 05:08:04",
      pdf_url: "",
    },
    {
      id: 112,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-02 05:20:06",
      pdf_url: "",
    },
    {
      id: 113,
      policy_no: "OBB0000018177/2",
      full_name: "BHARAThPALANi",
      pan_number: null,
      created_date: "2024-02-02 05:21:23",
      pdf_url: "",
    },
    {
      id: 114,
      policy_no: "OBB0000018177/1",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-02 10:33:38",
      pdf_url: "",
    },
    {
      id: 115,
      policy_no: "OBB0000018177/2",
      full_name: "MNMNMNNMNMn",
      pan_number: null,
      created_date: "2024-02-02 12:41:16",
      pdf_url: "",
    },
    {
      id: 116,
      policy_no: "20240203093127",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-03 09:31:27",
      pdf_url: "",
    },
    {
      id: 117,
      policy_no: "20240203093502",
      full_name: "sushantdd",
      pan_number: null,
      created_date: "2024-02-03 09:35:02",
      pdf_url: "",
    },
    {
      id: 118,
      policy_no: "20240203093632",
      full_name: "sushantdd",
      pan_number: "BLBPR8421F",
      created_date: "2024-02-03 09:36:32",
      pdf_url: "",
    },
    {
      id: 119,
      policy_no: "20240203093632/1",
      full_name: "sushantdd",
      pan_number: "BLBPR8421F",
      created_date: "2024-02-03 09:36:40",
      pdf_url: "",
    },
    {
      id: 120,
      policy_no: "20240203093632/2",
      full_name: "sushantdd",
      pan_number: "BLBPR8421F",
      created_date: "2024-02-03 09:38:32",
      pdf_url: "",
    },
    {
      id: 121,
      policy_no: "20240203094503",
      full_name: "sushantdd",
      pan_number: "BLBPR8421F",
      created_date: "2024-02-03 09:45:04",
      pdf_url: "",
    },
    {
      id: 122,
      policy_no: "20240203094508",
      full_name: "sushantdd",
      pan_number: "BLBPR8421F",
      created_date: "2024-02-03 09:45:08",
      pdf_url: "",
    },
    {
      id: 123,
      policy_no: "20240203094612",
      full_name: "sushantdd",
      pan_number: "BLBPR8421F",
      created_date: "2024-02-03 09:46:12",
      pdf_url: "",
    },
    {
      id: 124,
      policy_no: "20240203094634",
      full_name: "sushantdd",
      pan_number: "BLBPR8421F",
      created_date: "2024-02-03 09:46:35",
      pdf_url: "",
    },
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
  const getLocalData = async () => {
    const localData = localStorage.getItem("LoggedInUser");

    if (localData !== null || localData !== undefined) {
      const decryptdata = decryptData(localData);
      console.log(decryptdata);
      setLoginData(decryptdata?.user_details);
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
  const [isMasked, setIsMasked] = useState(true);

  const displayAccountNumber = isMasked
    ? maskMiddle(LoginData?.banck_acc_no)
    : LoginData?.banck_acc_no;

  useEffect(() => {
    getLocalData();
  }, [showUpload]);
  return (
    <div className="flex  w-full   flex-col h-[calc(100vh-48px)] ">
      <div className="dashboard-container">
        <div className="grid-item item1">
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
              <img src={addicon1} className="w-6 pr-2 h-4" alt="address icon" />
            </span>{" "}
            {LoginData?.add1} {LoginData?.add2} {LoginData?.location}{" "}
            {LoginData?.state} {LoginData?.pin_code}
          </div>
        </div>
        <div className="grid-item item2">
          <div className="item2-left">
            <RadialBarChart />
          </div>
          <div className="item2-right p-3">
            <Box className=" h-full bg-white border border-neutral-light rounded">
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
                          />
                          <Button
                            className={"w-fit"}
                            type="submit"
                            label="Download"
                            variant="secondary"
                          />
                        </>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>{" "}
          </div>
        </div>
        <div className="grid-item item3">
          <div className=" flex  flex-col justify-between 	 	   gap-4">
            {/* Map through the data and render a Card for each item */}
            {cardsData.map((data, index) => (
              <div className={`relative w-full h-fit`}>
                <div
                  style={{
                    backgroundColor: data.bgColor,
                    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
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
        <div className="grid-item item4">
          <DateTimeChart data={sampledata} />
        </div>
      </div>
    </div>
  );
}
