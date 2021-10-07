var fs = require("fs");
var path = require("path");

// 添加 RSS 
var outline = require("../js/outline.js");
const articles = outline.reduce((all, item) => {
  const key = Object.keys(item)[0];
  all = all.concat(item[key]);
  return all;
}, []);

const content = articles.reduce((all, next) => {
  all += `<item>
    <title>${next.title}</title>
    <link>${next.href}</link>
    <description>${next.desc}</description>
    <pubDate>${next.date}</pubDate>
  </item>`;
  return all;
}, "");

const rss = `<?xml version="1.0"?>
<rss version="2.0">
  <channel>
    <title>CaryTalk</title>
    <link>https://carytalk.netlify.app/</link>
    <description>暂无描述</description>
   ${content} 
  </channel>
</rss>`;

fs.writeFileSync(path.join("./rss.xml"), rss);


// 自动添加 ulysses 的 css 和每个文章的主 js 文件用来添加 header 和 comment
var walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk(path.join("./src"), function (err, results) {
  if (err) throw err;
  results.forEach((p) => {
    if (p.includes(".html")) {
      const css = `<link href="/css/style.css" rel="stylesheet" />`;
      const js = `<script src="/js/index.js" defer></script>`;

      var data = fs.readFileSync(p, "utf-8");
      while (data.includes(css) || data.includes(js)) {
        data = data.replace(css, "");
        data = data.replace(js, "");
      }
      data += css;
      data += js;
      fs.writeFileSync(p, data, "utf-8");
    }
  });
});

// 参考
// https://www.codegrepper.com/code-examples/javascript/recursively+loop+through+files+nodejs
// https://stackoverflow.com/questions/21253019/change-a-file-using-node-js
