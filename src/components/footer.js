import React from 'react';

export default function Footer({ socialLinks }) {
  return (
    <footer id="site-footer" className="container-fluid">
      <ul className="nav nav-pills pull-right">
        <li>
          <a target="_blank" href={socialLinks.github}>
            <i className="fa fa-github" />
          </a>
        </li>
        <li>
          <a target="_blank" href={socialLinks.twitter}>
            <i className="fa fa-twitter" />
          </a>
        </li>
        <li>
          <a target="_blank" href={socialLinks.stackOverflow}>
            <i className="fa fa-stack-overflow" />
          </a>
        </li>
        <li>
          <a target="_blank" href={socialLinks.linkedin}>
            <i className="fa fa-linkedin" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
