import React from "react";
import styled from "styled-components";

const DropdownStyles = styled.div`
  width: 100%;
  display: inline-block;
  position: relative;
  .input__dropdown {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Dropdown = ({ placeholder }) => {
  return (
    <DropdownStyles>
      <div className="input__dropdown">
        <span>{placeholder}</span>
      </div>
    </DropdownStyles>
  );
};

export default Dropdown;
