import React from 'react'
import { Link } from 'gatsby'

interface Props {
  title: string
  date: string
  formattedDate: string
  path: string
}

export default function BlogHeader({ title, date, formattedDate, path }: Props) {
  return (
    <header>
      <h1>
        <Link to={path}>{title}</Link>
      </h1>
      <p className="meta">
        <time dateTime={date}>{formattedDate}</time>
      </p>
    </header>
  )
}
