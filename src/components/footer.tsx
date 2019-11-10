import React from 'react'

interface Props {
  socialLinks: {
    github: string
    twitter: string
    stackOverflow: string
    linkedin: string
  }
}

export default function Footer({ socialLinks }: Props) {
  return (
    <footer id="site-footer" className="container-fluid">
      <ul className="nav nav-pills pull-right">
        <li>
          <a target="_blank" rel="noopener noreferrer" href={socialLinks.github} aria-label="Sean's Github Profile">
            <i className="fa fa-github" />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href={socialLinks.twitter} aria-label="Sean's Twitter Profile">
            <i className="fa fa-twitter" />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={socialLinks.stackOverflow}
            aria-label="Sean's Stack Overflow Profile"
          >
            <i className="fa fa-stack-overflow" />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href={socialLinks.linkedin} aria-label="Sean's LinkedIn Profile">
            <i className="fa fa-linkedin" />
          </a>
        </li>
      </ul>
    </footer>
  )
}
