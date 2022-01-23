import React from "react";
import ReactDOM from "react-dom";
import { outline } from "./outline.js";
import "../css/main.css";

const prefix = !location.href.includes("netlify") ? "/Blog" : "";

const App = () => {
  const list = outline.reduce((all, item) => {
    const key = Object.keys(item)[0];
    all = all.concat(item[key]);
    return all;
  }, []);
  return (
    <main class="content-container">
      <section class="home-section">
        <div class="home-section-content">
          <p>你好，我是张生，一名前端工程师。</p>
        </div>
      </section>
      <section class="home-section">
        <h1 class="home-section-title">Recent Articles</h1>
        <div class="home-section-content">
          <ol class="home-section-content-article-list" id="outline-list">
            {list.slice(0, 5).map((item) => {
              return (
                <li
                  key={item.title}
                  className="home-section-content-article-list-item"
                >
                  <article>
                    <h1 className="home-section-content-article-list-item-title">
                      <a href={prefix + item.href}>{item.title}</a>
                    </h1>
                    <p className="home-section-content-article-list-item-excerpt">
                      {item.desc}
                      <a
                        className="article-excerpt-more-link"
                        href={prefix + item.href}
                      >
                        More&nbsp;&gt;
                      </a>
                    </p>
                    <p className="home-section-content-article-list-item-date">
                      {item.date}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
        <div class="home-section-nav">
          <a
            id="older"
            href="#"
            class="button"
            title="Blog Archive"
            onClick={(e) => {
              e.preventDefault();
              location.href = location.href.includes("netlify")
                ? "/articles.html"
                : "/Blog/articles.html";
            }}
          >
            Older Articles
          </a>
        </div>
      </section>
    </main>
  );
};

const domContainer = document.getElementById("home");
ReactDOM.render(<App />, domContainer);
