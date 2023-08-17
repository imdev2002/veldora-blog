import React, { useState } from "react";
import styled from "styled-components";

const TagPickerStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  border: 1px solid ${(props) => props.theme.grayLight};
`;

const tags = ["active", "sport", "technology"];

const TagPicker = ({ placeholder, children }) => {
  const [tagFilter, setTagFilter] = useState("");
  return (
    <TagPickerStyles>
      <div className="tag-selected"></div>
      <div className="tag-input"></div>
      <div className="tag-list"></div>
    </TagPickerStyles>
  );
};

export default TagPicker;
