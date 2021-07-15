import React, { useEffect } from "react";
import queryString from "query-string";

const Config = ({ location, history }) => {
  useEffect(() => {
    const query = queryString.parse(location.search);
    if (query.trackable === "false") {
      localStorage.setItem("trackable", "disallow");
    }

    history.replace("/");
  }, []);
  return <div />;
};

export default Config;
