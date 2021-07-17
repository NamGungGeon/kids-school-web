import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <div
      className={"flex center"}
      style={{
        width: "100%"
      }}
    >
      <CircularProgress size={64} />
    </div>
  );
};

export default Loading;
