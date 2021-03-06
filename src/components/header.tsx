import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'

interface Props {
  title: string
}

interface State {
  expanded: boolean
}

export default class Header extends React.Component<Props, State> {
  state: State = {
    expanded: false,
  }

  toggleExpanded = () => {
    this.setState((prevState) => ({ ...prevState, expanded: !prevState.expanded }))
  }

  collapse = () => {
    this.setState((prevState) => ({ ...prevState, expanded: false }))
  }

  render() {
    const { title } = this.props
    const { expanded } = this.state

    return (
      <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                aria-expanded="false"
                onClick={this.toggleExpanded}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="navbar-brand" to="/">
                {title}
              </Link>
            </div>
            <div className={classNames('navbar-collapse', { collapse: !expanded })}>
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/blog" onClick={this.collapse}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={this.collapse}>
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}
