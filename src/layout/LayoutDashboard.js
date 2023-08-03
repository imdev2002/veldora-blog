import Header from "components/layout/Header";
import DashboardSidebar from "module/dashboard/DashboardSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutDashboard = () => {
  return (
    <>
      <Header></Header>
      <DashboardSidebar></DashboardSidebar>
      <div className="container">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default LayoutDashboard;
