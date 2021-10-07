var fs = require("fs");
var path = require("path");
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
// console.log(path);
