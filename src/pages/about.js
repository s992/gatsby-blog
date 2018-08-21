import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/layout'

export default function About() {
  return (
    <Layout>
      <div className="row">
        <Helmet title="About Sean" />
        <div className="col-md-8 col-lg-7 col-xl-5 center-block">
          <h1>About Sean</h1>
          <p>
            My name is Sean Walsh. I'm a husband, father, and football fan. I'm also a software engineer on{' '}
            <a href="https://www.dronedeploy.com/">DroneDeploy's</a> flight team, where I spend my time helping drones
            get into the air so they can get busy taking photographs.
          </p>
          <p>
            After I got out of the Army in 2009, I knew I wanted to do <strong>something</strong> with technology, but I
            wasn't sure what. In early 2010, I finally found my calling as a web developer. I got my start in a
            ColdFusion shop and worked quickly to devour as much knowledge as I could.
          </p>
          <p>
            Since those humble beginnings, I've worked hard to learn as much possible. I fully believe in using the best
            tool for the job, and since then I've done development in a variety of languages - ColdFusion, PHP, Groovy,
            and Java, just to name a few. Coding is fun, and I don't see any reason to pigeonhole myself into a single
            language or toolset. I'm currently working with TypeScript, Objective-C, and Java, but I'll always continue
            to dabble in other technologies.
          </p>
          <p>
            If you want to get in touch, your best bet is to reach out to me via e-mail, Twitter, or by adding a comment
            to one of my posts. You can also find me on GitHub, Stack Overflow, and LinkedIn.
          </p>
          <ul>
            <li>
              <span>E-mail: </span>
              <a href="mailto:sean@swalsh.org">sean@swalsh.org</a>
            </li>
            <li>
              <span>Twitter: </span>
              <a href="https://twitter.com/THEseanwalsh">@THEseanwalsh</a>
            </li>
            <li>
              <span>GitHub: </span>
              <a href="https://github.com/s992">https://github.com/s992</a>
            </li>
            <li>
              <span>Stack Overflow: </span>
              <a href="https://stackoverflow.com/users/603502/sean-walsh">
                https://stackoverflow.com/users/603502/sean-walsh
              </a>
            </li>
            <li>
              <span>LinkedIn: </span>
              <a href="https://linkedin.com/pub/sean-walsh/bb/aa4/6a8">
                https://linkedin.com/pub/sean-walsh/bb/aa4/6a8
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
