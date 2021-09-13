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
        <span>Articles</span>
      </li>
      <li>
        <a href="/about/">About</a>
      </li>
    </ol>
  </div>
  `
  const div = document.createElement("header");
  div.innerHTML = header;
  document.body.prepend(div, document.body.firstChild);
})();
