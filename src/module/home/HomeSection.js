import React from "react";
import styled from "styled-components";

const HomeSectionStyles = styled.div`
  width: 100%;
  max-width: ${(props) => (props.widthFull ? "100%" : "1280px")};
  margin: 0 auto;
  padding: 40px 0;
  @media only screen and (max-width: 640px) {
    padding: 40px 10px;
  }
`;

const HomeSection = ({ widthFull, children }) => {
  return (
    <HomeSectionStyles widthFull={widthFull}>{children}</HomeSectionStyles>
  );
};

export default HomeSection;
