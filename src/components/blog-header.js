import React from 'react';
import Link from 'gatsby-link';

export default function BlogHeader({ title, date, formattedDate, path }) {
  return (
    <header>
      <h1>
        <Link to={path}>
          {title}
        </Link>
      </h1>
      <p className="meta">
        <time dateTime={date}>
          {formattedDate}
        </time>
      </p>
    </header>
  );
}
