import React from "react";
import ReactDOM from "react-dom";
import { Header } from "./Header";

import "../css/main.css";

const App = () => {
  return [
    <Header key="header" />,
    <div
      style={{
        width: " 100%",
        maxWidth: 768,
        padding: "0 20px",
      }}
      key="main"
    >
      <h1>简介</h1>
      <p>作者： 张生</p>
      <p>
        位置：<a href="https://twitter.com/cary__w">undefined</a>
      </p>
      <p>
        推特：<a href="https://twitter.com/cary__w">cary__w</a>
      </p>
      <p>邮箱：carywill.k@gmail.com</p>
      <p>
        Github：<a href="https://github.com/carywill">carywill</a>
      </p>
    </div>,
  ];
};

ReactDOM.render(<App />, document.body);
