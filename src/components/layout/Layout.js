import React from "react";
import Header from "./Header";
import styled from "styled-components";

const HomeMainStyles = styled.div`
  margin-top: ${(props) => props.theme.headerHeight};
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <HomeMainStyles className="home-main">{children}</HomeMainStyles>
    </>
  );
};

export default Layout;
