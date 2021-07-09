import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <div className={"flex center"}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
