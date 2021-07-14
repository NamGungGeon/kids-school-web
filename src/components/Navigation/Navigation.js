import React from "react";
import styles from "./Navigation.module.css";
import { Link, NavLink } from "react-router-dom";
import { IconButton, useTheme } from "@material-ui/core";
import logo from "../../resources/logo.png";
import classNames from "classnames";
import SearchIcon from "@material-ui/icons/Search";
import CompareIcon from "@material-ui/icons/Compare";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import InfoIcon from "@material-ui/icons/Info";

const Navigation = () => {
  const theme = useTheme();
  const { palette } = theme;
  console.log(theme);
  return (
    <>
      <nav
        className={styles.topNav}
        style={{
          background: palette.primary.dark
        }}
      >
        <Link to={"/"}>
          <img src={logo} alt={"logo"} className={styles.logo} />
        </Link>
      </nav>
      <ul
        style={{
          background: palette.primary.main
        }}
      >
        <li>
          <NavLink exact to={"/"} activeStyle={{ textDecoration: "underline" }}>
            유치원 찾기
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/compare"}
            activeStyle={{ textDecoration: "underline" }}
          >
            유치원 비교
          </NavLink>
        </li>
        <li>
          <NavLink to={"/report"} activeStyle={{ textDecoration: "underline" }}>
            문의
          </NavLink>
        </li>
        <li>
          <NavLink to={"/info"} activeStyle={{ textDecoration: "underline" }}>
            서비스 정보
          </NavLink>
        </li>
      </ul>
      <ul className={classNames(styles.bottom, styles.nav)}>
        <li>
          <NavLink exact to={"/"} activeClassName={styles.active}>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/compare"} activeClassName={styles.active}>
            <IconButton>
              <CompareIcon />
            </IconButton>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/report"} activeClassName={styles.active}>
            <IconButton>
              <ChatBubbleIcon />
            </IconButton>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/info"} activeClassName={styles.active}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
