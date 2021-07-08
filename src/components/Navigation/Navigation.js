import React from "react";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core";
const Navigation = () => {
  const theme = useTheme();
  const { palette } = theme;
  console.log(theme);
  return (
    <div
      className={styles.navWrapper}
      style={{
        background: palette.primary.main,
        boxShadow: "0 0 8px #333333"
      }}
    >
      <nav
        className={styles.topNav}
        style={{
          background: palette.primary.dark
        }}
      >
        <div>Logo</div>
        <div></div>
      </nav>
      <ul>
        <li>
          <Link to={"/"}>유치원 찾기</Link>
        </li>
        <li>
          <Link to={"/compares"}>유치원 비교</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
