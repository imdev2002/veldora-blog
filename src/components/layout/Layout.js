import React from "react";
import Header from "./Header";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const HomeMainStyles = styled.div`
  margin-top: ${(props) => props.theme.headerHeight};
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <HomeMainStyles className="home-main">
        {children}
        <Outlet></Outlet>
      </HomeMainStyles>
    </>
  );
};

export default Layout;
