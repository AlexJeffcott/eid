import React from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { Nav } from "./"
import "./Layout.css"

export default function Layout({ title, description, children }) {
  return (
    <>
      <GatsbySeo title={title} description={description} />
      <Nav />
      <div className="layoutWrapper">{children}</div>
    </>
  )
}
