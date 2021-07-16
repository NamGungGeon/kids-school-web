import React, { useEffect, useState } from "react";
import styles from "./Navigation.module.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import { IconButton, useTheme } from "@material-ui/core";
import logo from "../../resources/logo.png";
import classNames from "classnames";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import InfoIcon from "@material-ui/icons/Info";
import { useDeviceType } from "../../hook/useDeviceSize";
import { getMetaTags, usePageDescriptor } from "../../hook/usePageDescriptor";
import { observer } from "mobx-react-lite";

const Navigation = () => {
  const theme = useTheme();
  const [deviceType] = useDeviceType();
  const [pageDescriptor] = usePageDescriptor();
  const [title, setTitle] = useState();
  useEffect(() => {
    console.log("onUpdatePageDescriptor");
    if (pageDescriptor?.title) {
      setTitle(pageDescriptor.title);
    }
  }, [pageDescriptor]);

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
        {deviceType !== "phone" && (
          <Link to={"/"}>
            <img src={logo} alt={"logo"} className={styles.logo} />
          </Link>
        )}
        {deviceType === "phone" && <h3 style={{ margin: 0 }}>{title}</h3>}
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
              <StarIcon />
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

export default observer(Navigation);
