import React from "react";
import styles from "./Navigation.module.css";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "@material-ui/core";
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
        <div>Logo</div>
        <div></div>
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
      </ul>
    </>
  );
};

export default Navigation;
