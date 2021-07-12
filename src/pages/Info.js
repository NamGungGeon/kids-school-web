import React from "react";
import { Typography } from "@material-ui/core";

const Info = () => {
  return (
    <div className={"content"}>
      <h1>정보</h1>
      <h2>데이터 출처</h2>
      <Typography>
        데이터는{" "}
        <a href="https://e-childschoolinfo.moe.go.kr/main.do">
          https://e-childschoolinfo.moe.go.kr/main.do
        </a>
        에서 크롤링한 데이터를 가공하여 제공합니다
      </Typography>
      <h2>주의사항</h2>
      <Typography>
        이 사이트에서 제공되는 모든 정보는 정보공시일 기준으로 제공되며,
        현재와는 다른 내용이 있을 수 있습니다
        <br />
        <br />
        또한 데이터 제공 과정에서 일부 정보가 누락되거나 오표기되어 있을 수
        있으므로, 중요한 정보일 경우 반드시 직접 전화나 해당 교육청에
        문의해보셔야 합니다.
        <br />
        이로 인해 발생하는 피해에 대해서는 사이트 제공자가 책임지지 않습니다
      </Typography>
      <h2>문의</h2>
      <Typography>
        서비스 이용 관련 문의는 <a href="/report">문의</a>를 이용해주세요
        <br />그 외 문의는{" "}
        <a href="mailto:rndrjs123@naver.com">rndrjs123@naver.com</a>으로
        보내주시면 빠른 시일 내에 답장 드리겠습니다
      </Typography>
    </div>
  );
};

export default Info;
