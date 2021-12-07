"use strict";

const e = React.createElement;

class List extends React.Component {
  render() {
    const list = outline.reduce((all, item) => {
      const key = Object.keys(item)[0];
      all = all.concat(item[key]);
      return all;
    }, []);

    return list.slice(0, 5).map((item) => {
      return (
        <li key={item.title} className="home-section-content-article-list-item">
          <article>
            <h1 className="home-section-content-article-list-item-title">
              <a href={"/Blog" + item.href}>{item.title}</a>
            </h1>
            <p className="home-section-content-article-list-item-excerpt">
              {item.desc}
              <a
                className="article-excerpt-more-link"
                href={"/Blog" + item.href}
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
    });
  }
}

const domContainer = document.getElementById("outline-list");
ReactDOM.render(e(List), domContainer);
