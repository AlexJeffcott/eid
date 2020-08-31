import React from "react"

import "./HomePage.css"
import { Layout } from "../components"

export default function Home({ data: { gcms } }) {
  const { homePage } = gcms || {}
  if (!homePage.title) return <div>not loaded</div>

  return (
    <Layout title="home" description="home page">
      <h1>{homePage.title}</h1>
      <h2>{homePage.subHeading}</h2>
      <div>
        {homePage.mediaAssets.map(({ url, id }) => (
          <img key={id} alt={id} src={url} />
        ))}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query HomePageQuery($id: ID!) {
    gcms {
      homePage(where: { id: $id }) {
        title
        subHeading
        slug
        mediaAssets {
          id
          url
        }
      }
    }
  }
`
