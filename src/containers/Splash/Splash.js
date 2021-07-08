import React from "react";
import styled from "styled-components";

const Cover = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #81c784;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;
const Splash = () => {
  return (
    <Cover>
      <h1>키즈스쿨</h1>
      <p>로딩 중 입니다</p>
    </Cover>
  );
};

export default Splash;
