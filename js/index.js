// TODO: generte tree from folder structure
(function () {
  const header = `
  <div class="header-bar">
    <div class="site-id">
      <h1><a href="/">Cary</a></h1>
    </div>
    <ol class="links">
      <li>
        <a href="/index.html">Home</a>
      </li>
      <li>
        <a href="/articles.html">Articles</a>
      </li>
      <li>
        <a href="/about/">About</a>
      </li>
    </ol>
  </div>
  `;
  const div = document.createElement("header");
  div.innerHTML = header;
  document.body.prepend(div, document.body.firstChild);

  if (window.noComment) {
    // comment
    const container = `<div id="disqus_thread" style='margin-top: 66px'></div>`;
    const commentContainer = document.createElement("div");
    commentContainer.innerHTML = container;
    document.body.append(commentContainer);

    window.disqus_config = function () {
      this.page.url = window.location.href; // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = window.location.href; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    var d = document,
      s = d.createElement("script");
    s.src = "https://https-carytalk-netlify-app.disqus.com/embed.js";
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  }
})();
