import React from "react";
import styled from "styled-components";
const Rect = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
  height: 50vh;
  background: #252e3f;
`;
const Background = () => {
  return <Rect></Rect>;
};

export default Background;
