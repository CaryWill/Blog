import React from "react";
import ReactDOM from "react-dom";
import { outline } from "./outline.mjs";
import { Header as MyHeader } from "./Header";

import "../css/main.css";

const prefix = !location.href.includes("netlify") ? "/Blog" : "";

const App = () => {
  return [
    <MyHeader key="header" />,
    <main className="content-container" key="main">
      <header>
        <h1 className="page-title">Articles</h1>
        <div className="metadata">
          <p className="feed" id="feed">
            <img
              style={{ marginRight: 5 }}
              className="feed-icon"
              src={`${
                location.href.includes("netlify")
                  ? "/css/feed-icon.svg"
                  : "/Blog/css/feed-icon.svg"
              }`}
            />
            <a
              href={`${
                location.href.includes("netlify") ? "/rss.xml" : "/Blog/rss.xml"
              }`}
            >
              RSS Feed
            </a>
          </p>
        </div>
      </header>
      {outline.map((item) => {
        const year = Object.keys(item)[0];
        return (
          <section>
            <ol className="years" id="years">
              <li>
                <ol className="articles">
                  <li key={year}>
                    <h3>{year}</h3>
                    <ol className="articles" id="articles">
                      {item[year].map((article) => (
                        <li key={article.title}>
                          <article>
                            <a href={prefix + article.href}>
                              <div className="title">
                                <h1>{article.title}</h1>
                              </div>
                            </a>
                            <div className="date">{article.date}</div>
                          </article>
                        </li>
                      ))}
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </section>
        );
      })}
    </main>,
  ];
};

ReactDOM.render(<App />, document.body);
