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

  // comment
  const container = `<div id="disqus_thread"></div>`;
  const commentContainer = document.createElement("div");
  commentContainer.innerHTML = container;
  document.body.append(commentContainer);

  document.getElementById("disqus_thread").innerHTML = `
  <script>
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    /*
    var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://https-carytalk-netlify-app.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>`;
})();
