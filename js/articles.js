"use strict";

const e = React.createElement;

class List extends React.Component {
  render() {
    return outline.map((item) => {
      const year = Object.keys(item)[0];
      return (
        <li>
          <h1>{year}</h1>
          <ol className="articles" id="articles">
            {item[year].map((article) => (
              <li>
                <article>
                  <a href={article.href}>
                    <div class="title">
                      <h1>{article.title}</h1>
                    </div>
                  </a>
                  <div className="date">{article.date}</div>
                </article>
              </li>
            ))}
          </ol>
        </li>
      );
    });
  }
}

const domContainer = document.getElementById("years");
ReactDOM.render(e(List), domContainer);
