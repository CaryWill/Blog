"use strict";

const e = React.createElement;

class List extends React.Component {
  render() {
    const list = outline.reduce((all, item) => {
      const key = Object.keys(item)[0];
      all.concat(item[key]);
      return all;
    }, []);
    return list.slice(0, 5).map((item) => {
      return (
        <li key={item.title} class="home-section-content-article-list-item">
          <article>
            <h1 class="home-section-content-article-list-item-title">
              <a href={item.href}>{item.title}</a>
            </h1>
            <p class="home-section-content-article-list-item-excerpt">
              {item.desc}
              <a class="article-excerpt-more-link" href={item.href}>
                More&nbsp;&gt;
              </a>
            </p>
            <p class="home-section-content-article-list-item-date">
              {item.date}
            </p>
          </article>
        </li>
      );
    });
  }
}

const domContainer = document.getElementById("outline-list");
ReactDOM.render(e(List), domContainer);
