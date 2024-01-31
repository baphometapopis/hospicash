import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";

export default function Sidebar({ opened }) {
  const [isopened, setisopened] = useState(true);

  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);

  useEffect(() => {
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
    },

    {
      id: 2,
      order: 2,
      label: "Transaction",
      icon: "currency_rupee",
      path: "/transaction",
    },
    {
      id: 3,
      order: 3,
      label: "Transaction List",
      icon: "payments",
      path: "/transaction_list",
    },

    {
      id: 4,
      order: 4,
      label: "Sold Policy",
      icon: "Contract",
      path: "/soldPolicy",
    },
    {
      id: 5,
      order: 5,
      label: "Cancelled Policy",
      icon: "scan_delete",
      path: "/cancelledPolicy",
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
            {navItems.map((navItem) => (
              <li
                className="hover:bg-primary-darkest focus-within:bg-secondary focus-within:hover:bg-secondary w-full"
                key={navItem.id}
              >
                <Tippy
                  content={navItem.label}
                  placement="right"
                  arrow={false}
                  className="rounded-sm text-xs"
                >
                  <Link to={navItem.path}>
                    <button
                      onClick={() => {
                        if (windowWidth <= 768) {
                          setisopened(false);
                        }
                      }}
                      className="flex w-full py-2 px-4 items-center justify-start md:justify-center "
                    >
                      <span className="material-symbols-outlined mr-3 md:mr-0">
                        {navItem.icon}
                      </span>
                      <span className="md:hidden text-white text-sm">
                        {navItem.label}
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
