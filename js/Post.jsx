import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { renderToString } from "react-dom/server";

import "../css/style.css";

const App = () => {
  useEffect(() => {
    document.body.innerHTML = `${renderToString(<Header />)}${
      document.body.innerHTML
    }`;
    //     {
    //       renderToString(<Footer />);
    //     }
  }, []);
  return null;
};
const container = document.createElement("div");
document.body.appendChild(container);
ReactDOM.render(<App />, container);
