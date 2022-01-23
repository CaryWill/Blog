import React from "react";

export const Footer = () => {
  if (window.noComment) return null;
  return (
    <div>
      <div id="disqus_thread" style="margin-top: 66px"></div>
      <script
        src="https://https-carytalk-netlify-app.disqus.com/embed.js"
        data-timestamp={new Date()}
      ></script>
    </div>
  );
};
