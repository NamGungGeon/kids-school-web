import React from "react";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
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
          <Link to={"/"}>유치원 찾기</Link>
        </li>
        <li>
          <Link to={"/compare"}>유치원 비교</Link>
        </li>
        <li>
          <Link to={"/report"}>문의</Link>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
