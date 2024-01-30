import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function AppLayout() {
  const [opened, setOpened] = useState(false);

  const toggle = () => {
    setOpened(!opened);
  };
  return (
    <>
      <Header toggle={toggle} />
      <div className="flex">
        <Sidebar opened={opened} />
        <Outlet />
      </div>
    </>
  );
}
