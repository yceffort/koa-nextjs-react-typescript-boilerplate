import React from "react";
import styled from "styled-components";

const NewH1 = styled.h1`
  color: red;
  font-size: 42px;
`;

export default class Index extends React.Component {
  render() {
    return <NewH1>Hello yc</NewH1>;
  }
}
