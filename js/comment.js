(function () {
  if (!window.noComment) {
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
    s.src = "https://caryx.disqus.com/embed.js";
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  }
})();
