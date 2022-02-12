import React, { useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import { Header } from "./Header";
import { renderToString } from "react-dom/server";

import "./comment.js";
import "./post.style.css";

const Outline = React.memo(() => {
  const h2s = document.getElementsByTagName("h2");

  useEffect(() => {
    Array.from(h2s).forEach((item) => {
      item.innerHTML = `<a href='#${id}'>${item.textContent}</a>`;
    })
  }, [])

  return (
    <ol>
      {Array.from(h2s).map((item, index) => {
        const id = `outline-${item.textContent}-${index}`;
        item.innerHTML = `<a href='#${id}'>${item.textContent}</a>`;
        item.setAttribute("id", id);
        return (
          <li
            onClick={() => {
              location.hash = id;
            }}
            key={index}
            style={{ cursor: "pointer" }}
          >
            {item.textContent}
          </li>
        );
      })}
    </ol>
  );
});
const App = () => {
  useEffect(() => {
    document.body.innerHTML = `${renderToString(
      <Header />
    )}<div id='outline'></div>${document.body.innerHTML}`;
    render(<Outline />, document.getElementById("outline"));
  }, []);
  return null;
};
const container = document.createElement("div");
document.body.appendChild(container);
ReactDOM.render(<App />, container);
