## 如何新增一片文章

1. Ulysses 导出到 src 下面的文件夹下，比如 2022
2. 修改 outline.mjs
3. npm run build （注意 node 版本需要 16）
4. git commit & git push （push 完会自动部署到 Netlify）

## NOTE

1. 不要改 src 目录的文件名和目录结构（因为评论 disqus 是根据 href 来的
