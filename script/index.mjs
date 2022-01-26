import fs from "fs";
import path from "path";
import ConvertTiff from "tiff-to-png";
import Outline from "../js/outline.mjs";
const { outline } = Outline;

// 添加 RSS
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
  try {
    results.forEach((p) => {
      if (p.includes(".html")) {
        var data = fs.readFileSync(p, "utf-8");
        // post style
        const js = `<script src="/Blog/build/post.js" defer></script>`;
        const js2 = `<script src="/build/post.js" defer></script>`;
        const assetsjs = `<script src="/assets/post.js" defer></script>`;
        // 但是最好不要打包到 js 里去， 不然加载文件的时候会很难看
        // /Blog for github page
        const css = `<link href="/Blog/css/style.css" rel="stylesheet" />`;
        // netlify support
        const css2 = `<link href="/css/style.css" rel="stylesheet" />`;
        // 移除之前有的 script
        [js, js2, assetsjs, css, css2].forEach((item) => {
          // NOTE: 使用高版本的 npm > 16
          // nvm use 16
          if (data.replaceAll) {
            data = data.replaceAll(item, "");
          }
        });
        // 转换 tiff 到 png 以免浏览器不能显示
        data = data.replaceAll(".tiff", ".png");
        // 添加一个 script 来保证只有一个
        [js, js2, assetsjs, css, css2].forEach((item) => {
          data = item + data;
        });
        fs.writeFileSync(p, data, "utf-8");
      } else if (p.includes(".tiff")) {
        try {
          var options = {
            logLevel: 1,
          };
          var converter = new ConvertTiff(options);
          converter.convertOne(p, path.dirname(p));
          // 因为转换会创建文件夹 所以需要将里面的文件移出来
          // https://stackoverflow.com/a/41562625
          var oldPath = p.split(".tiff")[0] + "/" + "0.png";
          var newPath = p.split(".tiff")[0] + ".png";
          if (fs.existsSync(p.split(".tiff")[0])) {
            fs.renameSync(oldPath, newPath, function (err) {
              if (err) throw err;
              console.log("Successfully renamed - AKA moved!");
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else if (p.includes(".css")) {
        // 清空
        try {
          fs.rmSync(p, {
            force: true,
          });
        } catch (error) {}
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// 参考
// https://www.codegrepper.com/code-examples/javascript/recursively+loop+through+files+nodejs
// https://stackoverflow.com/questions/21253019/change-a-file-using-node-js
