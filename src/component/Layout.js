import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { transparentize, darken } from "polished";
import PropTypes from "prop-types";

const ContentLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  font-family: "montserrat";
  top: ${(props) => props.spaceTop};
  left: 0;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
`;

const AppBrand = styled.div`
  height: 50px;
  margin-bottom: 10px;
  padding: 0 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: none;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  top: 0;
  left: 0;

  & svg,
  img {
    height: 40px;
  }

  @media screen and (max-width: 600px) {
    display: flex;
  }
`;

const SidebarWrapper = styled("div").attrs({ className: "flexi-sidebar" })`
  /* ${(props) => props.appBrand && css``} */
  width: ${(props) => props.width};
  top: 0;
  left: 0;
  height: 100vh;
  padding: 20px;
  position: relative;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "#FFF"};
  box-sizing: border-box;
  font-family: "montserrat";
  z-index: 3;
  overflow: auto;
  overflow-x: hidden;
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    z-index: 5;
    position: fixed;
    width: ${props => props.collapsedWidth};
    ${(props) =>
    props.collapsed &&
    css`
        top: 0;
        left: -110vw;
        width: 0;
      `}
  }

  &::-webkit-scrollbar {
    width: 8px;
    display: none;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) =>
    props.bgColor ? props.bgColor : "#ececec"};
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
    transparentize(0.8, "#17223b")};
    border-radius: 20px;
    display: none;
    border: 3px solid
      ${(props) => (props.bgColor ? props.bgColor : "#FFF")};
  }

  &:hover {
    &::-webkit-scrollbar {
      width: 8px;
      display: block;
    }
    &::-webkit-scrollbar-track {
      background-color: ${(props) =>
    props.bgColor ? props.bgColor : "ececec"};
      display: block;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) =>
    transparentize(0.8, "#17223b")};
      border-radius: 20px;
      display: block;
      border: 3px solid
        ${(props) => (props.bgColor ? props.bgColor : "#FFF")};
    }
  }



  & .mobileMenuToggle {
    background-color: ${(props) => props.toggleBgcolor ? props.toggleBgcolot : "#e42c64"};
    border-radius: 5px;
    ${props => props.toggleRounded && css`
        border-radius: 100px;
    `}
    color: #fff;
    font-size: 18px;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    cursor: pointer;
    z-index: 5;

    @media screen and (max-width: 600px) {
      top: 30px;
      left: 10px;
    }
  }

  & .sidemenu {
    list-style-type: none;
    padding: 0;
    margin: 0;

    & .menuItem {
      & a {
        cursor: pointer;
      width: 100%;
      display: block;
      border-radius: 5px;
      text-transform: capitalize;
      font-size: ${(props) => props.fontSize};
      text-decoration: none;
      padding: 5px 10px;
      color: ${(props) =>
    props.fontColor ? props.fontColor : "#17223b"};

      & i {
        margin-right: 28px;
      }

      &.active {
        color: ${(props) =>
    props.activeLinkColor
      ? props.activeLinkColor
      : "#e42c64"};
      }

      &:hover {
        color: ${(props) =>
    transparentize(
      0.4,
      props.activeLinkColor
        ? props.activeLinkColor
        : "#17223b"
    )};
      }
      }
    }
  }
`;

const ContentArea = styled("div").attrs({ className: "flexi-content-area" })`
  background-color: ${(props) => props.contentBgcolor ? props.contentBgcolor : "#FAFAFA"};
  flex-grow: 1;
  flex-basis: 80%;
  overflow-y: auto;
  min-height: 85vh;

  ${(props) =>
    props.iconsOnly &&
    css`
      @media screen and (min-width: 1200px) {
        margin-left: ${(props) => props.collapsedWidth};
      }
    `}
`;

const SidebarItem = ({
  icon,
  name,
  label,
  link,
  subItems,
  isActive,
  depthStep = 10,
  depth = 0,
  onClick,
  ...rest
}) => {
  return (
    <>
      <li
        onClick={useCallback(() => onClick(name), [name])}
        className={`menuItem ${isActive ? "active" : ""}`}
        {...rest}
        key={name}
      >
        <NavLink to={link}>
          {icon &&
            <i className={icon} />
          }
          <span className="menuText" style={{ paddingLeft: depth * depthStep }}>
            {label}
          </span>
        </NavLink>
      </li>
      {/* {Array.isArray(subItems) ? (
        <ul className="sidemenu">
          {subItems.map((subItem) => (
            <SidebarItem
              key={subItem.name}
              depth={depth + 1}
              depthStep={depthStep}
              {...subItem}
            />
          ))}
        </ul>
      ) : null} */}
    </>
  );
};

export const Layout = ({ menuItems, depthStep, depth, ...props }) => {
  const [active, setActive] = useState(null);
  return (
    <ContentLayout {...props}>
      {props.noSideMenu ? (null) : (
        <SidebarWrapper
          width={props.width}
          fontSize={props.fontSize}
          collapsed={props.collapsed}
          iconsOnly={props.iconsOnly}
          collapsedWidth={props.collapsedWidth}
        >
          {props.appBrand ? (
            <AppBrand>
              <img src={props.appBrand} />
            </AppBrand>
          ) : null}
          <ul className="sidemenu">
            {menuItems.map((sidebarItem, index) => (
              <SidebarItem
                key={sidebarItem.name}
                depthStep={depthStep}
                depth={depth}
                onClick={setActive}
                isActive={active === sidebarItem.name}
                {...sidebarItem}
              />
            ))}
          </ul>
        </SidebarWrapper>
      )}
      <ContentArea
        iconsOnly={props.iconsOnly}
        collapsedWidth={props.collapsedWidth}
      >
        {/* <div className="mobileMenuToggle" onClick={props.toggleMenu}>
          &#9776;
        </div> */}
        {props.children}
      </ContentArea>
    </ContentLayout>
  );
};

Layout.defaultProps = {
  width: "300px",
  fontSize: "13px",
  collapsed: true,
  // iconsOnly: false,
  spaceTop: "0",
  marginTop: true,
  collapsedWidth: "100vw",
};

Layout.propTypes = {
  width: PropTypes.string,
  bgColor: PropTypes.string,
  fontSize: PropTypes.string,
  fontColor: PropTypes.string,
  collapsed: PropTypes.bool,
  activeLinkColor: PropTypes.string,
  iconsOnly: PropTypes.bool,
  spaceTop: PropTypes.string,
  children: PropTypes.any,
  pageTitle: PropTypes.string,
  bellIcon: PropTypes.any,
  userIcon: PropTypes.any,
  cogIcon: PropTypes.any,
  marginTop: PropTypes.bool,
  appBrand: PropTypes.any,
  collapsedWidth: PropTypes.string,
  contentBgcolor: PropTypes.string,
  noSideMenu: PropTypes.bool,
};
