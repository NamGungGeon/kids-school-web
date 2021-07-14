import React from "react";
import SchoolInfo from "../containers/SchoolInfo/SchoolInfo";

const School = ({ match }) => {
  return <SchoolInfo kinderCode={match.params.kinderCode} />;
};

export default School;
