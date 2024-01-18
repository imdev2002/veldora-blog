import React from "react";

const IconMenu = ({ size = 24, color = "currentColor", props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill={color} d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
    </svg>
  );
};

export default IconMenu;
