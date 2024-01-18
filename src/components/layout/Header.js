import { Button } from "components/button";
import { IconClose, IconMenu, IconSearch } from "components/icons";
import { useClickOutside } from "hooks/useClickOutSide";
import React, { useRef } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "store";
import styled from "styled-components";
import { v4 } from "uuid";
import { getAuth, signOut } from "firebase/auth";
import { useWindowSize } from "@uidotdev/usehooks";

const HeaderStyles = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  display: block;
  background: white;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 12px 8px -10px;
  padding: 0 72px;
  max-width: 100dvw;
  .header-main {
    height: ${(props) => props.theme.headerHeight};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-r__user {
    cursor: pointer;
    position: relative;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 8px;
    }
    &-popover {
      position: absolute;
      top: calc(100% + 20px);
      width: 240px;
      height: 400px;
      background: white;
      display: block;
      right: 0;
      border-radius: 8px;
      box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
        rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
    }
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
  @media only screen and (max-width: 1024px) {
    padding: 0 18px;
    .header-l {
      flex-direction: row-reverse;
    }
    .logo {
      &-img {
        width: 40px;
      }
      &-title {
        font-size: 14px;
      }
    }
    .menu {
      flex-direction: column;
      height: 100dvh;
      width: 100%;
      padding: 16px;
    }
  }
`;
const MobileMenuStyles = styled.div`
  position: fixed;
  inset: 0;
  background: white;
  display: block;
  overflow: hidden;
  z-index: 999;
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
  const { width } = useWindowSize();
  const { user } = useAuthStore((state) => state);
  const [showPopover, setShowPopover] = useState(false);
  const userPopoverRef = useRef();
  useClickOutside(userPopoverRef, () => setShowPopover(false));
  return (
    <HeaderStyles>
      <div className="header-main">
        <div className="header-l">
          <NavLink className="logo" to="/">
            <img srcSet="/logo.png 2x" alt="FSpade Blog" className="logo-img" />
            <span className="logo-title">Veldora Blog</span>
          </NavLink>
          {width > 1024 ? (
            <ul className="menu">
              {menuItems.map((item) => (
                <li key={v4()}>
                  <NavLink to={item.url}>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <MobileMenu></MobileMenu>
          )}
        </div>
        <div className="header-r">
          {width > 1024 && (
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
          )}
          {!user ? (
            <Button
              height="40px"
              style={{ minWidth: "80px", fontWeight: "400", fontSize: "16px" }}
              href="/login"
            >
              Login
            </Button>
          ) : (
            <div
              ref={userPopoverRef}
              className="header-r__user"
              onClick={() => setShowPopover(!showPopover)}
            >
              <img src={user.avatar} alt="" />
              <UserPopover
                show={showPopover}
                setShow={setShowPopover}
                data={user}
              ></UserPopover>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;

const UserPopover = ({ show, setShow, data }) => {
  const { user } = useAuthStore((state) => state);
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return show ? (
    <div className="header-r__user-popover">
      <div className="header__popover-item">
        <Link to={`profile/${user.username}`}>Profile</Link>
      </div>
      <div className="header__popover-item" onClick={handleLogout}>
        <span>Logout</span>
      </div>
    </div>
  ) : null;
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {isOpen && (
        <MobileMenuStyles>
          <ul className="menu">
            {menuItems.map((item) => (
              <li key={v4()}>
                <NavLink to={item.url}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
          <span
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
            }}
          >
            <IconClose />
          </span>
        </MobileMenuStyles>
      )}
      <span onClick={() => setIsOpen(true)}>
        <IconMenu />
      </span>
    </div>
  );
};
