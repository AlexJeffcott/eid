import React from "react"
import { GatsbySeo } from 'gatsby-plugin-next-seo'

export default function Layout({ children }) {
  return (
    <>
      <GatsbySeo title="home" description="homepage" defer={false} />{/*do I need defer?*/}
      <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
        {children}
      </div>
    </>
  )
}
