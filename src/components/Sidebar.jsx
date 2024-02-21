/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link, useNavigate } from "react-router-dom";
import { decryptData } from "../Utils/cryptoUtils";

export default function Sidebar({ opened }) {
  const [isopened, setisopened] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [loginData, setLoginData] = useState();
  const [isAdmin, setisAdmin] = useState(false);

  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);
  const getlocalData = async () => {
    const data = localStorage.getItem("LoggedInUser");
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
  ];
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
          </ul>
        </aside>
      )}
    </>
  );
}

// .sidebar-opened {
//   opacity: 1;
//   transition: opacity 0.3s ease-in-out;
// }

// .sidebar-closed {
//   opacity: 0;
//   transition: opacity 0.3s ease-in-out;
// }
