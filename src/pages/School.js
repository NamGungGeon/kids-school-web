import React from "react";
import SchoolInfo from "../containers/SchoolInfo/SchoolInfo";
import { usePageDescriptor } from "../hook/usePageDescriptor";

const School = ({ match }) => {
  usePageDescriptor({
    title: "키즈스쿨:: 상세정보",
    description: "지정된 유치원의 상세 정보를 볼 수 있습니다"
  });
  return <SchoolInfo kinderCode={match.params.kinderCode} />;
};

export default School;
