import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "./"
import './Nav.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faReact } from "@fortawesome/free-brands-svg-icons"
// <FontAwesomeIcon icon={faReact} />

export default function Nav() {
  return (
      <div className="navWrapper" >
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to={`/products/`}>products</Link>
          <OutboundLink href="https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/">
            Click here to find out about outboundlink
          </OutboundLink>
      </div>
  )
}
