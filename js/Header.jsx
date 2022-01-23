import React from 'react';

export const Header = () => {
  const prefix = !location.href.includes("netlify") ? "/Blog" : "";
  return (
    <header className="header-bar">
      <div className="site-id">
        <h1>
          <a href={`${prefix}`}>Cary</a>
        </h1>
      </div>
      <ol className="links">
        <li>
          <a href={`${prefix}/index.html`}>Home</a>
        </li>
        <li>
          <a href={`${prefix}//articles.html`}>Articles</a>
        </li>
        <li>
          <a href={`${prefix}//about.html`}>About</a>
        </li>
      </ol>
    </header>
  );
};
