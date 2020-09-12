import React from "react";
import styled, { css } from "styled-components";
import { transparentize, darken } from "polished";
import PropTypes from "prop-types";

const TopBar = styled("div").attrs({ className: "flexi-top-bar" })`
  position: ${props => props.topBarPosition ? props.topBarPosition : "fixed"};
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.topBarHeight};
  background-color: ${(props) =>
        transparentize(0.47, props.topBarBgColor ? props.topBarBgColor : "#FFF")};
  box-sizing: border-box;
  z-index: 4;
  display: flex;
  align-items: center;
  padding: 0 30px;

  & .flexi-logo-placeholder {
    & img {
      width: minmax(300px, 80%);
      max-height: 80%;
    }
  }

  & .flexi-page-title {
    margin-left: 100px;
    & span {
      color: #373737;
      font-size: 28px;
      font-weight: 400;
    }
  }

  & .userinfo-actions {
    flex-grow: 8;
    display: flex;
    justify-content: flex-end;

    & .userinfo {
      margin-right: 36px;
      display: inline-flex;
      align-items: center;

      & .userImage {
        height: 27px;
        width: 27px;
        background-color: #ececec;
        border-radius: 100%;
        display: inline-block;
      }

      & .user-school-name {
        margin-left: 10px;
        font-size: ${(props) => props.PrimaryFontSize};

        &:after {
          font-family: "flexibull-2-0";
          content: "\\f107";
          display: inline-block;
          margin-left: 10px;
        }
      }
    }

    & a {
      font-size: 18px;
      margin-left: 36px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 600px) {
    & .flexi-logo-placeholder {
      display: none;
    }

    & .flexi-page-title {
      margin-left: 50px;
      & span {
        color: #373737;
        font-size: 24px;
        font-weight: 400;
      }
    }

    & .userinfo-actions {
      & a {
        display: none;
      }
    }
  }
`;

export const Header = (props) => {
    return (
        <TopBar {...props}>
            <div className="flexi-logo-placeholder">
                <img src={props.logo} alt="Logo Image" />
            </div>
            <div className="flexi-page-title">
                <span>{props.pageTitle}</span>
            </div>
            <div className="userinfo-actions">
                <div className="userinfo">
                    <div className="userImage"></div>
                    <span className="user-school-name"> Flexisaf Academy </span>
                </div>
                <a>{props.bellIcon}</a>
                <a>{props.userIcon}</a>
                <a>{props.cogIcon}</a>
            </div>
        </TopBar>
    );
};

Header.defaultProps = {
    topBarHeight: "80px",
    PrimaryFontSize: "13px",
};

Header.propTypes = {
    topBarHeight: PropTypes.string,
    topBarBgColor: PropTypes.string,
    topBarPosition: PropTypes.string,
    logo: PropTypes.any,
    pageTitle: PropTypes.string,
    bellIcon: PropTypes.any,
    userIcon: PropTypes.any,
    cogIcon: PropTypes.any,
    PrimaryFontSize: PropTypes.string,
};
