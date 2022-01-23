import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Header } from "./Header";
import { renderToString } from "react-dom/server";

import "./comment.js";

const App = () => {
  useEffect(() => {
    document.body.innerHTML = `${renderToString(<Header />)}${
      document.body.innerHTML
    }`;
  }, []);
  return null;
};
const container = document.createElement("div");
document.body.appendChild(container);
ReactDOM.render(<App />, container);
