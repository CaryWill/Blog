"use strict";

const e = React.createElement;

class List extends React.Component {
  render() {
    return outline.map((item) => (
      <li>
        <article>
          <a href={item.href}>
            <div class="title">
              <h1>{item.name}</h1>
            </div>
          </a>
          <div class="date">{item.date}</div>
        </article>
      </li>
    ));
  }
}

const domContainer = document.getElementById("articles");
ReactDOM.render(e(List), domContainer);
