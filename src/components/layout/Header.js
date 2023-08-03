import { Button } from "components/button";
import { IconSearch } from "components/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { v4 } from "uuid";

const HeaderStyles = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  display: block;
  background: white;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 12px 8px -10px;
  .header-main {
    height: ${(props) => props.theme.headerHeight};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-l,
  .header-r {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }
  .logo {
    display: flex;
    align-items: center;
    &-img {
      max-width: 50px;
    }
    &-title {
      font-size: 28px;
      font-weight: 700;
      color: ${(props) => props.theme.primary};
    }
  }
  .menu {
    display: flex;
    list-style: none;
    column-gap: 20px;
    font-weight: 500;
  }
  .search {
    max-width: 240px;
    position: relative;
    border: 2px solid ${(props) => props.theme.grayLight};
    border-radius: 8px;
    padding: 8px 12px;
  }
  .search-input {
    width: 100%;
    outline: none;
    padding-right: 24px;
  }
  .search-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const menuItems = [
  {
    url: "#",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const Header = () => {
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <div className="header-l">
            <NavLink className="logo" to="/">
              <img
                srcSet="/logo.png 2x"
                alt="FSpade Blog"
                className="logo-img"
              />
              <span className="logo-title">Veldora Blog</span>
            </NavLink>
            <ul className="menu">
              {menuItems.map((item) => (
                <li key={v4()}>
                  <NavLink to={item.url}>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="header-r">
            <div className="search">
              <input
                type="text"
                className="search-input"
                placeholder="Type to search... "
              />
              <span className="search-icon">
                <IconSearch></IconSearch>
              </span>
            </div>
            <Button
              height="40px"
              style={{ minWidth: "80px", fontWeight: "400", fontSize: "16px" }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
