var fs = require("fs");
var path = require("path");
var ConvertTiff = require("tiff-to-png");

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
    <pubDate>${new Date(next.date)}</pubDate>
    <lastBuildDate>${new Date(next.date)}</lastBuildDate>
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
      var data = fs.readFileSync(p, "utf-8");
      // post style
      const css = `<link href="/css/style.css" rel="stylesheet" />`;
      // comment+header
      const js = `<script src="/js/index.js" defer></script>`;
      // auto generated ulyssess css
      const ulyssessPostCss = `<link rel="stylesheet" type="text/css" href="css/style.css" />`;
      // 移除之前有的 script
      data = data.replaceAll(css, "");
      data = data.replaceAll(js, "");
      data = data.replaceAll(ulyssessPostCss, "");
      // 转换 tiff 到 png 以免浏览器不能显示
      data = data.replaceAll(".tiff", ".png");
      // 添加一个 script 来保证只有一个
      data = css + data;
      data += js;
      fs.writeFileSync(p, data, "utf-8");
    } else if (p.includes(".tiff")) {
      var options = {
        logLevel: 1,
      };
      var converter = new ConvertTiff(options);
      const arr = p.split("/");
      const name = arr.pop();
      console.log(path.dirname(p));
      converter.convertOne(p, path.dirname(p));
      // 因为转换会创建文件夹 所以需要将里面的文件移出来
      // https://stackoverflow.com/questions/8579055/how-do-i-move-files-in-node-js
      var oldPath = p.split(".tiff")[0] + "/" + "0.png";
      var newPath = p.split(".tiff")[0] + ".png";
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
        console.log("Successfully renamed - AKA moved!");
      });
      // 删除之前的文件
    }
  });
});

// 参考
// https://www.codegrepper.com/code-examples/javascript/recursively+loop+through+files+nodejs
// https://stackoverflow.com/questions/21253019/change-a-file-using-node-js
