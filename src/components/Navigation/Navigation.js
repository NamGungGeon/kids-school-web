import React from "react";
import styles from "./Navigation.module.css";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "@material-ui/core";
import logo from "../../resources/logo.png";

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
    </>
  );
};

export default Navigation;
