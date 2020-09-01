import React from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"

export default ({href, children}) => (
  <div>
    <OutboundLink href={href}>
      {children}
    </OutboundLink>
  </div>
)
