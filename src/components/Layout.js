import React from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { Nav } from "./"

export default function Layout({ title, description, children }) {
  return (
    <>
      <GatsbySeo title={title} description={description} />
      <Nav />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 650,
          padding: `0 1rem`,
        }}
      >
        {children}
      </div>
    </>
  )
}
