import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link, useNavigate } from "react-router-dom";
import { decryptData } from "../Utils/cryptoUtils";
import { Popconfirm } from "antd";

export default function Sidebar({ opened }) {
  const [isopened, setisopened] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [loginData, setLoginData] = useState();
  const [isAdmin, setisAdmin] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation popup

  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);
  const getlocalData = async () => {
    const data = localStorage.getItem("Acemoney_Cache");
    if (data) {
      const decryptdata = decryptData(data);
      setLoginData(decryptdata);
      if (decryptdata?.user_details?.role_type === "dealer") {
        setisAdmin(false);
      } else {
        setisAdmin(true);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getlocalData();
    const handleWindowResize = () => {
      setWindowWidth([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);
    if (windowWidth <= 768) {
      setisopened(opened);
    } else {
      setisopened(true);
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth, opened]);

  const navItems = [
    {
      id: 1,
      order: 1,
      label: "Home",
      icon: "home",
      path: "/home",
      Admin: true,
      user: true,
    },
    {
      id: 2,
      order: 2,
      label: "Transaction",
      icon: "currency_rupee",
      path: "/transaction",
      Admin: true,
      user: false,
    },
    {
      id: 3,
      order: 3,
      label: "Transaction List",
      icon: "payments",
      path: "/transaction_list",
      Admin: true,
      user: true,
    },
    {
      id: 4,
      order: 4,
      label: "Sold Policy",
      icon: "Contract",
      path: "/soldPolicy",
      Admin: false,
      user: true,
    },
    {
      id: 4,
      order: 4,
      label: "Pending Policy",
      icon: "Pending_actions",
      path: "/Pending_Policy",
      Admin: true,
      user: false,
    },
    {
      id: 5,
      order: 5,
      label: "Cancelled Policy",
      icon: "scan_delete",
      path: "/cancelledPolicy",
      Admin: false,
      user: true,
    },
    {
      id: 6,
      order: 6,
      label: "Yearly Policy",
      icon: "description",
      path: "/form",
      Admin: false,
      user: true,
    },
    {
      id: 7,
      order: 7,
      label: "Monthly Policy",
      icon: "upload_file",
      path: "/Monthly_Policy",
      Admin: false,
      user: true,
    },
    // {
    //   id: 8,
    //   order: 8,
    //   label: "logout",
    //   icon: "settings_power",
    //   // path: "",
    //   Admin: true,
    //   user: true,
    // },
  ];

  // Function to handle logout and display confirmation
  const handleLogout = () => {
    setShowConfirmation(true);
  };

  // Function to confirm logout and perform logout action
  const confirmLogout = () => {
    // Perform logout action here, such as clearing local storage, etc.
   localStorage.removeItem("Acemoney_Cache");
    navigate("/Login");
  };

  return (
    <>
      {isopened && (
        <aside
          style={{ zIndex: 9 }}
          className={`bg-primary text-white fixed md:sticky left-0 top-12  h-[calc(100vh-48px)]  md:min-w-14 min-w-60 ${
            isopened ? "" : ""
          }`}
        >
          <ul className="flex flex-col items-start md:items-center">
            {navItems
              .filter(
                (navItem) =>
                  (isAdmin && navItem.Admin) || (!isAdmin && navItem.user)
              )
              .map((filteredNavItem) => (
                <li
                  className="hover:bg-primary-darkest focus-within:bg-secondary focus-within:hover:bg-secondary w-full"
                  key={filteredNavItem.id}
                >
                  <Tippy
                    content={filteredNavItem.label}
                    placement="right"
                    arrow={false}
                    className="rounded-sm text-xs"
                  >
                    <Link to={filteredNavItem.path}>
                      <button
                        onClick={() => {
                          if (windowWidth <= 768) {
                            setisopened(false);
                          }
                        }}
                        className="flex w-full py-2 px-4 items-center justify-start md:justify-center "
                      >
                        <span className="material-symbols-outlined mr-3 md:mr-0">
                          {filteredNavItem.icon}
                        </span>
                        <span className="md:hidden text-white text-sm">
                          {filteredNavItem.label}
                        </span>
                      </button>
                    </Link>
                  </Tippy>
                </li>
              ))}
            {/* Logout button with red color if showConfirmation is true */}
            <Popconfirm
              title="Logout"
              description="Are you sure you want to Logout?"
              onConfirm={confirmLogout}
              destroyTooltipOnHide={true}
              okText="Yes"
              okButtonProps={{ style: { backgroundColor: "#0089D1" } }}
              cancelText="No"
              placement="right"
              // onCancel={() => console.log("kjhkjgcfd")}
            >
              <li
                className={`hover:bg-secondary focus-within:bg-secondary focus-within:hover:bg-secondary w-full `}
                key="logout"
              >
                <Tippy
                  content="Logout"
                  placement="right"
                  arrow={false}
                  className="rounded-sm text-xs"
                >
                  <button
                    onClick={handleLogout}
                    className="flex w-full py-2 px-4 items-center justify-start md:justify-center "
                  >
                    <span className="material-symbols-outlined mr-3 md:mr-0   focus-within:text-warn-darkest focus-within:hover:text-white">
                      settings_power
                    </span>
                    <span className="md:hidden text-white text-sm">Logout</span>
                  </button>
                </Tippy>
              </li>
            </Popconfirm>
          </ul>
        </aside>
      )}

      {/* Confirmation popup */}
    </>
  );
}
