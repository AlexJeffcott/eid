import React from "react"
import { Link } from "gatsby"

import { Layout, OutboundLink } from "../components"

export default function About() {
  return (
    <Layout title="about" description="about page">
      <h1>What a world.</h1>
      <Link to="/">Home</Link>
      <OutboundLink href="https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/">
        Click here to find out about outboundlink
      </OutboundLink>
    </Layout>
  )}
